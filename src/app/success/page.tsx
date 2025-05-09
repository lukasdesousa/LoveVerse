'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Lottie from "lottie-react";
import animationData from "@/assets/lovepet.json";
import { Progress } from 'antd';
import { SendEmail } from '@/lib/SendEmail';

export default function SuccessPage() {
  const router = useRouter();
  const [percentValue, setPercent] = useState(0);

  useEffect(() => {
    const handleSuccess = async () => {
      const raw = localStorage.getItem('pendingMessage');
      if (!raw) return router.replace('/create');

      setPercent(10);
      const msg = JSON.parse(raw);
      let imageUrl = '';
      setPercent(30);

      // Upload da imagem, se houver
      if (msg.imageBase64) {
        try {
          const byteString = atob(msg.imageBase64.split(',')[1]);
          const mimeString = msg.imageBase64.split(',')[0].split(':')[1].split(';')[0];
          setPercent(40);

          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          setPercent(50);

          const blob = new Blob([ab], { type: mimeString });
          const formData = new FormData();
          formData.append('file', blob, 'image.jpg');

          const response = await fetch('/api/uploads', {
            method: 'POST',
            body: formData,
          });
          setPercent(55);

          if (!response.ok) {
            const resultText = await response.text();
            throw new Error(resultText || `Erro HTTP ${response.status}`);
          }

          const result = await response.json();
          imageUrl = result.url;
          setPercent(60);
        } catch (err) {
          console.error('Erro no envio da imagem:', err);
          alert('Erro ao enviar imagem. Tente novamente.');
          return router.replace('/create');
        }
      }

      localStorage.removeItem('pendingMessage');
      const newMessage = { ...msg, imageUrl };

      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMessage),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Erro ao criar mensagem');
        }

        const data = await response.json();
        const created = data.message;
        setPercent(100);

        router.replace(`/messages/${created.id}`);
        sendMessageEmail(created.email, created.id);
      } catch (err) {
        alert(`Erro ao criar a mensagem: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
        router.replace('/create');
      }
    };

    function sendMessageEmail(email: string, id: string) {
      if (!id) return;
      setTimeout(() => {
        SendEmail(email, id);
      }, 19000);
    }

    handleSuccess();
  }, [router]);

  return (
    <Container>
      <Message>Pagamento confirmado!</Message>
      <Lottie animationData={animationData} loop={true} style={{ width: 300, height: 400 }} />
      <Progress percent={percentValue} />
      <Message style={{ fontWeight: '300', fontSize: '1.3rem' }}>
        Aguarde enquanto a mágica acontece...
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

  h1 {
    margin-bottom: 20px;
  }
`;

const Message = styled.h1`
  font-size: 1.8rem;
  color: #555;
  margin: 10px auto;
`;
