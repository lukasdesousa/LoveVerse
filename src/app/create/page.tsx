"use client";

import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '@/components/HomeHeader/HomeHeader';
import TextArea from 'antd/es/input/TextArea';
import ScrollReveal from '@/components/Scroll/ScrollReveal';
import { Box } from '@mui/material';
import { Button, Input, notification } from "antd";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { DatePicker, Form } from 'antd';
import ptBR from 'antd/es/date-picker/locale/pt_BR';
import { createMessage } from '@/store/userSlice';
import { AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Image } from 'antd';
import { SpotifyCard } from '@/components/Spotify/SpotifyCard';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import styled from 'styled-components';
import { InboxOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import InfoModal from '@/components/Modal/InfoModal';


const { Search } = Input;

type Message = {
  id: string;
  creatorName: string;
  destinataryName: string;
  spotifyLink: string;
  dateInit?: Date;
  theme?: string;
  content: string;
  expiresAt: string;
  imageUrl?: string;
};

type User = {
  user: {
    user: {
      id: string;
      name: string;
      email: string;
      messages: Message[];
    }
  }
}

function Index() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
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

  const user = useSelector((state: User) => state.user.user);

  const onChange: CheckboxProps['onChange'] = (e) => {
    setInteractivityMessage(e.target.checked)
  };

  const setSpotiLink = () => {
    const spotifyLinkPattern = /^https:\/\/(open|play)\.spotify\.com\/.+/;
    const isSpotifyLink = spotifyLinkPattern.test(previewSpotify);

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
    setLink(previewSpotify);
    setShowSpotifyCard(true); // Exibe o SpotifyCard se o link for válido
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    if (invalidLink) return Promise.resolve('');

    const toBase64 = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });

    const base64 = await toBase64(file);

    const res = await fetch('/api/uploads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64 }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);
    return data.url;
  };

  const onFinish = async (values: Omit<Message, 'id'>) => {
    if (invalidLink) return;
    setLoading(true);

    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const messageWithId = {
        ...values,
        imageUrl,
        interactivityMessage,
      };

      dispatch(createMessage(messageWithId))
        .unwrap()
        .then((response: Message[]) => {
          if (response.length > 0) {
            router.push(`/messages/${response[0].id}`);
          } else {
            alert('No message returned');
          }
        })
        .catch((error) => {
          alert(`Erro: ${error}`);
        });
    } catch (error) {
      alert('Erro ao enviar imagem');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HomeHeader />
      {contextHolder}
      <ScrollReveal>
        <Typography level='h3' sx={{ textAlign: 'center', fontWeight: '300', margin: '20px auto' }}>Área de criação</Typography>
        <Box>
          <Card variant="outlined" sx={{ height: '10%', width: '90%', margin: '10px auto' }}>
            <CardContent sx={{ alignItems: 'center', justifyContent: 'flex-end', padding: '10px', borderRadius: '10px' }}>
              <CardContent sx={{ alignItems: "center" }}>
                <Form
                  form={form}
                  name="normal_signup"
                  onFinish={(values) => onFinish({ ...values, id: user.id })}
                  layout="vertical"
                  requiredMark="optional"
                >
                  <Form.Item name="creatorName" rules={[{ required: true, message: "Insira um nome válido!" }]}>
                    <Input size='large' placeholder="Nome do remetente" />
                  </Form.Item>
                  <Form.Item name="destinataryName" rules={[{ required: true, message: "Insira um destinatário válido!" }]}>
                    <Input size='large' placeholder="Nome do destinatário" />
                  </Form.Item>
                  <Form.Item name="spotifyLink" extra="Copie e cole aqui o link da música do Spotify.">
                    <Search
                      placeholder="https://open.spotify..."
                      allowClear
                      enterButton="Pesquisar"
                      size="large"
                      onChange={(e) => setPreviewLink(e.currentTarget.value)}
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
                  <Form.Item name="content" extra="Somente 1200 caracteres." rules={[{ required: true, message: "Insira uma mensagem!", max: 1200 }]}>
                    <TextArea placeholder='Dê o seu melhor!' size='large' maxLength={1200} />
                  </Form.Item>
                  <Container>
                    <section className="checkbox">
                      <Checkbox onChange={onChange} defaultChecked={true} >Ativar mensagem iterativa?</Checkbox>
                      <QuestionCircleOutlined onClick={() => setModal(true)}/>
                      <InfoModal open={modal} onClose={() => setModal(false)}/>
                    </section>
                  </Container>
                  <Form.Item name="dateInit" extra="Escolha a data de início da relação (opcional).">
                    <DatePicker size='large' style={{ width: '100%' }} format={'DD/MM/YYYY'} locale={ptBR} />
                  </Form.Item>
                  <Form.Item label="Imagem (opcional)">
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
                      Criar mensagem
                    </Button>
                  </Form.Item>
                </Form>
              </CardContent>
            </CardContent>
          </Card>
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

export default Index;
