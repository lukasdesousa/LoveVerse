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
export const LottieApresentation = () => {
    const musicRef = useRef<LottieRefCurrentProps>(null);
    const letterRef = useRef<LottieRefCurrentProps>(null);
    const photoRef = useRef<LottieRefCurrentProps>(null);
    const bgRef = useRef<LottieRefCurrentProps>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    function restartAnim() {
        setTimeout(() => {
            musicRef.current?.goToAndStop(0, true);
            musicRef.current?.play(); 
        }, 1000);
        
        setTimeout(() => {
            letterRef.current?.goToAndStop(0, true); 
            letterRef.current?.play();
        }, 1000);

        setTimeout(() => {
            photoRef.current?.goToAndStop(0, true);
            photoRef.current?.play();
        }, 1000);

        setTimeout(() => {
            bgRef.current?.goToAndStop(0, true);
            bgRef.current?.play();
        }, 1000);
    }

    useShake(() => {
       restartAnim();
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
                        start: "top 100%",
                        end: "top 50%",
                    },
                }
            );
        });
    }, [])

    return (
        <Container ref={containerRef}>
            <SubContainer>
                <Lottie
                    lottieRef={musicRef}
                    animationData={spotifyAnim}
                    loop={false} // não repetir
                    autoplay={true} // não iniciar automaticamente
                    style={{ width: 300, height: 100 }}
                />
                <h3 className='image'>Coloque sua música favorita</h3>
            </SubContainer>
            <SubContainer>
                <Lottie
                    lottieRef={letterRef}
                    animationData={letterAnim}
                    loop={false} // não repetir
                    autoplay={true} // não iniciar automaticamente
                    style={{ width: 350, height: 150 }}
                />
                <h3 className='image'>Escreva sua mensagem</h3>
            </SubContainer>
            <SubContainer>
                <Lottie
                    lottieRef={photoRef}
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
    overflow: hidden;
    padding: 20px;

    gap: 50px;
    text-align: center;
    border-top: 1px solid #aa00ff;
    border-bottom: 1px solid #aa00ff;
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column; /* ← aqui está a solução */
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 10px 0px;
    overflow: hidden;

    h3 {
        font-style: italic;
        font-weight: 200;
        color: #000000;
    }
`;
