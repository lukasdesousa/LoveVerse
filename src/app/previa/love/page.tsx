/* eslint-disable react-refresh/only-export-components */
import PreviewLove from '@/components/Pages/create-component/preview/love/PreviewLove';
import Intro from '@/components/MessageComponent/Intro/Intro';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Prévia da Carta Personalizada',
  description: 'Confira a prévia da carta personalizada com fotos e mensagem romântica criada na LoveVerse.',
  pathname: '/previa/love',
  index: false,
});

export default function LovePagePreview() {
  return (
    <Intro>
      <PreviewLove />
    </Intro>
  );
}
