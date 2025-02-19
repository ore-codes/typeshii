import { AnimatePresence } from 'motion/react';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { ToastType } from '@/components/Toast/Toast.types.ts';

import Toast from './Toast';

const ToastManager = forwardRef((_, ref) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: any) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useImperativeHandle(ref, () => ({ addToast }));

  return (
    <div className="fixed right-5 top-5 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

ToastManager.displayName = 'ToastManager';

export default ToastManager;
