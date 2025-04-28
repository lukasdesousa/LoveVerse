'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Button, Form, Grid, Input, notification, theme, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export default function SignUpPage() {
  const { token } = useToken() ?? { paddingXL: 24, sizeXXL: 48, colorTextSecondary: "#8c8c8c", colorBgContainer: "#fff" };
  const screens = useBreakpoint();
  const [api, contextHolder] = notification.useNotification();
  const [buttonVrf, setButtonVrf] = useState(false);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const onFinish = async (values: FormValues) => {
    setButtonVrf(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        dispatch(fetchUser());
        // Envio de e-mail
        try {
          const emailRes = await fetch("/api/emails/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: values.email,
              subject: 'Confirmação de cadastro',
            }),
          });
  
          if (!emailRes.ok) {
            console.error('Falha ao enviar o e-mail');
            api.error({
              message: 'Erro no envio do e-mail',
              description: 'O e-mail de confirmação não pôde ser enviado.',
              showProgress: true,
              duration: 5,
            });
          }
        } catch (e) {
          api.error({
            message: 'Erro no envio do e-mail',
            description: `Ocorreu um erro: ${e}`,
            showProgress: true,
            duration: 5,
          });
        }
  
        // Sucesso na criação do usuário
        api.success({
          message: 'Usuário registrado com sucesso',
          description: 'Aguarde enquanto redirecionamos você...',
          showProgress: true,
          duration: 5,
        });
  
        router.push('/email_verification');
      } else {
        setButtonVrf(false);
        api.error({
          message: 'Erro ao registrar o usuário',
          description: data.error || 'Erro desconhecido.',
          showProgress: true,
          duration: 5,
        });
      }
    } catch (error) {
      setButtonVrf(false);
      api.error({
        message: 'Erro ao registrar o usuário',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        showProgress: true,
        duration: 5,
      });
    }
  };

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

  return (
    <section style={styles.section}>
      {contextHolder}
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>Love<span style={{color: '#6110ed75'}}>Verse</span></h1>
          <br />
          <Title style={styles.title}>Registre-se</Title>
          <Text style={styles.text}>
            Bem-vindo(a) ao LoveVerse! Junte-se à nossa jornada agora mesmo.
          </Text>
        </div>
        <Form name="normal_signup" onFinish={onFinish} layout="vertical" requiredMark="optional">
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "O nome deve conter 3 ou mais caroacteres",
                min: 3,
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nome" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Insira um e-mail válido!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="password"
            extra="A senha deve conter no mínimo 8 caracteres."
            rules={[
              {
                required: true,
                message: "Insira uma senha válida!",
              },
              {
                min: 8,
                message: "A senha deve ter no mínimo 8 caracteres!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Senha" />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button disabled={buttonVrf} block type="primary" htmlType="submit" style={{backgroundColor: '#6110ed75'}}>
              Criar Conta
            </Button>
            <div style={styles.signup}>
              <Text style={styles.text}>Já tem uma conta? </Text>
              <Link href={'/login'}>Entrar</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

