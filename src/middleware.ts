// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { checkIfEmailIsVerified } from "./hooks/useEmailVerification";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const email = payload.email;
    // O e-mail do usuário vem do payload do JWT
    const verification = await checkIfEmailIsVerified(email as string);
    
    if(!verification) {
      return NextResponse.redirect(new URL("/email_verification", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Erro no middleware:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/create/:path*"],
};
