import cn from 'classnames';
import { motion } from 'motion/react';
import { FC, useMemo } from 'react';

import { containerVariants, hoverFocusAnimation } from '@/chunks/GamePlay/GamePlay.config.ts';
import { Player } from '@/chunks/GamePlay/GamePlay.types.ts';

type CompleteGameProps = {
  leaderboard: Player[];
  userPlayerId: string;
  gameTime: number;
  onNewGame: () => void;
};

const CompleteGame: FC<CompleteGameProps> = (props) => {
  const formattedGameTime = useMemo(() => {
    const hours = Math.floor(props.gameTime / 3600000);
    const minutes = Math.floor((props.gameTime % 3600000) / 60000);
    const seconds = Math.floor((props.gameTime % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }, [props.gameTime]);

  return (
    <motion.div
      className="grid flex-1 place-items-center self-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex flex-col items-center gap-8 rounded-2xl bg-yellow-950/90 p-4">
        <h1 className="text-center">Game complete</h1>
        <h2>{formattedGameTime}</h2>
        <ol className="mt-4">
          {props.leaderboard.map((player, index) => (
            <li
              key={index}
              className={cn('flex justify-between gap-16', {
                'bg-white/30': props.userPlayerId === player.id,
              })}
            >
              <span>
                {index} Player {player.id.slice(0, 4)}
              </span>
              <strong className="text-lime-300">{Math.round(player.score)}</strong>
            </li>
          ))}
        </ol>
        <motion.button
          className="rounded-full bg-white px-8 py-2 text-yellow-950"
          whileHover={hoverFocusAnimation}
          whileFocus={hoverFocusAnimation}
          onClick={props.onNewGame}
        >
          New game
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CompleteGame;
