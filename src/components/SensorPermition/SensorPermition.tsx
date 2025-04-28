"use client";

import { useEffect, useState } from "react";
import useSensorSupport from "@/hooks/useSensorSupport";
import styled from "styled-components";

export default function SensorPermissionGate({
    children,
}: {
    children: React.ReactNode;
}) {
    const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
    const [, setIsIOS] = useState(false);
    const sensorSupport = useSensorSupport();

    useEffect(() => {
        const ua = window.navigator.userAgent;
        setIsIOS(/iPhone|iPad|iPod/i.test(ua));

        const storedPermission = localStorage.getItem("sensor-permission");

        if (storedPermission === "granted") {
            setPermissionGranted(true);
            return;
        }

        if (!/iPhone|iPad|iPod/i.test(ua)) {
            setPermissionGranted(true);
            localStorage.setItem("sensor-permission", "granted");
            return;
        }

        if (sensorSupport) {
            setPermissionGranted(true);
            localStorage.setItem("sensor-permission", "granted");
        }
    }, [sensorSupport]);

    const requestPermission = async () => {
        try {
            // @ts-expect-error ignore
            if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
                // @ts-expect-error ignore
                const response = await DeviceMotionEvent.requestPermission();
                if (response === "granted") {
                    setPermissionGranted(true);
                    localStorage.setItem("sensor-permission", "granted");
                } else {
                    setPermissionGranted(true); // Mesmo negando, libera (como você já fez)
                    localStorage.setItem("sensor-permission", "granted");
                }
            } else {
                setPermissionGranted(true);
                localStorage.setItem("sensor-permission", "granted");
            }
        } catch (err) {
            alert(`Ocorreu um erro ${err}`);
            setPermissionGranted(false);
        }
    };

    if (permissionGranted === true) {
        return <>{children}</>;
    }

    return (
        <Container>
            <div style={{ color: "black", textAlign: "center" }}>
                <h1>Love<span style={{ color: '#aa00ff' }}>Verse</span></h1><br />
                <section className="info">
                    <h2>Permita os sensores</h2>
                    <p>O usuário que criou esta mensagem optou por mensagens iterativas, para acessar a mensagem completa, precisamos da sua permissão para usar sensores do dispositivo para exibir as mensagens animadas. <strong>Essa ação é necessária para usuários IOS</strong></p>
                    <button onClick={requestPermission} style={{
                        marginTop: "1rem",
                        padding: "0.5rem 1.2rem",
                        borderRadius: "8px",
                        border: "none",
                        background: "#aa00ff",
                        color: "white",
                        fontSize: "1rem",
                        cursor: "pointer",
                    }}>
                        Permitir acesso
                    </button>
                </section>
            </div>
        </Container>
    );
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    
    h2 {
        margin-top: 20px;
    }

    section.info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        width: 80%;
        margin: 200px auto;
    }

    p {
        font-weight: 300;
    }
`;
