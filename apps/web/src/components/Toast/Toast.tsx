import { motion } from 'motion/react';
import { FC, useEffect } from 'react';

import { ToastProps, ToastType } from '@/components/Toast/Toast.types.ts';

const Toast: FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const toastColors: Record<ToastType, string> = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-between rounded p-4 text-white shadow-md ${toastColors[type]} mb-2`}
    >
      <span>{message}</span>
    </motion.div>
  );
};

export default Toast;
