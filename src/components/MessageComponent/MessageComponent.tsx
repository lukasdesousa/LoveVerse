"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import { notFound, useParams } from "next/navigation";
import HeartAnim from "../HeartsAnim/HeartsAnim";
import useShake from "@/hooks/useShake";
import { SpotifyCard } from "../Spotify/SpotifyCard";
import dayjs from 'dayjs';
import useTiltUpMessage from "@/hooks/useTiltUpMessage";
import useSensorSupport from "@/hooks/useSensorSupport";

gsap.registerPlugin(ScrollTrigger);

interface Messages {
  id: string;
  creatorName: string;
  destinataryName: string;
  content: string;
  spotifyLink?: string;
  imageUrl?: string;
  userId: string;
  expiresAt: string;
  dateInit: string;
}

export default function MessagesComponent() {
  const { id } = useParams(); // Obtém o ID da URL
  const [message, setMessage] = useState<Messages | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibility, setVisibility] = useState(0);
  // const user = useSelector((state: User) => state.user.user);
  const showMessage = useTiltUpMessage();
  const sensorSupport = useSensorSupport();

  useEffect(() => {
    async function fetchMessage() {
      try {
        const res = await fetch(`/api/usermessages/${id}`);
        if (!res.ok) throw new Error("Mensagem não encontrada");
        const data = await res.json();
        setMessage(data);
      } catch {
        setMessage(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchMessage();
  }, [id]);

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

  const daysSince = message?.dateInit
    ? dayjs().diff(dayjs(message.dateInit), 'day')
    : null;


  const imageContainerRef = useRef<HTMLDivElement>(null);

  useShake(() => {
    setVisibility(1);
    const imgEl = imageContainerRef.current?.querySelector<HTMLImageElement>('img.heart');
    if (imgEl) {
      // flash: começa super-branco e volta ao normal em 0.3s
      gsap.fromTo(
        imgEl,
        { filter: 'brightness(10)' },    // branco intenso
        {
          filter: 'brightness(1)',      // volta ao normal
          duration: 1,
          ease: 'power1.out'
        }
      );
    }
  }, imageContainerRef);

  if (loading) return <CircularProgress style={{margin: 'auto', color: '#aa00ff'}}/>;
  if (!message) return notFound();
  console.log(message.spotifyLink)

  return (
    <main className="container" style={{ height: "100%", minHeight: '100%' }}>
      <HeartAnim />
      <MainContainer>
        <Message className="message">
          <p className="title">ROLE A TELA</p>
        </Message>
        <Message className="message">
          <p className="title">COM CARINHO, DE {message.creatorName.toUpperCase()}</p>
        </Message>
        <Message className="message">
          <p className="title">PARA: {message.destinataryName.toUpperCase()}</p>
        </Message>
        {message.spotifyLink && (
          <Message className="message">
            <p className="title">ANTES, DE PLAY NO TRECHO QUE {message.creatorName.toUpperCase()} SELECIONOU PRA VOCÊ</p>
            <SpotifyCard link={message.spotifyLink} />
          </Message>
        )}
        <Message className="message">
          <section className='message-container'>
            <p className="main-content">{message.content}</p>
          </section>
        </Message>
        {message.dateInit && (
           sensorSupport ? (<Message className="message">
            <section className="day-container">
              <p className="title">APONTE O SMARTPHONE PARA O CÉU</p>
              {showMessage && (
                <p>EU TE AMO HÁ {daysSince} DIAS</p>
              )}
            </section>
          </Message>
          ) : (
            <Message className="message">
              <section className="day-container">
                <p>EU TE AMO HÁ {daysSince} DIAS</p>
              </section>
            </Message>)
        )}
        {message.imageUrl && (
          sensorSupport ? (
            <Message ref={imageContainerRef} isVisible={visibility} className="image-container message">
              <section>
                <p className="title">
                  CHACOALHE O SEU SMARTPHONE
                </p>
                <Image
                  src={message.imageUrl}
                  alt="imagem do usuário"
                  width={450}
                  height={450}
                  className="heart main-image shake"
                />
              </section>
            </Message>
          ) : (
            <Message className="image-container message">
              <section>
                <p>AGORA, UMA FOTO BEM BACANA!</p>
                <div>
                  <Image
                    src={message.imageUrl}
                    alt="imagem do usuário"
                    layout="responsive"
                    width={200}
                    height={200}
                    className="heart main-image"
                    style={{maxWidth: '400px', maxHeight: '400px', borderRadius: '10px'}}
                  />
                </div>
              </section>
            </Message>
          )

        )}
      </MainContainer>
    </main>
  );
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70vh;
  padding: 50vh 0;
  min-height: 100vh;
  height: auto;
  overflow: hidden;
  
  section.message-container {
    
    .heart1 {
      display: flex;
      justify-content: end;
      align-items: center;
    }

    .heart2 {
      display: flex;
      justify-content: start;
      align-items: center;
    }
  }

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    img {
      display: block;
      margin: auto;
    }
  }
`;

const Message = styled.section<{ isVisible?: number }>`
  width: 90%;
  margin: 0 auto;

  p {
    font-size: 1.5rem;
    text-align: center;
    padding: 20px;
    color: white;
    font-weight: 100;
  }

  p.main-content {
    border: 1px solid white;
    border-radius: 10px;
    text-align: left;
    background-color: #8810a6f6;
    font-weight: 250;
  }

  p.title {
    width: 90%;
    margin: auto;
  }

  img.shake {
    
    transition: 1.2s;
    ${(props) => `opacity: ${props.isVisible}`}
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

