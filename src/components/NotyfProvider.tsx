import { useEffect } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

let notyfInstance: Notyf | null = null;

export function getNotyf() {
  if (!notyfInstance) {
    notyfInstance = new Notyf({
      duration: 5000,
      position: { x: 'right', y: 'top' },
    });
  }
  return notyfInstance;
}

export function NotyfProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    getNotyf();
  }, []);
  return <>{children}</>;
}
