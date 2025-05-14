'use client';

import dynamic from "next/dynamic";
import styled from "styled-components";
import animationData from "@/assets/pending-payment-animation.json";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const Lottie = dynamic(() => import('lottie-react'), {ssr: false})

export default function Index() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("external_reference");

  useEffect(() => {
    if (!reference) return;

    const interval = setInterval(async () => {
      const res = await fetch(`/api/payment-status?reference=${reference}`);
      const data = await res.json();

      if (data.status === "approved") {
        router.replace("/success");
      }
    }, 4000); // verifica a cada 3 segundos

    return () => clearInterval(interval);
  }, [reference, router]);

 return (
    <Container>
      <Message>Pagamento pendente</Message>
      <Lottie animationData={animationData} loop style={{ width: 300, height: 400 }} />
      <Message style={{ fontWeight: 300, fontSize: '1.3rem' }}>
        Aguardando a confirmação de pagamento...
      </Message>
      <Message style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
        Não saia desta página
      </Message>
    </Container>
  );
}

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
