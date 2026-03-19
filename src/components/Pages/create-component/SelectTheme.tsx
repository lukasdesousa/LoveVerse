'use client';

import { useState } from "react";
import styled from "styled-components";
import LoveHeader from "@/components/HomeHeader/HomeHeader";
import { Card } from "antd";
import { Meta } from "antd/es/list/Item";
import Image from "next/image";
import LoveCreate from "./themes/love-theme/LoveCreate";
import Create from "./themes/main-theme/Create";

export default function SelectTheme() {
    const [theme, setTheme] = useState<number | null>(null);

    return (
        <>
            <LoveHeader />
            <Container>
                {theme ? (
                    theme === 1 ? (
                        <LoveCreate />
                    ) : (
                        <Create />
                    )
                ) : (
                <section className="cards">
                    <Card
                        className="card"
                        onClick={() => setTheme(1)}
                        hoverable
                        style={{ width: '100%', maxWidth: 240, height: '100%' }}
                        cover={
                            <Image
                                alt="example"
                                src="/img/love-theme.png"
                                width={300}
                                height={300}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        }
                    >
                        <Meta title="Amor" description="Um tema de amor nas cores rosa, branco e roxo. Com animação e carossel de imagens." />
                    </Card>
                    <Card
                        className="card"
                        onClick={() => setTheme(2)}
                        hoverable
                        style={{ width: '100%', maxWidth: 240, height: '100%' }}
                        cover={
                            <Image
                                alt="example"
                                src="/img/theme.png"
                                width={300}
                                height={300}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        }
                    >
                        <Meta title="Interativo" description="Requer movimentos com o smartphone para revelar componentes da cartinha." />
                    </Card>
                </section>
                    
                )}
            </Container>
        </>
    )
}

const Container = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
    margin: auto;

    .cards {
        display: flex;

        @media screen and (max-width: 768px) {
            gap: 20px;
            margin: 20px;
        }
        gap: 50px;
        margin: auto;

        .card:hover {
            box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
        }
    }
`;