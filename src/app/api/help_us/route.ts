// app/api/cron/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
    const { text_content } = await req.json();
    
    await prisma.help_us.create({
      data: {
        text_content: text_content,
      }
    })
  
    return NextResponse.json({ ok: true });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
