import * as React from 'react';
import styled from 'styled-components';

const NoPic = () => {
    return (
        <Container>
            <h3>Sem foto</h3>
        </Container>
    )
};

const Container = styled.section`
    height: 200px;
    width: 100%;

    h3 {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: 300;
    }
`;

export default NoPic;