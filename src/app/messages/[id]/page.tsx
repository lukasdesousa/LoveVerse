/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next';
import Intro from '@/components/MessageComponent/Intro/Intro';
import MessagesComponent from '@/components/MessageComponent/MessageComponent';
import SensorPermissionGate from '@/components/SensorPermition/SensorPermition';
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
    const message = await prisma.message.findUnique({
      where: { id },
      select: {
        creatorName: true,
        destinataryName: true,
        content: true,
        imageUrl: true,
      },
    });

    if (!message) {
      return buildMetadata({
        title: 'Cartinha de Amor não encontrada',
        description: 'A cartinha de amor solicitada não foi encontrada na LoveVerse.',
        pathname: `/messages/${id}`,
        index: false,
      });
    }

    const description = truncateText(
      `Cartinha de amor para ${message.destinataryName}, criada por ${message.creatorName}. ${message.content}`,
      155,
    );

    return buildMetadata({
      title: `Cartinha de Amor para ${message.destinataryName}`,
      description,
      pathname: `/messages/${id}`,
      images: message.imageUrl ? [message.imageUrl] : undefined,
    });
  } catch {
    return buildMetadata({
      title: 'Cartinha de Amor Personalizada',
      description: 'Veja uma cartinha de amor personalizada criada na LoveVerse.',
      pathname: `/messages/${id}`,
      index: false,
    });
  }
}

function Index() {
  return (
    <SensorPermissionGate>
      <Intro>
        <MessagesComponent />
      </Intro>
    </SensorPermissionGate>
  );
}

export default Index;
