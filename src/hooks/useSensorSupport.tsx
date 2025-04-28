/* eslint-disable prefer-const */
import { useEffect, useState } from "react";

export default function useSensorSupport() {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof DeviceMotionEvent === "undefined") {
      setSupported(false);
      return;
    }

    let timeout: NodeJS.Timeout;
    let motionListener: (event: DeviceMotionEvent) => void;

    const handleMotion = (event: DeviceMotionEvent) => {
      const { acceleration, accelerationIncludingGravity, rotationRate } = event;

      // Se qualquer valor tiver um número real, significa que está funcionando
      if (
        (acceleration && (acceleration.x || acceleration.y || acceleration.z)) ||
        (accelerationIncludingGravity && (accelerationIncludingGravity.x || accelerationIncludingGravity.y || accelerationIncludingGravity.z)) ||
        (rotationRate && (rotationRate.alpha || rotationRate.beta || rotationRate.gamma))
      ) {
        setSupported(true);
        window.removeEventListener("devicemotion", motionListener);
        clearTimeout(timeout);
      }
    };

    motionListener = handleMotion;
    window.addEventListener("devicemotion", motionListener);

    // Se após 3 segundos nada acontecer, consideramos que não está funcionando
    timeout = setTimeout(() => {
      window.removeEventListener("devicemotion", motionListener);
      setSupported(false);
    }, 3000);

    return () => {
      window.removeEventListener("devicemotion", motionListener);
      clearTimeout(timeout);
    };
  }, []);

  return supported;
}
