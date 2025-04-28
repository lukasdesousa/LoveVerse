"use server";

import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_req: NextRequest) {
  try {
    // Limpar o cookie do token
    const response = NextResponse.json({ message: "Logout bem-sucedido!" }, { status: 200 });

    // Remove o cookie 'token' 
    response.cookies.delete("token");

    return response;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return NextResponse.json({ error: "Erro ao realizar logout" }, { status: 500 });
  }
}
