"use client";

import { useState, useEffect } from "react";
import { CreditCard, Lock, ArrowLeft, CheckCircle, QrCode as QrCodeIcon } from "@phosphor-icons/react";
import Link from "next/link";
import QRCode from "qrcode";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix">("card");
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [pixQrCode, setPixQrCode] = useState<string>("");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    installments: "1",
  });

  // Gerar QR Code do PIX quando o método for selecionado
  useEffect(() => {
    if (paymentMethod === "pix") {
      // QR Code mockado - em produção seria gerado pelo backend
      const pixCode = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540599.995802BR5913ROC PASSPORTE6009SAO PAULO62070503***6304";
      QRCode.toDataURL(pixCode, {
        width: 300,
        margin: 2,
      })
        .then((url) => {
          setPixQrCode(url);
        })
        .catch((err) => {
          console.error("Erro ao gerar QR Code:", err);
        });
    }
  }, [paymentMethod]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    // Simular processamento de pagamento
    setTimeout(() => {
      setStep("success");
      // Redirecionar após 2 segundos
      setTimeout(() => {
        window.location.href = "/checkout/success";
      }, 2000);
    }, paymentMethod === "pix" ? 3000 : 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const copyPixCode = () => {
    const pixCode = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540599.995802BR5913ROC PASSPORTE6009SAO PAULO62070503***6304";
    navigator.clipboard.writeText(pixCode);
    alert("Código PIX copiado para a área de transferência!");
  };

  if (step === "processing") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)] px-[var(--spacing-4)]">
        <div className="w-full max-w-md rounded-2xl bg-[var(--color-white)] p-[var(--spacing-4)] text-center shadow-soft">
          <div className="mb-4 flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--color-roc-primary-light)] border-t-[var(--color-roc-primary)]" />
          </div>
          <h2 className="mb-2 text-xl font-semibold tracking-tight">
            {paymentMethod === "pix" ? "Aguardando pagamento PIX..." : "Processando pagamento..."}
          </h2>
          <p className="text-sm text-[var(--color-text-medium)]">
            {paymentMethod === "pix"
              ? "Aguarde a confirmação do pagamento"
              : "Aguarde enquanto confirmamos sua compra"}
          </p>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)] px-[var(--spacing-4)]">
        <div className="w-full max-w-md rounded-2xl bg-[var(--color-white)] p-[var(--spacing-4)] text-center shadow-soft">
          <div className="mb-4 flex justify-center">
            <CheckCircle size={64} className="text-[var(--color-roc-success)]" weight="fill" />
          </div>
          <h2 className="mb-2 text-xl font-semibold tracking-tight">Pagamento confirmado!</h2>
          <p className="text-sm text-[var(--color-text-medium)]">Redirecionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] px-[var(--spacing-4)] py-[var(--spacing-5)]">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/benefits"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--color-text-medium)] hover:text-[var(--color-text-dark)]"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>

        <div className="grid gap-[var(--spacing-4)] md:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl bg-[var(--color-white)] p-[var(--spacing-4)] shadow-soft">
            <div className="mb-6 flex items-center gap-2">
              <CreditCard size={24} className="text-[var(--color-roc-primary)]" weight="fill" />
              <h1 className="text-2xl font-semibold tracking-tight">Finalizar pagamento</h1>
            </div>

            {/* Seleção do método de pagamento */}
            <div className="mb-6 flex gap-3 rounded-lg border border-[var(--color-border)] p-1">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  paymentMethod === "card"
                    ? "bg-[var(--color-roc-primary)] text-[var(--color-white)]"
                    : "text-[var(--color-text-medium)] hover:bg-[var(--color-bg-light)]"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <CreditCard size={18} weight={paymentMethod === "card" ? "fill" : "regular"} />
                  Cartão
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("pix")}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  paymentMethod === "pix"
                    ? "bg-[var(--color-roc-primary)] text-[var(--color-white)]"
                    : "text-[var(--color-text-medium)] hover:bg-[var(--color-bg-light)]"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <QrCodeIcon size={18} weight={paymentMethod === "pix" ? "fill" : "regular"} />
                  PIX
                </div>
              </button>
            </div>

            {paymentMethod === "card" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1 text-sm">
                    <label htmlFor="cardNumber" className="block font-medium text-[var(--color-text-dark)]">
                      Número do cartão
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      maxLength={19}
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })
                      }
                      className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-roc-primary)] focus:ring-1 focus:ring-[var(--color-roc-primary)]"
                      required
                    />
                  </div>

                  <div className="space-y-1 text-sm">
                    <label htmlFor="cardName" className="block font-medium text-[var(--color-text-dark)]">
                      Nome no cartão
                    </label>
                    <input
                      id="cardName"
                      type="text"
                      placeholder="Nome completo"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-roc-primary)] focus:ring-1 focus:ring-[var(--color-roc-primary)]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 text-sm">
                      <label htmlFor="expiryDate" className="block font-medium text-[var(--color-text-dark)]">
                        Validade
                      </label>
                      <input
                        id="expiryDate"
                        type="text"
                        maxLength={5}
                        placeholder="MM/AA"
                        value={formData.expiryDate}
                        onChange={(e) =>
                          setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) })
                        }
                        className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-roc-primary)] focus:ring-1 focus:ring-[var(--color-roc-primary)]"
                        required
                      />
                    </div>

                    <div className="space-y-1 text-sm">
                      <label htmlFor="cvv" className="block font-medium text-[var(--color-text-dark)]">
                        CVV
                      </label>
                      <input
                        id="cvv"
                        type="text"
                        maxLength={4}
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) =>
                          setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, "") })
                        }
                        className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-roc-primary)] focus:ring-1 focus:ring-[var(--color-roc-primary)]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-sm">
                    <label htmlFor="installments" className="block font-medium text-[var(--color-text-dark)]">
                      Parcelas
                    </label>
                    <select
                      id="installments"
                      value={formData.installments}
                      onChange={(e) => setFormData({ ...formData, installments: e.target.value })}
                      className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-roc-primary)] focus:ring-1 focus:ring-[var(--color-roc-primary)]"
                    >
                      <option value="1">1x de R$ 99,99 sem juros</option>
                      <option value="2">2x de R$ 49,99 sem juros</option>
                      <option value="3">3x de R$ 33,33 sem juros</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                className="w-full rounded-lg bg-[var(--color-roc-primary)] px-4 py-3 text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-roc-primary-dark)]"
                >
                  Finalizar pagamento
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-text-medium)]">
                  <Lock size={14} />
                  <span>Pagamento seguro e criptografado</span>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="rounded-lg border border-[var(--color-roc-primary)] bg-[var(--color-roc-primary-light)]/10 p-6 text-center">
                  <h3 className="mb-3 text-sm font-semibold text-[var(--color-text-dark)]">
                    Escaneie o QR Code com o app do seu banco
                  </h3>
                  {pixQrCode ? (
                    <div className="mb-4 flex justify-center">
                      <img src={pixQrCode} alt="QR Code PIX" className="rounded-lg" />
                    </div>
                  ) : (
                    <div className="mb-4 flex justify-center">
                      <div className="h-[300px] w-[300px] animate-pulse rounded-lg bg-[var(--color-border)]" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={copyPixCode}
                  className="rounded-lg border border-[var(--color-roc-primary)] bg-[var(--color-white)] px-4 py-2 text-sm font-medium text-[var(--color-roc-primary)] hover:bg-[var(--color-roc-primary-light)]/10"
                  >
                    Copiar código PIX
                  </button>
                </div>

                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-light)] p-4 text-sm text-[var(--color-text-medium)]">
                  <p className="mb-2 font-medium">Instruções:</p>
                  <ol className="list-decimal space-y-1 pl-5 text-xs">
                    <li>Abra o app do seu banco</li>
                    <li>Escaneie o QR Code ou cole o código PIX</li>
                    <li>Confirme o pagamento de R$ 99,99</li>
                    <li>Aguarde a confirmação automática</li>
                  </ol>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full rounded-lg bg-[var(--color-roc-primary)] px-4 py-3 text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-roc-primary-dark)]"
                >
                  Já efetuei o pagamento
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-6 shadow-soft">
              <h2 className="mb-4 text-sm font-semibold uppercase text-[var(--color-text-medium)]">
                Resumo do pedido
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-medium)]">Passaporte ROC</span>
                  <span className="font-medium">R$ 99,99</span>
                </div>
                {paymentMethod === "pix" && (
                  <div className="rounded-lg bg-[var(--color-roc-success)]/10 p-2 text-xs text-[var(--color-roc-success)]">
                    ✓ Desconto de 5% aplicado (PIX)
                  </div>
                )}
                <div className="border-t border-[var(--color-border)] pt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>{paymentMethod === "pix" ? "R$ 94,99" : "R$ 99,99"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-roc-primary)] bg-[var(--color-roc-primary-light)]/10 p-6">
              <h3 className="mb-2 text-sm font-semibold text-[var(--color-text-dark)]">
                O que você recebe:
              </h3>
              <ul className="space-y-2 text-xs text-[var(--color-text-medium)]">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  <span>25 vouchers exclusivos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  <span>90 dias de validade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  <span>Uso digital e físico</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  <span>Descontos de 10% a 30%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
