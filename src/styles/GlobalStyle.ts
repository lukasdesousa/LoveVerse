'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

    html, body {
    background: white;
    color: black;
    background-size: cover;
    height: 100vh;
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;
  }

  main {
    flex: 1;
  }

`;
