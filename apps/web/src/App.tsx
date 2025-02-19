import '@fontsource/rubik-spray-paint';
import '@/index.css';

import { MotionConfig } from 'motion/react';
import { FC, useEffect, useState } from 'react';

import GamePlay from '@/chunks/GamePlay/GamePlay.tsx';
import { ToastProvider } from '@/components/Toast/ToastContext.tsx';

const App: FC = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isDesktop) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-asphalt p-4 text-center">
        <div>
          <h1 className="mb-4 text-2xl font-bold">Unsupported Screen Size</h1>
          <p className="text-lg">
            This application is best experienced on a desktop device. Please switch to a larger
            screen to continue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <MotionConfig transition={{ duration: 1 }}>
      <ToastProvider>
        <div className="fixed left-0 top-0 bg-black p-2 text-sm text-white">
          Icons/Images from Freepik and Unsplash
        </div>
        <GamePlay />
      </ToastProvider>
    </MotionConfig>
  );
};

export default App;
