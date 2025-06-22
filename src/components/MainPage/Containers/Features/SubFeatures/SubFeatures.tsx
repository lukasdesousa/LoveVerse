'use client';

import styled from 'styled-components';
import { LockOutlined } from '@ant-design/icons';
import { ShopFilled } from '@ant-design/icons';
import { CheckCircleOutlined } from '@ant-design/icons';

export default function SubFeatures() {
    return (
        <Container>
            <Content>
                <LockOutlined style={{ marginLeft: '1px'}}/>
                <h4>Pagamento seguro</h4>
                <p>Seu pagamento na LoveVerse é segurado por Mercado Pago.</p>
            </Content>
            <Content>
                <ShopFilled style={{ marginLeft: '1px'}}/>
                <h4>Ambiente controlado</h4>
                <p>A LoveVerse não tem acesso aos seus dados sensíveis.</p>
            </Content>
            <Content>
                <CheckCircleOutlined style={{ marginLeft: '1px'}}/>
                <h4>Garantia</h4>
                <p>Algo de errado ocorreu durante a criação de sua mensagem? Devolvemos 100% do seu dinheiro.</p>
            </Content>
        </Container>
    )
};


const Container = styled.section`
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: left;
        margin: 50px 0px;
    }
    align-items: center;
    padding: 20px;
    margin: 50px auto;
    width: 70%;
    gap: 20px;
    @media (max-width: 768px) {
       gap: 50px;
    }
`;

const Content = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: start;
    gap: 12px;
  
    font-family: var(--font-quicksand);

    p {
        width: 200px;
        @media (max-width: 768px) {
        width: 300px;
    }
    }
`;
