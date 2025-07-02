'use client';

import { Select } from "antd";
import React from "react";
import styled from "styled-components";

export default function Themes() {
    return (
        <>
            <Container>
           
                    <Select
                    className="select"
        defaultValue="1"
        style={{ width: '100%' }}
        size="large"
        onChange={(e) => localStorage.setItem('theme', e)}
        options={[
            { value: '1', label: 'Namorados (Corações + cor de fundo rosa)' },
            { value: '2', label: 'Amizade (Emoji + cor de fundo amarelo)' },
        ]}
        />
            </Container>
        </>
    );
}

const Container = styled.section`
    margin: auto;
`;