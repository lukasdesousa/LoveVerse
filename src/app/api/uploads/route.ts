import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const dynamic = 'force-dynamic'; // garante que não seja rota estática

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: 'Imagem ausente' }, { status: 400 });
    }

    // Upload para o Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'loveverse_uploads',
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro no upload' }, { status: 500 });
  }
}
