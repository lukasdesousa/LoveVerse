/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next';
import Intro from '@/components/MessageComponent/Intro/Intro';
import LoveMessageComponent from '@/components/MessageComponent/love/LoveMessageComponent';
import { prisma } from '@/lib/prisma';
import { buildMetadata, truncateText } from '@/lib/seo';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const message = await prisma.love_message_theme.findUnique({
      where: { id },
      select: {
        creatorName: true,
        destinataryName: true,
        content: true,
        imagesUrl: true,
      },
    });

    if (!message) {
      return buildMetadata({
        title: 'Carta Personalizada não encontrada',
        description: 'A carta personalizada solicitada não foi encontrada na LoveVerse.',
        pathname: `/messages/${id}/love`,
        index: false,
      });
    }

    const description = truncateText(
      `Carta personalizada para ${message.destinataryName}, criada por ${message.creatorName}. ${message.content}`,
      155,
    );

    return buildMetadata({
      title: `Cartinha de Amor para ${message.destinataryName}`,
      description,
      pathname: `/messages/${id}/love`,
      images: message.imagesUrl.length > 0 ? [message.imagesUrl[0]] : undefined,
    });
  } catch {
    return buildMetadata({
      title: 'Carta Personalizada de Amor',
      description: 'Veja uma carta personalizada com mensagem romântica criada na LoveVerse.',
      pathname: `/messages/${id}/love`,
      index: false,
    });
  }
}

function Index() {
  return (
    <Intro>
      <LoveMessageComponent />
    </Intro>
  );
}

export default Index;
