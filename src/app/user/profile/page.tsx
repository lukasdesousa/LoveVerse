/* eslint-disable react-refresh/only-export-components */
// pages/index.tsx
import HomeHeader from '@/components/HomeHeader/HomeHeader';
import Footer from '@/components/Footer/Footer';
import UserCard from '@/components/User/UserCard';
import MessageComponent from '@/components/loveComponents/messagesComponent/MessagesComponent';
import LogoutButton from '@/components/Drawer/button/LogOut';

export const metadata = {
  title: 'Mundo Cripto - Analise memecoins rapidamente com a ferramenta analyser',
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
      <HomeHeader />
    <UserCard />
    <h3 style={{textAlign: 'center', margin: '13px auto', fontWeight: '300'}}>Suas mensagens</h3>
    <MessageComponent />
    <LogoutButton />
      <Footer />
    </>
  );
}

export default Index;
