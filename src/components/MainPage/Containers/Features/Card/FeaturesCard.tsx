'use client';

import styled from "styled-components";
import Image, { StaticImageData } from "next/image";

type Src = {
    src: StaticImageData;
    title: string;
    description: string;
};

/* 
 <Image 
            src={src}
            alt="Imagem de descrição"
            quality={100}
            placeholder="blur"
            />
*/

export default function FeaturesCard({ src, title, description }: Src) {
    return (
        <Container>
            <SubContainer>
                <h5>{title}</h5>
                <p>{description}</p>
                <Image
                src={src}
                alt="Imagem de descrição"
                quality={100}
                width={400}
                height={400}
                style={{margin: 'auto'}}
                />
            </SubContainer>
        </Container>
    )
};

    const Container = styled.section`
    height: 200px;
    width: 500px;
    @media (max-width: 1200px) {
        width: 90vw;
    }
    margin: 0px auto;
    `;

const SubContainer = styled.div`
    background-color: white;
    max-height: 400px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: left;
    overflow: hidden;
    font-family: var(--font-quicksand);

    img {
      display: block;
      margin: auto;
    }

    p {
        margin: 10px 0px;
    }

    h5 {
        font-size: 1.3rem;
    }
`;
