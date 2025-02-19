import { motion } from 'motion/react';
import { FC } from 'react';

import { containerVariants } from '@/chunks/GamePlay/GamePlay.config.ts';
import Car from '@/components/Car/Car.tsx';
import { PlayingGameProps } from '@/components/PlayingGame/PlayingGame.types.ts';

const PlayingGame: FC<PlayingGameProps> = (props) => {
  return (
    <motion.div
      className="absolute bottom-0 grid grid-cols-4 items-end gap-4"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {props.players.map((player, index) => (
        <Car
          key={player.id}
          row={index % 2}
          col={index % 3}
          relativePos={player.relativePos}
          isUser={player.id === props.userPlayerId}
        />
      ))}
    </motion.div>
  );
};

export default PlayingGame;
