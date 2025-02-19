import { combineLatest, map, shareReplay } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { SessionStorageService } from '@/lib/store/SessionStorageService.ts';

import { GameId, GameState, Player, SuccessPayload } from './GamePlay.types.ts';

class GamePlayService {
  gameIdStore = new SessionStorageService<GameId>('gameId');
  gameStateStore = new SessionStorageService<GameState>('gameState');
  playerIdStore = new SessionStorageService<Player['id']>('playerId');
  leaderboardStore = new SessionStorageService<Player[]>('leaderboard');

  user$ = combineLatest([this.playerIdStore.data$, this.gameStateStore.data$]).pipe(
    map(([playerId, gameState]) => {
      if (playerId && gameState) {
        return gameState.players.find((player) => player.id === playerId) ?? null;
      }
      return null;
    }),
    shareReplay(1)
  );

  get newPlayerId() {
    return uuidv4();
  }

  update(game: SuccessPayload, isNew = false) {
    game.gameId && this.gameIdStore.setData(game.gameId);
    game.gameState && this.gameStateStore.setData(game.gameState);
    isNew && this.playerIdStore.setData(game.player.id);
  }

  restart() {
    this.gameIdStore.clear();
    this.gameStateStore.clear();
    this.playerIdStore.clear();
    this.leaderboardStore.clear();
  }
}

export const gamePlayService = new GamePlayService();
