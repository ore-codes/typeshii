import cn from 'classnames';
import { motion } from 'motion/react';
import { FC } from 'react';

import useScoreboard from '@/chunks/Scoreboard/useScoreboard.ts';

const Scoreboard: FC = () => {
  const scoreboard = useScoreboard();

  if (!scoreboard.gameState) {
    return null;
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: 900 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute right-8 top-24 flex h-48 min-w-[24rem] flex-col rounded-2xl bg-yellow-950/90 p-4 text-base"
    >
      <h1 className="mb-4 text-center">Leaderboard</h1>
      <div>Game code: {scoreboard.gameId.slice(5)}</div>
      <ol className="mt-4">
        {scoreboard.gameState.players.map((player, index) => (
          <li
            key={index}
            className={cn('flex justify-between gap-4', {
              'bg-white/30': scoreboard.playerId === player.id,
            })}
          >
            <span>
              Player {player.id.slice(0, 3)}
              {index}
            </span>
            <strong className="text-lime-300">{Math.round(player.progress)}km</strong>
            <small>{Math.round(player.speed)}km/h</small>
          </li>
        ))}
      </ol>
    </motion.aside>
  );
};

export default Scoreboard;
