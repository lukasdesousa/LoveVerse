'use client';

import styled from "styled-components";
import ScrollReveal from "@/components/Scroll/ScrollReveal";
import BlackContainerCard from "./Card/BlackContainerCard";
import { Button } from "antd";
import { ExportOutlined } from '@ant-design/icons';
import Link from "next/link";

export default function BlackContainer() {
    return (
        <section style={{margin: 'auto'}}>
            <Container>
                <Content>
                        <ScrollReveal>
                            <TextContainer>
                                <MainTextContainer>
                                    <p style={{fontFamily: 'var(--font-quicksand)', marginBottom: '8px', marginLeft: '6px', opacity: 0.7}}>Como uma viagem ao espaço</p>
                                    <MainText style={{maxWidth: '600px', fontWeight: '700', fontSize: '2.4rem'}}>Crie emoções</MainText>
                                    <p style={{fontFamily: 'var(--font-quicksand)'}}>Na LoveVerse, as suas mensagens criam vida, através de nossas ferramentas avançadas de interatividade.</p>
                            <Link href={'/criar'}>
                                <StyledButton >Experimente <ExportOutlined /></StyledButton>
                            </Link>
                                </MainTextContainer>
                            </TextContainer>
                        </ScrollReveal>
                        <BlackContainerCard />
                </Content>
            </Container>
        </section>
    )
}

const Container = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin: auto;
    height: 100%;
    width: 100%;
    background-color: #000000;
    padding: 100px 30px 0px 30px;
    @media (max-width: 768px) {
      padding-top: 0px;
      padding-bottom: 0px;
      border-bottom: 80px solid black;
  }

    p {
        text-align: left;
        @media (max-width: 768px) {
        width: 100%;

    }
        width: 80%;
    }

    .ant-btn:hover {
        background-color: black;
    }
`;

const MainText = styled.h2`
  text-align: left;
  @media (max-width: 768px) {
      text-align: left;
  }
  line-height: 1;
  font-family: var(--font-quicksand);
`;

const Content = styled.div`
    display: flex;
    @media (max-width: 968px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 90%;
      margin-bottom: 100px;
  }
    justify-content: space-between;
    align-items: start;
    width: 70%;
    height: 100%;
    margin: 80px auto 200px auto;
`;

const MainTextContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: start;
    @media (max-width: 968px) {
      justify-content: left;
      align-items: start;
      margin-bottom: 30px;
   
  }
    justify-content: left;
    gap: 20px;
    color: white;
`;

const StyledButton = styled(Button)`
  && {
    background-color: transparent !important;
    color: white !important;
    font-weight: 600 !important;
    box-shadow: none !important;
    border: 1px solid white !important;

    &:hover {
      color: #d9d9d9 !important;
    }
  }
`;

const TextContainer = styled.section`
//
`;