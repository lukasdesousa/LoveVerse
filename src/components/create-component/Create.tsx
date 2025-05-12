"use client";

import HomeHeader from '@/components/HomeHeader/HomeHeader';
import TextArea from 'antd/es/input/TextArea';
import ScrollReveal from '@/components/Scroll/ScrollReveal';
import { Box } from '@mui/material';
import { Button, Input, notification } from "antd";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { DatePicker, Form } from 'antd';
import ptBR from 'antd/es/date-picker/locale/pt_BR';
import { useEffect, useState } from 'react';
import { Image } from 'antd';
import { SpotifyCard } from '@/components/Spotify/SpotifyCard';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import styled from 'styled-components';
import { InboxOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import InfoModal from '@/components/Modal/InfoModal';
import useMercadoPago from '@/hooks/useMercadoPago';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import PriceCard from '@/components/loveComponents/PriceCard/PriceCard';

const { Search } = Input;

function Create() {
  const { createMercadoPagoCheckout } = useMercadoPago();
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewSpotify, setPreviewLink] = useState('');
  const [spotifyLink, setLink] = useState('');
  const [modal, setModal] = useState(false);
  const [invalidLink, setErrorLink] = useState(false);
  const [showSpotifyCard, setShowSpotifyCard] = useState(false);
  const [interactivityMessage, setInteractivityMessage] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const [count, setCount] = useState('');

  interface SavedMessage {
    email?: string;
    content?: string;
    creatorName?: string;
    destinataryName?: string;
    imageBase64?: string;
    interactivityMessage?: boolean;
    spotifyLink?: string;
    previewSpotify?: string;
    dateInit?: Date;
  };

  const [savedMessage, setSavedMessage] = useState<SavedMessage>();

  
  useEffect(() => {
    const raw = localStorage.getItem('pendingMessage');
    if (raw) {
      const msg = JSON.parse(raw);
      setSavedMessage(msg)
      return;
    }
  }, [])

  useEffect(() => {
    if (savedMessage) {
      form.setFieldsValue({
        email: savedMessage.email,
        creatorName: savedMessage.creatorName,
        destinataryName: savedMessage.destinataryName,
        spotifyLink: savedMessage.spotifyLink,
        dateInit: savedMessage.dateInit ? dayjs(savedMessage.dateInit) : undefined,
        content: savedMessage.content,
      });
      // Se tiver preview de imagem ou Spotify, ajuste também:
      setPreview(savedMessage.imageBase64 || null);
      setPreviewLink(savedMessage.spotifyLink || '');
      setLink(savedMessage.spotifyLink || '');

      if(savedMessage.spotifyLink) {
        setShowSpotifyCard(true);
      } else {
        setShowSpotifyCard(false);
      }
    }
  }, [savedMessage, form]);

  const onChange: CheckboxProps['onChange'] = (e) => {
    setInteractivityMessage(e.target.checked)
  };

  const setSpotiLink = () => {
    const spotifyLinkPattern = /^https:\/\/(open|play)\.spotify\.com\/.+/;
    const isSpotifyLink = spotifyLinkPattern.test(spotifyLink);

    if (!isSpotifyLink) {
      setErrorLink(true);
      api.error({
        message: 'Link inválido',
        description: 'O link deve ser do tipo https://open.spotify.com/',
        showProgress: true,
        duration: 5,
      })
      setShowSpotifyCard(false);
      return;
    }
    setErrorLink(false);
    setPreviewLink(spotifyLink)
    setShowSpotifyCard(true);
  };

  const convertToBase64 = async (file: File): Promise<string> => {
    if (invalidLink) return Promise.resolve('');
    if (!file) return Promise.resolve('');

    const toBase64 = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });

    const base64 = await toBase64(file);
    return base64;
  };

  const onFinish = async (values: {
    creatorName: string;
    destinataryName: string;
    spotifyLink: string;
    dateInit?: Date;
    theme?: string;
    content: string;
    email: string;
  }) => {
    if (invalidLink) return;
    setLoading(true);

    const paymentId = uuidv4();

    const imageBase64 = savedMessage?.imageBase64 ? savedMessage.imageBase64 
    : await convertToBase64(imageFile!);

    // 2) Salva tudo no storage
    localStorage.setItem('pendingMessage', JSON.stringify({
      ...values,
      imageBase64,
      interactivityMessage,
      spotifyLink,
      paymentId,
    }));

    // 3) Chama o checkout e redireciona
    await createMercadoPagoCheckout({
      testeId: paymentId,
      userEmail: values.email,
    });
    setLoading(false);
  };


  return (
    <>
      <HomeHeader />
      {contextHolder}
      <ScrollReveal>
        <Typography level='h3' sx={{ textAlign: 'center', fontWeight: '300', margin: '20px auto' }}>Área de criação</Typography>
        <Box sx={{width: '80%', margin: '20px auto'}}>
         <PriceCard />
            <CardContent sx={{ alignItems: 'center', justifyContent: 'flex-end', padding: '10px', borderRadius: '10px' }}>
              <CardContent sx={{ alignItems: "center" }}>
                <Form
                  form={form}
                  name="normal_signup"
                  onFinish={(values) => onFinish({ ...values })}
                  layout="vertical"
                  requiredMark="optional"
                >
                  <Form.Item label='Email' name="email" extra={'Insira o email que irá receber o QR CODE da mensagem'} rules={[{ type: 'email', required: true, message: "Insira um email válido!" }]}>
                    <Input type='email' size='large' placeholder="loveverse@email.com" />
                  </Form.Item>
                  <Form.Item label='O seu nome' name="creatorName" rules={[{ required: true, message: "Insira um nome válido!" }]}>
                    <Input size='large' placeholder="João" />
                  </Form.Item>
                  <Form.Item label='Nome do destinatário' name="destinataryName" rules={[{ required: true, message: "Insira um destinatário válido!" }]}>
                    <Input size='large' placeholder="Maria" />
                  </Form.Item>
                  <Form.Item label='Link de sua música' name="spotifyLink" extra="Copie e cole aqui o link da música do Spotify.">
                    <Search
                      placeholder="https://open.spotify..."
                      enterButton="Pesquisar"
                      size="large"
                      onChange={(e) => setLink(e.currentTarget.value)}
                      onSearch={() => setSpotiLink()}
                    />
                  </Form.Item>
                  {showSpotifyCard && spotifyLink && previewSpotify ? (
                    <div style={{ marginTop: '16px' }}>
                      <SpotifyCard link={spotifyLink} />
                    </div>
                  ) : (
                    <div style={{ margin: '20px auto', textAlign: 'center' }}>
                      <p style={{ fontWeight: '300' }}>Nenhuma música selecionada</p>
                    </div>
                  )}
                  <Form.Item label='Sua mensagem' name="content" extra={`Restam ${1200 - count.length} caracteres`} rules={[{ required: true, message: "Insira uma mensagem!", max: 1200 }]}>
                    <TextArea onChange={(e) => setCount(e.currentTarget.value)} placeholder='Dê o seu melhor!' size='large' maxLength={1200} />
                  </Form.Item>
                  <Container>
                    <section className="checkbox">
                      <Checkbox onChange={onChange} defaultChecked={true} >Ativar mensagem interativa?</Checkbox>
                      <QuestionCircleOutlined onClick={() => setModal(true)} />
                      <InfoModal open={modal} onClose={() => setModal(false)} />
                    </section>
                  </Container>
                  <Form.Item label='Data do inicio do relacionamento' name="dateInit" extra="Como vai aparecer na mensagem: Eu te amo há X dias, X horas, X minutos, X segundos">
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      format="DD/MM/YYYY"
                      locale={ptBR}
                      disabledDate={(current) => {
                        // current é um objeto dayjs
                        // bloqueia: current >= início de hoje
                        return current && current.valueOf() >= dayjs().startOf("day").valueOf();
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Imagem">
                    <Dragger
                      name="file"
                      multiple={false}
                      beforeUpload={(file) => {
                        setImageFile(file);
                        setPreview(URL.createObjectURL(file));
                        return false;
                      }}
                      accept="image/*"
                      showUploadList={false}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Clique ou arraste a imagem aqui</p>
                      <p className="ant-upload-hint">Apenas uma imagem será enviada ao criar a mensagem.</p>
                    </Dragger>
                    {preview && (
                      <div style={{ margin: '20px auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image src={preview} alt="preview" style={{ borderRadius: '8px', maxWidth: '200px' }} />
                        <DeleteOutlined onClick={() => {
                          setPreview('')
                          setImageFile(null)
                        }} style={{ transform: 'scale(2)' }} />
                      </div>
                    )}
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "0px" }}>
                    <Button block style={{ backgroundColor: '#aa00ff' }} type="primary" htmlType="submit" loading={loading}>
                      Pagar e criar mensagem
                    </Button>
                  </Form.Item>
                </Form>
              </CardContent>
            </CardContent>
       
        </Box>
      </ScrollReveal>
    </>
  );
}

const Container = styled.section`
  margin: 20px auto;
  
  .checkbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default Create;

