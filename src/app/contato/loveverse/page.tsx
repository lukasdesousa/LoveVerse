/* eslint-disable react-refresh/only-export-components */
import ContactUs from '@/components/Pages/contact-us/ContactUs';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contato LoveVerse',
  description:
    'Entre em contato com a LoveVerse para tirar dúvidas sobre cartinha de amor personalizada, QR Code, pagamentos e suporte da plataforma.',
  pathname: '/contato/loveverse',
});

export default function Index() {
  return <ContactUs />;
}
