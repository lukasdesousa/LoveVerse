'use client';

import styled from 'styled-components';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import dynamic from "next/dynamic";
import letterAnim from "@/assets/Animation - 1748885612469.json";
import spotifyAnim from '@/assets/Animation - 1748885383353.json';
import photoAnim from '@/assets/Animation - 1748885527653.json';
import useShake from '@/hooks/useShake';

import type { LottieRefCurrentProps } from 'lottie-react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
export const Apresentation = () => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Shake animation
    useShake(() => {
        lottieRef.current?.play();    
    }, containerRef);

    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        (gsap.utils.toArray(".image") as HTMLElement[]).forEach((el) => {
            gsap.fromTo(
                el,
                { opacity: 0, x: -100 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        end: "top 50%",
                        scrub: true,
                    },
                }
            );
        });
    }, [])

    return (
        <Container ref={containerRef}>
            <SubContainer>
                <Lottie
                    lottieRef={lottieRef}
                    animationData={spotifyAnim}
                    loop={false} // não repetir
                    autoplay={true} // não iniciar automaticamente
                    style={{ width: 300, height: 100 }}
                />
                <h3 className='image'>Coloque sua música favorita</h3>
            </SubContainer>
            <SubContainer>
                <Lottie
                    lottieRef={lottieRef}
                    animationData={letterAnim}
                    loop={false} // não repetir
                    autoplay={true} // não iniciar automaticamente
                    style={{ width: 350, height: 150 }}
                />
                <h3 className='image'>Deixe todo seu amor e carinho</h3>
            </SubContainer>
            <SubContainer>
                <Lottie
                    lottieRef={lottieRef}
                    animationData={photoAnim}
                    loop={false} // não repetir
                    autoplay={true} // não iniciar automaticamente
                    style={{ width: 400, height: 150 }}
                />
                <h3 className='image'>Insira sua melhor recordação</h3>
            </SubContainer>
        </Container>
    );
}


const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    padding: 20px;
    gap: 90px;
    width: 70vw;
    text-align: center;
    border-top: 1px solid #6110ed75;
    border-bottom: 1px solid #6110ed75;

   
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column; /* ← aqui está a solução */
    align-items: center;
    justify-content: center;

    h3 {
        font-style: italic;
        font-weight: 300;
        opacity: 0.8;
        margin-top: 16px; /* opcional, espaço entre o Lottie e o texto */
    }
`;
