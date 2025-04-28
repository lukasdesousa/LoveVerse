"use client";

import React from 'react';
import { Select } from 'antd';

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

export const SelectTheme
: React.FC = () => (
  <Select
    defaultValue="Rosa"
    style={{ width: '100%', height: '50px' }}
    onChange={handleChange}
    options={[
      {
        label: <span>manager</span>,
        title: 'Temas',
        options: [
          { label: <span>Azul</span>, value: 'azul' },
          { label: <span>Branco</span>, value: 'branco' },
          { label: <span>Rosa</span>, value: 'Rosa' },
        ],
      },
    ]}
  />
);

