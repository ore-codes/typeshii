import { motion } from 'motion/react';
import { forwardRef, KeyboardEventHandler } from 'react';

import { containerVariants, hoverFocusAnimation } from '@/chunks/GamePlay/GamePlay.config.ts';

type IdleGameProps = {
  onCreate: () => void;
  onInputKeyPress: KeyboardEventHandler<HTMLInputElement>;
};

const IdleGame = forwardRef<HTMLInputElement, IdleGameProps>((props, ref) => {
  return (
    <motion.div
      className="flex items-center gap-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.button
        className="rounded-full bg-yellow-950 px-8 py-2 text-white"
        whileHover={hoverFocusAnimation}
        whileFocus={hoverFocusAnimation}
        onClick={props.onCreate}
      >
        Create new game
      </motion.button>
      <div>or</div>
      <motion.input
        className="rounded-full bg-white p-2 text-center text-yellow-950"
        placeholder="Enter game id to join"
        whileHover={hoverFocusAnimation}
        whileFocus={hoverFocusAnimation}
        ref={ref}
        onKeyDown={props.onInputKeyPress}
      />
    </motion.div>
  );
});

IdleGame.displayName = 'IdleGame';

export default IdleGame;
