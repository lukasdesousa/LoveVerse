'use client';

import React, { useState } from 'react';
import RouletteAlert from './Alert/Roulette';
import dynamic from 'next/dynamic';

// Importa dinamicamente a roleta (client-only)
const Wheel = dynamic(() => import('react-custom-roulette').then(mod => mod.Wheel), {
  ssr: false,
});

const rouletteData = [
  { option: 'Quero te amar', style: { backgroundColor: '#f44336', textColor: '#fff' } },
  { option: 'lorem ipslu dlor', style: { backgroundColor: '#3f51b5', textColor: '#fff' } },
  { option: 'chimbinha', style: { backgroundColor: '#4caf50', textColor: '#fff' } },
  { option: 'Aloha papai e hoje', style: { backgroundColor: '#ff9800', textColor: '#fff' } }
];

const Roullette = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const handleSpinClick = () => {
    const newPrize = Math.floor(Math.random() * rouletteData.length);
    setPrizeNumber(newPrize);
    setMustSpin(true);
    setShowAlert(false); // oculta enquanto gira
  };

  return (
    <>
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: '2000'
        }}
      >
        <h2>Título da roleta</h2>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={rouletteData}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#ffffff']}
          onStopSpinning={() => {
            setMustSpin(false);
            setShowAlert(true); // mostra quando para
          }}
          outerBorderColor={'#ffffff'}
          outerBorderWidth={8}
          innerRadius={20}
          radiusLineColor={'#eeeeee'}
          radiusLineWidth={1}
          fontSize={17}
          perpendicularText={true}
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
            zIndex: '1000'
          }}
        >
          GIRAR
        </button>
      {/* ALERTA CENTRAL NA TELA */}
      <RouletteAlert value={rouletteData[prizeNumber].option} showCard={showAlert} />
      </div>

    </>
  );
};

export default Roullette;
