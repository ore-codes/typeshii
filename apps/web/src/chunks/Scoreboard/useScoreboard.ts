import { gamePlayService } from '@/chunks/GamePlay/GamePlay.service.ts';
import useRxState from '@/lib/store/useRxState.ts';

export default function useScoreboard() {
  const gameState = useRxState(gamePlayService.gameStateStore.data$);
  const gameId = useRxState(gamePlayService.gameIdStore.data$);
  const playerId = useRxState(gamePlayService.playerIdStore.data$);
  return { gameState, gameId, playerId };
}
