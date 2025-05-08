'use server';

import QRCode from 'qrcode';

export const generateQrCodeBase64 = async (text: string) => {
  try {
    const dataUrl = await QRCode.toDataURL(text); // Gera imagem base64
    return dataUrl;
  } catch (err) {
    console.error('Erro ao gerar QR Code:', err);
    throw err;
  }
};
