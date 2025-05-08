'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { createMessage } from '@/store/userSlice';
import styled from 'styled-components';
import Lottie from "lottie-react";
import animationData from "@/assets/lovepet.json";
import { Progress } from 'antd';
import { SendEmail } from '@/lib/SendEmail';

export default function SuccessPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [percentValue, setPercent] = useState(0);

  useEffect(() => {
    const handleSuccess = async () => {
      const raw = localStorage.getItem('pendingMessage');
      if (!raw) return router.replace('/create');
      setPercent(10)
      const msg = JSON.parse(raw);
      let imageUrl = '';
      setPercent(30)

      if (msg.imageBase64) {
        try {
          // Converte Base64 para Blob
          const byteString = atob(msg.imageBase64.split(',')[1]);
          const mimeString = msg.imageBase64.split(',')[0].split(':')[1].split(';')[0];
          setPercent(40)

          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          setPercent(50)
          const blob = new Blob([ab], { type: mimeString });

          // Cria FormData
          const formData = new FormData();
          formData.append('file', blob, 'image.jpg');

          const response = await fetch('/api/uploads', {
            method: 'POST',
            body: formData,
          });
          setPercent(55)

          if (!response.ok) {
            const resultText = await response.text();
            throw new Error(resultText || `Erro HTTP ${response.status}`);
          }

          const result = await response.json();
          imageUrl = result.url;
          setPercent(60)
        } catch (err) {
          console.error('Erro no envio da imagem:', err);
          alert('Erro ao enviar imagem. Tente novamente.');
          return router.replace('/create');
        }
      }
      localStorage.removeItem('pendingMessage');
      const newMessage = { ...msg, imageUrl};
      console.log(newMessage)

      dispatch(createMessage(newMessage))
      .unwrap()
      .then(([created]) => {
          setPercent(100)
          router.replace(`/messages/${created.id}`)
          sendMessageEmail(created.email, created.id)
        })
        .catch(() => {
          alert('Erro ao criar a mensagem');
          router.replace('/create');
        });
      };

      function sendMessageEmail(email: string, id: string) {
        setTimeout(() => {
          SendEmail(email, id)
        }, 19000)
      }
      
    handleSuccess();
  }, [dispatch, router]);

  return (
    <Container>
      <Message>Pagamento confirmado!</Message>
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: 300, height: 400 }}
      />
      <Progress percent={percentValue}/>
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