'use client';

import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 25vh;
  width: 90%;
  text-align: center;
  margin: auto;

`;

const MessageWrapper = styled.div`
  text-align: center;
  font-family: var(--font-quicksand);
`;

const messages = [
  "Primeiro, o seu email...",
  "Agora, o seu lindo nome...",
  "Agora, o nome do seu amor...",
  "Uma bela música para dar o tom",
  "Agora, deixe a criatividade fluir...",
  "Sabe aquela data especial? Coloque aqui...",
  "Agora, uma linda foto...",
  "",
  "Veja uma prévia da sua mensagem",
];

interface GiraffeProps {
  formIndex: number;
}

const Giraffe: FC<GiraffeProps> = ({ formIndex }) => {
  const [index, setIndex] = useState(formIndex);

  useEffect(() => {
    setIndex(formIndex);
  }, [formIndex]);

  return (
    <Container>

      <MessageWrapper>
        <AnimatePresence mode="wait">
          <motion.h1
            key={messages[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: '30px', fontSize: "1.2rem", fontWeight: 500 }}
          >
            {messages[index]}
          </motion.h1>
        </AnimatePresence>
      </MessageWrapper>
    </Container>
  );
};

export default Giraffe;
