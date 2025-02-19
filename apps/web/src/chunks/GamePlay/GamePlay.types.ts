export type SuccessPayload = Partial<{
  gameId: string;
  player: Player;
  gameState: GameState;
}>;

export type ErrorPayload = {
  message: string;
};

export type LeaderboardPayload = {
  leaderboard: Player[];
};

export type GameId = string;

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

export type GameStatus = 'IDLE' | 'WAITING' | 'PLAYING' | 'COMPLETE';
