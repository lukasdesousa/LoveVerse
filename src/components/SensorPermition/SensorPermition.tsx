'use client';

import { useEffect, useState } from "react";
import useSensorSupport from "@/hooks/useSensorSupport";
import styled from "styled-components";
import { LoadPage } from "../LoadPage/LoadPage";

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
                    setPermissionGranted(true); // Mesmo negando, libera.
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
        <LoadPage>
            <Container>
                <div style={{ color: "black", textAlign: "center" }}>
                    <h1>Love<span>Verse</span></h1>
                    <section className="info">
                        <h2>Habilite o sensores</h2>
                        <p>A página contém mensagens animadas, utilizamos dos sensores do seu smartphone para melhorar a sua experiência. Isso não é obrigatório. <strong>Essa ação é necessária somente para usuários IOS.</strong></p>
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
        </LoadPage>
    );
}

const Container = styled.section`
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 90%;
  text-align: center;
  margin: auto;
  font-family: var(--font-quicksand);

  h1 {
    span {
    background: linear-gradient(to right, #884ada, #00affa, #0190cd, #cd43e9);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 500% auto;
    animation: textShine 5s ease-in-out infinite alternate;
  }
  }
    

    section.info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 30px;
        width: 80%;
        max-width: 500px;
        margin: 120px auto;
    }

    p {
        font-weight: 500;
        text-align: left;
    }
`;
