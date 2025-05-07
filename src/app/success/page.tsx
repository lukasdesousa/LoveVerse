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
      
      let imageUrl = '';
      if (msg.imageBase64) {
        try {
          const response = await fetch('/api/uploads', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: msg.imageBase64 }),
          });

          // Se não for 2xx, grave o texto bruto e lance erro
          if (!response.ok) {
            const text = await response.text();
            console.error('Upload falhou:', response.status, text);
            throw new Error(text || `HTTP ${response.status}`);
          }

          const result = await response.json();
      
          if (!response.ok) {
            console.error('Erro na resposta do upload:', result.error);
            throw new Error(result.error || 'Erro desconhecido ao enviar imagem');
          }
          
          imageUrl = result.url;
          localStorage.removeItem('pendingMessage');
        } catch (err) {
          console.error('Erro ao enviar imagem para o servidor:', err);
          alert('Erro ao enviar imagem. Por favor, tente novamente.');
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
