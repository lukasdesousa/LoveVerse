'use client';

import styled from 'styled-components';
import { useRef } from 'react';
import dynamic from "next/dynamic";
import mainPageLottie from '@/assets/mainpagelottie.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
export const Apresentation = () => {

    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <Container ref={containerRef}>
            <SubContainer>
                <Lottie
                className='lottie'
                    animationData={mainPageLottie}
                    loop={true}
                    autoplay={true}
                    style={{ width: '50%', height: '50%', minWidth: 400, minHeight: 400}}
                />
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
    padding: 20px;
    gap: 100px;
    text-align: center;
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column; /* ← aqui está a solução */
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 20px 0px;

    .lottie {
        position: relative;
        bottom: 100px;
    }

    h3 {
        font-style: italic;
        font-weight: 200;
        color: white;
    }
`;
