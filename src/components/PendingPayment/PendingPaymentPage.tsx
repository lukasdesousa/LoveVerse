'use client';

import dynamic from "next/dynamic";
import styled from "styled-components";
import animationData from "@/lotties/pending-payment-animation.json";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const Lottie = dynamic(() => import('lottie-react'), {ssr: false})

export default function PendingPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("external_reference");

  useEffect(() => {
    if (!reference) return router.replace('/criar');

    const interval = setInterval(async () => {
      const res = await fetch(`/api/mercado-pago/payment-status?reference=${reference}`);
      const data = await res.json();

      if (data.status === "approved") {
        router.replace("/success");
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [reference, router]);

 return (
      <Container>
        <Message>Pagamento pendente</Message>
        <Lottie animationData={animationData} loop style={{ width: 300, height: 400 }} />
        <Message style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
          Aguardando a confirmação de pagamento...
        </Message>
        <Message style={{ fontWeight: '400', fontSize: '1.3rem' }}>
          Aguarde, você será redirecionado automaticamente.
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
  font-family: var(--font-quicksand);
`;

const Message = styled.h1`
  font-size: 1.8rem;
  color: #555;
  margin: 10px auto;
`;
