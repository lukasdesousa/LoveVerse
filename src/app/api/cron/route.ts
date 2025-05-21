// app/api/cron/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const expectedSecret = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expectedSecret) {
    return new NextResponse('Unauthorized', { status: 401 });
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
    
    return NextResponse.json({ ok: true });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
