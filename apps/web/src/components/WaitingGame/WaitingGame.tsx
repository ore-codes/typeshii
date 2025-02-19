import { motion } from 'motion/react';

import { containerVariants } from '@/chunks/GamePlay/GamePlay.config.ts';

const WaitingGame = () => {
  return (
    <motion.div
      className="self-center rounded-full bg-white p-2 text-yellow-950"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      Waiting for other players to join...
    </motion.div>
  );
};

export default WaitingGame;
