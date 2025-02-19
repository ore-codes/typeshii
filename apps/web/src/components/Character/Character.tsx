import cn from 'classnames';
import { FC } from 'react';

import { CharacterProps } from './Character.types.ts';

const Character: FC<CharacterProps> = (props) => {
  return (
    <div
      className={cn('px-4 py-2 text-3xl uppercase text-yellow-950', {
        'bg-white': props.state === 'DEFAULT',
        'bg-lime-300': props.state === 'CORRECT',
        'bg-red-300': props.state === 'WRONG',
      })}
    >
      {props.char}
    </div>
  );
};

export default Character;
