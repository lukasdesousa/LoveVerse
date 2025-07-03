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
import RouletteInputs from './RouletteInputs/RouletteInputs';
import Themes from './themes/Themes';
import DateAnim from '@/components/MessageComponent/DateAnim/DateAnim';
import ptBR_FORM from 'antd/es/locale/pt_BR';

const { Search } = Input;

function Create() {
  //const { createMercadoPagoCheckout } = useMercadoPago();
  const [form] = Form.useForm();
  const [, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewDate, setPreviewDate] = useState('');
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

      if (!allFieldsFilled) return i;
    }
    return fieldsPerStep.length;
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
    [],
    ['spotifyLink'],
    ['content'],
    ['dateInit'],
    [],
    [],
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
      setPreviewDate(parsedMessage.dateInit)
      setLink(parsedMessage.spotifyLink || '');
      setPreviewLink(parsedMessage.spotifyLink || '');
      setCount(parsedMessage.content || '');
      setCurrent(fieldsPerStep.findIndex(fields => fields.every(field => field in parsedMessage)));

      const lastStep = getLastCompletedStep(parsedMessage);
      const roulette = localStorage.getItem('roulleteItens')
      
      if(roulette && roulette?.length > 0) {
        setCurrent(10)
      } 
    
      if (lastStep === 9 && !parsedMessage.imageBase64) {
        setCurrent(7)
      } else {
        setCurrent(lastStep);
        setFormIndex(lastStep);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])


  const next = async () => {
    const rouletteItens = localStorage.getItem('rouletteItens');

    if (current >= steps.length - 1) return;
    if (current === 8 && !rouletteItens) {
      api.warning({
        message: 'Aviso',
        description: 'Você não preencheu os campos da roleta. Ela não será exibida. Certifique-se de preencher todos os campos e clicar em "feito".',
        duration: 9,
        showProgress: true,
      })
    }
    try {
      await form.validateFields(fieldsPerStep[current]);
      if (current === 3) setErrorLink(false);

      const currentData = form.getFieldsValue();

      if (currentData.dateInit) {
        currentData.dateInit = currentData.dateInit.toISOString();
      }

      const existingData = JSON.parse(localStorage.getItem('pendingMessage') || '{}');
      const mergedData = { ...existingData, ...currentData };

      if (current === 7 && preview) {
        mergedData.imageBase64 = preview;
      }

      if (current === 7 && !preview) {
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
      console.log('A validação falhou:', errorInfo);
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
        <Form.Item label="Tema" extra='Escolha seu tema (poderá visualizar o tema na prévia)' name="theme" rules={[{ required: true, message: 'Selecione o seu tema' }]}>
          <Themes />
        </Form.Item>
      )
    },
    {
      title: '5º',
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
      title: '6º',
      content: (
        <Form.Item label="Sua mensagem" name="content" rules={[{ required: true, max: 1200, message: 'A mensagem é obrigatória' }]} extra={`Dê o seu melhor - Restam ${1200 - count.length} caracteres`}>
          <TextArea rows={4} style={{ width: '100%' }} maxLength={1200} onChange={e => setCount(e.target.value)} />
        </Form.Item>
      )
    },
    {
      title: '7º',
      content: (
        <div style={{ margin: '0px auto', overflow: 'hidden' }}>
          <Form.Item label="Data especial" extra='Insira uma data exata ou aproximada que marque o inicio do relacionamento, amizade e outros.' name="dateInit">
            <DatePicker size="large" onChange={(_value, dateString) => setPreviewDate(dateString as string)} style={{ width: '100%' }} locale={ptBR} disabledDate={d => d && d.isAfter(dayjs(), 'day')} />
          </Form.Item>
          {previewDate && (
            <DateAnim date={previewDate} />
          )}
        </div>
      )
    },
    {
      title: '8º',
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
      title: '9º',
      content: (
        <div>
          <h2 style={{ fontFamily: 'var(--font-quicksand)', fontWeight: '500', textAlign: 'center' }}>Roleta LoveVerse</h2>
          <RouletteInputs />
        </div>
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

    const base64 = preview;

    const rouletteTitle = localStorage.getItem('rouletteTitle') || '';
    const rouletteItens = JSON.parse(localStorage.getItem('rouletteItens') as string) || [];
    const theme = Number(localStorage.getItem('theme') || 1);
    const existing = JSON.parse(localStorage.getItem('pendingMessage') || '{}');
    const finalData = {
      ...existing,
      ...values,
      rouletteTitle: rouletteTitle,
      rouletteItens: rouletteItens,
      theme: theme,
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
            maxWidth: 800, mx: 'auto', my: 12,
            '& .ant-steps': { display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', alignItems: 'center' },
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
            locale={ptBR_FORM}
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
              style={{ color: 'black', width: '80%', margin: 'auto', maxWidth: '1000px' }}
            />
          </ConfigProvider>
        </Box>
        <Box sx={{ width: '90%', maxWidth: 600, mx: 'auto', marginBottom: '35px' }}>
          <CardContent>
            <Form form={form} layout="vertical" onFinish={onFinish} requiredMark='optional' onKeyDown={(e) => {
              if (e.key === 'Enter' && current < steps.length - 1) {
                e.preventDefault();
              }
            }}>
              <ConfigProvider
                locale={ptBR_FORM}
              >
                {steps[current].content}
              </ConfigProvider>
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
