/* eslint-disable react-refresh/only-export-components */
import Home from '@/components/Pages/Main/Home';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Cartinha de Amor Personalizada, Mensagem Romântica e Declaração de Amor',
  description:
    'Crie cartinha de amor personalizada com QR Code, mensagem romântica online e declaração de amor inesquecível. Compartilhe uma carta personalizada com quem você ama na LoveVerse.',
  pathname: '/',
});

export default function Index() {
  return <Home />;
}
