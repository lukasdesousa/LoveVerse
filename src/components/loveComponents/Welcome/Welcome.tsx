"use client";

import { useEffect } from 'react';
import envelope from 'public/img/envelope.png';
import gsap from 'gsap';
import Image from 'next/image';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styled from 'styled-components';
gsap.registerPlugin(ScrollTrigger);

export const Welcome = () => {
    useEffect(() => {
        gsap.fromTo('.envelope', {
            x: -100,
            opacity: 0,
        }, {
            duration: 1,
            ease: 'power2.inOut',
            opacity: 1,
            x: 0,
            scrollTrigger: {
                trigger: '.envelope',
                start: 'top 90%',
                end: 'top 50%',
                scrub: true,
                onEnter: () => {
                    gsap.to('.envelope', {
                        scale: 1.1,
                        duration: 0.5,
                        ease: 'power2.out',
                    });
                }
            }
        })

        gsap.fromTo('.subtitle', {
            x: 100,
            opacity: 0,
        }, {
            duration: 1,
            ease: 'power2.inOut',
            opacity: 1,
            x: 0,
            scrollTrigger: {
                trigger: '.subtitle',
                start: 'top 90%',
                end: 'top 50%',
                scrub: true,
                onEnter: () => {
                    gsap.to('.subtitle', {
                        scale: 1.1,
                        duration: 0.5,
                        ease: 'power2.out',
                    });
                }
            }
        })
    }, [])


    return (
        <Container>
            <div>
            <Image
            src={envelope}
            alt='Envelope com coração'
            width={100}
            height={100}
            quality={100}
            className='envelope'
            placeholder='blur'
            />
            </div>
            <div>
            <Subtitle className='subtitle'>
                Deixe a sua criatividade e o seu amor brilhar
            </Subtitle>
            </div>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Subtitle = styled.h6`
    font-size: 100%;
    font-style: italic;
    opacity: 0.7;
    width: 150px;
`;