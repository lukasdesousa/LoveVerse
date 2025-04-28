'use client';

import React, { useState } from "react";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import Link from "next/link";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { fetchUser } from '../../store/userSlice'; // Import the fetchUser action
import { AppDispatch } from "@/store/store";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function App() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { token } = useToken();
  const screens = useBreakpoint();
  const [api, contextHolder] = notification.useNotification();
  const [buttonVrf, setButtonVrf] = useState(false);

  const onFinish = async (values) => {
    setButtonVrf(true)
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        api.success({
          message: 'Login efetuado com sucesso',
          description:
            'Aguarde enquanto redirecionamos você',
          showProgress: true,
          duration: 5,
        })

      dispatch(fetchUser());
      router.push('/');
    } else {
      setButtonVrf(false);
      api.error({
        message: 'Erro ao fazer login',
        description: data.error,
        showProgress: true,
        duration: 5,
      })
    }
  } catch (error) {
    api.error({
      message: 'Erro ao fazer login',
      description: error instanceof Error ? error.message : 'Erro desconhecido',
      showProgress: true,
      duration: 5,
    })
  }
};

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
        <Title style={styles.title}>Entrar</Title>
        <Text style={styles.text}>
          Bem-vindo novamente ao LoveVerse, faça login para acessar as suas mensagens ou para criar uma.
        </Text>
      </div>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
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
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Insira sua senha!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link style={styles.forgotPassword} href="">
            Esqueceu a senha?
          </Link>
        </Form.Item>
        <Form.Item style={{ marginBottom: "0px" }}>
          <Button style={{backgroundColor: '#6110ed75'}} disabled={buttonVrf} block={true} type="primary" htmlType="submit">
            Entrar
          </Button>
          <div style={styles.footer}>
            <Text style={styles.text}>Não tem uma conta?</Text>{" "}
            <Link href={'/register'}>Crie uma</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  </section>
);
}
