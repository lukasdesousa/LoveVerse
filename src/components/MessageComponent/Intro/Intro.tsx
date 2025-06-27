'use client';

import React, { useState, useRef } from "react";
import styled from 'styled-components';
import dynamic from "next/dynamic";
import introLottie from '@/lotties/box.json';
import useShake from "@/hooks/useShake";
import type { LottieRefCurrentProps } from "lottie-react";
import { Button } from "antd";
import useSensorSupport from "@/hooks/useSensorSupport";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Intro = ({ children }: { children: React.ReactNode }) => {
  const [next, setNext] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [boxAnim, setBoxAnim] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const sensorSupport = useSensorSupport();

  useShake(() => {
    if (lottieRef.current) {
      setAnimation(true)
      lottieRef.current.play();
      setTimeout(() => {
        setVisibility(true);
      }, 1500);
      setTimeout(() => {
        setBoxAnim(true)
      }, 3000)
    }
  }, containerRef);

  const start = () => {
    if (lottieRef.current) {
      setAnimation(true)
      lottieRef.current.play();
      setTimeout(() => {
        setVisibility(true);
      }, 1500);
      setTimeout(() => {
        setBoxAnim(true)
      }, 3000)
    }
  }

  if (next) {
    return <>{children}</>;
  }

  return (
    <Container ref={containerRef}>
      <h2 style={{ fontFamily: 'var(--font-quicksand)', textAlign: 'center' }}>Tem uma supresa pra você!</h2>
      <SubContainer showAnim={animation}>
        <Button size="large" onClick={() => setNext(true)} style={{ display: visibility ? 'block' : 'none' }} className={` ${boxAnim ? 'animation-btn' : ''}`}>
          Ver surpresa
        </Button>
        <Lottie
          onClick={() => start()}
          className={`lottie ${boxAnim ? 'animation-done' : ''}`}
          animationData={introLottie}
          loop={false}
          autoplay={false}
          lottieRef={lottieRef}
        />
      </SubContainer>
      {sensorSupport ? (
        <h2 style={{ fontFamily: 'var(--font-quicksand)', textAlign: 'center', opacity: visibility ? '0' : '1', fontSize: '1rem', width: '50%', transition: '1s' }}>Agite seu smartphone ou clique para abrir</h2>

      ) : (
        <h2 style={{ fontFamily: 'var(--font-quicksand)', textAlign: 'center', opacity: visibility ? '0' : '1', fontSize: '1rem', width: '50%', transition: '1s' }}>Clique para abrir</h2>
      )}

    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed; /* para ocupar tela inteira */
  inset: 0;
  background: white; /* ou qualquer cor de fundo desejada */
  z-index: 9999;
  gap: 50px;

`;

const SubContainer = styled.div.withConfig({ shouldForwardProp: (prop) => prop !== 'showAnim' }) <{ showAnim?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 0;
    width: 150px;
    height: 50px;
    background-color: #ff7df6;
    color: white;
    font-weight: 800;
    font-family: var(--font-quicksand);
  }

  .lottie {
    width: 100%;
    max-width: 400px;
    height: auto;
    animation:  ${({ showAnim }) => (showAnim ? 'none' : 'box 3.5s ease-in-out infinite')}; 
    animation-delay: ${({ showAnim }) => (showAnim ? 'none' : '2s')}; 
    cursor: pointer;
    position: relative;
    *:focus {
    outline: none !important;
    }
    * {
      -webkit-tap-highlight-color: transparent;
    }
  }

  .animation-done {
    display: block;
    position: relative;
    animation: exitBox 1s ease-in-out forwards;
  }

  .animation-btn {
    top: 35%;
    opacity: 3;
    transition: 1s ease;
  }

  h3 {
    font-style: italic;
    font-weight: 200;
    color: white;
  }

 @keyframes box {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(10deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  30% {
    transform: rotate(5deg);
  }
  40% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
  
}


 @keyframes exitBox {
  0% {
    top: 0;
  }
  100% {
    top: 200%;
  } 
}
`;

export default Intro;
