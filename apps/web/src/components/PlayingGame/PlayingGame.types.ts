export type TrackPlayer = {
  id: string;
  relativePos: number;
};

export type PlayingGameProps = {
  players: TrackPlayer[];
  userPlayerId: string;
};
