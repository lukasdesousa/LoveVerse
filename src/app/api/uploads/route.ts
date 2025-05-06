import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

// Force dynamic rendering for API route
export const dynamic = 'force-dynamic';

/**
 * POST /api/upload-image
 * Receives a base64 image string or URL and uploads to Cloudinary
 */
export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    // Validate presence
    if (!image || typeof image !== 'string') {
      return NextResponse.json(
        { error: 'Campo `image` é obrigatório e deve ser uma string base64 ou URL.' },
        { status: 400 }
      );
    }
    // Upload with basic optimization transformations
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'loveverse_uploads',
      // Limita dimensões e aplica compressão automática
      transformation: [
        { width: 800, crop: 'limit' },      // evita imagens muito grandes
        { quality: 'auto' },                // compressão automática
        { fetch_format: 'auto' },           // WebP/AVIF quando possível
      ],
      // Opcional: gerar URLs assinadas para segurança
      // use_filename: true,
      // unique_filename: false,
    });

    return NextResponse.json({
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
      width: uploadResponse.width,
      height: uploadResponse.height,
      format: uploadResponse.format,
    });
  } catch (error: unknown) {
    console.error('Upload Cloudinary failed:', error);
    return NextResponse.json(
      { error: 'Erro interno no upload de imagem.' },
      { status: 500 }
    );
  }
}
