import { MutableRefObject } from 'react';

import ToastManager from '@/components/Toast/ToastManager.tsx';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type ToastProps = {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
};

export type ToastManagerProps = {
  ref?: MutableRefObject<typeof ToastManager>;
};

export type ToastContextType = (message: string, type?: ToastType, duration?: number) => void;
