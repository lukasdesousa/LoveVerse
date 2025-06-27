'use client';

import React, { useState } from 'react';
import Header from '@/components/HomeHeader/HomeHeader';
import { Button, notification } from 'antd';
import styled from 'styled-components';
import { LoadPage } from '@/components/LoadPage/LoadPage';
import TextArea from 'antd/es/input/TextArea';

function HelpUs() {
    const [content, setContent] = useState('');
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false)

    const submitValue = async () => {
        if (!content) {
            return api.warning({
                message: 'Aviso',
                description: 'Preencha o campo antes de enviar',
                duration: 5,
                showProgress: true,
            })
        }
        setLoading(true)
        const uploadRes = await fetch('/api/help_us', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text_content: content }),
        });

        if (uploadRes.ok) {
            api.success({
                message: 'Enviado!',
                description: 'Obrigado pela sua sugestão ❤️',
                duration: 5,
                showProgress: true,
            });
            setContent('');
        }
        setLoading(false)
    };

    return (
        <>
            <LoadPage>
                {contextHolder}
                <Header />
                <Container>
                    <h2>
                        Ajude-nos a melhorar.
                    </h2>
                    <p>Obrigado por usar a LoveVerse! Envie-nos suas propostas de melhorias para nós. Todas as propostas serão cuidadosamente analisadas e bem-vindas!</p>
                    <section>
                        <TextArea rows={4} style={{ width: '100%', maxHeight: '110px' }} maxLength={500} placeholder='Eu gostaria que...' value={content} onChange={e => setContent(e.currentTarget.value)} />
                        <Button loading={loading} type='primary' onClick={() => submitValue()} >
                            Enviar
                        </Button>
                    </section>
                </Container>
            </LoadPage>
        </>
    );
}

const Container = styled.section`
    margin: auto;
    font-family: var(--font-quicksand);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    height: 400px;
    width: 90%;
    max-width: 700px;
    border-radius: 10px;
    padding: 10px;

    h2 {
        text-align: left;
        margin: 20px;
    }

    p {
        margin: 20px;
        width: 90%;
    }

    section {
       display: flex;
       flex-direction: column;
       align-items: start;
       justify-content: left;
       width: 80%;
       gap: 20px;
       margin: 20px;

       p {
        margin: 0;
        font-size: 1rem;
       }
    }
`;

export default HelpUs;
