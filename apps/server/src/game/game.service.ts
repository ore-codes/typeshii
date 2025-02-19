import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RedisService } from '@/redis/redis.service';
import { faker } from '@faker-js/faker';
import { GameEvents, GameState, Player } from '@/game/game.types';
import { GameGateway } from '@/game/game.gateway';

@Injectable()
export class GameService {
  private readonly gameKeyPrefix = 'game';
  private readonly TTL_SECONDS = 3600; // 1 hour in seconds
  private readonly MAX_PLAYERS = 4;
  private readonly MAX_SPEED = 100;
  private readonly MIN_SPEED = 0;
  private readonly SPEED_INCREMENT = 10;
  private readonly SPEED_DECREMENT = 50;
  private readonly SPEED_INTERVAL_DECREMENT = 10;
  private readonly PROGRESS_INCREMENT_DIVISOR = 1;
  private readonly PARAGRAPH_LENGTH = 150;
  private readonly TICK_INTERVAL = 1000; // 1 second in milliseconds

  private activeGames: Map<string, NodeJS.Timeout> = new Map();

  constructor(
    private readonly redisService: RedisService,
    @Inject(forwardRef(() => GameGateway))
    private readonly gameGateway: GameGateway,
  ) {}

  async startGame(gameId: string): Promise<GameState> {
    const game = await this.redisService.get<GameState>(gameId);
    if (!game) throw new NotFoundException('Game not found');

    game.gameInProgress = true;
    game.startTime = Date.now();

    await this.redisService.set(gameId, game, this.TTL_SECONDS);

    this.startGameLoop(gameId);

    return game;
  }

  async closeGame(gameId: string): Promise<void> {
    const game = await this.redisService.get<GameState>(gameId);
    if (!game) throw new NotFoundException('Game not found');

    const interval = this.activeGames.get(gameId);
    if (interval) clearInterval(interval);
    this.activeGames.delete(gameId);

    await this.redisService.delete(gameId);
    console.log(`Game ${gameId} has been closed.`);
  }

  async updatePlayerProgress(
    gameId: string,
    playerId: string,
    typedText: string,
  ): Promise<GameState> {
    const game = await this.redisService.get<GameState>(gameId);
    if (!game) throw new NotFoundException('Game not found');
    if (!game.gameInProgress) throw new ConflictException('Game is not active');

    const player = game.players.find((p) => p.id === playerId);
    if (!player) throw new NotFoundException('Player not found in this game');

    if (typedText.length === player.paragraph.length) {
      if (!player.finishTime) player.finishTime = Date.now();
    }

    const typedLength = player.typedText.length;
    if (typedText[typedLength - 1] === player.paragraph[typedLength - 1]) {
      player.speed = Math.min(this.MAX_SPEED, player.speed + this.SPEED_INCREMENT);
      player.progress += player.speed / this.PROGRESS_INCREMENT_DIVISOR;
    } else {
      player.speed = Math.max(this.MIN_SPEED, player.speed - this.SPEED_DECREMENT);
    }
    player.typedText = typedText;

    await this.redisService.set(gameId, game, this.TTL_SECONDS);

    this.gameGateway.server.to(gameId).emit(GameEvents.GAME_STATE_UPDATED, { gameState: game });

    await this.checkGameCompletion(gameId);
    return game;
  }

  async findGame(gameIdWithoutPrefix: string): Promise<string> {
    const gameId = `${this.gameKeyPrefix}-${gameIdWithoutPrefix}`;
    const game = await this.redisService.get<GameState>(gameId);

    if (!game || game.players.length >= 4) {
      throw new UnprocessableEntityException('Invalid game code');
    }

    return gameId;
  }

  async createGame(): Promise<string> {
    const suffix = Math.floor(Math.random() * 9999)
      .toString()
      .padStart(4, '0');
    const gameId = `${this.gameKeyPrefix}-${suffix}`;
    const initialState: GameState = {
      players: [],
      gameInProgress: false,
      startTime: 0,
    };

    await this.redisService.set(gameId, initialState, this.TTL_SECONDS);
    return gameId;
  }

  async addPlayer(gameId: string, playerId: string): Promise<Player> {
    const game = await this.redisService.get<GameState>(gameId);
    if (!game) throw new NotFoundException('Game not found');
    if (game.players.length >= this.MAX_PLAYERS) {
      throw new ConflictException('Game is already full');
    }

    const newPlayer: Player = {
      id: playerId,
      progress: 0,
      speed: 0,
      typedText: '',
      paragraph: this.generateRandomParagraph(),
    };

    game.players.push(newPlayer);
    await this.redisService.set(gameId, game, this.TTL_SECONDS);
    return newPlayer;
  }

  async getGameState(gameId: string): Promise<GameState> {
    const game = await this.redisService.get<GameState>(gameId);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }

  async removePlayer(gameId: string, playerId: string): Promise<boolean> {
    if (!gameId || !playerId) {
      throw new UnprocessableEntityException('Invalid game or player information');
    }

    const game = await this.redisService.get<GameState>(gameId);
    if (!game) throw new NotFoundException('Game not found');

    const playerIndex = game.players.findIndex((p) => p.id === playerId);
    if (playerIndex === -1) return false;

    game.players.splice(playerIndex, 1);
    await this.redisService.set(gameId, game, this.TTL_SECONDS);
    return true;
  }

  async checkGameCompletion(gameId: string): Promise<boolean> {
    const game = await this.redisService.get<GameState>(gameId);
    if (!game) throw new NotFoundException('Game not found');

    if (game.players.some((p) => p.finishTime)) {
      game.players.forEach((player) => {
        const correctLetters = this.countCorrectCharacters(player.typedText, player.paragraph);
        player.score = correctLetters * 500 + player.progress;
      });

      this.gameGateway.server.to(gameId).emit(GameEvents.GAME_COMPLETED, {
        leaderboard: game.players.slice().sort((a, b) => b.score - a.score),
      });

      console.log(`Game ${gameId} is complete.`);
      await this.closeGame(gameId);
      return true;
    }

    return false;
  }

  private startGameLoop(gameId: string): void {
    if (this.activeGames.has(gameId)) return;

    const interval = setInterval(async () => {
      const game = await this.redisService.get<GameState>(gameId);
      if (!game || !game.gameInProgress) {
        clearInterval(interval);
        this.activeGames.delete(gameId);
        return;
      }

      game.players.forEach((player) => {
        if (player.speed > 0) {
          player.progress += player.speed / this.PROGRESS_INCREMENT_DIVISOR;
          player.speed -= this.SPEED_INTERVAL_DECREMENT;
        }
      });

      this.gameGateway.server.to(gameId).emit(GameEvents.GAME_STATE_UPDATED, { gameState: game });

      await this.redisService.set(gameId, game, this.TTL_SECONDS);
      await this.checkGameCompletion(gameId);
    }, this.TICK_INTERVAL);

    this.activeGames.set(gameId, interval);
  }

  private generateRandomParagraph(): string {
    let paragraph = '';

    while (paragraph.length < this.PARAGRAPH_LENGTH) {
      const word = faker.word.sample();
      paragraph += `${word} `;
    }

    return paragraph.slice(0, this.PARAGRAPH_LENGTH).toUpperCase();
  }

  private countCorrectCharacters(typedText: string, paragraph: string) {
    const correctSubstring = paragraph.slice(0, typedText.length);
    let correctCount = 0;

    while (
      correctCount < typedText.length &&
      typedText[correctCount] === correctSubstring[correctCount]
    ) {
      correctCount++;
    }

    return correctCount;
  }
}
