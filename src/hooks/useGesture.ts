import { useGesture } from '@use-gesture/react';
import { useState } from 'react';

export function useGestureMovement() {
  const [movement, setMovement] = useState({ x: 0, y: 0 });

  const bind = useGesture({
    onMove: (state) => {
      setMovement({
        x: state.offset[0], // Movimento no eixo X
        y: state.offset[1], // Movimento no eixo Y
      });
    },
  });

  return { movement, bind };
}
