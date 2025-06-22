'use client';

import dynamic from "next/dynamic";
import { FC, useEffect } from "react";
import animationData from "@/assets/Failure-animation.json";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";

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
      router.push('/criar');
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
        loop={true}
        style={{ width: 300, height: 400 }}
      />
      <Message>Oops! O pagamento não deu certo :(</Message>
      <Message style={{ fontWeight: '300', fontSize: '1.5rem' }}>
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
