'use client';

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// lottie
import airplane from '@/lotties/airplane.json';
import { LottieRefCurrentProps } from "lottie-react";
// dayjs
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(duration);
dayjs.extend(relativeTime);

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type Date = {
  date: string;
  animDuration?: number;
}

export default function DateAnim({ date, animDuration }: Date) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        threshold: 0.5,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const calculateDetailedTimeSince = (startDate: dayjs.ConfigType) => {
    const now = dayjs();
    const start = dayjs(startDate);
    const days = now.diff(start, 'day');
    const hours = now.diff(start, 'hour') % 24;
    const minutes = now.diff(start, 'minute') % 60;
    const seconds = now.diff(start, 'second') % 60;
    return { days, hours, minutes, seconds };
  };
  const detailedTimeSince = date
    ? calculateDetailedTimeSince(date)
    : null;


  return (
    <>
      <Container ref={containerRef} animDuration={animDuration}>
        <SubContainer>
          <h4 className={`${visible ? 'text-anim' : ''}`}>EU TE AMO HÁ {detailedTimeSince?.days} DIAS,  {detailedTimeSince?.hours} HORAS, {detailedTimeSince?.minutes} MINUTOS E {detailedTimeSince?.seconds} SEGUNDOS</h4>
          <Lottie
            lottieRef={lottieRef}
            className={`lottie ${visible ? 'anim' : ''}`}
            height={400}
            width={400}
            animationData={airplane}
            loop={true}
            autoplay={true}
          />
        </SubContainer>
      </Container>
    </>
  );
}

const Container = styled.section.withConfig({ shouldForwardProp: (prop) => prop !== 'animDuration' }) <{ animDuration?: number }>`
    .lottie {
    width: 100%;
    left: 100%;
    opacity: 0;
    max-width: 400px;
    height: auto;
    z-index: 100000;
    position: relative;
    }

    .anim {
        animation: airplane linear 1;
        animation-duration: ${({ animDuration }) => (animDuration ? animDuration + 's' : '3s')}; 
    }

    @keyframes airplane {
        0% {
         opacity: 0;
         left: -100%;
        } 15% {
            opacity: 1;
        } 50% {
            left: 0%;
        } 90% {
          opacity: 0.9;
        } 100% {
          opacity: 0;
          right: 100%;
        }
      }
      
      `;

const SubContainer = styled.section.withConfig({ shouldForwardProp: (prop) => prop !== 'animDuration' }) <{ animDuration?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--font-quicksand);
  
  h4 {
    position: absolute;
    z-index: 10000;
    width: 90%;
    max-width: 1000px;
     font-size: 1.5rem;
    text-align: center;
    padding: 20px;
    font-weight: 1000;
    opacity: 0;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    color: black;

  }

  
  .text-anim {
  animation: text linear 1s 1;
  animation-delay:  ${({ animDuration }) => (animDuration ? '2.5s' : '3s')};;
  animation-fill-mode: forwards;
  opacity: 0;
}

  @keyframes text {
    from {
      opacity: 0;
    } to {
      opacity: 1;
    }
  }
`;