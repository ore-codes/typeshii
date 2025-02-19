import { createContext, useContext, useRef } from 'react';

import { ToastContextType, ToastType } from '@/components/Toast/Toast.types.ts';

import ToastManager from './ToastManager';

const ToastContext = createContext<ToastContextType>(null);

export const ToastProvider = ({ children }) => {
  const toastRef = useRef(null);

  const showToast = (message: string, type: ToastType, duration: number) => {
    if (toastRef.current) {
      toastRef.current.addToast(message, type, duration);
    }
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <ToastManager ref={toastRef} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
