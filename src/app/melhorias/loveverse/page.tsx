/* eslint-disable react-refresh/only-export-components */
import HelpUs from '@/components/Pages/help-us/HelpUs';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Sugestões e Melhorias da LoveVerse',
  description:
    'Envie sugestões de melhorias para a LoveVerse e ajude a evoluir a experiência de criar cartinha de amor personalizada online.',
  pathname: '/melhorias/loveverse',
});

export default function Index() {
  return <HelpUs />;
}
