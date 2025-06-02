'use client';

import dynamic from "next/dynamic";
import { FC } from "react";
import animationData from "@/assets/Animation.json";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { LoadPage } from "../LoadPage/LoadPage";

const Lottie = dynamic(() => import('lottie-react'), {ssr: false})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 90%;
  text-align: center;
  margin: auto;
`;

const Message = styled.h1`
  font-size: 1.8rem;
  font-weight: 300;
  color: #555;
  margin-top: 2rem;
`;

const NotFound: FC = () => {
    const router = useRouter();

  return (
    <LoadPage>
      <Container>
      <h1>Love<span style={{color: '#aa00ff'}}>Verse</span></h1>
        <Lottie animationData={animationData} loop={true} style={{ width: 300, height: 400 }} />
        <Message>Oops! Página não encontrada.</Message>
        <button onClick={() => router.push('/')} style={{
                              marginTop: "1rem",
                              padding: "0.5rem 1.2rem",
                              borderRadius: "8px",
                              border: "none",
                              background: "#aa00ff",
                              color: "white",
                              fontSize: "1rem",
                              cursor: "pointer",
                          }}>
                              Retornar
                          </button>
      </Container>
    </LoadPage>
  );
};

export default NotFound;
