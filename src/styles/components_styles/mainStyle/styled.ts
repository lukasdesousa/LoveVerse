'use client';

import styled from "styled-components";

export const Container = styled.main`
    // style
`;

export const Content = styled.section`
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  max-width: 700px;
  text-align: center;

  p {
    width: 100%;
    margin: 20px auto;
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