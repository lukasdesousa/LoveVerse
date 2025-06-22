'use client';

import styled from "styled-components";
import { MainText } from "@/styles/components_styles/mainStyle/styled";
import FeaturesCard from "@/components/MainPage/Containers/Features/Card/FeaturesCard";
import picture from "public/img/picture-terms.png";
import text from "public/img/text-terms-02.png";
import scam from "public/img/scam-alert-terms.png";
import badMessage from "public/img/bad-message-terms.png";
import edit from "public/img/edit-terms.png";

export default function TermsColumn() {
    return (
        <section style={{margin: 'auto'}}>
            <Container>
                <Content>
                        <TextContainer>
                            <MainTextContainer>
                                <p style={{fontFamily: 'var(--font-quicksand)', marginBottom: '8px', marginLeft: '5px', opacity: 0.7}}>Esteja ciente</p>
                                <MainText style={{maxWidth: '600px', fontWeight: '700', fontSize: '2.4rem'}}>Seja responsável</MainText>
                                <p style={{fontFamily: 'var(--font-quicksand)'}}>Assim como em qualquer lugar, você é responsável pelo que faz. Na LoveVerse não é diferente:</p>
                            </MainTextContainer>
                        </TextContainer>
                    <SubContainer>
                        <div><FeaturesCard title="Fotos" description="Você é responsável por qualquer foto que inserir ao criar sua mensagem." src={picture} /></div>
                        <div><FeaturesCard title="Textos" description="Todo texto que inserir na mensagem é por sua responsabilidade e autoria." src={text} /></div>
                        <div><FeaturesCard title="Tentativas de fraude" description="Não devolveremos o dinheiro em casos de tentativas de fraude identificadas." src={scam} /></div>
                        <div><FeaturesCard title="Mensagens ofensivas" description="Não nos responsabilizamos por mensagens ofensivas ou cujo objetivo seja diferente do proposto pela LoveVerse." src={badMessage} /></div>
                        <div><FeaturesCard title="Editar mensagem" description="Após criada, você terá direito a editar a mensagem apenas 1 (uma) única vez." src={edit} /></div>
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