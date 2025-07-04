'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import animationData from "@/lotties/lovepet.json";
import { Progress } from 'antd';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function SuccessPage() {
  const router = useRouter();
  const [percentValue, setPercent] = useState(0);

  useEffect(() => {
    const handleSuccess = async () => {
      const raw = localStorage.getItem('pendingMessage');
      if (!raw) return router.replace('/criar');

      setPercent(10);
      const msg = JSON.parse(raw);
      let imageUrl = '';
      setPercent(30);

      // Upload da imagem, se houver base64
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

          const uploadRes = await fetch('/api/uploads', {
            method: 'POST',
            body: formData,
          });
          setPercent(55);

          if (!uploadRes.ok) {
            const resultText = await uploadRes.text();
            throw new Error(resultText || `Erro HTTP ${uploadRes.status}`);
          }

          const uploadData = await uploadRes.json();
          imageUrl = uploadData.url;
          setPercent(60);
        } catch (err) {
          console.error('Erro no envio da imagem:', err);
          alert('Erro ao enviar imagem. Tente novamente.');
          return router.replace('/criar');
        }
      }

      // Limpa o localStorage e remove o base64 antes de enviar a mensagem
      localStorage.removeItem('pendingMessage');
      localStorage.removeItem('rouletteItens');
      localStorage.removeItem('rouletteTitle');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { imageBase64, ...rest } = msg;
      const newMessage = { ...rest, imageUrl };

      try {
        const res = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMessage),
        });

        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(text);
        }

        if (!res.ok) {
          throw new Error(data.error || 'Erro ao criar mensagem');
        }

        const created = data.message;
        setPercent(100);
        router.replace(`/messages/${created.id}`);
      } catch (err) {
        alert(`Erro ao criar a mensagem: ${err instanceof Error ? err.message : 'Desconhecido'}`);
        router.replace('/criar');
      }
    };

    handleSuccess();
  }, [router]);

  return (
    <Container>
      <Message>Tudo pronto!</Message>
      <Lottie animationData={animationData} loop style={{ width: 300, height: 400 }} />
      <Progress style={{ width: '90%', maxWidth: '400px' }} percent={percentValue} />
      <Message style={{ fontWeight: 600, fontSize: '1.3rem' }}>
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
`;

const Message = styled.h1`
  font-size: 1.8rem;
  color: #555;
  margin: 10px auto;
  font-family: var(--font-quicksand);
`;
