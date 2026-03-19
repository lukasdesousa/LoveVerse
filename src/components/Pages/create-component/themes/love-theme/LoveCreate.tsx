/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import HomeHeader from '@/components/HomeHeader/HomeHeader';
import TextArea from 'antd/es/input/TextArea';
import ScrollReveal from '@/components/Scroll/ScrollReveal';
import { Box } from '@mui/material';
import {
  Button,
  Input,
  notification,
  Form,
  DatePicker,
  Steps,
  Image,
  ConfigProvider,
  Upload,
  UploadFile,
  UploadProps,
  GetProp,
} from "antd";
import CardContent from "@mui/joy/CardContent";
import { useEffect, useState } from 'react';
import { SpotifyCard } from '@/components/Spotify/SpotifyCard';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import PreviewButton from '../../preview/button/PreviewButton';
// import { useRouter } from 'next/navigation';
import ptBR from 'antd/locale/pt_BR';
import ptBrLocale from 'antd/es/date-picker/locale/pt_BR';
import { useRouter } from 'next/navigation';

const { Search } = Input;

function LoveCreate() {
  const [form] = Form.useForm();
  // const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [spotifyLink, setSpotifyLink] = useState('');
  const [showSpotifyCard, setShowSpotifyCard] = useState(false);
  const [count, setCount] = useState('');
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const fieldsPerStep = [
    ['email'],
    ['creatorName'],
    ['destinataryName'],
    ['spotifyLink'],
    ['content'],
    ['dateInit'],
    [],
  ];

  const getLastCompletedStep = (savedData: Record<string, any>) => {
    for (let i = 0; i < fieldsPerStep.length; i++) {
      const fields = fieldsPerStep[i];
      const allFieldsFilled = fields.every(field => {
        const value = savedData[field];
        return value !== undefined && value !== null && value !== "";
      });
      if (!allFieldsFilled) return i;
    }
    return fieldsPerStep.length - 1;
  };

  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleBeforeUpload = () => {
    return false; // só impede upload automático
  };

  const handleChangeImage: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    const convertedList = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.url && file.originFileObj) {
          const base64 = await getBase64(file.originFileObj);
          return {
            ...file,
            url: base64,
            status: 'done'
          };
        }
        return file;
      })
    );

    setFileList(convertedList as UploadFile[]);

    const base64Array = convertedList
      .filter(file => file.url)
      .map(file => file.url);

    const existing = JSON.parse(localStorage.getItem('pendingMessage') || '{}');

    localStorage.setItem(
      'pendingMessage',
      JSON.stringify({
        ...existing,
        imagesBase64: base64Array,
      })
    );
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  useEffect(() => {
    const pending = localStorage.getItem('pendingMessage');
    if (!pending) return;

    const parsed = JSON.parse(pending);

    if (parsed.dateInit) {
      const parsedDate = dayjs(parsed.dateInit);
      parsed.dateInit = parsedDate;
    }

    if (parsed.imagesBase64) {
      const restoredFiles = parsed.imagesBase64.map((base64: string, index: number) => ({
        uid: index.toString(),
        name: `image-${index}.png`,
        status: 'done',
        url: base64,
      }));

      setFileList(restoredFiles);
    }

    setSpotifyLink(parsed.spotifyLink || '');
    setCount(parsed.content || '');

    form.setFieldsValue(parsed);
    setCurrent(getLastCompletedStep(parsed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const next = async () => {
    if (current >= steps.length - 1) return;

    try {
      await form.validateFields(fieldsPerStep[current]);

      const currentData = form.getFieldsValue();

      if (currentData.dateInit) {
        currentData.dateInit = currentData.dateInit.toISOString();
      }

      const existing = JSON.parse(localStorage.getItem('pendingMessage') || '{}');
      const merged = { ...existing, ...currentData };

      if (current === 6) {
        if (!fileList.length) {
          api.error({
            message: 'Imagem obrigatória',
            description: 'Selecione ao menos uma imagem.',
          });
          return;
        }
      }

      localStorage.setItem('pendingMessage', JSON.stringify(merged));
      setCurrent(prev => prev + 1);

    } catch {
      // validação falhou
    }
  };

  const prev = () => setCurrent(prev => prev - 1);

  const onFinish = async (values: any) => {
    setLoading(true);

    const id = uuidv4();
    const existing = JSON.parse(localStorage.getItem('pendingMessage') || '{}');
    const imagesBase64 = fileList.map((file) => file.url);

    console.log(imagesBase64)

    const finalData = {
      ...existing,
      ...values,
      imagesBase64: fileList.map(file => file.url),
      spotifyLink: spotifyLink!,
      paymentId: id,
    };

    localStorage.setItem('pendingMessage', JSON.stringify(finalData));
    console.log(finalData);
    router.push('/success?theme=love');
    setLoading(false);
  };

  const steps = [
    {
      title: '1º',
      content: (
        <Form.Item name="email" label="E-mail" rules={[{ type: 'email', required: true }]}>
          <Input size="large" placeholder="loveverse@email.com" />
        </Form.Item>
      ),
    },
    {
      title: '2º',
      content: (
        <Form.Item name="creatorName" label="Seu nome" rules={[{ required: true }]}>
          <Input size="large" />
        </Form.Item>
      ),
    },
    {
      title: '3º',
      content: (
        <Form.Item name="destinataryName" label="Nome do parceiro(a)" rules={[{ required: true }]}>
          <Input size="large" />
        </Form.Item>
      ),
    },
    {
      title: '4º',
      content: (
        <>
          <Form.Item
            name="spotifyLink"
            label="Link da música"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  const isValid = /^https:\/\/(open|play)\.spotify\.com\/.+/.test(value || '');
                  if (!isValid) return Promise.reject('Link inválido');
                  setSpotifyLink(value);
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Search
              placeholder="https://open.spotify..."
              enterButton="Verificar"
              size="large"
              onChange={(e) => setSpotifyLink(e.target.value)}
              onSearch={() => setShowSpotifyCard(true)}
            />
          </Form.Item>

          {showSpotifyCard && spotifyLink && (
            <SpotifyCard link={spotifyLink} />
          )}
        </>
      ),
    },
    {
      title: '5º',
      content: (
        <Form.Item
          name="content"
          label="Mensagem"
          rules={[{ required: true, max: 1200 }]}
          extra={`Restam ${1200 - count.length} caracteres`}
        >
          <TextArea maxLength={1200} onChange={e => setCount(e.target.value)} />
        </Form.Item>
      ),
    },
    {
      title: '6º',
      content: (
        <>
          <Form.Item
            name="dateInit"
            label="Data do primeiro beijo"
            rules={[{ required: true, message: 'Selecione uma data' }]}
          >
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              locale={ptBrLocale}
              disabledDate={d => d && d.isAfter(dayjs(), 'day')}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: '7º',
      content: (
        <>
          <section style={{ height: '250px' }}>
            <p>Imagens - Carrosel</p>
            <Upload
              multiple
              accept="image/*"
              listType="picture-card"
              fileList={fileList}
              beforeUpload={handleBeforeUpload}
              onPreview={handlePreview}
              onChange={handleChangeImage}
              maxCount={4}
            >
              {fileList.length < 4 && (
                <button type="button" style={{ border: 0, background: 'none' }}>
                  <PlusOutlined />
                </button>
              )}
            </Upload>
            <Image
              preview={{
                open: previewOpen,
                onOpenChange: setPreviewOpen,
              }}
              alt='Imagem'
              src={previewImage}
              style={{ display: 'none' }}
            />
          </section>
        </>
      ),
    },
    {
      title: 'Prévia',
      content: <PreviewButton theme="love" />,
    },
  ];

  return (
    <>
      <HomeHeader />
      {contextHolder}
      <ScrollReveal>
        <Box
          sx={{
            maxWidth: 800, mx: 'auto', my: 10,
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
            locale={ptBR}
            theme={{
              token: {
                colorPrimary: '#aa00ff',
              },
            }}
          >
            <Steps
              responsive={false}
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
                locale={ptBR}
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
      </ScrollReveal>
    </>
  );
}

export default LoveCreate;