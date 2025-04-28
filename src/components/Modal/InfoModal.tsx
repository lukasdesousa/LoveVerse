import React from 'react';
import { Modal } from 'antd';
import sensorAnimation from 'public/img/animationExample.gif';
import styled from 'styled-components';
import Image from 'next/image';

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ open, onClose }) => {
  return (
      <Modal
        title="Informação sobre a mensagem interativa"
        open={open}
        closeIcon={false}
        onOk={onClose}
        footer={[
          <button key="ok" onClick={onClose} style={{ backgroundColor: '#aa00ff', color: '#fff', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
            Entendi
          </button>
        ]}
        width={600} // ou use uma largura responsiva se quiser, mas direto como valor
      >
        <h2 style={{fontWeight: '300', margin: '5px auto'}}>O que são mensagens <span style={{color: '#aa00ff'}}>interativas</span>?</h2>
        <Text>Mensagens interativas, são mensagens que utilizam dos sensores do smartphone para interagir com o usuário. Um bom exemplo, é na área da data do relacionamento, que é necessária que o usuário aponte o smartphone para o céu, e a mensagem aparecerá!</Text>
        <Container>
          <Image
          src={sensorAnimation.src}
          alt='ilustração das animações com sensores loveverse'
          width={200}
          height={300}
          quality={100}
          layout='responsive'
          style={{maxWidth: '400px', maxHeight: '500px', borderRadius: '10px', display: 'block', margin: 'auto'}}
          />
        </Container>
        <Warn>
          <Text style={{color: '#ff1500', margin: '5px auto'}}>
            <strong>Atenção </strong>
          </Text>
          <Text>
            <strong>Usuários de IOS necessitam aceitar a pemissão para uso dos sensores, será exibido uma solitação antes que acessem a página da mensagem</strong>
          </Text>
        </Warn>
      </Modal>
  );
};

const Container = styled.section`
    margin: 30px auto;
`;

const Warn = styled.section`
  background-color: #d99e5e5a;
  border: 1px solid #ff8c00;
  padding: 10px;
  border-radius: 10px;
`

const Text = styled.p`
  font-weight: 300;
`;

export default InfoModal;
