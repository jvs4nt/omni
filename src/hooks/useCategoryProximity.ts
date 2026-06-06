import { useEffect } from 'react';

const FADE_RADIUS = 220;

export function useCategoryProximity(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const links = container.querySelectorAll<HTMLElement>('.category-link');
    links.forEach((link) => { link.style.opacity = '0.08'; });

    const onMove = (e: MouseEvent) => {
      links.forEach((link) => {
        const rect = link.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
        link.style.opacity = String(Math.max(0.08, 1 - dist / FADE_RADIUS));
      });
    };

    const onLeave = () => {
      links.forEach((link) => { link.style.opacity = '0.08'; });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [containerRef]);
}
