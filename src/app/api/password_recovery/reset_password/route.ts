'use server';

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const token = body?.token;
    const newPassword = body?.newPassword;
    const resetRequest = await prisma.passWordRecovery.findFirst({ where: { token } });

    if (!resetRequest || resetRequest.expiresAt < new Date()) {
        throw new Error('Token inválido ou expirado.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
        await prisma.user.update({
            where: { email: resetRequest.email },
            data: { password: hashedPassword },
        });
        await prisma.passWordRecovery.delete({ where: { email: resetRequest.email, token } });
        return NextResponse.json({ success: true, message: 'Senha redefinida com sucesso!' });
    } catch (err) {
        return NextResponse.json({ success: false, message: err instanceof Error ? err.message : 'Erro desconhecido' });
    }

}
