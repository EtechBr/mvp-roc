import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export async function GET(request: Request) {
  try {
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

    // Buscar vouchers (limite de 50 é suficiente para a maioria dos usuários)
    const response = await fetch(`${BACKEND_URL}/vouchers?limit=50`, {
      method: "GET",
      headers,
      cache: "no-store", // Desabilitar cache do Next.js
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
      return NextResponse.json(
        { error: errorData.message || "Erro ao buscar vouchers" },
        { status: response.status }
      );
    }

    const responseData = await response.json();

    // Suporte para API paginada (responseData.data) e API antiga (array direto)
    const vouchersArray = responseData.data ?? responseData;
    const vouchersList = Array.isArray(vouchersArray) ? vouchersArray : [];

    const jsonResponse = NextResponse.json({
      data: vouchersList.map((v: any) => ({
        id: v.id,
        code: v.code,
        restaurantName: v.restaurantName,
        city: v.city,
        discountLabel: v.discountLabel || "10% OFF",
        used: v.used || v.status === "used",
        imageUrl: v.imageUrl || null,
        category: v.category || null,
        status: v.status,
        restaurant: v.restaurant,
      })),
      pagination: responseData.pagination || null,
    });

    // Desabilitar cache para sempre obter dados frescos
    jsonResponse.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    jsonResponse.headers.set("Pragma", "no-cache");

    return jsonResponse;
  } catch (error: any) {
    console.error("Erro ao listar vouchers:", error);
    return NextResponse.json(
      { error: error.message || "Não foi possível carregar os vouchers." },
      { status: 500 }
    );
  }
}
