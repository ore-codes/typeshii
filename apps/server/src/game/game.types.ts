export type Player = {
  id: string;
  progress: number;
  speed: number;
  typedText: string;
  paragraph: string;
  finishTime?: number;
  score?: number;
};

export type GameState = {
  players: Player[];
  gameInProgress: boolean;
  startTime: number;
};

export enum GameEvents {
  PLAYER_LEFT = 'playerLeft',
  GAME_JOINED = 'gameJoined',
  PLAYER_JOINED = 'playerJoined',
  GAME_STARTED = 'gameStarted',
  GAME_STATE_UPDATED = 'gameStateUpdated',
  GAME_ENDED = 'gameEnded',
  ERROR = 'error',
  GAME_LEFT = 'gameLeft',
  GAME_COMPLETED = 'gameCompleted',
}
