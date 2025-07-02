'use client';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import Anim from "../HeartsAnim/HeartsAnim";
import useShake from "@/hooks/useShake";
import { SpotifyCard } from "../Spotify/SpotifyCard";
import dayjs from 'dayjs';
import useTiltUpMessage from "@/hooks/useTiltUpMessage";
import useSensorSupport from "@/hooks/useSensorSupport";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import MessageNotFound from "../loveComponents/messageNotFound/MessageNotFound";
import PreviewRoullette from "../Pages/create-component/preview/PreviewRoulette/PreviewRoulette";
import DateAnim from "./DateAnim/DateAnim";
dayjs.extend(duration);
dayjs.extend(relativeTime);

interface Messages {
  id: string;
  creatorName: string;
  destinataryName: string;
  content: string;
  spotifyLink?: string;
  imageUrl?: string;
  userId: string;
  theme: number;
  expiresAt: string;
  dateInit: string;
  rouletteTitle?: string;
  rouletteItens?: string[];
}

export default function MessagesComponent() {
  const { id } = useParams();
  const [message, setMessage] = useState<Messages | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibility, setVisibility] = useState(0);
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

  useEffect(() => {
    if (message) {

      gsap.registerPlugin(ScrollTrigger);

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
              end: "top 10%",
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
            },
          }
        );
      });
    }
  }, [message])

  const imageContainerRef = useRef<HTMLDivElement>(null);

  useShake(() => {
    setVisibility(1);
    const imgEl = imageContainerRef.current?.querySelector<HTMLImageElement>('img.heart');
    if (imgEl) {
      gsap.fromTo(
        imgEl,
        { filter: 'brightness(10)' },
        {
          filter: 'brightness(1)',
          duration: 1,
          ease: 'power1.out'
        }
      );
    }
  }, imageContainerRef);

  useEffect(() => {
    if (showMessage) {
      (gsap.utils.toArray(".stars01") as HTMLElement[]).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -100, transform: "scale(0)" },
          {
            opacity: 1,
            x: 0,
            transform: "scale(1)",
            duration: 1.5,
            ease: "power2.out",
          }
        );
      });

      (gsap.utils.toArray(".date-text") as HTMLElement[]).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 10, transform: "scale(0)" },
          {
            opacity: 1,
            y: 0,
            transform: "scale(1)",
            duration: 1.5,
            ease: "power2.out",
          }
        );
      });

      (gsap.utils.toArray(".stars02") as HTMLElement[]).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 100, transform: "scale(0)" },
          {
            opacity: 1,
            x: 0,
            transform: "scale(1)",
            duration: 1.5,
            ease: "power2.out",
          }
        );
      });
    }
  }, [showMessage]);

  const theme = message?.theme;
  if (loading) return <CircularProgress style={{ margin: 'auto', color: '#aa00ff' }} />;
  if (!message) return <MessageNotFound />;

  return (
    <main className="container" style={{ height: "100%", minHeight: '100%' }}>
      <Anim theme={theme} />
      <MainContainer>
        <Message className="message">
          <p className={`title ${theme === 2 ? 'theme-02' : ''}`}>ROLE A TELA</p>
        </Message>
        <Message className="message">
          <p className={`title ${theme === 2 ? 'theme-02' : ''}`}>COM CARINHO, DE {message.creatorName.toUpperCase()}</p>
        </Message>
        <Message className="message">
          <p className={`title ${theme === 2 ? 'theme-02' : ''}`}>PARA {message.destinataryName.toUpperCase()}</p>
        </Message>
        {message.spotifyLink && (
          <Message className="message">
            <p className={`title ${theme === 2 ? 'theme-02' : ''}`}>DE PLAY NO TRECHO QUE {message.creatorName.toUpperCase()} SELECIONOU PRA VOCÊ</p>
            <SpotifyCard link={message.spotifyLink} />
          </Message>
        )}
        <Message className="message">
          <section className='message-container'>
            <p className="main-content">{message.content}</p>
          </section>
        </Message>
        {message.dateInit && (
          sensorSupport ? (
          <Message className="message">
              <p className={`title ${theme === 2 ? 'theme-02' : ''}`}>APONTE O SMARTPHONE PARA O CÉU</p>
              {showMessage && (
                <Message className="message">
                  {showMessage && (
                    <DateAnim date={message.dateInit} />
                  )}
                </Message>
              )}
          </Message>
          ) : (
            <Message className="message">
              <p className={`message ${theme === 2 ? 'theme-02' : ''}`} style={{ padding: 0, margin: 0 }}>UM RECADINHO ESPECIAL</p>
              <DateAnim date={message.dateInit} animDuration={5} />
            </Message>)
        )}
        {message.imageUrl && (
          sensorSupport ? (
            <Message ref={imageContainerRef} isVisible={visibility} className="image-container message">
              <section>
                <p className={`title ${theme === 2 ? 'theme-02' : ''}`}>
                  CHACOALHE O SEU SMARTPHONE
                </p>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '650px',      
                  aspectRatio: '4/3',     
                  margin: '0 auto'
                }}>
                  <Image
                    src={message.imageUrl}
                    alt="recordação"
                    fill                      
                    style={{
                      objectFit: 'contain',    
                      borderRadius: '10px'
                    }}
                    className="heart main-image shake"
                    unoptimized
                  />
                </div>
              </section>
            </Message>
          ) : (
            <Message className="image-container message">
              <section>
                <p className={`title ${theme === 2 ? 'theme-02' : ''}`}>AGORA, UMA LINDA RECORDAÇÃO!</p>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '650px',      // ajuste o máximo que quiser
                  aspectRatio: '4/3',     // proporção fixa, por exemplo 4:3
                  margin: '0 auto'
                }}>
                  <Image
                    src={message.imageUrl}
                    alt="recordação"
                    fill                      // preenche todo o container
                    style={{
                      objectFit: 'contain',    // ou 'contain'
                      borderRadius: '10px'
                    }}
                    className="heart main-image"
                    unoptimized
                  />
                </div>
              </section>

            </Message>
          )
        )}
        {message.rouletteItens && message.rouletteItens.length > 0 && (
          <Message className="message">
            <section>
              <p className={`title ${theme === 2 ? 'theme-02' : ''}`}>Roleta especial</p>
              <PreviewRoullette inComponent={true} title={message.rouletteTitle || "Roda da Sorte"} itens={message.rouletteItens} />
            </section>
          </Message>
        )}
      </MainContainer>
    </main>
  );
}

