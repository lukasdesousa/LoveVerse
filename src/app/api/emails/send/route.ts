import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const data = await resend.emails.send({
      from: "LoveVerse <loveverse@loveverse.space>",
      to: [body.to],
      subject: body.subject,
      html: `<strong>Email teste de LoveVerse</strong>`,
    });
    console.log(data)
    // Retornando a resposta com o status de sucesso
    return NextResponse.json({ success: true, data });
  } catch (error) {
    // Retornando a resposta de erro com um status de erro apropriado
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' });
  }
}
