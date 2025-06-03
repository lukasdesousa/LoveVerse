/* eslint-disable react-refresh/only-export-components */
// pages/index.tsx
import Header from '@/components/HomeHeader/HomeHeader';
import Footer from '@/components/Footer/Footer';
import ScrollReveal from '@/components/Scroll/ScrollReveal';
import { Content, Text, Title, Container } from '@/styles/components_styles/mainStyle/styled';
import { Apresentation } from '@/components/loveComponents/Apresentation/Apresentation';
import Link from 'next/link';
import { Metadata, Viewport } from 'next';
import { LoadPage } from '@/components/LoadPage/LoadPage';
import { LottieApresentation } from '@/components/loveComponents/Apresentation/LottiesApresentation.tsx/LottieApresentation';
import Banner from '@/components/Banner/Banner';

const ogUpdatedTime = new Date().toISOString();
export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://www.loveverse.space'),
    title: {
      default: 'Mensagens personalizadas para casais - LoveVerse',
      template: '%s | LoveVerse',
    },
    description: 'Crie mensagens românticas únicas para quem você ama e surpreenda com carinho e criatividade. Explore nossa plataforma para criar mensagens interativas por um preço único',
    openGraph: {
      type: 'website',
      url: 'https://www.loveverse.space',
      title: 'LoveVerse',
      description: 'Mensagens personalizadas para casais',
      siteName: 'LoveVerse',
      images: [
        {
          url: 'https://res.cloudinary.com/diidbde0o/image/upload/v1747767779/loveverse_f5jnyz.jpg',
          width: 1200,
          height: 630,
          alt: 'Crie mensagens personalizadas únicas',
          type: 'image/png'
        },
      ],
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'LoveVerse',
      description: 'Crie mensagens personalizadas únicas',
      images: [
        'https://res.cloudinary.com/diidbde0o/image/upload/v1747767779/loveverse_f5jnyz.jpg'
      ],
    },
    other: {
      'og:image': 'https://res.cloudinary.com/diidbde0o/image/upload/v1747767779/loveverse_f5jnyz.jpg',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': 'LoveVerse - Compartilhe amor',
      'og:image:type': 'image/png',
      'og:updated_time': ogUpdatedTime,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

function Index() {
  return (
    <>
      <LoadPage>
        {/* Conteúdo da home */}
        <Header />
          <Banner />
        <Container>
          <section>
            <ScrollReveal>
              <Content>
                <Title>Deixe quem você ama feliz</Title>
                <Text>
                  Com a Love<span style={{ color: '#aa00ff' }}>Verse</span>, agradar quem você ama ficou mais rápido e prático. Através de mensagens personalizadas, você pode criar uma experiência única e inesquecível para quem você ama.
                </Text>
                <Text>
                  Uma simples mensagem bem feita pode salvar o seu relacionamento, ou até mesmo conquistar o coração de alguém especial.
                </Text>
                <Text>
                  Rápido, fácil e prático, e sem mensagens sem vida. Na LoveVerse, damos vida às suas palavras, transformando-as em mensagens únicas, interativas e inesquecíveis.
                </Text>
            <LottieApresentation />
              </Content>
            </ScrollReveal>
          </section>
          <Content>
            <Text>
              Não há um método melhor para conquistar alguém do que uma mensagem personalizada e cheia de afeto. A Love<span style={{ color: '#aa00ff' }}>Verse</span> é a ferramenta perfeita para você expressar seus sentimentos de forma única e especial.
            </Text>
          </Content>
            <section>
              <Apresentation />
            </section>
            <Content>
              <Text>
               Na LoveVerse, é possível criar mensagens que tocam o sentimento do seu amor, com fotos, músicas e textos personalizados. Tudo isso de forma simples e rápida, para que você possa surpreender quem ama em poucos minutos:
              </Text>
                         <Text>
               Crie uma mensagem de prévia na página de <Link href={'/create'}>criação</Link>, fique a vontade para experimentar todos os recursos disponíveis e veja como é fácil e prático.
              </Text>
            </Content>
        </Container>
        <Footer />
      </LoadPage>
    </>
  );
}

export default Index;
