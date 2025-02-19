import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from '@/game/game.service';
import { GameEvents } from '@/game/game.types';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(@Inject(forwardRef(() => GameService)) private readonly gameService: GameService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    try {
      const { playerId } = client.data;
      console.log(`Client disconnected: ${client.id}`);
      await this.leaveGame(client, playerId);
    } catch (error) {
      client.emit(GameEvents.ERROR, { message: error.message });
    }
  }

  @SubscribeMessage('createGame')
  async createGame(@ConnectedSocket() client: Socket, @MessageBody() playerId: string) {
    try {
      const gameId = await this.gameService.createGame();
      await this.addGamePlayer(client, gameId, playerId);
    } catch (error) {
      client.emit(GameEvents.ERROR, { message: error.message });
    }
  }

  @SubscribeMessage('joinGame')
  async joinGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() { playerId, gameId: gameIdWithoutPrefix }: { playerId: string; gameId: string },
  ) {
    try {
      const gameId = await this.gameService.findGame(gameIdWithoutPrefix);
      const { player, gameState } = await this.addGamePlayer(client, gameId, playerId);
      this.server.to(gameId).emit(GameEvents.PLAYER_JOINED, { gameId, player, gameState });

      if (gameState.players.length === 4) {
        const updatedGameState = await this.gameService.startGame(gameId);
        this.server
          .to(gameId)
          .emit(GameEvents.GAME_STARTED, { gameId, gameState: updatedGameState });
      }
    } catch (error) {
      client.emit(GameEvents.ERROR, { message: error.message });
    }
  }

  @SubscribeMessage('updateProgress')
  async updateProgress(
    @ConnectedSocket() client: Socket,
    @MessageBody() { playerId, typedText }: { playerId: string; typedText: string },
  ) {
    const { gameId } = client.data;

    try {
      const updatedGameState = await this.gameService.updatePlayerProgress(
        gameId,
        playerId,
        typedText,
      );
      this.server.to(gameId).emit(GameEvents.GAME_STATE_UPDATED, { gameState: updatedGameState });

      const gameComplete = await this.gameService.checkGameCompletion(gameId);
      if (gameComplete) {
        this.server.to(gameId).emit(GameEvents.GAME_ENDED, { gameId });
      }
    } catch (error) {
      client.emit(GameEvents.ERROR, { message: error.message });
    }
  }

  @SubscribeMessage('leaveGame')
  async leaveGame(@ConnectedSocket() client: Socket, @MessageBody() playerId: string) {
    const { gameId } = client.data;

    try {
      if (await this.gameService.removePlayer(gameId, playerId)) {
        const gameState = await this.gameService.getGameState(gameId);

        this.server.to(gameId).emit(GameEvents.PLAYER_LEFT, { playerId, gameState });

        if (gameState.players.length === 0) {
          await this.gameService.closeGame(gameId);
        }
      }

      client.emit(GameEvents.GAME_LEFT, { gameId, playerId });
      client.leave(gameId);
      delete client.data.gameId;
      delete client.data.playerId;
    } catch (error) {
      client.emit(GameEvents.ERROR, { message: error.message });
    }
  }

  private async addGamePlayer(client: Socket, gameId: string, playerId: string) {
    const player = await this.gameService.addPlayer(gameId, playerId);

    client.data.gameId = gameId;
    client.data.playerId = playerId;
    client.join(gameId);

    const gameState = await this.gameService.getGameState(gameId);

    client.emit(GameEvents.GAME_JOINED, { gameId, player, gameState });
    return { player, gameState };
  }
}
