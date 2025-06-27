'use client';

import styled from "styled-components";

type Props = {
  value: string;
  showCard?: boolean;
};

export default function RouletteAlert({ value, showCard}: Props) {
  return (
    <Container showAlert={showCard}>
      <SubContainer>
        <h5>Você caiu em:</h5>
        <p>{value}</p>
      </SubContainer>
    </Container>
  );
}

const Container = styled.section.withConfig({ shouldForwardProp: (prop) => prop !== 'showAlert' })<{ showAlert?: boolean }>`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  width: 500px;
  z-index: 10000;
  display: ${({ showAlert }) => (showAlert ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  pointer-events: none;
  animation: ${({ showAlert }) => (showAlert ? 'alert-anim linear 0.3s 1' : 'none')};;

  @keyframes alert-anim {
    0% {
      opacity: 0;
      top: 70%;
    } 50% {
      opacity: 0.5;
      top: 65%;
    }
    100% {
      opacity: 1;
      top: 55%;
    }
  }

  p {
    color: black;
  }

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const SubContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 30px;
  font-family: var(--font-quicksand);
  text-align: center;
`;
