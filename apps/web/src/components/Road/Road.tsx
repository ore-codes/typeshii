import { motion } from 'motion/react';
import { FC } from 'react';

type RoadProps = {
  speed?: number;
};

const Road: FC<RoadProps> = ({ speed = 0 }) => {
  const logFactor = Math.max(1, Math.log(speed + 1) * 10) * 2;
  return (
    <div className="absolute -z-40 flex h-screen w-full bg-asphalt">
      <motion.div
        key={speed}
        className="flex h-[300vh] w-full"
        animate={{ y: ['-200vh', '0vh'] }}
        transition={{
          duration: 100 - (logFactor * 95) / 100,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="relative flex-1 border-r border-dashed border-white last:border-none"
          >
            {index < 7 && (
              <figure
                className="absolute -right-1 top-0 h-full w-2 bg-repeat-y"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(to bottom, white, white 20px, transparent 20px, transparent 40px)',
                }}
              />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Road;
