import { motion } from 'motion/react';
import { FC } from 'react';

import useGamePlay from '@/chunks/GamePlay/useGamePlay.ts';
import Scoreboard from '@/chunks/Scoreboard/Scoreboard.tsx';
import TypingArea from '@/chunks/TypingArea/TyingArea.tsx';
import CompleteGame from '@/components/CompleteGame/CompleteGame.tsx';
import IdleGame from '@/components/IdleGame/IdleGame.tsx';
import PlayingGame from '@/components/PlayingGame/PlayingGame.tsx';
import Road from '@/components/Road/Road.tsx';
import WaitingGame from '@/components/WaitingGame/WaitingGame.tsx';

const GamePlay: FC = () => {
  const h = useGamePlay();
  return (
    <main className="relative mx-auto h-screen w-screen max-w-7xl overflow-hidden">
      <Road speed={h.speed} />
      <div className="flex h-full flex-col">
        <h1 className="m-4 animate-pulse text-6xl">TypeShii</h1>
        {['WAITING', 'PLAYING'].includes(h.status) && (
          <button
            className="z-50 mr-8 self-center rounded-full bg-white px-2 text-red-400"
            onClick={h.handleQuit}
          >
            Quit
          </button>
        )}
        <motion.div
          className="relative mb-40 flex flex-1 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {h.status === 'IDLE' && (
            <IdleGame
              key="idle"
              ref={h.joinInputRef}
              onCreate={h.handleCreate}
              onInputKeyPress={h.handleJoinInputKeyDown}
            />
          )}
          {h.status === 'WAITING' && <WaitingGame key="waiting" />}
          {h.status === 'PLAYING' && (
            <PlayingGame key="playing" players={h.trackPlayers} userPlayerId={h.playerId} />
          )}
          {h.status === 'COMPLETE' && (
            <CompleteGame
              key="complete"
              leaderboard={h.leaderboard}
              userPlayerId={h.playerId}
              gameTime={h.gameTime}
              onNewGame={h.handleCreate}
            />
          )}
        </motion.div>
      </div>
      {h.status !== 'COMPLETE' && (
        <>
          <Scoreboard />
          <TypingArea />
        </>
      )}
    </main>
  );
};

export default GamePlay;
