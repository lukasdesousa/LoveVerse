'use client';

import React, { useState } from 'react';
import RouletteAlert from './Alert/RouletteAlert';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const Wheel = dynamic(() => import('react-custom-roulette').then(mod => mod.Wheel), {
  ssr: false,
});

type RouletteItens = {
  title: string;
  itens: string[];
  inComponent?: boolean;
};

const PreviewRoullette: React.FC<RouletteItens> = ({ itens, title, inComponent = false }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const hasValidItems = Array.isArray(itens) && itens.length > 0;

  const fallbackData = [
    { option: 'Item 1', style: { backgroundColor: '#ea41f6', textColor: '#fff' } },
    { option: 'Item 2', style: { backgroundColor: '#9d0383', textColor: '#fff' } },
    { option: 'Item 3', style: { backgroundColor: '#ea41f6', textColor: '#fff' } },
    { option: 'Item 4', style: { backgroundColor: '#9d0383', textColor: '#fff' } }
  ];

  const rouletteData = hasValidItems
    ? itens.map((item, index) => ({
        option: item,
        style: {
          backgroundColor: index % 2 === 0 ? '#ea41f6' : '#9d0383',
          textColor: '#ffffff',
          fontSize: 17,
        },
      }))
    : fallbackData;

  const handleSpinClick = (e) => {
    e.preventDefault();
    const newPrize = Math.floor(Math.random() * rouletteData.length);
    setPrizeNumber(newPrize);
    setMustSpin(true);
    setShowAlert(false);
  };

  return (
    <Container>
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          margin: '10px auto 30px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 2000,
        }}
      >
        <section style={{padding: '20px'}}>
          <h2 className={inComponent ? 'component-title' : ''} style={{fontFamily: 'var(--font-quicksand)', maxWidth: '400px'}}>{title || 'Título da roleta'}</h2>
        </section>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={rouletteData}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#000000']}
          onStopSpinning={() => {
            setMustSpin(false);
            setShowAlert(true);
          }}
          outerBorderColor="#ffffff"
          outerBorderWidth={8}
          innerRadius={20}
          radiusLineColor="#ffffff"
          radiusLineWidth={1}
          fontSize={17}
          perpendicularText
        />
        <button
          onClick={handleSpinClick}
          style={{
            marginTop: '1rem',
            padding: '1rem 2rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            borderRadius: '10px',
            backgroundColor: '#fff',
            border: 'none',
            boxShadow: '0 0.4em 0 rgba(0,0,0,0.25)',
            cursor: 'pointer',
          }}
          disabled={!hasValidItems || mustSpin}
          title={!hasValidItems ? 'Adicione itens à roleta' : 'Clique para girar'}
        >
          GIRAR
        </button>
        <RouletteAlert
          value={rouletteData[prizeNumber]?.option || ''}
          showCard={showAlert}
        />
      </div>
    </Container>
  );
};

const Container = styled.section`

  .component-title {
    background-color: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
  }

`;

export default PreviewRoullette;
