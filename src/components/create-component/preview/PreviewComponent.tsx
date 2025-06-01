/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import HeartAnim from "../../HeartsAnim/HeartsAnim";
import useShake from "@/hooks/useShake";
import { SpotifyCard } from "../../Spotify/SpotifyCard";
import useTiltUpMessage from "@/hooks/useTiltUpMessage";
import useSensorSupport from "@/hooks/useSensorSupport";
import stars from 'public/img/stars.png';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CircularProgress } from "@mui/material";
import PreviewWarn from "./warning/PreviewWarn";
import { useRouter } from "next/navigation";
import NotFoundPreview from "./notfound/NotFoundPreview";
dayjs.extend(duration);
dayjs.extend(relativeTime);

gsap.registerPlugin(ScrollTrigger);

export default function PreviewComponent() {
    const [visibility, setVisibility] = useState(0);
    const showMessage = useTiltUpMessage();
    const sensorSupport = useSensorSupport();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pendingMessage, setPendingMessage] = useState<Record<string, any>>({});
    const [, setShowSpotify] = useState(false);
    const [loading, setLoading] = useState(true);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const stored = localStorage.getItem('pendingMessage');

    if(!stored) {
        return <NotFoundPreview />;
    }

    useEffect(() => {
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // converte dateInit de string para dayjs
                if (parsed.dateInit) {
                    parsed.dateInit = dayjs(parsed.dateInit);
                }
                setPendingMessage(parsed);
                setShowSpotify(!!parsed.spotifyLink);
            } catch (err) {
                console.error('Erro ao parsear pendingMessage:', err);
            }
        }
        setLoading(false);
    }, [router, stored]);
    
    
    // Cálculo detalhado de tempo
    const calculateDetailedTimeSince = (startDate: dayjs.ConfigType) => {
        const now = dayjs();
        const start = dayjs(startDate);
        const days = now.diff(start, 'day');
        const hours = now.diff(start, 'hour') % 24;
        const minutes = now.diff(start, 'minute') % 60;
        const seconds = now.diff(start, 'second') % 60;
        return { days, hours, minutes, seconds };
    };
    const detailedTimeSince = pendingMessage.dateInit
        ? calculateDetailedTimeSince(pendingMessage.dateInit)
        : null;

    // GSAP scroll animations
    useEffect(() => {
        if (pendingMessage) {

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
    }, [pendingMessage])

    // Shake animation
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

    if (loading) return <CircularProgress style={{ margin: 'auto', color: '#aa00ff' }} />;

    return (
        <>
        <PreviewWarn />
        <main style={{ minHeight: '100vh', backgroundColor: 'black' }}>
            <HeartAnim />

            <MainContainer>
                {/* Mensagens de texto */}
                <Message className="message"><p className="title">ROLE A TELA</p></Message>
                <Message className="message"><p className="title">COM CARINHO, DE {pendingMessage.creatorName.toUpperCase()}</p></Message>
                <Message className="message"><p className="title">PARA {pendingMessage.destinataryName.toUpperCase()}</p></Message>

                {/* Spotify */}
                {pendingMessage.spotifyLink && (
                    <Message className="message">
                        <p className="title">
                            ANTES, DE PLAY NO TRECHO QUE {pendingMessage.creatorName.toUpperCase()} SELECIONOU PRA VOCÊ
                        </p>
                        <SpotifyCard link={pendingMessage.spotifyLink} />
                    </Message>
                )}

                {/* Conteúdo da mensagem */}
                <Message className="message">
                    <section className="message-container">
                        <p className="main-content">{pendingMessage.content}</p>
                    </section>
                </Message>

                {/* Data dinâmica */}
                {sensorSupport ? (
                    <Message className="message">
                        <p className="title">APONTE O SMARTPHONE PARA O CÉU</p>
                        {showMessage && detailedTimeSince && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Image src={stars} alt="" width={60} height={60} className="stars01" />
                                <p className="date-text">
                                    EU TE AMO HÁ {detailedTimeSince.days} DIAS, {detailedTimeSince.hours} HORAS,
                                    {detailedTimeSince.minutes} MINUTOS E {detailedTimeSince.seconds} SEGUNDOS
                                </p>
                                <Image src={stars} alt="" width={60} height={60} className="stars02" />
                            </div>
                        )}
                    </Message>
                ) : (
                    <Message className="message">
                        <div className="container-02">
                            <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    src={stars}
                                    alt="estrelas do campo de data do LoveVerse"
                                    width={90}
                                    height={90}
                                    placeholder="blur"
                                    quality={100}
                                    className="stars01"
                                />
                                <p>
                                    EU TE AMO HÁ {detailedTimeSince?.days} DIAS, {detailedTimeSince?.hours} HORAS,
                                    {detailedTimeSince?.minutes} MINUTOS E {detailedTimeSince?.seconds} SEGUNDOS
                                </p>
                                <Image
                                    src={stars}
                                    alt="estrelas do campo de data do LoveVerse"
                                    width={90}
                                    height={90}
                                    placeholder="blur"
                                    quality={100}
                                    className="stars01"
                                />
                            </section>
                        </div>
                    </Message>
                )}

                {/* Imagem final */}
                {sensorSupport ? (
                    <Message ref={imageContainerRef} isVisible={visibility} className="image-container message">
                        <p className="title">CHACOALHE O SEU SMARTPHONE</p>
                        {pendingMessage.imageBase64 && (
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: '650px',      // ajuste o máximo que quiser
                                aspectRatio: '4/3',     // proporção fixa, por exemplo 4:3
                                margin: '0 auto'
                            }}>
                                <Image
                                    src={pendingMessage.imageBase64!}
                                    alt="recordação"
                                    fill                      // preenche todo o container
                                    style={{
                                        objectFit: 'contain',    // ou 'contain'
                                        borderRadius: '10px'
                                    }}
                                    className="heart main-image shake"
                                    unoptimized
                                />
                            </div>
                        )}
                    </Message>
                ) : (
                    <Message className="image-container message">
                        <p>AGORA, UMA LINDA RECORDAÇÃO!</p>
                        {pendingMessage.imageBase64 && (
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: '650px', 
                                aspectRatio: '4/3',  
                                margin: '0 auto'
                            }}>
                                <Image
                                    src={pendingMessage.imageBase64!}
                                    alt="Recordação do usuário"
                                    fill                      // preenche todo o container
                                    style={{
                                        objectFit: 'contain',    // ou 'contain'
                                        borderRadius: '10px'
                                    }}
                                    className="heart main-image"
                                    unoptimized
                                />
                            </div>
                        )}
                    </Message>
                )}
            </MainContainer>
        </main>
        </>
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
  background-color: black;
  
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