'use client';

import styled from "styled-components";

export const FooterStyle = styled.footer<React.CSSProperties>`
    margin: auto;
    border-top: 1px solid rgba(0, 0, 0, 0.53);
    width: 100%;

    .social-medias {
        display: flex;
        gap: 5px;
        margin: auto;
        justify-content: center;
        align-items: center;

        a {
            cursor:  pointer;
            -webkit-tap-highlight-color: transparent;
        }
    }

    .container {
        margin: 10px auto;
    }
    
    
    p {
        padding: 5px 0;
        font-weight: 600;
        text-align: center;
        font-size: 1rem;
    }

`;