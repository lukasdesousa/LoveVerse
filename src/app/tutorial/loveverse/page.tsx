/* eslint-disable react-refresh/only-export-components */
import Tutorial from '@/components/Pages/tutorial/page';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Tutorial para Criar Cartinha de Amor',
  description:
    'Veja o passo a passo para criar mensagem romântica, carta personalizada e declaração de amor com QR Code na LoveVerse.',
  pathname: '/tutorial/loveverse',
});

export default function Index() {
  return <Tutorial />;
}
