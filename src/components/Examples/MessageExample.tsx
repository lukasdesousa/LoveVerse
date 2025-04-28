"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styled, { CSSProperties } from "styled-components";
import Image from "next/image";
import hearts from "public/img/hearts.png";
import HeartAnim from "@/components/HeartsAnim/HeartsAnim";
import huggingFriends from 'public/img/happy-people.png';
import { SpotifyCard } from "@/components/Spotify/SpotifyCard";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function MessageExample() {

  useEffect(() => {
    (gsap.utils.toArray(".message") as HTMLElement[]).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
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
  
    // Animação para a imagem com a classe .heart dentro da .image-container
    (gsap.utils.toArray(".image-container") as HTMLElement[]).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });
  
    (gsap.utils.toArray(".hearts") as HTMLElement[]).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: 100, transform: "scale(0)" },
        {
          transform: "scale(1)",
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });
  
    gsap.timeline({ repeat: -1, yoyo: true }) // A configuração 'repeat: -1' faz com que a animação continue indefinidamente e o 'yoyo' volta ao início
      .to('.container', {
        background: 'linear-gradient(135deg, #f92dd0, #e595ff)',
        duration: 10,
        ease: 'back.inOut'
      })
      .to('.container', {
        background: 'linear-gradient(135deg, #ff9a9e, #fbc2eb)',
        duration: 10,
        ease: 'back.inOut'
      })
      .to('.container', {
        background: 'linear-gradient(135deg, #fa99df, #a18cd1)',
        duration: 10,
        ease: 'back.inOut'
      })
      .to('.container', {
        background: 'linear-gradient(135deg, #ef16ff, #f270f7)',
        duration: 10,
        ease: 'back.inOut'
      })
      .to('.container', {
        background: 'linear-gradient(135deg, #ec84e7, #ff9a9e)',
        duration: 10,
        ease: 'back.inOut'
      });
  }, [])


  return (
    <main className="container" style={{ height: "100vh", minHeight: "100vh" }}>
      <Background>
        <HeartAnim />
        <MainContainer>
          <Message className="message">
            <p>ROLE A TELA</p>
          </Message>
          <Message className="message">
            <p>MAS ANTES, ESCUTE DE PLAY NA MÚSICA SELECIONADA PRA VOCÊ</p>
            <SpotifyCard link="https://open.spotify.com/intl-pt/track/2stkLJ0JNcXkIRDNF3ld6c?si=bae8541c79064e70" />
          </Message>
          <Message className="message">
            <p>COM CARINHO, DE PEDRO</p>
          </Message>
          <Message className="message">
            <p>PARA: JOANA</p>
          </Message>
          <Message className="message">
            <section className='message-container'>
              <section className="heart1">
                <Image
                  src={hearts}
                  alt='imagens de corações vermelhos'
                  width={100}
                  height={100}
                  className="hearts"
                />

              </section>
              <p className="main-content">Olá Joana, saiba que você é a minha melhor amiga, e eu amo você muito. Que você esteja feliz e que tudo esteja ótimo. Que você saiba que eu estou aqui para você sempre. Obrigado pelas risadas e pelas aventuras, conte comigo pra tudo!</p>
              <section className="heart2">
                <Image
                  src={hearts}
                  alt='imagens de corações vermelhos'
                  width={100}
                  height={100}
                  className="hearts"
                />
              </section>
            </section>
          </Message>
          <Message className="image-container message">
            <section>
              <p>
                <strong>Uma foto bem bacana aqui!</strong>
              </p>
                <Image
                  src={huggingFriends}
                  alt="imagem do usuário"
                  width={450}
                  height={450}
                  className="heart"
                />
            </section>
          </Message>
        </MainContainer>
      </Background>
    </main>
  );
}

const Background = styled.div<CSSProperties>`
  /* Background animado com puro CSS */
  background-size: 200% 200%;
  min-height: 100vh;
  overflow: hidden;
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80vh;
  padding: 50vh 0;
  min-height: 100vh;
  height: auto;
  
  section.message-container {
    
    .heart1 {
      display: flex;
      justify-content: end;
      align-items: center;
      margin: 10px 0px;
    }

    .heart2 {
      display: flex;
      justify-content: start;
      align-items: center;
      margin: 10px 0px;
    }
  }

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      border-radius: 10px;

    }
  }
`;

const Message = styled.section`
  width: 90%;
  margin: 0 auto;


  p {
    font-size: 1.5rem;
    text-align: center;
    padding: 20px;
    color: white;
    font-weight: 500;
  }

  p.main-content {
    border: 1px solid white;
    border-radius: 10px;
  }
`;

const gradientAnimation = `
  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const GlobalStyle = styled.div`
  ${gradientAnimation}
`;
