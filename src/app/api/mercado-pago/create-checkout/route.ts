// app/api/mercado-pago/create/route.ts
import { NextResponse } from 'next/server';
import { Preference } from 'mercadopago';
import mpClient from '@/lib/mercado-pago';
import { v4 as uuidv4 } from 'uuid';
import { SignJWT } from 'jose';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error('Falta variável de ambiente MP_ACCESS_TOKEN');
}
if (!process.env.JWT_SECRET) {
  throw new Error('Falta variável de ambiente JWT_SECRET');
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: Request) {
  const { testeId, userEmail } = await req.json();
  if (!testeId) {
    return NextResponse.json({ error: 'testeId não fornecido' }, { status: 400 });
  }

  // 1) Gera um JWT curto para proteger /success e /failure
  const extRef = uuidv4();
  const jwt = await new SignJWT({ ext: extRef })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('5m')
    .sign(secret);

  // 2) Constroi as URLs de retorno, usando & corretamente
  const origin = req.headers.get('origin')!;
  const successUrl = `${origin}/success?status=success&token=${jwt}&payment_id=${testeId}`;
  const failureUrl = `${origin}/failure?status=failure&token=${jwt}&payment_id=${testeId}`;
  const pendingUrl = `${origin}/api/mercado-pago/pending`;

  try {
    // 3) Cria a preferência no Mercado Pago
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
            description: "Mensagem interativa LoveVerse",
            title: "Mensagem LoveVerse",
            quantity: 1,
            unit_price: 7.90,
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
          installments: 1, // Número máximo de parcelas permitidas - calculo feito automaticamente
        },
        auto_return: "approved",
        back_urls: {
          success: successUrl,
          failure: failureUrl,
          pending: pendingUrl,
        }
      },
    });

    if (!createdPreference.id) {
      throw new Error('Erro: preference.id não foi retornado');
    }

    // 4) Prepara a resposta e define os cookies de proteção
    const response = NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });

    response.cookies.set('success_token', jwt, {
      path: '/',
      httpOnly: true,
      maxAge: 5 * 60,
    });
      
    response.cookies.set('failure_token', jwt, {
      path: '/',
      httpOnly: true,
      maxAge: 5 * 60,
    });

    return response;
  } catch (err) {
    console.error('Erro ao criar preferência Mercado Pago:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erro interno' },
      { status: 500 }
    );
  }
}
