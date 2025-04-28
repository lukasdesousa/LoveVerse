"use client";

import styled from "styled-components";
import backgroundMountain from 'public/img/background-mountain.svg';

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
    margin-top: 20px;
  }
`;

export const Text = styled.p`
  font-weight: 200;
`;

export const Introduction = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  background-image: url(${backgroundMountain.src});
  background-size: cover;
  background-position: center 40%;
  background-repeat: no-repeat;
  height: 300px;

  .content {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: left;
    margin: 60px 30px;
    gap: 5vh;
    font-weight: 200;
    font-size: 20px;
    color: white;

    h2 {
      font-weight: 300;
    }
  }
`;


export const Title = styled.h2`
    text-align: center;
    font-size: 23px;
    font-weight: 400;
`;