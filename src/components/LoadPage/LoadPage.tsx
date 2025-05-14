'use client';

import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export function LoadPage({ children }: { children: React.ReactNode; }) {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1300)
    }, [children])

    if (loading === false) {
        return <>{children}</>
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh' // opcional: para centralizar também verticalmente na tela toda
        }}>
            <CircularProgress style={{ color: '#aa00ff' }} />
            <p style={{fontWeight: '300'}}>Alinhando tudo</p>
        </div>
    )
};