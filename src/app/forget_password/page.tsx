'use client';

import React, { useState } from "react";
import { notification } from "antd";
import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { forgotPasswordAction } from "../actions/recoveryPassword";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function App() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [api, contextHolder] = notification.useNotification();
  const [buttonVrf, setButtonVrf] = useState(false);
  const [email, setEmail] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    setButtonVrf(true)
    e.preventDefault();
    try {
      await forgotPasswordAction(email);
      api.success({
        message: 'Email enviado com sucesso',
        description:
          'Verifique sua caixa de entrada e spam',
        showProgress: true,
        duration: 5,
      })
    } catch (e) {
      api.error({
      message: 'Erro ao enviar email',
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
          Recupere a sua conta Love<span style={{color: '#6110ed75'}}>Verse</span>
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
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Insira seu email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: "0px" }}>
          <Button style={{backgroundColor: '#6110ed75'}} disabled={buttonVrf} block={true} type="primary" htmlType="submit">
            Enviar link de recuperação
          </Button>
        </Form.Item>
      </Form>
    </div>
  </section>
);
}
