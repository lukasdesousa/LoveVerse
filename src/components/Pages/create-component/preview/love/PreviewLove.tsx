'use client';

import dynamic from "next/dynamic";
import styled from "styled-components";
import React, { useEffect, useRef, useState } from 'react';
import { Card, Carousel, Flex } from 'antd';
import type { CardMetaProps, CardProps } from 'antd';
import { createStyles } from 'antd-style';
import Image from "next/image";
import { SpotifyCard } from "@/components/Spotify/SpotifyCard";
import animationData from "@/lotties/Book.json";
import { LottieRefCurrentProps } from "lottie-react";
import { CircularProgress } from "@mui/material";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const { Meta } = Card;

const useStyles = createStyles(({ token }) => ({
    root: {
        width: 300,
        backgroundColor: token.colorBgContainer,
        borderRadius: token.borderRadius,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: `1px solid ${token.colorBorderSecondary}`,
    },
    header: {
        borderBottom: 'none',
        paddingBottom: 8,
    },
    body: {
        paddingTop: 0,
    },
}));

const stylesCardFn: CardProps['styles'] = (info) => {
    if (info.props.variant === 'outlined') {
        return {
            root: {
                borderColor: '#696FC7',
                boxShadow: '0 2px 8px #A7AAE1',
                borderRadius: 8,
                width: '90vw',
                maxWidth: 1000,
                margin: 'auto',
            },
            extra: {
                color: '#696FC7',
            },
            title: {
                fontSize: 25,
                fontWeight: 1000,
                color: '#A7AAE1',
            },
        } satisfies CardProps['styles'];
    }
};

const stylesCardMeta: CardMetaProps['styles'] = {
    title: {
        color: '#A7AAE1',
        fontSize: 'clamp(1rem, 3vw, 3rem)',
        fontWeight: 900,
    },
    description: {
        color: '#878ac0',
        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
        fontWeight: 600,
    },
};

export type TimeDiff = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function getTimeSince(date: Date): TimeDiff {
    const now = new Date().getTime();
    const past = date.getTime();

    let diff = Math.floor((now - past) / 1000);

    const days = Math.floor(diff / (60 * 60 * 24));
    diff -= days * 60 * 60 * 24;

    const hours = Math.floor(diff / (60 * 60));
    diff -= hours * 60 * 60;

    const minutes = Math.floor(diff / 60);
    diff -= minutes * 60;

    const seconds = diff;

    return { days, hours, minutes, seconds };
}

interface MessagesThemeOne {
    creatorName: string;
    destinataryName: string;
    content: string;
    spotifyLink?: string;
    imagesBase64?: string[];
    dateInit: string;
}