const MainContainer = styled.main.withConfig({ shouldForwardProp: (prop) => prop !== 'theme' }) <{ theme?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70vh;
  padding: 50vh 0;
  min-height: 100vh;
  height: auto;
  overflow: hidden;
  background-color: ${({ theme }) => (theme === 2 ? '#f7fb0e' : '#c50df3')};;
  
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

  .theme-02 {
    text-shadow: 0 1px 0 #ffffff, 
               0 2px 0 #c9c9c9,
               0 3px 0 #bbb,
               0 4px 0 #b9b9b9,
               0 5px 0 #aaa,
               0 6px 1px rgba(0,0,0,.1),
               0 0 5px rgba(0,0,0,.1),
               0 1px 3px rgba(0,0,0,.3),
               0 3px 5px rgba(0,0,0,.2),
               0 5px 10px rgba(0,0,0,.25),
               0 10px 10px rgba(0,0,0,.2),
               0 20px 20px rgba(0,0,0,.15);
  }

  p {
    font-size: 1.5rem;
    text-align: center;
    padding: 20px;
    color: white;
    font-weight: 1000;
    font-family: var(--font-quicksand);
  }

  p.main-content {
    border: 1px solid white;
    border-radius: 10px;
    text-align: left;
    background-color: #8810a6f6;
    font-weight: 1000;
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

