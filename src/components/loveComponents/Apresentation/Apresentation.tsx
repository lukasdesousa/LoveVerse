"use client";

import styled from 'styled-components';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import letterIlustration from 'public/img/text-ilustration.png';
import music from 'public/img/music-3d-ilustration.png';
import photo from 'public/img/photo-3d-ilustration.png'
import { useEffect } from 'react';


export const Apresentation = () => {

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
        <Container>
            <SubContainer>
                <Image
                src={music}
                alt='Imagem 3d ilustração'
                width={150}
                height={150}
                placeholder='blur'
                quality={100}
                className='image'
                />
                <h3>Coloque sua música favorita</h3>
            </SubContainer>
            <SubContainer>
                <Image
                src={letterIlustration}
                alt='Imagem 3d ilustração'
                width={150}
                height={150}
                placeholder='blur'
                quality={100}
                className='image'
                />
                <h3>Deixe todo seu amor e carinho</h3>
            </SubContainer>
            <SubContainer>
                <Image
                src={photo}
                alt='Imagem 3d ilustração'
                width={150}
                height={150}
                placeholder='blur'
                quality={100}
                className='image'
                />
                <h3>Insira sua melhor recordação</h3>
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
    gap: 100px;
    width: 70vw;
    text-align: center;
    border-top: 1px solid #6110ed75;
    border-bottom: 1px solid #6110ed75;

   
`;

const SubContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
        font-style: italic;
        opacity: 0.8;
    }
`;
