'use client';

import dynamic from "next/dynamic";
import { FC } from "react";
import animationData from "@/assets/space-animation.json";
import styled from "styled-components";
import space404 from '@/assets/404-space.json';
import Link from "next/link";
import Button from '@mui/joy/Button';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const MessageWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: white;
  text-align: center;
`;

const FooterButtonWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  pointer-events: auto;
`;

const Text = styled.p`
  font-size: 1.3rem;
  font-weight: 200;
  color: white;
  text-align: center;
  padding: 1rem;
`;

const MessageNotFound: FC = () => {
  return (
    <Container>
      <Lottie
        animationData={animationData}
        loop
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
        }}
      />
      <MessageWrapper>
        <Lottie
          animationData={space404}
          loop
          style={{
            width: '50%',
            height: '50%',
            maxWidth: '560px',
            maxHeight: '560px',
            zIndex: 2,
          }}
        />
        <Text style={{marginBottom: '80px'}}>
          Mensagem não encontrada ou expirada
        </Text>
      </MessageWrapper>

      <FooterButtonWrapper>
        <Link href="/create" passHref>
          <Button
            variant="soft"
            sx={{
              backgroundColor: '#aa00ff',
              transition: '0.5s ease',
              color: 'white',
            }}
          >
            Criar mensagem
          </Button>
        </Link>
      </FooterButtonWrapper>
    </Container>
  );
};

export default MessageNotFound;
