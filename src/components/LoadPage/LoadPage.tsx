'use client';

import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export function LoadPage({ children }: { children: React.ReactNode; }) {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
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
            height: '100vh'
        }}>
            <CircularProgress style={{ color: '#aa00ff' }} />
        </div>
    )
};