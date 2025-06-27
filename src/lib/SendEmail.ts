'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function SendEmail(email: string, id: string, creatorName: string, destinataryName: string) {
  try {
    const messageLink = `https://loveverse.space/messages/${id}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(messageLink)}`;

  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 30px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: center;">
      <h2 style="color: #aa00ff; margin-bottom: 10px;">Mensagem criada com sucesso!</h2>
      <p style="font-size: 15px; color: #444; margin-bottom: 20px;">
        Sua mensagem está pronta! Você pode escanear o QR Code abaixo ou clicar nos botões para acessar.
      </p>

      <img src="${qrCodeUrl}" alt="QR Code" width="200" height="200" style="margin: 20px auto; display: block;" />

      <a href="${qrCodeUrl}" style="
        display: inline-block;
        margin-top: 10px;
        background-color: #aa00ff;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        font-size: 14px;
      ">Baixar QR Code</a>

      <p style="margin-top: 10px; font-size: 13px; color: #888;">
        Toque e segure para salvar na galeria.
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

      <a href="${messageLink}" style="
        display: inline-block;
        background-color: #aa00ff;
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        font-size: 14px;
      ">Ver Mensagem</a>

      <div style="margin-top: 40px;">
        <h3 style="color: #333; font-size: 18px;">Ajude-nos a melhorar</h3>
        <p style="font-size: 14px; color: #666; margin-bottom: 15px;">
          Envie sugestões para tornar o LoveVerse ainda melhor 💖
        </p>
        <a href="https://loveverse.space/melhorias/loveverse" style="
          display: inline-block;
          background-color: #aa00ff;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          font-size: 14px;
        ">Dar Sugestões</a>
      </div>

      <p style="margin-top: 40px; font-size: 12px; color: #aaa;">
        Obrigado por usar a LoveVerse 💜
      </p>
    </div>
  </div>
`;

    await resend.emails.send({
      from: 'LoveVerse <noreply@loveverse.space>',
      to: email,
      subject: `Seu QR CODE da mensagem de ${creatorName} & ${destinataryName}`,
      html: html,
    });

    return { success: true };
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Erro desconhecido' };
  }
}