export default function PreviewLove() {
    const { styles: classNames } = useStyles();

    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const lottieContainerRef = useRef<HTMLDivElement>(null);
    const scrollRootRef = useRef<HTMLElement | null>(null);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isLottieReady, setIsLottieReady] = useState(false);
    const [animComplete, setAnimComplete] = useState(false);
    const [animation, setAnimation] = useState(false);
    const [message, setMessage] = useState<MessagesThemeOne | null>(null);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(
        getTimeSince(message?.dateInit ? new Date(message.dateInit) : new Date())
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTimeSince(message?.dateInit ? new Date(message.dateInit) : new Date()));
        }, 1000);

        return () => clearInterval(interval);
    }, [message]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("pendingMessage");

            if (!stored) {
                setLoading(false);
                return;
            }

            const data = JSON.parse(stored);

            const parsedMessage: MessagesThemeOne = {
                creatorName: data.creatorName,
                destinataryName: data.destinataryName,
                content: data.content,
                spotifyLink: data.spotifyLink,
                imagesBase64: data.imagesBase64 || [],
                dateInit: data.dateInit
            };

            setMessage(parsedMessage);
        } catch (err) {
            console.error("Erro ao recuperar localStorage:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!lottieContainerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    if (isLottieReady && !hasPlayed) {
                        requestAnimationFrame(() => {
                            lottieRef.current?.play();
                            setHasPlayed(true);
                        });
                    }
                }
            },
            {
                root: scrollRootRef.current, // essencial no teu caso
                threshold: 0.15,
                rootMargin: '0px 0px -10% 0px',
            }
        );

        observer.observe(lottieContainerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [hasPlayed, isLottieReady]);

    useEffect(() => {
        if (isVisible && isLottieReady && !hasPlayed) {
            requestAnimationFrame(() => {
                lottieRef.current?.play();
                setHasPlayed(true);
            });
        }
    }, [isVisible, isLottieReady, hasPlayed]);

    const sharedCardProps: CardProps = {
        classNames,
    };

    const sharedCardMetaProps: CardMetaProps = {
        description: message?.content || '',
    };

    if (loading) {
        return <CircularProgress style={{ margin: 'auto', color: '#A7AAE1' }} />;
    }

    return (
        <Container ref={scrollRootRef}>
            <MessageContainer>
                <Flex gap="middle">
                    <Card
                        {...sharedCardProps}
                        title={`${message?.creatorName?.toLocaleUpperCase() || ''} & ${message?.destinataryName?.toLocaleUpperCase() || ''}`}
                        styles={stylesCardFn}
                    >
                        <ImageContainer>
                            {message?.imagesBase64 && message.imagesBase64.length > 0 && (
                                <Image
                                    src={message.imagesBase64[0]}
                                    alt="test"
                                    width={400}
                                    height={300}
                                    style={{
                                        maxWidth: '100%',
                                        margin: '20px auto',
                                        height: 'auto',
                                        display: 'block',
                                        borderRadius: 8
                                    }}
                                />
                            )}

                            <section className="spotify-card">
                                {message?.spotifyLink && (
                                    <SpotifyCard link={message.spotifyLink} />
                                )}
                            </section>
                        </ImageContainer>

                        <Meta {...sharedCardMetaProps} styles={stylesCardMeta} title="Uma história de amor" />

                        <DateArea>
                            <Card
                                styles={stylesCardMeta}
                                className="date-card"
                                title="❤️ Uma data especial ❤️"
                                variant="outlined"
                                style={{ width: '100%' }}
                            >
                                <p>
                                    Nosso primeiro beijo foi há
                                    <span style={{ color: 'red' }}> {time.days} </span> dias,
                                    <span style={{ color: 'red' }}> {time.hours} </span> horas,
                                    <span style={{ color: 'red' }}> {time.minutes} </span> minutos e
                                    <span style={{ color: 'red' }}> {time.seconds} </span> segundos atrás
                                </p>
                            </Card>
                        </DateArea>

                        <CarouselContainer>
                            <Card
                                styles={stylesCardMeta}
                                className="date-card"
                                title="🪐 Nosso mapa 🪐"
                                variant="outlined"
                                style={{ width: '100%', height: '100%' }}
                            >
                                {!animComplete && (
                                    <div ref={lottieContainerRef} style={{ minHeight: 140 }}>
                                        <Lottie
                                            className={animation ? 'book-lottie-anim' : ''}
                                            lottieRef={lottieRef}
                                            animationData={animationData}
                                            loop={false}
                                            autoplay={false}
                                            style={{
                                                width: '60%',
                                                maxWidth: '400px',
                                                height: 'auto',
                                                margin: '20px auto'
                                            }}
                                            onDOMLoaded={() => {
                                                setIsLottieReady(true);

                                                if (isVisible && !hasPlayed) {
                                                    requestAnimationFrame(() => {
                                                        lottieRef.current?.play();
                                                        setHasPlayed(true);
                                                    });
                                                }
                                            }}
                                            onComplete={() => {
                                                setAnimation(true);
                                                setTimeout(() => {
                                                    setAnimComplete(true);
                                                }, 3000);
                                            }}
                                        />
                                    </div>
                                )}
                                <Carousel
                                    className={`carousel ${animComplete ? 'carousel-anim' : ''}`}
                                    infinite
                                    autoplay
                                    autoplaySpeed={4000}
                                    dots={false}
                                >
                                    {message?.imagesBase64?.map((img, idx) => (
                                        <div key={idx}>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "350px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    overflow: "hidden",
                                                    borderRadius: 8
                                                }}
                                            >
                                                <Image
                                                    src={img}
                                                    alt="Imagem do usuário"
                                                    width={800}
                                                    height={600}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </Carousel>

                                <p className={`carousel ${animComplete ? 'carousel-anim' : ''}`}>
                                    Mural de lembranças
                                </p>
                            </Card>
                        </CarouselContainer>
                    </Card>
                </Flex>
            </MessageContainer>
        </Container>
    );
}

const ImageContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;

    @media screen and (max-width: 1150px) {
        flex-direction: column;
    }

    .spotify-card {
        width: 100%;
        max-width: 400px;
        margin: auto;
    }
`;

const Container = styled.section`
    height: 100%;
    overflow: auto;
    background-image: url('/message-images/background-letter.svg');
    background-size: cover;
    background-position: center;

    .date-card {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
                    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
        text-align: center;
    }
`;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 50px auto;
`;

const DateArea = styled.div`
    margin: 20px auto;
    font-size: 1.5rem;
    font-weight: 1000;

    p {
        color: #A7AAE1;
        text-align: center;
        font-size: clamp(1rem, 3vw, 2rem);
    }
`;

const CarouselContainer = styled.section`
    p {
        font-weight: 300;
        font-size: clamp(1.1rem, 4vw, 1.2rem);
    }

    .book-lottie-anim {
        animation: bookUp 3s ease-out forwards;
    }

    .carousel {
        display: none;

        h3 {
            font-size: clamp(1.5rem, 4vw, 1.8rem);
        }
    }

    .carousel-anim {
        animation: carouselFadeIn 1s ease-out forwards;
        display: block;
    }

    @keyframes carouselFadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes bookUp {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.3);
            opacity: 0.5;
        }
        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }
`;