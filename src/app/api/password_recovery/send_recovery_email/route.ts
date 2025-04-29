'use server';

import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';
import ForgetPassWord from '@/components/emails/forgetPassword/ForgetPassWord';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const email = body?.email;
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
        try {
            const token = uuidv4();
            await prisma.passWordRecovery.create({
                data: {
                    email,
                    token,
                    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
                },
            });

            const data = await resend.emails.send({
                from: 'LoveVerse <loveverse@loveverse.space>',
                to: email,
                subject: 'Alterar senha',
                react: ForgetPassWord({username: user.name, token: token})
            });
            console.log(data)
            return NextResponse.json({ success: true, data });
        } catch (error) {
            return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }
}
