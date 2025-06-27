'use server';

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { SendEmail } from "@/lib/SendEmail";

const prisma = new PrismaClient();

function validateInput(creatorName: string, destinataryName: string, content: string): string | null {

    if (!creatorName || typeof creatorName !== "string" || creatorName.trim() === "") {
        return "Nome inválido, por favor, insira um nome válido!";
    }

    if (!destinataryName || typeof destinataryName !== "string" || destinataryName.trim() === "") {
        return "Nome inválido, por favor, insira um nome válido!";
    }

    if (!content) {
        return "Insira uma mensagem!";
    }

    return null;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const validationError = validateInput(body.creatorName, body.destinataryName, body.content);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        const newMessage = await prisma.message.create({
            data: {
                creatorName: body.creatorName,
                destinataryName: body.destinataryName,
                content: body.content,
                email: body.email,
                expiresAt: body.expiresAt || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                spotifyLink: body.spotifyLink || null,
                rouletteTitle: body.rouletteTitle || null,
                rouletteItens: body.rouletteItens || null,
                imageUrl: body.imageUrl || null,
                dateInit: body.dateInit ? new Date(body.dateInit) : null,
                emailSent: false,
            }
        });

        if (newMessage.id && !newMessage.emailSent) {
                await SendEmail(newMessage.email, newMessage.id, newMessage.creatorName, newMessage.destinataryName)
                
                await prisma.message.update({
                    where: { id: newMessage.id },
                    data: { emailSent: true }
                });
        }
        return NextResponse.json({ message: newMessage }, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar mensagem:", error);
        return NextResponse.json({ error: "Erro ao registrar usuário" }, { status: 500 });
    }
}
