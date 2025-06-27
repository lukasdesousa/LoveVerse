'use client';

import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, notification, Steps } from 'antd';
import { Box } from '@mui/material';
import PreviewRoullette from '../preview/PreviewRoulette/PreviewRoulette';

const RouletteInputs: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');
  const [item01, setItem01] = useState('');
  const [item02, setItem02] = useState('');
  const [item03, setItem03] = useState('');
  const [item04, setItem04] = useState('');
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const storedTitle = localStorage.getItem('rouletteTitle');
    const storedItens = localStorage.getItem('rouletteItens');

    if (storedTitle) {
      setTitle(storedTitle);
    }
    
    if (storedItens) {
      const itensArray = JSON.parse(storedItens);
      setItem01(itensArray[0] || '');
      setItem02(itensArray[1] || '');
      setItem03(itensArray[2] || '');
      setItem04(itensArray[3] || '');
    }
  }, [])

  const fieldsPerStep = {
    0: title,
    1: item01,
    2: item02,
    3: item03,
    4: item04,
  };

  const steps = [
    {
      title: 'Título',
      content: (
        <div>
      <label htmlFor="item04" style={{ fontFamily: 'var(--font-quicksand)', display: 'block', marginBottom: '5px', fontWeight: '600' }}>
    Título da roleta
    </label>
            <Input
              name="title"
              size="large"
              style={{ width: '100%' }}
              placeholder="O que vamos comer hoje é..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
    {error && (
       <p style={{fontFamily: 'var(--font-quicksand)',fontWeight: '500', color: 'red', marginTop: '3px'}}>Esse campo é obrigatório</p>
    )}
        </div>
      ),
    },
    {
      title: 'Item 1',
      content: (
          <div>
            <label htmlFor="item04" style={{ fontFamily: 'var(--font-quicksand)', display: 'block', marginBottom: '5px', fontWeight: '600' }}>
    Item da roleta
    </label>
            <Input
            maxLength={15}
              name="item01"
              size="large"
              style={{ width: '100%' }}
              placeholder="Item"
              value={item01}
              onChange={(e) => setItem01(e.target.value)}
            />
      {error && (
       <p style={{fontFamily: 'var(--font-quicksand)',fontWeight: '500', color: 'red', marginTop: '3px'}}>Esse campo é obrigatório</p>
    )}
          </div>
      ),
    },
    {
      title: 'Item 2',
      content: (
          <div>
            <label htmlFor="item04" style={{ fontFamily: 'var(--font-quicksand)', display: 'block', marginBottom: '5px', fontWeight: '600' }}>
    Item da roleta
    </label>
            <Input
              name="item02"
              size="large"
              style={{ width: '100%' }}
              placeholder="Item"
              value={item02}
              onChange={(e) => setItem02(e.target.value)}
            />
      {error && (
       <p style={{fontFamily: 'var(--font-quicksand)',fontWeight: '500', color: 'red', marginTop: '3px'}}>Esse campo é obrigatório</p>
    )}
          </div>
      ),
    },
    {
      title: 'Item 3',
      content: (
          <div>
            <label htmlFor="item04" style={{ fontFamily: 'var(--font-quicksand)', display: 'block', marginBottom: '5px', fontWeight: '600' }}>
    Item da roleta
    </label>
            <Input
              name="item03"
              size="large"
              style={{ width: '100%' }}
              placeholder="Item"
              value={item03}
              onChange={(e) => setItem03(e.target.value)}
            />
        {error && (
       <p style={{fontFamily: 'var(--font-quicksand)',fontWeight: '500', color: 'red', marginTop: '3px'}}>Esse campo é obrigatório</p>
    )}
          </div>
      ),
    },
    {
      title: 'Item 4',
      content: (
          <div>
        <label htmlFor="item04" style={{ fontFamily: 'var(--font-quicksand)', display: 'block', marginBottom: '5px', fontWeight: '400' }}>
    Item da roleta
    </label>
            <Input
              name="item04"
              size="large"
              style={{ width: '100%' }}
              placeholder="Item"
              value={item04}
              onChange={(e) => setItem04(e.target.value)}
            />
      {error && (
      <p style={{fontFamily: 'var(--font-quicksand)',fontWeight: '400', color: 'red', marginTop: '3px'}}>Esse campo é obrigatório</p>
    )}
          </div>
      ),
    },
  ];

  useEffect(() => {
    if(!title) {
     localStorage.removeItem('roulette');
    }
  }, [title])

  const next = async () => {
      const currentField = fieldsPerStep[current];

    if(title) {
        localStorage.setItem('roulette', 'true')
    }

    if(!currentField || !currentField.trim()) {
      return setError(true)
    }
  
    setError(false)
    setCurrent((prev) => prev + 1);
  };

  const prev = async () => {
    setCurrent((prev) => prev - 1);
  };

  const handleDone = () => {
    const allItens = [item01, item02, item03, item04];
    localStorage.setItem('rouletteTitle', title);
    localStorage.setItem('rouletteItens', JSON.stringify(allItens));
    api.success({
      message: 'Sucesso',
      description: 'Os itens da roleta foram salvos com sucesso!',
      duration: 5,
      showProgress: true,
    });
  }

  return (
    <>
    {contextHolder}
      <Box
        sx={{
          maxWidth: 800,
          mx: 'auto',
          my: 10,
          '& .ant-steps': {
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
          },
          '& .ant-steps-item-icon': {
            backgroundColor: '#000000 !important',
            borderColor: '#000000 !important',
          },
          '& .ant-steps-item-icon .ant-steps-icon': {
            color: '#0b0b0b !important',
          },
          '& .ant-steps-item-tail': {
            borderColor: '#000000 !important',
          },
        }}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#000000',
            },
          }}
        >
          <Steps
            type="inline"
            current={current}
            items={steps.map((step, index) => ({
              key: String(index),
              title: step.title,
            }))}
            responsive
          />
        </ConfigProvider>
      </Box>

      <Box sx={{ width: '90%', maxWidth: 600, mx: 'auto', mb: 6 }}>
        {steps[current].content}

        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {current > 0 && <Button onClick={prev}>Anterior</Button>}
          {current < steps.length - 1 ? (
            <Button type="primary" onClick={next}>
              Avançar
            </Button>
          ) : (
        <Button type="primary" onClick={handleDone}>
          Feito
        </Button>
          )}
        </Box>
      </Box>

        <PreviewRoullette
          title={title}
          itens={[item01, item02, item03, item04].filter(Boolean)}
        />
    </>
  );
};

export default RouletteInputs;
