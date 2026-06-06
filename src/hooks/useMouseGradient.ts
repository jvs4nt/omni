import { useEffect } from 'react';

export function useMouseGradient(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.body.style.background = `radial-gradient(circle at ${x}% ${y}%, #111827 0%, #000000 70%)`;
    };

    document.addEventListener('mousemove', handler);
    return () => document.removeEventListener('mousemove', handler);
  }, [enabled]);
}
