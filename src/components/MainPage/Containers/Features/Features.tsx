'use client';

import styled from "styled-components";
import { MainText } from "@/styles/components_styles/mainStyle/styled";
import FeaturesCard from "./Card/FeaturesCard";
import security from "public/img/security.png";
import fast from "public/img/fast.png";
import email from "public/img/email.png";
import lowprice from "public/img/lowprice.png";
import SubFeatures from "./SubFeatures/SubFeatures";

export default function Features() {
    return (
        <section style={{margin: 'auto'}}>
            <Container>
                <Content>
                        <TextContainer>
                            <MainTextContainer>
                                <p style={{fontFamily: 'var(--font-quicksand)', marginBottom: '8px', marginLeft: '5px', opacity: 0.7}}>As suas vantagens é o</p>
                                <MainText style={{maxWidth: '600px', fontWeight: '700', fontSize: '2.4rem'}}>Nosso compromisso</MainText>
                                <p style={{fontFamily: 'var(--font-quicksand)'}}>Na LoveVerse, as suas vantagens é o nosso principal compromisso. Aqui estão algumas das várias vantagens que você pode encontrar na LoveVerse:</p>
                            </MainTextContainer>
                        </TextContainer>
                    <SubContainer>
                        <div><FeaturesCard title="Segurança" description="Aqui os seus dados estão seguros. Seus dados são excluidos automaticamente após 5 dias." src={security} /></div>
                        <div><FeaturesCard title="Praticidade" description="Crie a sua mensagem em apenas alguns cliques." src={fast} /></div>
                        <div><FeaturesCard title="Envio de e-mail" description="Enviamos o QR CODE da sua mensagem através de e-mail." src={email} /></div>
                        <div><FeaturesCard title="Preço baixo" description="Proporcionando muito, pelo menor preço possível." src={lowprice} /></div>
                    </SubContainer>
                </Content>
            </Container>
                <SubFeatures />
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
    background-color: #d6d6d64b;
    padding: 50px 30px 200px 30px;

    p {
        text-align: left;
        @media (max-width: 768px) {
        width: 90%;
    }
        width: 70%;
    }
`;

const Content = styled.div`
    display: flex;
    @media (max-width: 1200px) {
      flex-direction: column;
      align-items: center;
      margin: 0px auto 10px auto;
      width: 100%;
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
    justify-content: left;
    gap: 20px;
      margin: 10px 10px 50px 0px;
`;

const TextContainer = styled.section`
@media (min-width: 1200px) {
    position: sticky;
    top: 100px; 
    max-height: calc(100vh - 900px); 
  }
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    gap: 250px;
    @media (max-width: 968px) {
      padding-bottom: 150px;
  }
`;