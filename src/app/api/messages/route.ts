"use server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function validateInput(creatorName: string, destinataryName: string, content: string, id: string): string | null {
    if (!id) {
        return "Faça login para criar uma mensagem!";
    }
    console.log(creatorName)
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
        console.log(body.dateInit)

        const validationError = validateInput(body.creatorName, body.destinataryName, body.content, body.id);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        const newMessage = await prisma.message.create({
            data: {
            creatorName: body.creatorName,
            destinataryName: body.destinataryName,
            content: body.content,
            expiresAt: body.expiresAt || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            spotifyLink: body.spotifyLink || null,
            interactiveMessage: body.interactiveMessage,
            imageUrl: body.imageUrl || null,
            dateInit: body.dateInit || null,
            user: { connect: { id: body.id } },
            },
        });
        return NextResponse.json({ message: [newMessage] }, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar mensagem:", error);
        return NextResponse.json({ error: "Erro ao registrar usuário" }, { status: 500 });
    }
}
