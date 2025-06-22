'use client';

import styled from "styled-components";

export const Container = styled.main`
    padding-top: 40px;
`;

export const MainText = styled.h2`
  font-size: 3.2rem;
  text-align: left;
  font-weight: 1000;
  max-width: 400px;
  line-height: 1;
  font-family: var(--font-quicksand);
`;

export const MainTextContainer = styled.section`
  display: flex;

  align-items: first baseline;
 @media (max-width: 768px) {
      flex-direction: column;
      gap: 40px;
      justify-content: left;
  }
  justify-content: space-between;
  margin: 70px auto;
  width: 100%;
  gap: 100px;
  border-bottom: 1px solid #e6e6E6;
  padding-bottom: 60px;
  
  .subtext-container {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: start;
    width: 100%;
    gap: 10px;
  }
  
  p {
    text-align: left;
    font-family: var(--font-quicksand);
  }
`;

export const Span = styled.span`
   background: linear-gradient(
      to right,
      #884ada 20%,
      #00affa 30%,
      #0190cd 70%,
      #cd43e9 80%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 500% auto;
    animation: textShine 5s ease-in-out infinite alternate;
    white-space: nowrap; /* ← impede quebra de linha */
        font-weight: 700;
        color: #000000;
        font-family: var(--font-quicksand);
`;

export const Content = styled.section`
  align-items: center;
  margin: 0 auto;
  text-align: center;
   @media (max-width: 768px) {
    width: 90%;
   }
  width: 70%;

  .txt-statistic {
     background: linear-gradient(to right, #884ada, #00affa, #0190cd, #cd43e9);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 500% auto;
    animation: textShine 5s ease-in-out infinite alternate;
  }
`;

export const Text = styled.p`
  font-weight: 400;
  font-family: var(--font-quicksand);
`;

export const Introduction = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  background-size: cover;
  background-position: center 40%;
  background-repeat: no-repeat;
  height: 300px;

  .content {  
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: left;
    margin: 50px 30px;
    gap: 5vh;
    font-weight: 200;
    font-size: 100%;
    color: white;

    @media (min-width: 568px) {
      font-size: 1.2rem;
    }

    h2 {
      font-weight: 230;
    }
  }
`;


export const Title = styled.h2`
    text-align: center;
    font-size: 1.4rem;
    font-weight: 400;
    margin: auto;
    width: 90%;
`;