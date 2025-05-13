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

import Head from 'next/head';

export const metadata = {
  title: 'LoveVerse - Crie mensagens encantadoras e compartilhe amor',
  description:
    'Com o LoveVerse, você pode criar e enviar mensagens personalizadas, românticas e criativas para quem ama. Deixe o amor falar mais alto com mensagens únicas e inesquecíveis.',
  keywords: 'LoveVerse, mensagens de amor, cartas românticas, frases para namorado, mensagens personalizadas, amor, romantismo, relacionamento, declarações de amor',
  alternates: {
    canonical: 'https://www.loveverse.space/', // substitua pelo domínio real
  },
  openGraph: {
    title: 'LoveVerse - Envie mensagens de amor inesquecíveis',
    description:
      'Descubra a magia de expressar sentimentos com o LoveVerse. Crie mensagens personalizadas e surpreenda quem você ama.',
    url: 'https://www.loveverse.space/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveVerse - Envie mensagens de amor inesquecíveis',
    description:
      'Descubra a magia de expressar sentimentos com o LoveVerse. Crie mensagens personalizadas e surpreenda quem você ama.',
  },
};

function Index() {
  return (
    <>
    <Head>
        {/* Básicos */}
        <title>LoveVerse - Crie mensagens lindas e interativas</title>
        <meta
          name="description"
          content="Com o LoveVerse, você pode criar e enviar mensagens personalizadas, românticas e criativas para quem ama. Deixe o amor falar mais alto com mensagens únicas e inesquecíveis."
        />
        <meta
          name="keywords"
          content="LoveVerse, mensagens de amor, cartas românticas, frases para namorado, mensagens personalizadas, amor, romantismo, relacionamento, declarações de amor"
        />
        <link rel="canonical" href="https://www.loveverse.space/" />

        {/* Robots */}
        <meta name="robots" content="index, follow, nocache" />

        {/* Open Graph */}
        <meta property="og:title" content="LoveVerse - Envie mensagens de amor inesquecíveis" />
        <meta
          property="og:description"
          content="Descubra a magia de expressar sentimentos com o LoveVerse. Crie mensagens personalizadas e surpreenda quem você ama."
        />
        <meta property="og:url" content="https://www.loveverse.space/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="LoveVerse – Crie mensagens inesquecíveis" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LoveVerse - Envie mensagens de amor inesquecíveis" />
        <meta
          name="twitter:description"
          content="Descubra a magia de expressar sentimentos com o LoveVerse. Crie mensagens personalizadas e surpreenda quem você ama."
        />
        <meta name="twitter:image" content="https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png" />

        {/* Preload da imagem de preview (melhora LCP) */}
        <link rel="preload" as="image" href="https://res.cloudinary.com/diidbde0o/image/upload/v1747155241/23a5ad20-c297-474b-ae95-ecf42791b1ca_hibbb4.png" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "LoveVerse",
              url: "https://www.loveverse.space/",
              inLanguage: "pt-BR",
              publisher: {
                "@type": "Organization",
                name: "LoveVerse",
                url: "https://www.loveverse.space",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.loveverse.space/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

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
    </>
  );
}

export default Index;
