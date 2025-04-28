'use client';

import React, { useEffect, useState } from "react";
import { Button, Form, Grid, Input, notification, theme, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import styled from "styled-components";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function Index() {
  const { token } = useToken() ?? { paddingXL: 24, sizeXXL: 48, colorTextSecondary: "#8c8c8c", colorBgContainer: "#fff" };
  const screens = useBreakpoint();
  const [api, contextHolder] = notification.useNotification();
  const [buttonVrf, setButtonVrf] = useState(false);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const styles = {
    container: {
      margin: "20% auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.paddingXL}px ${token.padding}px`,
      width: "90%",
      maxWidth: "350px",
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "left" as const,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    signup: {
      marginTop: token.marginLG,
      textAlign: "center" as const,
      width: "100%",
    },
    text: {
      color: token.colorTextSecondary,
      fontWeight: '350',
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  useEffect(() => {
    const sendCode = async () => {
      await fetch("/api/auth/email/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user?.email }),
      });
    };

    if (user) sendCode();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!user) {
    return router.push('/login')
  }

  const resendCode = async () => {
    try {
       const res = await fetch("/api/auth/email/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: user.email}),
      });

      if(res.ok) {
        api.success({
          message: 'Codigo enviado',
          description: 'Verifique sua caixa de entrada e também o SPAM',
          showProgress: true,
          duration: 5,
        });
      }
    } catch(err) {
      api.error({
        message: 'Erro ao enviar o código',
        description: `Erro ao enviar: ${err}`,
        showProgress: true,
        duration: 5,
      })
    }
  }

  const onFinish = async (values) => {
    setButtonVrf(true);
    try {
      const res = await fetch("/api/auth/email/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: user.email, code: values.code}),
      });
  
      if(res.ok) {
        dispatch(fetchUser());
        router.push('/login');
        api.success({
          message: 'E-mail verificado com sucesso!',
          description: 'Você pode agora criar mensagens.',
          showProgress: true,
          duration: 5,
        });
        router.push('/')
      } else {
        api.error({
          message: 'Erro ao verificar o código',
          description: 'Verifique se o código é válido e não expirou.',
          showProgress: true,
          duration: 5,
        });
      }
      setButtonVrf(false)
    } catch(err) {
      setButtonVrf(false)
      alert(err)
    }
  }

  return (
    <section style={styles.section}>
      {contextHolder}
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>Love<span style={{ color: '#6110ed75' }}>Verse</span></h1>
          <br />
          <Title style={styles.title}>Verifique seu e-mail</Title>
          <Text style={styles.text}>
            Insira o código de 6 digítos enviados em seu e-mail.
          </Text>
        </div>
        <Form name="normal_signup" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "Insira um código válido",
              },
            ]}
          >
            <Container><Input type="number" maxLength={6} prefix={<UserOutlined />} placeholder="Código" /></Container>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button disabled={buttonVrf} block type="primary" htmlType="submit" style={{ backgroundColor: '#6110ed75' }}>
              Verificar
            </Button>
            <div style={styles.signup}>
              <Text style={styles.text}>Código não chegou? </Text>
                <button style={{ border: 'none', backgroundColor: 'transparent', color: 'blue', cursor: 'pointer' }} onClick={resendCode}>Reenviar</button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );

}

const Container = styled.section`
    input[type="number"] {
  appearance: textfield; /* Standard */
  -moz-appearance: textfield; /* Firefox */
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none; /* Chrome, Safari, Edge */
  margin: 0;
}
  `;

