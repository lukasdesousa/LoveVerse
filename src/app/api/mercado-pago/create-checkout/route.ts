import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import mpClient from "@/lib/mercado-pago";
import { v4 as uuidv4 } from 'uuid';
import { SignJWT } from 'jose' // ou jsonwebtoken
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function POST(req: NextRequest) {
  const { testeId, userEmail } = await req.json();
  const externalReference = uuidv4();
  const cookieStore = await cookies();

  const jwt = await new SignJWT({ ext: externalReference })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('5m')
    .sign(secret)

  cookieStore.set('failure_token', jwt, {
    path: '/',
    httpOnly: true,
    maxAge: 300, // 5 minutos
  });

  try {
    const preference = new Preference(mpClient);

    const createdPreference = await preference.create({
      body: {
        external_reference: testeId, // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
        metadata: {
          testeId, // O Mercado Pago converte para snake_case, ou seja, testeId vai virar teste_id
          // userEmail: userEmail,
          // plan: '123'
          //etc
        },
        ...(userEmail && {
          payer: {
            email: userEmail,
          },
        }),

        items: [
          {
            id: testeId,
            description: "Mensagem animada LoveVerse",
            title: "Mensagem LoveVerse",
            quantity: 1,
            unit_price: 0.50,
            currency_id: "BRL",
            category_id: "5805",
          },
        ],
        payment_methods: {
          // Descomente para desativar métodos de pagamento
          //   excluded_payment_methods: [
          //     {
          //       id: "bolbradesco",
          //     },
          //     {
          //       id: "pec",
          //     },
          //   ],
          //   excluded_payment_types: [
          //     {
          //       id: "debit_card",
          //     },
          //     {
          //       id: "credit_card",
          //     },
          //   ],
          installments: 2, // Número máximo de parcelas permitidas - calculo feito automaticamente
        },
        auto_return: "approved",
        back_urls: {
          success: `${req.headers.get("origin")}/success`,
          failure: `${req.headers.get("origin")}/failure?status=failure?token=${jwt}?payment_id=${testeId}`,
          pending: `${req.headers.get("origin")}/api/mercado-pago/pending`, 
        }
      },
    });

    if (!createdPreference.id) {
      throw new Error("No preferenceID");
    }

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}