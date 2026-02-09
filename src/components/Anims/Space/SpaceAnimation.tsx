'use client';

import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";
import animationData from "@/lotties/space-animation.json";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const Lottie = dynamic(() => import('lottie-react'), {ssr: false})

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
`;

const MessageWrapper = styled.div`
  position: absolute;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 1rem;
`;

const messages = [
  "Espalhe amor",
  "Crie afeto",
  "Tudo em forma de cartinhas"
];

const NotFound: FC = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000); // troca a cada 3 segundos

    return () => clearInterval(interval);
  }, []);
    
  return (
        <Container>
            <Lottie animationData={animationData} loop={true} style={{ width: '100%'}} />
            <MessageWrapper>
            <AnimatePresence mode="wait">
              <motion.h1
                key={messages[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                style={{ fontSize: "1.8rem", fontWeight: '100' }}
              >
                {messages[index]}
              </motion.h1>
            </AnimatePresence>
                  </MessageWrapper>
        </Container>
      
  );
};

export default NotFound;
