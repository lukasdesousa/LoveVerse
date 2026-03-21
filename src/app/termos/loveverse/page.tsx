/* eslint-disable react-refresh/only-export-components */
import Terms from '@/components/Pages/terms-of-use/Terms';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Termos de Uso da LoveVerse',
  description:
    'Consulte os termos de uso da LoveVerse e entenda as regras para criar, compartilhar e personalizar sua cartinha de amor online com segurança.',
  pathname: '/termos/loveverse',
});

export default function Index() {
  return <Terms />;
}
