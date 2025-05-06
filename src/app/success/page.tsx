'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { createMessage } from '@/store/userSlice';

export default function SuccessPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleSuccess = async () => {
      const raw = localStorage.getItem('pendingMessage');
      if (!raw) return router.replace('/create');

      const msg = JSON.parse(raw);
      localStorage.removeItem('pendingMessage');

      let imageUrl = '';
      console.log(msg.imageBase64)
      if (msg.imageBase64) {
        try {
          const res = await fetch('/api/uploads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: msg.imageBase64 }),
          });

          const data = await res.json();

          if (!res.ok) throw new Error(data.error);
          imageUrl = data.url;
        } catch (error) {
          console.error('Erro ao enviar imagem:', error);
          alert('Erro ao enviar imagem');
          return router.replace('/create');
        }
      }

      // Atualiza o objeto msg com a URL da imagem
      const newMessage = { ...msg, imageUrl };

      dispatch(createMessage(newMessage))
        .unwrap()
        .then(([created]) => {
          router.replace(`/messages/${created.id}`);
        })
        .catch(() => {
          alert('Erro ao criar mensagem');
          router.replace('/create');
        });
    };

    handleSuccess();
  }, [dispatch, router]);

  return <p style={{display: 'flex', justifyContent: 'center', margin: 'auto', alignItems: 'center'}}>Pagamento confirmado!</p>;
}
