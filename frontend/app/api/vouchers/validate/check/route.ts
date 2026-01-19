import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { valid: false, message: "Código do cupom é obrigatório" },
        { status: 400 }
      );
    }

    // Chamar endpoint de verificação no backend (não marca como usado)
    const response = await fetch(`${BACKEND_URL}/validation/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { valid: false, message: data.message || "Cupom inválido ou já utilizado" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Erro ao verificar cupom:", error);
    return NextResponse.json(
      { valid: false, message: "Erro interno ao verificar cupom" },
      { status: 500 }
    );
  }
}
