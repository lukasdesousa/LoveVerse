'use client';

import dynamic from "next/dynamic";
import { FC, useEffect } from "react";
import animationData from "@/lotties/Failure-animation.json";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";

const Lottie = dynamic(() => import('lottie-react'), {ssr: false})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 90%;
  text-align: center;
  margin: auto;
  font-family: var(--font-quicksand);

   span {
    background: linear-gradient(to right, #884ada, #00affa, #0190cd, #cd43e9);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 500% auto;
    animation: textShine 5s ease-in-out infinite alternate;
  }
`;

const Message = styled.h1`
  color: #555;
  margin: 10px auto;
`;

const Failure: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Verifica query param 'status' vindo do retorno do Mercado Pago
    const status = searchParams.get('status');
    // Se não for 'failure', redireciona para criação
    if (status !== 'failure') {
      //router.push('/criar');
      return;
    }
  }, [searchParams, router]);

  return (
    <Container>
      <h1>
        Love<span style={{ color: '#aa00ff' }}>Verse</span>
      </h1>
      <Lottie
        animationData={animationData}
        loop={false}
        style={{ width: 300, height: 400 }}
      />
      <Message style={{fontSize: '1.5rem'}}>Oops! O pagamento não deu certo :(</Message>
      <Message style={{ fontWeight: '500', fontSize: '1.3rem' }}>
        Vamos tentar de novo?
      </Message>
      <button
        onClick={() => router.push('/criar')}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1.2rem',
          borderRadius: '8px',
          border: 'none',
          background: '#aa00ff',
          color: 'white',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        Tentar novamente
      </button>
    </Container>
  );
};

export default Failure;
