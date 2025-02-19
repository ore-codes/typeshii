import { motion } from 'motion/react';
import { FC } from 'react';

import useTypingArea from '@/chunks/TypingArea/useTypingArea.ts';
import Character from '@/components/Character/Character.tsx';

const TypingArea: FC = () => {
  const h = useTypingArea();

  if (!h.gameInProgress) {
    return null;
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 600 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-0 flex min-h-40 w-full flex-col items-center bg-yellow-950/90 p-4"
    >
      <p className="mb-2 text-2xl opacity-80">Type the following text as fast as you can!</p>
      {h.paragraphWindow && (
        <div className="flex flex-wrap gap-4">
          {Array.from(h.paragraphWindow).map((ch, index) => (
            <Character key={index} char={ch} state={h.stateOfChar(index)} />
          ))}
        </div>
      )}
    </motion.footer>
  );
};

export default TypingArea;
