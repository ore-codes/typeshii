import cn from 'classnames';
import { FC, useMemo } from 'react';

import { carConfig } from '@/components/Car/Car.config.ts';

type CarProps = {
  row: number;
  col: number;
  relativePos?: number;
  isUser?: boolean;
};

const Car: FC<CarProps> = ({ row, col, relativePos = 0, isUser = false }) => {
  const bgPosition = useMemo(() => carConfig.bgPosition(row, col), [col, row]);
  const [bgDim, spriteDim] = useMemo(() => [carConfig.dimensions, carConfig.spriteDimensions], []);

  return (
    <figure
      className={cn('bg-no-repeat', { 'animate-pulse brightness-50': !isUser })}
      style={{
        width: `${bgDim.width / 4}px`,
        height: `${bgDim.height / 4}px`,
        backgroundSize: `${spriteDim.width / 4}px ${spriteDim.height / 4}px`,
        backgroundImage: `url('/car-sprite.png')`,
        backgroundPosition: `${bgPosition.x / 4}px ${bgPosition.y / 4}px`,
        marginBottom: `${relativePos / 10}px`,
        transition: 'margin-bottom 0.3s ease-in-out',
      }}
    />
  );
};

export default Car;
