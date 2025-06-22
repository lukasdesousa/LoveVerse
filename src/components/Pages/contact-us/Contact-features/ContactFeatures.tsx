'use client';

import styled from "styled-components";
import { MainText } from "@/styles/components_styles/mainStyle/styled";
import FeaturesCard from "@/components/MainPage/Containers/Features/Card/FeaturesCard";
import metalicInstagram from "public/img/metalic-instagram.png";
import email from "public/img/metalic-email.png";

export default function ContactFeatures() {
    return (
        <section style={{margin: 'auto'}}>
            <Container>
                <Content>
                        <TextContainer>
                            <MainTextContainer>
                                <p style={{fontFamily: 'var(--font-quicksand)', marginBottom: '8px', marginLeft: '5px', opacity: 0.7}}>Alguma dúvida?</p>
                                <MainText style={{maxWidth: '600px', fontWeight: '700', fontSize: '2.4rem'}}>Entre em contato</MainText>
                                <p style={{fontFamily: 'var(--font-quicksand)'}}>Vamos atender a sua solicitação o mais breve possível. Em caso de algum imprevisto, solicite o reembolso através do nosso e-mail.</p>
                            </MainTextContainer>
                        </TextContainer>
                    <SubContainer>
                        <div><FeaturesCard title="Email" description="Entre em contato conosco através de nosso e-mail: loveversespace@gmail.com" src={email} /></div>
                        <div><FeaturesCard title="Instagram" description="Também poderá encontrar a LoveVerse nas redes sociais: @loveverse.space" src={metalicInstagram} /></div>
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