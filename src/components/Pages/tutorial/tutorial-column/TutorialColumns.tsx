'use client';

import styled from "styled-components";
import { MainText } from "@/styles/components_styles/mainStyle/styled";
import FeaturesCard from "@/components/MainPage/Containers/Features/Card/FeaturesCard";
import picture from "public/img/pic-tutorial.png";
import email from "public/img/email-tutorial.png";
import spotify from "public/img/spotify-tutorial.png";
import interact from "public/img/interact-tutorial.png";

export default function TutorialColumn() {
    return (
        <section style={{margin: 'auto'}}>
            <Container>
                <Content>
                        <TextContainer>
                            <MainTextContainer>
                                <p style={{fontFamily: 'var(--font-quicksand)', marginBottom: '5px', marginLeft: '5px', opacity: 0.7}}>Breve tutorial</p>
                                <MainText style={{maxWidth: '600px', fontWeight: '700', fontSize: '2.4rem'}}>Nossas mensagens</MainText>
                                <p style={{fontFamily: 'var(--font-quicksand)'}}>A página de criação da mensagem te ensinará tudo. Mas aqui vão alguns passos essenciais para criar uma boa mensagem.</p>
                            </MainTextContainer>
                        </TextContainer>
                    <SubContainer>
                        <div><FeaturesCard title="E-mail" description="Adicione o seu e-mail. O e-mail fornecido receberá o QR CODE da mensagem." src={email} /></div>
                        <div><FeaturesCard title="Música" description="Adicione a sua melhor música direto do seu Spotify." src={spotify} /></div>
                        <div><FeaturesCard title="Imagem" description="Adicione a sua melhor recordação. Só é possível inserir 1 (uma) imagem." src={picture} /></div>
                        <div><FeaturesCard title="Interações" description="Nossas mensagens são interativas para usuários de smartphone. Chacoalhe, aponte para o céu e muito mais! Teste já." src={interact} /></div>
                    </SubContainer>
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