/* eslint-disable react-refresh/only-export-components */
// pages/index.tsx
import Header from '@/components/HomeHeader/HomeHeader';
import Footer from '@/components/Footer/Footer';
import ScrollReveal from '@/components/Scroll/ScrollReveal';
import { Content, Text, Title, Container, Introduction } from '@/styles/components_styles/mainStyle/styled';
import { Apresentation } from '@/components/loveComponents/Apresentation/Apresentation';
import Button from '@mui/joy/Button';
import Link from 'next/link';
import MessagePrice from '@/components/MessagePrice/MessagePrice';
import { Metadata, Viewport } from 'next';
import { LoadPage } from '@/components/LoadPage/LoadPage';

export const dynamic = 'force-dynamic';

const ogUpdatedTime = new Date().toISOString();
export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://www.loveverse.space'),
    title: {
      default: 'LoveVerse – Mensagens de amor personalizadas',
      template: '%s | LoveVerse',
    },
    description: 'Crie mensagens românticas únicas para quem você ama',
    openGraph: {
      type: 'website',
      url: 'https://www.loveverse.space',
      title: 'LoveVerse',
      description: 'Crie mensagens românticas únicas',
      siteName: 'LoveVerse',
      images: [
        {
          url: 'https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png',
          width: 1200,
          height: 630,
          alt: 'LoveVerse - Compartilhe amor',
          type: 'image/png'
        },
      ],
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'LoveVerse',
      description: 'Crie mensagens românticas únicas',
      images: [
        'https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png'
      ],
    },
    other: {
      'og:image': 'https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png',
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
                  <Container>
                <Introduction>
              <ScrollReveal>
                  <section className="content">
                    <h2>ENCANTE QUEM VOCÊ <span style={{color: 'pink'}}>AMA</span></h2>
                      <Text>
                        Com a LOVEVERSE a sua criatividade o seu amor é o limite! Explore sua criatividade criando bilhetes com mensagens encantadoras.
                      </Text>
                  </section>
              </ScrollReveal>
                </Introduction>
              <section>
                <ScrollReveal>
                  <Content>
                    <Title>Deixe quem você ama feliz</Title>
                    <Text>
                      Com a Love<span style={{color: '#aa00ff'}}>Verse</span>, agradar quem você ama ficou mais rápido e prático. Através de mensagens personalizadas, você pode criar uma experiência única e inesquecível para quem você ama.
                    </Text>
                  <Text>
                    Uma simples mensagem bem feita pode salvar o seu relacionamento, ou até mesmo conquistar o coração de alguém especial. Aqui estão algumas dicas para criar mensagens encantadoras que podem fazer a diferença:
                  </Text>
                  </Content>
                </ScrollReveal>
                <section>
                <Content>
                </Content>
                  <Apresentation />
                </section>
              </section>
              <Content>
                  <Text>
                    Não há um método melhor para conquistar alguém do que uma mensagem personalizada e cheia de afeto. A Love<span style={{color: '#aa00ff'}}>Verse</span> é a ferramenta perfeita para você expressar seus sentimentos de forma única e especial.
                  </Text>
                </Content>
                <Content>
                  <Text>
                    Confira nossos preços
                  </Text>
                  <MessagePrice />
                </Content>
                  <Content><Link href={'/exemplo-carta-loveverse'}><Button variant='soft' sx={{backgroundColor: '#6110ed75', transition: '0.5s ease', color: 'white'}}>Ver mensagem de exemplo</Button></Link></Content>
                  </Container>
            <Footer />
      </LoadPage>
    </>
  );
}

export default Index;
