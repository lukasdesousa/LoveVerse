/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import HomeHeader from '@/components/HomeHeader/HomeHeader';
import TextArea from 'antd/es/input/TextArea';
import ScrollReveal from '@/components/Scroll/ScrollReveal';
import { Box } from '@mui/material';
import { Button, Input, notification, Form, DatePicker, Steps, Image, ConfigProvider } from "antd";
import CardContent from "@mui/joy/CardContent";
import ptBR from 'antd/es/date-picker/locale/pt_BR';
import { useEffect, useState } from 'react';
import { SpotifyCard } from '@/components/Spotify/SpotifyCard';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
//import useMercadoPago from '@/hooks/useMercadoPago';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import Giraffe from '@/components/Anims/Giraffe/Giraffe';
import PreviewButton from './preview/button/PreviewButton';
import { useRouter } from 'next/navigation';

const { Search } = Input;

function Create() {
  //const { createMercadoPagoCheckout } = useMercadoPago();
  const [form] = Form.useForm();
  const [, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [, setPreviewLink] = useState('');
  const [spotifyLink, setLink] = useState('');
  const [, setErrorLink] = useState(false);
  const [showSpotifyCard, setShowSpotifyCard] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [count, setCount] = useState('');
  const [current, setCurrent] = useState(0);
  const [formIndex, setFormIndex] = useState(0)
  const router = useRouter();

  const getLastCompletedStep = (savedData: Record<string, any>) => {
    for (let i = 0; i < fieldsPerStep.length; i++) {
      const fields = fieldsPerStep[i];
      const allFieldsFilled = fields.every(field => {
        const value = savedData[field];
        return value !== undefined && value !== null && value !== "";
      });

      if (!allFieldsFilled) return i; // retorna o índice do primeiro step incompleto
    }
    return fieldsPerStep.length; // todos os steps preenchidos
  };


  const handleImageRemove = () => {
    setPreview('');
    setImageFile(null);

    const saved = JSON.parse(localStorage.getItem('pendingMessage') || '{}');
    delete saved.imageBase64;
    localStorage.setItem('pendingMessage', JSON.stringify(saved));
  };

  useEffect(() => {
    setFormIndex(current);
  }, [current])

  const fieldsPerStep = [
    ['email'],
    ['creatorName'],
    ['destinataryName'],
    ['spotifyLink'],
    ['content'],
    ['dateInit'],
    []
  ];

  useEffect(() => {
    const pendingMessage = localStorage.getItem('pendingMessage');
    if (pendingMessage) {
      const parsedMessage = JSON.parse(pendingMessage);
      if (parsedMessage.dateInit) {
        parsedMessage.dateInit = dayjs(parsedMessage.dateInit); // converte a string de volta para dayjs
      }
      form.setFieldsValue(parsedMessage);
      if (parsedMessage.imageBase64) {
        setPreview(parsedMessage.imageBase64);
      }
      setImageFile(parsedMessage.imageBase64 ? new File([parsedMessage.imageBase64], 'image.png', { type: 'image/png' }) : null);
      setLink(parsedMessage.spotifyLink || '');
      setPreviewLink(parsedMessage.spotifyLink || '');
      setCount(parsedMessage.content || '');
      setCurrent(fieldsPerStep.findIndex(fields => fields.every(field => field in parsedMessage)));

      const lastStep = getLastCompletedStep(parsedMessage);
      if (lastStep === 7 && !parsedMessage.imageBase64) {
        setCurrent(6)
      } else {
        setCurrent(lastStep);
        setFormIndex(lastStep);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])


  const next = async () => {
    if (current >= steps.length - 1) return;
    try {
      await form.validateFields(fieldsPerStep[current]);
      if (current === 3) setErrorLink(false);

      const currentData = form.getFieldsValue();

      if (currentData.dateInit) {
        currentData.dateInit = currentData.dateInit.toISOString();
      }

      const existingData = JSON.parse(localStorage.getItem('pendingMessage') || '{}');
      const mergedData = { ...existingData, ...currentData };

      // 👇 Se for a etapa da imagem, salva a imagem em base64
      // 👇 Salva base64 diretamente se existir preview
      if (current === 6 && preview) {
        mergedData.imageBase64 = preview;
      }

      if (current === 6 && !preview) {
        api.error({
          message: 'A imagem é obrigatória',
          description: 'Por favor, selecione uma imagem antes de prosseguir.',
          duration: 5,
          showProgress: true,
        })
        return;
      }
      
      localStorage.setItem('pendingMessage', JSON.stringify(mergedData));
      setCurrent(prev => prev + 1);
      setFormIndex(current + 1);
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
    }
  };


  const prev = () => {
    setFormIndex(current - 1);
    setCurrent(prev => prev - 1)
  };

  const steps = [
    {
      title: '1º',
      content: (
        <Form.Item extra='Insira o e-mail que irá receber o QR CODE da mensagem' label="E-mail" name="email" rules={[{ type: 'email', required: true, message: 'O e-mail é obrigatório' }]}>
          <Input size="large" style={{ width: '100%' }} placeholder="loveverse@email.com" />
        </Form.Item>
      )
    },
    {
      title: '2º',
      content: (
        <Form.Item label="Seu nome" extra='Insira o seu nome ou apelido' name="creatorName" rules={[{ required: true, message: 'O seu nome é obrigatório' }]}>
          <Input size="large" style={{ width: '100%' }} placeholder="João" />
        </Form.Item>
      )
    },
    {
      title: '3º',
      content: (
        <Form.Item label="Nome do parceiro(a)" extra='Insira o nome ou apelido do seu parceiro(a)' name="destinataryName" rules={[{ required: true, message: 'O nome do seu parceiro(a) é obrigatório' }]}>
          <Input size="large" style={{ width: '100%' }} placeholder="Maria" />
        </Form.Item>
      )
    },
    {
      title: '4º',
      content: (
        <>
          <Form.Item
            label='Link de sua música'
            name="spotifyLink"
            rules={[
              {
                message: 'A música é obrigatória',
                required: true,
                validator: (_, value) => {
                  const isValid = /^https:\/\/(open|play)\.spotify\.com\/.+/.test(value || '');
                  if (!isValid) {
                    setErrorLink(true);
                    return Promise.reject('Link inválido! Use: https://open.spotify.com/...');
                  }
                  setLink(value);
                  setErrorLink(false);
                  return Promise.resolve();
                }
              },
            ]}
            extra="Copie e cole aqui o link da música do Spotify." required={true}
          >
            <Search
              placeholder="https://open.spotify..."
              enterButton="Verificar"
              size="large"
              onSearch={() => setShowSpotifyCard(!!form.getFieldValue('spotifyLink'))}
            />
          </Form.Item>
          {showSpotifyCard && form.getFieldValue('spotifyLink') ? (
            <SpotifyCard link={form.getFieldValue('spotifyLink')} />
          ) : <p style={{ textAlign: 'center', fontWeight: 300 }}>Nenhuma música selecionada</p>}
        </>
      )
    },
    {
      title: '5º',
      content: (
        <Form.Item label="Sua mensagem" name="content" rules={[{ required: true, max: 1200, message: 'A mensagem é obrigatória' }]} extra={`Dê o seu melhor - Restam ${1200 - count.length} caracteres`}>
          <TextArea rows={4} style={{ width: '100%' }} maxLength={1200} onChange={e => setCount(e.target.value)} />
        </Form.Item>
      )
    },
    {
      title: '6º',
      content: (
        <Form.Item label="Data do início" extra='Insira uma data exata ou aproximada que marque o inicio do relacionamento, amizade e outros.' name="dateInit" rules={[{ required: true, message: 'A data é obrigatória' }]}>
          <DatePicker size="large" style={{ width: '100%' }} locale={ptBR} disabledDate={d => d && d.isAfter(dayjs(), 'day')} />
        </Form.Item>
      )
    },
    {
      title: '7º',
      content: (
        <Form.Item required={true} label="Imagem" extra='Selecione a sua melhor recordação' rules={[{
          required: true, message: 'A imagem é obrigatória',
        }]}>
          <Dragger
            name="file"
            multiple={false}
            beforeUpload={(file) => {
              // CORREÇÃO: Converter para base64 imediatamente
              const reader = new FileReader();
              reader.onload = (e) => {
                setPreview(e.target?.result as string);
              };
              reader.readAsDataURL(file);
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
              <DeleteOutlined onClick={() => handleImageRemove()} style={{ transform: 'scale(2)' }} />
            </div>
          )}
        </Form.Item>
      )
    },
    {
      title: 'Prévia',
      content: (
        <PreviewButton />
      )
    },
  ];

  const onFinish = async values => {
    setLoading(true);
    await form.validateFields();
    const id = uuidv4();

    // CORREÇÃO: Usar base64 diretamente do estado
    const base64 = preview;

    const existing = JSON.parse(localStorage.getItem('pendingMessage') || '{}');
    const finalData = {
      ...existing,
      ...values,
      imageBase64: base64,
      spotifyLink,
      paymentId: id
    };

    localStorage.setItem('pendingMessage', JSON.stringify(finalData));

    //await createMercadoPagoCheckout({ testeId: id, userEmail: values.email });
    router.push('/success');
    setLoading(false);
  };

  return (
    <>
      <HomeHeader />
      {contextHolder}
      <ScrollReveal>
        <Box
          sx={{
          maxWidth: 800, mx: 'auto', my: 10,
            '& .ant-steps': { display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', alignItems: 'center'},
            '& .ant-steps-item': { flex: '0 0 auto', p: 0, m: 0 }, '& .ant-steps-item-icon': {
              backgroundColor: '#000000 !important',
              borderColor: '#000000 !important'
            },
            '& .ant-steps-item-icon .ant-steps-icon': {
              color: '#0b0b0b !important'
            },
            '& .ant-steps-item-tail': {
              borderColor: '#000000 !important'
            }
          }}
        >
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#aa00ff',
              },
            }}
          >
            <Steps
              type="inline"
              current={current}
              items={steps.map((_, i) => ({ key: i.toString(), title: _.title, }))}
              style={{ color: 'black' }}
            />
          </ConfigProvider>
        </Box>
        <Box sx={{ width: '80%', maxWidth: 600, mx: 'auto', marginBottom: '60px' }}>
          <CardContent>
            <Form form={form} layout="vertical" onFinish={onFinish} requiredMark='optional'>
              {steps[current].content}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                {current > 0 && <Button onClick={prev}>Anterior</Button>}
                {current < steps.length - 1 ? (
                  <Button type="primary" onClick={next}>Próximo</Button>
                ) : (
                  <Button
                    type="primary"
                    loading={loading}
                    onClick={() => form.submit()}
                  >
                    Criar
                  </Button>
                )}
              </Box>
            </Form>
          </CardContent>
        </Box>
        <Giraffe formIndex={formIndex} />
      </ScrollReveal>
    </>
  );
}

export default Create;
