'use client';

import React, { useState } from "react";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useSearchParams } from 'next/navigation';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function App() {
  const router = useRouter();
  const { token } = useToken();
  const screens = useBreakpoint();
  const [api, contextHolder] = notification.useNotification();
  const [buttonVrf, setButtonVrf] = useState(false);
  const searchParams = useSearchParams();
  const getToken = searchParams.get('token');
  const [password, setPassword] = useState('');
  
  if(!getToken) {
    return router.push('/')
  }

  async function handleSubmit(e: React.FormEvent) {
    setButtonVrf(true)
    e.preventDefault();

    try {
      const res = await fetch("/api/password_recovery/send_recovery_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({newPassword: password, token: getToken}),
      });

      if(res.ok) {
        api.success({
          message: 'Senha redefinida',
          description:
            'Aguarde enquanto redirecionamos você',
          showProgress: true,
          duration: 5,
        })
      }
      setTimeout(() => {
        router.push('/login')
      }, 3000);
    } catch (e) {
      api.error({
      message: 'Erro ao redefinir senha',
      description: e instanceof Error ? e.message : 'Erro desconhecido',
      showProgress: true,
      duration: 5,
    })
    }
  }

const styles = {
  container: {
    margin: "20% auto",
    padding: screens.md ? `${token.paddingXL}px` : `${token.paddingXL}px ${token.padding}px`,
    width: "90%",
    maxWidth: "350px",
  },
  footer: {
    marginTop: token.marginLG as number,
    textAlign: "center" as const,
    width: "100%" as const,
  },
  forgotPassword: {
    float: "right" as const
  },
  header: {
    marginBottom: token.marginXL
  },
  section: {
    alignItems: "center",
    backgroundColor: token.colorBgContainer,
    display: "flex",
    height: screens.sm ? "100vh" : "auto",
    padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
  },
  text: {
    color: token.colorTextSecondary,
    fontWeight: '350',
  },
  title: {
    fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
  }
};

return (
  <section style={styles.section}>
    {contextHolder}
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Love<span style={{color: '#6110ed75'}}>Verse</span></h1><br />
        <Title style={styles.title}>Recuperar senha</Title>
        <Text style={styles.text}>
          Insira uma nova senha segura e garanta que não irá esquecer
        </Text>
      </div>
      <Form
        name="normal_recovery"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark="optional"
      >
        <Form.Item
          name="new_password"
          rules={[
            {
              type: "string",
              required: true,
              message: "Insira sua nova senha!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Item>
        <Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: "0px" }}>
          <Button style={{backgroundColor: '#6110ed75'}} disabled={buttonVrf} block={true} type="primary" htmlType="submit">
            Redefinir senha
          </Button>
        </Form.Item>
      </Form>
    </div>
  </section>
);
}
