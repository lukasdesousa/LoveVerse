import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

import { PrismaClient } from "@prisma/client";


export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:    process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'Campo `file` não encontrado ou inválido.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const base64 = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64}`;

    const uploadRes = await cloudinary.uploader.upload(dataUri, {
      folder: 'loveverse_uploads',
      transformation: [
        { width: 800, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    if(uploadRes) {
      await prisma.imageControl.create({
        data: {
          publicId: uploadRes.public_id,
          url:      uploadRes.secure_url,
          expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), 
        }
      })
    }

    // Retorna JSON com a URL
    return NextResponse.json({
      url:       uploadRes.secure_url,
      public_id: uploadRes.public_id,
      width:     uploadRes.width,
      height:    uploadRes.height,
      format:    uploadRes.format,
    });
  } catch (err: unknown) {
    console.error('Upload Cloudinary failed:', err);
    return NextResponse.json(
      { error: 'Erro interno no upload de imagem.' },
      { status: 500 }
    );
  }
}
