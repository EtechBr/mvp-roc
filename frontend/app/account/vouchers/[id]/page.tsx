"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import QRCode from "qrcode";
import { ArrowLeft, Clock, CheckCircle, WarningCircle, ForkKnife, MapPin } from "@phosphor-icons/react";

interface VoucherDetail {
  id: string;
  code: string;
  used: boolean;
  restaurant: {
    id?: string;
    name: string;
    city: string;
    category?: string;
    discount?: string;
    imageUrl?: string | null;
    offer?: {
      title: string;
      description: string;
      rules: string[];
      validity: string;
    };
    logo?: string;
  };
}

export default function VoucherPage() {
  const params = useParams<{ id: string }>();
  const voucherId = params.id;

  const [voucher, setVoucher] = useState<VoucherDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [copied, setCopied] = useState(false);

  // Buscar dados do voucher
  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem("auth_token");
        const userId = localStorage.getItem("user_id");

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        if (userId) {
          headers["x-user-id"] = userId;
        }

        const response = await fetch(`/api/vouchers/${voucherId}`, {
          headers,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Erro desconhecido" }));
          throw new Error(errorData.error || "Erro ao carregar voucher");
        }

        const data = await response.json();

        // Adicionar dados mockados para campos que não vêm da API
        setVoucher({
          ...data,
          restaurant: {
            ...data.restaurant,
            category: data.restaurant?.category || "Gastronomia",
            discount: data.restaurant?.discount || "10% OFF",
            logo: "🍽️",
            offer: {
              title: "Desconto Especial",
              description: "Aproveite nosso desconto exclusivo para membros do ROC Passaporte.",
              rules: [
                "Válido apenas para consumo no local",
                "Não acumulativo com outras promoções",
                "Apresentar cupom na hora do pagamento",
                "Válido de segunda a domingo",
              ],
              validity: "Válido até 31/12/2024",
            },
          },
        });
      } catch (err: any) {
        setError(err.message || "Erro ao carregar voucher");
        console.error("Erro ao buscar voucher:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (voucherId) {
      fetchVoucher();
    }
  }, [voucherId]);

  // Gerar QR Code quando o cupom for gerado
  useEffect(() => {
    if (showCoupon && voucher) {
      const qrData = JSON.stringify({
        code: voucher.code,
        restaurantId: voucher.restaurant.id || voucherId,
        restaurantName: voucher.restaurant.name,
      });

      QRCode.toDataURL(qrData, {
        errorCorrectionLevel: "H",
        width: 180,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then((url) => {
          setQrDataUrl(url);
        })
        .catch((err) => {
          console.error("Erro ao gerar QR Code:", err);
        });
    }
  }, [showCoupon, voucher, voucherId]);

  const handleGenerateCoupon = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowCoupon(true);
    }, 1500);
  };

  const handleCopyCode = () => {
    if (voucher?.code) {
      navigator.clipboard.writeText(voucher.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)]">
        <div className="text-center">
          <div className="mb-4 text-lg text-[var(--color-text-medium)]">Carregando voucher...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !voucher) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)]">
        <div className="text-center">
          <div className="mb-4 text-lg text-[var(--color-roc-danger)]">
            {error || "Voucher não encontrado"}
          </div>
          <Link
            href="/account/vouchers"
            className="text-[var(--color-roc-primary)] hover:underline"
          >
            Voltar aos vouchers
          </Link>
        </div>
      </div>
    );
  }

  const voucherCode = voucher.code;
  const restaurant = voucher.restaurant;

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">
      <main className="pt-24 pb-12">
        <div className="mx-auto max-w-[1400px] px-[var(--spacing-4)] md:px-[var(--spacing-6)] lg:px-[var(--spacing-7)]">
          <Link
            href="/account/vouchers"
            className="mb-6 flex items-center gap-2 text-sm text-[var(--color-text-medium)] transition-colors hover:text-[var(--color-text-dark)]"
          >
            <ArrowLeft size={20} weight="bold" />
            Voltar às ofertas
          </Link>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Offer Details Card - Esquerda */}
            <div className="overflow-hidden rounded-2xl bg-[var(--color-white)] shadow-medium">
              {/* Header com Logo */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[var(--color-roc-primary-light)]/10 to-[var(--color-roc-accent)]/10">
                <span className="text-8xl">{restaurant.logo || "🍽️"}</span>
              </div>

              <div className="p-6 md:p-8">
                {/* Tags de Categoria e Desconto */}
                <div className="mb-3 flex items-center gap-2">
                  {restaurant.category && (
                    <span className="rounded-full bg-[var(--color-bg-light)] px-3 py-1 text-xs text-[var(--color-text-medium)]">
                      {restaurant.category}
                    </span>
                  )}
                  <span className="rounded-full bg-[var(--color-roc-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-roc-primary)]">
                    {restaurant.discount || "10% OFF"}
                  </span>
                </div>

                {/* Nome do Restaurante */}
                <h1 className="mb-2 text-2xl font-bold text-[var(--color-text-dark)] md:text-3xl">
                  {restaurant.name}
                </h1>

                {/* Título da Oferta */}
                {restaurant.offer && (
                  <>
                    <h2 className="mb-4 text-lg font-medium text-[var(--color-roc-primary)]">
                      {restaurant.offer.title}
                    </h2>

                    {/* Descrição da Oferta */}
                    <p className="mb-6 text-[var(--color-text-medium)]">{restaurant.offer.description}</p>

                    {/* Regras da Oferta */}
                    <div className="border-t border-[var(--color-border)] pt-6">
                      <h3 className="mb-3 font-semibold text-[var(--color-text-dark)]">Regras da oferta:</h3>
                      <ul className="space-y-2">
                        {restaurant.offer.rules.map((rule, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-[var(--color-text-medium)]"
                          >
                            <WarningCircle
                              size={16}
                              weight="fill"
                              className="mt-0.5 flex-shrink-0 text-[var(--color-roc-accent)]"
                            />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Validade */}
                      <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-text-medium)]">
                        <Clock size={16} weight="fill" />
                        <span>{restaurant.offer.validity}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Coupon Section - Direita */}
            <div className="flex flex-col">
              {showCoupon ? (
                <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-[var(--color-white)] p-6 shadow-medium md:p-8">
                  <h2 className="mb-4 text-center text-xl font-bold text-[var(--color-text-dark)]">
                    Seu Cupom Está Pronto!
                  </h2>

                  {/* QR Code */}
                  {qrDataUrl && (
                    <div className="mb-6">
                      <img src={qrDataUrl} alt="QR Code" className="h-[180px] w-[180px]" />
                    </div>
                  )}

                  {/* Código do Cupom */}
                  <div className="mb-4 w-full rounded-xl bg-[var(--color-bg-light)] px-6 py-4">
                    <p className="mb-1 text-center text-sm text-[var(--color-text-medium)]">
                      Código do cupom:
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <p className="font-mono text-center text-lg font-bold tracking-wider text-[var(--color-text-dark)]">
                        {voucherCode}
                      </p>
                      <button
                        onClick={handleCopyCode}
                        className="rounded-lg p-1 hover:bg-[var(--color-white)]"
                        title="Copiar código"
                      >
                        {copied ? (
                          <CheckCircle size={20} className="text-[var(--color-roc-success)]" weight="fill" />
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-[var(--color-text-medium)]"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Instruções */}
                  <p className="text-center text-sm text-[var(--color-text-medium)]">
                    Apresente este QR Code ou código ao garçom para validar seu desconto.
                  </p>
                </div>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-[var(--color-white)] p-6 shadow-medium md:p-8">
                  <div className="text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-roc-primary)]/10">
                      <span className="text-4xl">🎟️</span>
                    </div>

                    <h2 className="mb-3 text-xl font-bold text-[var(--color-text-dark)]">
                      Pronto para economizar?
                    </h2>

                    <p className="mb-6 text-[var(--color-text-medium)]">
                      Gere seu cupom exclusivo e aproveite {restaurant.discount || "10% OFF"} de desconto!
                    </p>

                    <button
                      onClick={handleGenerateCoupon}
                      disabled={isGenerating}
                      className="w-full rounded-lg bg-[var(--color-roc-primary)] px-[var(--spacing-4)] py-[var(--spacing-3)] text-sm font-semibold text-[var(--color-white)] transition-all hover:bg-[var(--color-roc-primary-dark)] disabled:opacity-50"
                    >
                      {isGenerating ? "Gerando cupom..." : "Gerar Cupom"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
