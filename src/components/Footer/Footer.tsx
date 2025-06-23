'use client';

import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Footer: React.FC = () => {
    return <>
        <section style={{backgroundColor: 'black'}}>
            <Container>
                <Logo>
                    <h2>LoveVerse</h2>
                    <p>Conectando, aproximando e formando conexões em meios digitais com soluções inovadoras.</p>
                <p className='since'>&copy; 2025 LoveVerse Space</p>
                </Logo>
                       <SubContainer>
                        <ItensContainer>
                          <Item href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                <h4>Voltar</h4>
                            </Item>                        
                            <Item href={'/contato/loveverse'}>
                                <h4>Contato</h4>
                            </Item>
                            <Item href={'/tutorial/loveverse'}>
                                <h4>Tutorial</h4>
                            </Item>
                            <Item href={'/termos/loveverse'}>
                                <h4>Termos de uso</h4>
                            </Item>
                        </ItensContainer>
                        <SocialMediaContainer>
                            <Item href={'https://www.tiktok.com/@loveverse.space?is_from_webapp=1&sender_device=pc'} target="_blank" rel="noopener noreferrer">
                                <h4>TikTok</h4>
                            </Item>
                            <Item href={'https://www.instagram.com/loveversespace/'} target="_blank" rel="noopener noreferrer">
                                <h4>Instagram</h4>
                            </Item>
                        </SocialMediaContainer>
                       </SubContainer>
            </Container>
        </section>
    </>
}

const Container = styled.footer<React.CSSProperties>`
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    width: 90%;
  }
    padding: 80px 0px;
    margin: 50px auto;
    width: 70%;
    font-family: var(--font-quicksand);
    border-top: 2px solid #e6e6e6;
    color: white;
`;

const Logo = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: start;
    font-weight: 600;
    gap: 10px;
    width: 260px;
     @media (max-width: 768px) {
    width: 100%;
  }

    .since {
        margin-top: 20px;
    }

    p {
        opacity: 0.5;
    }
    
    h2 {
        margin-bottom: 5px;
    }

`;

const SubContainer = styled.section`
    display: flex;
    flex-wrap: nowrap;
    gap: 30px;
`;

const ItensContainer = styled.section`
display: flex;
flex-direction: column;
align-items: start;
justify-content: left;
gap: 13px;

`;

const SocialMediaContainer = styled.section`
display: flex;
flex-direction: column;
align-items: start;
justify-content: left;
gap: 13px;
`;

const Item = styled(Link)`
  position: relative;
  display: inline-block;
  opacity: 0.8;
  font-weight: 500;
  color: white;
  text-decoration: none;
  overflow: hidden;
  transition: 5ms;
  border-radius: 10px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent 0%,
      rgb(255, 255, 255) 50%,
      transparent 100%
    );
    transform: skewX(-20deg);
  }

  &:hover::after {
    animation: brilhoEstrela 0.6s ease-in-out forwards;
  }

  &:hover {
    opacity: 1;
  }

  @keyframes brilhoEstrela {
    0% {
      left: -75%;
    }
    100% {
      left: 125%;
    }
  }
`;


export default Footer;