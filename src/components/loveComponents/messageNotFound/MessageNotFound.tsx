'use client';

import dynamic from "next/dynamic";
import { FC } from "react";
import animationData from "@/lotties/space-animation.json";
import styled from "styled-components";
import space404 from '@/lotties/404-space.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const MessageWrapper = styled.div`
  position: absolute;
  z-index: 2;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: white;
  text-align: center;
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
                    preserveAspectRatio: 'xMidYMid slice'
                }}
            />
            <MessageWrapper>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Lottie
                        animationData={space404}
                        loop
                        style={{
                            width: '50%',
                            height: '50%',
                            maxWidth: '560px',
                            maxHeight: '560px',
                            zIndex: 1,
                        }}
                    />
                    <Text>
                        Mensagem não encontrada ou expirada
                    </Text>
                </div>
            </MessageWrapper>

        </Container>
    );
};

export default MessageNotFound;
