// hooks/useShake.ts
import { useEffect } from 'react';
import Shake from 'shake.js';

export default function useShake(
  callback: () => void,
  targetRef: React.RefObject<Element>
) {
  useEffect(() => {
    if (typeof window === 'undefined' || !targetRef.current) return;

    const shakeEvent = new Shake({ threshold: 15, timeout: 1000 });
    let observing = false;

    const handleShake = () => callback();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !observing) {
            observing = true;
            shakeEvent.start();
            window.addEventListener('shake', handleShake, false);
          } else if (!entry.isIntersecting && observing) {
            observing = false;
            window.removeEventListener('shake', handleShake, false);
            shakeEvent.stop();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
      if (observing) {
        window.removeEventListener('shake', handleShake, false);
        shakeEvent.stop();
      }
    };
  }, [callback, targetRef]);
}
