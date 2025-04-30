/* eslint-disable react-refresh/only-export-components */
// pages/index.tsx
import Header from '@/components/HomeHeader/HomeHeader';
import Footer from '@/components/Footer/Footer';
import ScrollReveal from '@/components/Scroll/ScrollReveal';
import { Content, Text, Title, Container, Introduction } from '@/styles/components_styles/mainStyle/styled';
import { Apresentation } from '@/components/loveComponents/Apresentation/Apresentation';
import Button from '@mui/joy/Button';
import Link from 'next/link';

export const metadata = {
  title: 'LoveVerse - Crie mensagens encantadoras',
  description:
    'Utilize a ferramenta Analyser para analisar memecoins de forma rápida e eficiente. Descubra insights, dados e tendências do mercado cripto, acompanhe airdrops e muito mais.',
  keywords: 'memecoins, análise cripto, Analyser, criptomoedas, investimento, mercado cripto, crypto, crypto market, rugcheck',
  alternates: {
    canonical: 'https://lukasdesousa.github.io/MundoCriptoApp/',
  },
  openGraph: {
    title: 'Mundo Cripto - Analise memecoins rapidamente com a ferramenta analyser.',
    description:
      'Utilize a ferramenta Analyser para analisar memecoins de forma rápida e eficiente. Descubra insights, dados e tendências do mercado cripto.',
    url: 'https://lukasdesousa.github.io/MundoCriptoApp/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mundo Cripto - Analise memecoins rapidamente com a ferramenta analyser.',
    description:
      'Utilize a ferramenta Analyser para analisar memecoins de forma rápida e eficiente. Descubra insights, dados e tendências do mercado cripto.',
  },
};

function Index() {
  return (
    <>
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
                  <Title>Desde declarações de amor à uma simples comemoração</Title>
                  <Text>
                    Com um preço de banana, deixe quem você ama emocionado com mensagens personalizadas. A LOVEVERSE é a ferramenta perfeita para você expressar seus sentimentos de forma única e especial.
                  </Text>
                <Text>
                  Como uma simples mensagem bem feita pode salvar o seu relacionamento, ou até mesmo conquistar o coração de alguém especial. Aqui estão algumas dicas para criar mensagens encantadoras que podem fazer a diferença:
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
                  Não há um método melhor para conquistar alguém do que uma mensagem personalizada e cheia de afeto. A LOVEVERSE é a ferramenta perfeita para você expressar seus sentimentos de forma única e especial.
                </Text>
              </Content>
                <Content><Link href={'/exemplo_carta_loveverse'}><Button variant='soft' sx={{backgroundColor: '#6110ed75', transition: '0.5s ease', color: 'white'}}>Ver carta de exemplo</Button></Link></Content>
                </Container>
          <Footer />
    </>
  );
}

export default Index;
