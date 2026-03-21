/* eslint-disable react-refresh/only-export-components */
import SelectTheme from '@/components/Pages/create-component/SelectTheme';
import { LoadPage } from '@/components/LoadPage/LoadPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Criar Cartinha de Amor Personalizada Online',
  description:
    'Monte sua carta personalizada com QR Code, fotos, música e mensagem romântica. Crie uma cartinha de amor online em poucos passos na LoveVerse.',
  pathname: '/criar',
});

function Index() {
  return (
    <LoadPage>
      <SelectTheme />
    </LoadPage>
  );
}

export default Index;
