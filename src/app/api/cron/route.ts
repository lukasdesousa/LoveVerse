// app/api/cron/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const expectedSecret = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expectedSecret) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    await prisma.payment.deleteMany({
      where: {
        status: { in: ['pending', 'failure'] },
      }
    })
  } catch {
    //ignore
  }

  try {
    const now = new Date();
    await prisma.message.deleteMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });

    // 2) Deletar imagens com mais de 5 dias
    const oldImages = await prisma.imageControl.findMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });

    for (const image of oldImages) {
      try {
        if (image.publicId) {
          await cloudinary.uploader.destroy(image.publicId);
        }
        await prisma.imageControl.delete({ where: { id: image.id } });
      } catch {
        //ignore
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
