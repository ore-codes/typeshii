export type CharacterState = 'CORRECT' | 'WRONG' | 'DEFAULT';

export type CharacterProps = {
  char: string;
  state: CharacterState;
};
