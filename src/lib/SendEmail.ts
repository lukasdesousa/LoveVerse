'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function SendEmail(email: string, id: string) {
  try {
    const messageLink = `https://loveverse.space/messages/${id}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(messageLink)}`;

    const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 8px;">
    <div style="background-color: #fff; padding: 20px; border-radius: 8px;">
      <h2 style="color: #aa00ff;">Sua mensagem foi criada com sucesso!</h2>
      <p>Clique no botão abaixo ou escaneie o QR Code para visualizar:</p>
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin: auto;">
        <img src="${qrCodeUrl}" alt="QR Code" width="200" height="200" />
      </div>
      <div style="margin-top: 20px;">
        <a href="${qrCodeUrl}" style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #aa00ff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        ">Visualizar QR Code</a>
        <p style="margin-top: 10px; font-size: 12px; color: #888;">
          Ao visualizar, clique em "Baixar imagem" para salvar o QR CODE na sua galeria
        </p>
      </div>
      <div style="margin-top: 20px;">
        <a href="${messageLink}" style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #aa00ff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        ">Ver Mensagem</a>
      </div>
      <p style="margin-top: 40px; font-size: 12px; color: #888;">
        Obrigado por usar o LoveVerse 💖
      </p>
    </div>
  </div>
`;

    await resend.emails.send({
      from: 'LoveVerse <noreply@loveverse.space>',
      to: email,
      subject: `Seu QR CODE da mensagem ${id}`,
      html: html,
    });

    return { success: true };
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Erro desconhecido' };
  }
}
