'use client';

import styled from 'styled-components';
import {  useRef } from 'react';
import dynamic from "next/dynamic";
import featuresAnim from '@/assets/features_bg-anim.json';
import type { LottieRefCurrentProps } from 'lottie-react';
import MessagePrice from '@/components/MessagePrice/MessagePrice';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
export const Apresentation = () => {
    const bgRef = useRef<LottieRefCurrentProps>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <Container ref={containerRef}>
            <Lottie
                    lottieRef={bgRef}
                    animationData={featuresAnim}
                    loop={true} // não repetir
                    autoplay={true} // não iniciar automaticamente
                    style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%',
                    height: '100%',
                    
                }}
                rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice'
                }}
                />
            <SubContainer>
                <MessagePrice />
            </SubContainer>

        </Container>

    );
}

const Container = styled.section`
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    flex-direction: column;
    margin: 10px auto;
    overflow: hidden;
    padding: 20px;
    gap: 100px;
    text-align: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;;
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column; /* ← aqui está a solução */
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 40px 0px;
    overflow: hidden;

    h3 {
        font-style: italic;
        font-weight: 200;
        color: white;
    }
`;
