'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

:root {
    --font-primary: var(--font-quicksand);
  }
  
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
