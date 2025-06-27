'use client';

import styled from 'styled-components';
import { useRef } from 'react';
import dynamic from "next/dynamic";
import square from '@/lotties/square_metallic.json';
import { Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import ScrollReveal from '@/components/Scroll/ScrollReveal';
import Link from 'next/link';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
export const UsingTech = () => {

    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <Container ref={containerRef}>
            <MainTextContainer>
                <div className='txt-container'>
                    <p style={{ opacity: '0.8', fontFamily: 'var(--font-quicksand)', marginBottom: '20px' }}>Nosso objetivo</p>
                    <MainText>Usamos a tecnologia para reaproximar pessoas</MainText>
                </div>
            </MainTextContainer>
            <ScrollReveal>
                <SubContainer>
                    <Lottie
                        className='lottie'
                        animationData={square}
                        loop={true}
                        autoplay={true}
                        style={{ width: '50%', height: '50%', minWidth: 400, minHeight: 400 }}
                    />
                </SubContainer>
            </ScrollReveal>
            <section className='txt-container-02'>
                <section className='sub-container-02'>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', alignItems: 'start' }}>
                        <p style={{ opacity: '0.8', fontFamily: 'var(--font-quicksand)', marginBottom: '20px' }}>Usando os mais recentes frameworks, foi criado a LoveVerse. Com o objetivo de aproximar pessoas através de páginas dinâmicas que estão constatemente em evolução</p>
                    </div>
                    <div>
                        <p style={{ opacity: '0.8', fontFamily: 'var(--font-quicksand)', marginBottom: '20px' }}>Também como objetivo, simplificar a forma de obter algo criativo e rápido. Digitalizando a boa e velha carta a mão.</p>
                    </div>
                </section>
                        <Link href={'/tutorial/loveverse'}><Button>Saiba mais <ExportOutlined /> </Button></Link>
            </section>
        </Container>

    );
}

const Container = styled.section`
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    flex-direction: column;
    margin: 20px auto 40px auto;
    gap: 20px;
    text-align: center;

    .txt-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: left;
    }

    .txt-container-02 {
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: start;
        justify-content: left;

        p {
            text-align: left;
        }
    }

    .sub-container-02 {
        gap: 60px;
        display: flex;
          @media (max-width: 768px) {
            flex-direction: column;
            gap: 8px;
        }
    }
`;

const MainText = styled.h2`
  font-size: 3.2rem;
  text-align: left;
  font-weight: 1000;
  max-width: 600px;
  line-height: 1;
  font-family: var(--font-quicksand);
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column; /* ← aqui está a solução */
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 40px 0px;

    .lottie {
        position: relative;
        bottom: 10px;
    }

    h3 {
        font-style: italic;
        font-weight: 200;
        color: white;
    }
`;

const MainTextContainer = styled.section`
  display: flex;
  max-width: 800px;
  align-items: first baseline;
 @media (max-width: 768px) {
      flex-direction: column;
      gap: 40px;
      justify-content: left;
  }
  justify-content: space-between;
  margin: 30px auto;
  width: 100%;
  gap: 100px;
  border-bottom: 1px solid #e6e6E6;
  padding-bottom: 60px;
  `;