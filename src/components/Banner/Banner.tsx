'use client';

import styled from "styled-components";
import dynamic from "next/dynamic";
import { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef, useState } from "react";
import featuresAnim from '@/assets/features_bg-anim.json';
import { AnimatePresence, motion } from "framer-motion";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const messages = [
  "Espalhe amor",
  "Crie afeto",
  "Conquiste",
];

const messages02 = [
  "ama",
  "odeia",
  "adora",
  "suporta",
  "curte",
  "deseja",
];

export default function Banner() {
  const bgRef = useRef<LottieRefCurrentProps>(null);
  const [index, setIndex] = useState(0);
  const [index02, setIndex02] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Troca de mensagens principais a cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Troca de palavras secundárias a cada 6 segundos
  useEffect(() => {
    const interval02 = setInterval(() => {
      setIndex02(prev => (prev + 1) % messages02.length);
    }, 6000);
    return () => clearInterval(interval02);
  }, []);

  return (
    <Container ref={containerRef}>
      <Lottie
        lottieRef={bgRef}
        animationData={featuresAnim}
        loop={true}
        autoplay={true}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
      />

      <Overlay>
        <TextContainer>
          <AnimatePresence mode="wait">
            <motion.h1
              key={messages[index]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: "1.8rem",
                fontWeight: 200,
                color: 'white',
                fontFamily: 'var(--font-quicksand)',
                margin: 0
              }}
            >
              {messages[index]}
            </motion.h1>
          </AnimatePresence>

          <p style={{
            color: 'white',
            fontFamily: 'var(--font-quicksand)',
            fontWeight: 1000,
            fontSize: '1.1rem',
            margin: 0
          }}>
            Encante quem você{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={messages02[index02]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="highlight"
                transition={{ duration: 0.8 }}
              >
                {messages02[index02]}
              </motion.span>
            </AnimatePresence>{' '}
            com mensagens personalizadas LoveVerse
          </p>
        </TextContainer>
      </Overlay>
    </Container>
  );
}

const Container = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  height: 100vh;
  width: 100%;
  text-align: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Overlay = styled.div`
  /* Esse elemento fica acima do Lottie de fundo */
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 700px;
  padding: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;   
  justify-content: flex-start; 
  text-align: left;
  gap: 20px;
  width: 100%;

  h1 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  .highlight {
    font-weight: 1000;
    background: linear-gradient(
      to right,
      #7953cd 20%,
      #00affa 30%,
      #0190cd 70%,
      #764ada 80%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 500% auto;
    animation: textShine 5s ease-in-out infinite alternate;
    white-space: nowrap; /* ← impede quebra de linha */
  }

  @keyframes textShine {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;
