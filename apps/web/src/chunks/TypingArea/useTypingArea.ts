import { useCallback, useMemo } from 'react';

import { gamePlayService } from '@/chunks/GamePlay/GamePlay.service.ts';
import { CharacterState } from '@/components/Character/Character.types.ts';
import useRxState from '@/lib/store/useRxState.ts';

export default function useTypingArea() {
  const gameState = useRxState(gamePlayService.gameStateStore.data$);
  const userPlayer = useRxState(gamePlayService.user$);

  const [paragraphWindow, windowStart] = useMemo<[string, number]>(() => {
    if (userPlayer) {
      const currIndex = userPlayer.typedText.length;
      const start = Math.max(0, currIndex - 10);
      const end = Math.min(start + 20, userPlayer.paragraph.length);
      return [userPlayer.paragraph.slice(start, end), start];
    }
    return ['', 0];
  }, [userPlayer?.typedText, userPlayer?.paragraph]);

  const stateOfChar = useCallback(
    (index: number): CharacterState => {
      const absoluteIndex = windowStart + index;
      if (
        absoluteIndex >= userPlayer.paragraph.length ||
        absoluteIndex >= userPlayer.typedText.length
      ) {
        return 'DEFAULT';
      }
      const correctChar = userPlayer.paragraph[absoluteIndex];
      const typedChar = userPlayer.typedText[absoluteIndex];
      return typedChar === correctChar ? 'CORRECT' : 'WRONG';
    },
    [paragraphWindow, userPlayer?.typedText, userPlayer?.paragraph, windowStart]
  );

  return {
    gameInProgress: gameState?.gameInProgress,
    stateOfChar,
    paragraphWindow,
  };
}
