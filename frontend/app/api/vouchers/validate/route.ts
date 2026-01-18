import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

function extractCode(raw: string): string {
  const trimmed = raw.trim().toUpperCase();

  // Tentar extrair de URL
  try {
    const url = new URL(trimmed);
    const fromQuery = url.searchParams.get("code");
    if (fromQuery) {
      return fromQuery.toUpperCase();
    }
  } catch {
    // Não é uma URL, continuar
  }

  const cleaned = trimmed.replace(/[^A-Z0-9-]/g, "");

  // Formato correto: ROC-XXXXX
  if (cleaned.match(/^ROC-[A-Z0-9]{5}$/)) {
    return cleaned;
  }

  // Formato sem hífen: ROCXXXXX
  if (cleaned.match(/^ROC[A-Z0-9]{5}$/)) {
    return `ROC-${cleaned.slice(3)}`;
  }

  // Retornar limpo para validação no backend
  return cleaned;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawCode = String(body.code || "");
    const cpf = body.cpf ? String(body.cpf) : undefined;

    if (!rawCode.trim()) {
      return NextResponse.json(
        { valid: false, reason: "Código não informado." },
        { status: 400 }
      );
    }

    const normalizedCode = extractCode(rawCode);

    // Fazer requisição ao backend
    const requestBody: { code: string; cpf?: string } = { code: normalizedCode };
    if (cpf) {
      requestBody.cpf = cpf;
    }

    const response = await fetch(`${BACKEND_URL}/validation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          valid: false,
          reason: data.message || "Erro ao validar cupom.",
          voucher: data.voucher || null,
        },
        { status: response.status }
      );
    }

    // Adaptar resposta do backend para formato esperado pelo frontend
    return NextResponse.json({
      valid: data.valid !== undefined ? data.valid : true,
      message: data.message,
      voucher: {
        id: data.voucher?.id,
        code: data.voucher?.code || normalizedCode,
        restaurant: data.voucher?.restaurant || {
          name: data.voucher?.restaurantName,
          city: data.voucher?.city,
          offer: data.voucher?.discountLabel || data.voucher?.restaurant?.offer || "Desconto válido",
        },
      },
      customer: data.customer || null,
    });
  } catch (error: any) {
    console.error("Erro ao validar voucher:", error);
    return NextResponse.json(
      { valid: false, reason: error.message || "Erro inesperado ao validar o cupom." },
      { status: 500 }
    );
  }
}
