import styled from "styled-components";

export const AnimStyle = styled.div`
    /* HeartComponent.css */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;
}

.container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  overflow: visible;
  touch-action: manipulation;
}

.heartSVG {
  visibility: visible;
  overflow: visible;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  mix-blend-mode: screen;
  transition: opacity 0.3s ease-out;
}

.ring {
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: 
    transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    opacity 0.5s ease-out;
}

/* Otimizações para mobile */
@media (hover: none) and (pointer: coarse) {
  .container {
    touch-action: none;
  }
  
  .particle {
    mix-blend-mode: plus-lighter;
  }
}

/* Prevenir flashes em alguns navegadores */
@media (-webkit-min-device-pixel-ratio: 2) {
  .particle {
    shape-rendering: crispEdges;
  }
}
`;