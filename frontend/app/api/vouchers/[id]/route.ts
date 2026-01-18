import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const voucherId = params.id;

    // Validar UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(voucherId)) {
      return NextResponse.json(
        { error: "ID de voucher inválido." },
        { status: 400 }
      );
    }

    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Não autenticado. Faça login primeiro." },
        { status: 401 }
      );
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: authHeader,
    };

    const response = await fetch(`${BACKEND_URL}/vouchers/${voucherId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
      return NextResponse.json(
        { error: errorData.message || "Erro ao buscar voucher." },
        { status: response.status }
      );
    }

    const voucher = await response.json();

    return NextResponse.json({
      id: voucher.id,
      code: voucher.code,
      used: voucher.used || voucher.status === "used",
      status: voucher.status,
      usedAt: voucher.usedAt,
      createdAt: voucher.createdAt,
      expiresAt: voucher.expiresAt,
      restaurant: {
        id: voucher.restaurant?.id,
        name: voucher.restaurantName || voucher.restaurant?.name,
        city: voucher.city || voucher.restaurant?.city,
        discount: voucher.discountLabel || voucher.restaurant?.discountLabel || "10% OFF",
        imageUrl: voucher.imageUrl || voucher.restaurant?.imageUrl || null,
        category: voucher.category || voucher.restaurant?.category || null,
      },
    });
  } catch (error: any) {
    console.error("Erro ao carregar detalhes do voucher:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao carregar detalhes do voucher." },
      { status: 500 }
    );
  }
}
