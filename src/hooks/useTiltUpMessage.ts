import { useEffect, useState, useRef } from 'react';
export default function useTiltUpMessage(threshold = -20) {
  const [showMessage, setShowMessage] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const beta = event.beta;

      if (beta === null) return;
      // Ex: -15 graus de inclinação já ativa
      if (beta < threshold && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        setShowMessage(true);
      }
    };

    const enableListener = async () => {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        // @ts-expect-error ignore
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        try {
          // @ts-expect-error ignore
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (err) {
          console.error('Permissão negada para sensores:', err);
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    enableListener();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [threshold]);

  return showMessage;
}
