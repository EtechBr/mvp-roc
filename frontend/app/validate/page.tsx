"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Keyboard,
  QrCode,
  ArrowClockwise,
  ArrowLeft,
  Storefront,
  Tag,
  Clock,
  Sparkle,
  ForkKnife,
  User,
  ClockCounterClockwise,
  Warning,
  X,
} from "@phosphor-icons/react";
import { QRScanner } from "../components/QRScanner";

type ValidationMode = "choice" | "manual" | "scanner";
type ValidationStatus = "idle" | "validating" | "confirming" | "success" | "error";

interface CouponInfo {
  code: string;
  restaurant: string;
  offer: string;
  customerName?: string;
}

interface ValidationHistory {
  code: string;
  restaurant: string;
  offer: string;
  validatedAt: string;
  status: "success" | "error";
}

export default function ValidatePage() {
  const [mode, setMode] = useState<ValidationMode>("choice");
  const [inputCode, setInputCode] = useState("");
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>("idle");
  const [couponInfo, setCouponInfo] = useState<CouponInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isValidating, setIsValidating] = useState(false);
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [showHistory, setShowHistory] = useState(false);
  const [validationHistory, setValidationHistory] = useState<ValidationHistory[]>([]);

  // Atualizar horário de sincronização periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(new Date());
    }, 30000); // Atualiza a cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  // Carregar histórico do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("validation_history");
    if (saved) {
      setValidationHistory(JSON.parse(saved));
    }
  }, []);

  // Salvar no histórico
  const addToHistory = (entry: ValidationHistory) => {
    const updated = [entry, ...validationHistory].slice(0, 10); // Manter últimos 10
    setValidationHistory(updated);
    localStorage.setItem("validation_history", JSON.stringify(updated));
  };

  // Verificar cupom (busca informações sem usar)
  const handleCheckCoupon = async (code: string) => {
    if (!code.trim() || isValidating) {
      return;
    }

    setIsValidating(true);
    setValidationStatus("validating");
    setErrorMessage("");

    try {
      // Primeiro, apenas verificar se o cupom existe e é válido
      const response = await fetch("/api/vouchers/validate/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok || !data.valid) {
        setValidationStatus("error");
        setErrorMessage(data.message || "Cupom inválido ou já utilizado");
        setCouponInfo(null);
        addToHistory({
          code: code,
          restaurant: "-",
          offer: "-",
          validatedAt: new Date().toISOString(),
          status: "error",
        });
        return;
      }

      // Cupom válido - mostrar tela de confirmação
      setCouponInfo({
        code: data.voucher.code,
        restaurant: data.voucher.restaurant?.name || "Restaurante",
        offer: data.voucher.restaurant?.offer || data.voucher.restaurant?.discountLabel || "Desconto",
        customerName: data.customer?.name,
      });
      setValidationStatus("confirming");
    } catch (error) {
      console.error("Erro ao verificar cupom:", error);
      setValidationStatus("error");
      setErrorMessage("Erro de conexão. Verifique sua internet.");
      setCouponInfo(null);
    } finally {
      setIsValidating(false);
    }
  };

  // Confirmar uso do cupom
  const handleConfirmValidation = async () => {
    if (!couponInfo || isValidating) return;

    setIsValidating(true);
    setValidationStatus("validating");

    try {
      const response = await fetch("/api/vouchers/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: couponInfo.code }),
      });

      const data = await response.json();

      if (!response.ok || !data.valid) {
        setValidationStatus("error");
        setErrorMessage(data.message || "Erro ao validar cupom");
        addToHistory({
          code: couponInfo.code,
          restaurant: couponInfo.restaurant,
          offer: couponInfo.offer,
          validatedAt: new Date().toISOString(),
          status: "error",
        });
        return;
      }

      // Sucesso
      setValidationStatus("success");
      addToHistory({
        code: couponInfo.code,
        restaurant: couponInfo.restaurant,
        offer: couponInfo.offer,
        validatedAt: new Date().toISOString(),
        status: "success",
      });
    } catch (error) {
      console.error("Erro ao validar cupom:", error);
      setValidationStatus("error");
      setErrorMessage("Erro de conexão. Tente novamente.");
    } finally {
      setIsValidating(false);
    }
  };

  // Cancelar confirmação
  const handleCancelConfirmation = () => {
    setValidationStatus("idle");
    setCouponInfo(null);
    setInputCode("");
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCheckCoupon(inputCode);
  };

  const handleQRScan = (code: string) => {
    setInputCode(code);
    handleCheckCoupon(code);
  };

  const handleReset = () => {
    setInputCode("");
    setValidationStatus("idle");
    setCouponInfo(null);
    setErrorMessage("");
    setMode("choice");
  };

  // Mascarar nome do cliente (ex: "João Silva" -> "Jo** Si***")
  const maskName = (name: string) => {
    if (!name) return "";
    const parts = name.split(" ");
    return parts
      .map((part) => {
        if (part.length <= 2) return part;
        return part.substring(0, 2) + "*".repeat(part.length - 2);
      })
      .join(" ");
  };

  // Se estiver no modo scanner, renderizar componente QRScanner
  if (mode === "scanner" && validationStatus === "idle") {
    return (
      <QRScanner
        onScan={handleQRScan}
        onClose={() => {
          setMode("choice");
        }}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[var(--color-roc-primary)] via-[var(--color-roc-primary)] to-[var(--color-roc-primary-dark)]">
      {/* Header Otimizado */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--color-roc-primary-dark)]/80 py-3 backdrop-blur-md sm:py-4">
        <div className="mx-auto w-full max-w-[1400px] px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <ForkKnife size={24} weight="fill" className="text-white" />
              <div>
                <span className="text-lg font-bold text-white sm:text-xl">
                  ROC Passaporte
                </span>
                <span className="ml-2 hidden text-sm text-white/60 sm:inline">
                  | Portal do Lojista
                </span>
              </div>
            </div>
            {/* Status de Conexão Melhorado */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/20 sm:px-3 sm:text-sm"
              >
                <ClockCounterClockwise size={16} weight="bold" />
                <span className="hidden sm:inline">Histórico</span>
              </button>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--color-roc-success)]" />
                  <span className="text-sm font-medium text-white">Online</span>
                </div>
                <span className="text-[10px] text-white/50 sm:text-xs">
                  Sync: {lastSync.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          {/* Choice Mode - Tela Inicial Otimizada */}
          {mode === "choice" && validationStatus === "idle" && (
            <div className="space-y-4">
              {/* Welcome Card */}
              <div className="rounded-2xl bg-white p-6 text-center shadow-large sm:rounded-3xl sm:p-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-roc-primary)] to-[var(--color-roc-primary-light)] shadow-medium sm:mb-5 sm:h-16 sm:w-16">
                  <Sparkle size={28} weight="fill" className="text-white" />
                </div>
                <h1 className="mb-2 text-xl font-bold text-[var(--color-text-dark)] sm:text-2xl">
                  Validação Rápida de Cupom
                </h1>
                <p className="text-sm text-[var(--color-text-medium)] sm:text-base">
                  Escolha o método de validação
                </p>
              </div>

              {/* Opções de Validação */}
              <div className="grid gap-3 sm:gap-4">
                {/* Opção QR Code Scanner - Preferencial */}
                <button
                  onClick={() => setMode("scanner")}
                  className="group relative overflow-hidden rounded-xl border-2 border-[var(--color-roc-primary)]/20 bg-white p-4 text-left shadow-medium transition-all hover:border-[var(--color-roc-primary)]/50 hover:shadow-large sm:rounded-2xl sm:p-5"
                >
                  <div className="absolute right-2 top-2 rounded-full bg-[var(--color-roc-primary)] px-2 py-0.5 text-[10px] font-semibold text-white">
                    Recomendado
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--color-roc-primary)]/10 transition-colors group-hover:bg-[var(--color-roc-primary)]/20">
                      <QrCode size={32} weight="fill" className="text-[var(--color-roc-primary)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-base font-semibold text-[var(--color-text-dark)] sm:text-lg">
                        Escanear QR Code
                      </h3>
                      <p className="text-xs text-[var(--color-text-medium)] sm:text-sm">
                        Use a câmera do dispositivo para leitura instantânea
                      </p>
                    </div>
                  </div>
                </button>

                {/* Opção Digitar Código - Com campo visível */}
                <div className="rounded-xl border-2 border-transparent bg-white p-4 shadow-medium transition-all sm:rounded-2xl sm:p-5">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--color-roc-accent)]/10">
                      <Keyboard size={32} weight="fill" className="text-[var(--color-roc-accent)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-base font-semibold text-[var(--color-text-dark)] sm:text-lg">
                        Digitar Código
                      </h3>
                      <p className="text-xs text-[var(--color-text-medium)] sm:text-sm">
                        Insira o código ROC-XXXXX manualmente
                      </p>
                    </div>
                  </div>
                  {/* Campo de entrada visível direto na tela inicial */}
                  <form onSubmit={handleManualSubmit} className="space-y-3">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) =>
                        setInputCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""))
                      }
                      className="w-full rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg-light)] px-4 py-3 text-center text-lg font-mono uppercase tracking-[0.2em] outline-none transition-all focus:border-[var(--color-roc-accent)] focus:ring-2 focus:ring-[var(--color-roc-accent)]/20"
                      placeholder="ROC-XXXXX"
                      maxLength={9}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                    />
                    <button
                      type="submit"
                      disabled={inputCode.length !== 9}
                      className="w-full rounded-xl bg-[var(--color-roc-accent)] px-4 py-3 text-sm font-semibold text-white shadow-medium transition-all hover:bg-[var(--color-roc-accent)]/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Verificar Cupom
                    </button>
                  </form>
                </div>
              </div>

              {/* Texto de Ajuda - Discreto */}
              <p className="px-4 text-center text-[10px] text-white/40 sm:text-xs">
                O cupom será marcado como utilizado após confirmação
              </p>
            </div>
          )}

          {/* Manual Input Mode - Mantido para compatibilidade */}
          {mode === "manual" && validationStatus === "idle" && (
            <div className="rounded-2xl bg-white p-6 shadow-large sm:rounded-3xl sm:p-8">
              <button
                onClick={() => setMode("choice")}
                className="mb-6 flex items-center gap-2 text-sm text-[var(--color-text-medium)] transition-colors hover:text-[var(--color-text-dark)]"
              >
                <ArrowLeft size={16} weight="bold" />
                Voltar
              </button>

              <div className="mb-6 text-center sm:mb-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-roc-accent)]/10 sm:h-16 sm:w-16">
                  <Keyboard size={28} weight="fill" className="text-[var(--color-roc-accent)]" />
                </div>
                <h1 className="mb-2 text-xl font-bold text-[var(--color-text-dark)] sm:text-2xl">
                  Digitar Código
                </h1>
                <p className="text-sm text-[var(--color-text-medium)]">
                  Digite o código ROC-XXXXX do cupom
                </p>
              </div>

              <form onSubmit={handleManualSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) =>
                      setInputCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""))
                    }
                    className="w-full rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg-light)] px-4 py-3 text-center text-xl font-mono uppercase tracking-[0.3em] outline-none transition-all focus:border-[var(--color-roc-primary)] focus:ring-2 focus:ring-[var(--color-roc-primary)]/20 sm:px-5 sm:py-4 sm:text-2xl"
                    placeholder="ROC-XXXXX"
                    maxLength={9}
                    autoFocus
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                  <p className="mt-2 text-center text-xs text-[var(--color-text-medium)]">
                    {inputCode.length}/9 caracteres
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={inputCode.length !== 9}
                  className="w-full rounded-xl bg-gradient-to-r from-[var(--color-roc-primary)] to-[var(--color-roc-primary-light)] px-4 py-3 text-sm font-semibold text-white shadow-medium transition-all hover:shadow-large disabled:cursor-not-allowed disabled:opacity-50 sm:py-4 sm:text-base"
                >
                  Verificar Cupom
                </button>
              </form>
            </div>
          )}

          {/* Validating State */}
          {validationStatus === "validating" && (
            <div className="rounded-2xl bg-white p-8 shadow-large sm:rounded-3xl sm:p-10">
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-roc-primary)]/10 sm:mb-6 sm:h-20 sm:w-20">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-roc-primary)]/30 border-t-[var(--color-roc-primary)] sm:h-12 sm:w-12" />
                </div>
                <h2 className="mb-2 text-lg font-bold text-[var(--color-text-dark)] sm:text-xl">
                  Verificando...
                </h2>
                <p className="text-sm text-[var(--color-text-medium)]">
                  Consultando o código do cupom
                </p>
              </div>
            </div>
          )}

          {/* NOVA Tela de Confirmação */}
          {validationStatus === "confirming" && couponInfo && (
            <div className="rounded-2xl border-2 border-[var(--color-roc-primary)]/30 bg-white p-6 shadow-large sm:rounded-3xl sm:p-8">
              <div className="text-center">
                {/* Status Badge */}
                <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-roc-success)]/10 px-4 py-2">
                  <CheckCircle size={20} weight="fill" className="text-[var(--color-roc-success)]" />
                  <span className="text-sm font-semibold text-[var(--color-roc-success)]">
                    Cupom Válido
                  </span>
                </div>

                <h1 className="mb-2 text-xl font-bold text-[var(--color-text-dark)] sm:text-2xl">
                  Confirmar Validação
                </h1>
                <p className="mb-6 text-sm text-[var(--color-text-medium)]">
                  Verifique os dados antes de confirmar o uso
                </p>

                {/* Detalhes do Cupom */}
                <div className="mb-6 space-y-3 rounded-xl bg-[var(--color-bg-light)] p-4 text-left sm:space-y-4 sm:rounded-2xl sm:p-5">
                  {/* Código */}
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                    <span className="text-xs text-[var(--color-text-medium)]">Código</span>
                    <span className="font-mono text-base font-bold tracking-wider text-[var(--color-text-dark)]">
                      {couponInfo.code}
                    </span>
                  </div>

                  {/* Restaurante */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-roc-primary)]/10">
                      <Storefront size={18} weight="fill" className="text-[var(--color-roc-primary)]" />
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs text-[var(--color-text-medium)]">Restaurante</p>
                      <p className="text-sm font-semibold text-[var(--color-text-dark)] sm:text-base">
                        {couponInfo.restaurant}
                      </p>
                    </div>
                  </div>

                  {/* Oferta */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-roc-accent)]/10">
                      <Tag size={18} weight="fill" className="text-[var(--color-roc-accent)]" />
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs text-[var(--color-text-medium)]">Oferta</p>
                      <p className="text-sm font-semibold text-[var(--color-text-dark)] sm:text-base">
                        {couponInfo.offer}
                      </p>
                    </div>
                  </div>

                  {/* Cliente (parcialmente ofuscado) */}
                  {couponInfo.customerName && (
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-text-medium)]/10">
                        <User size={18} weight="fill" className="text-[var(--color-text-medium)]" />
                      </div>
                      <div>
                        <p className="mb-0.5 text-xs text-[var(--color-text-medium)]">Cliente</p>
                        <p className="text-sm font-semibold text-[var(--color-text-dark)] sm:text-base">
                          {maskName(couponInfo.customerName)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Aviso */}
                <div className="mb-6 flex items-start gap-2 rounded-lg bg-[var(--color-roc-accent)]/10 p-3 text-left">
                  <Warning size={18} className="mt-0.5 flex-shrink-0 text-[var(--color-roc-accent)]" />
                  <p className="text-xs text-[var(--color-text-medium)]">
                    Ao confirmar, o cupom será marcado como utilizado e não poderá ser usado novamente.
                  </p>
                </div>

                {/* Botões de Ação */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCancelConfirmation}
                    className="flex-1 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text-dark)] transition-colors hover:bg-[var(--color-bg-light)]"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmValidation}
                    disabled={isValidating}
                    className="flex-1 rounded-xl bg-[var(--color-roc-success)] px-4 py-3 text-sm font-bold text-white shadow-medium transition-all hover:bg-[var(--color-roc-success)]/90 disabled:opacity-50"
                  >
                    CONFIRMAR USO
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {validationStatus === "success" && (
            <div className="animate-scale-in rounded-2xl border-2 border-[var(--color-roc-success)]/50 bg-gradient-to-br from-[var(--color-roc-success)]/20 to-[var(--color-roc-success)]/10 p-6 shadow-large sm:rounded-3xl sm:p-8">
              <div className="text-center">
                <div
                  className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-roc-success)] shadow-medium sm:mb-6"
                  style={{
                    boxShadow: "0 0 40px rgba(34, 139, 34, 0.4)",
                  }}
                >
                  <CheckCircle size={40} weight="fill" className="text-white" />
                </div>

                <h1 className="mb-2 text-2xl font-bold text-[var(--color-roc-success)] sm:text-3xl">
                  Cupom Validado!
                </h1>
                <p className="mb-6 text-sm text-[var(--color-text-medium)]">
                  O cupom foi utilizado com sucesso
                </p>

                {couponInfo && (
                  <div className="mb-6 space-y-3 rounded-xl bg-white/80 p-4 text-left backdrop-blur-sm sm:space-y-4 sm:rounded-2xl sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-roc-primary)]/10">
                        <Storefront size={16} weight="fill" className="text-[var(--color-roc-primary)]" />
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-[var(--color-text-medium)]">Restaurante</p>
                        <p className="text-sm font-medium text-[var(--color-text-dark)] sm:text-base">
                          {couponInfo.restaurant}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-roc-accent)]/10">
                        <Tag size={16} weight="fill" className="text-[var(--color-roc-accent)]" />
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-[var(--color-text-medium)]">Oferta</p>
                        <p className="text-sm font-medium text-[var(--color-text-dark)] sm:text-base">
                          {couponInfo.offer}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-roc-success)]/10">
                        <Clock size={16} weight="fill" className="text-[var(--color-roc-success)]" />
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-[var(--color-text-medium)]">Validado em</p>
                        <p className="text-sm font-medium text-[var(--color-text-dark)] sm:text-base">
                          {new Date().toLocaleString("pt-BR", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--color-text-dark)] transition-colors hover:bg-[var(--color-bg-light)] sm:px-6 sm:py-3 sm:text-base"
                >
                  <ArrowClockwise size={16} weight="bold" />
                  Validar outro cupom
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {validationStatus === "error" && (
            <div className="animate-scale-in rounded-2xl border-2 border-[var(--color-roc-danger)]/50 bg-gradient-to-br from-[var(--color-roc-danger)]/20 to-[var(--color-roc-danger)]/10 p-6 shadow-large sm:rounded-3xl sm:p-8">
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-roc-danger)] sm:mb-6">
                  <XCircle size={40} weight="fill" className="text-white" />
                </div>

                <h1 className="mb-2 text-2xl font-bold text-[var(--color-roc-danger)] sm:text-3xl">
                  Cupom Inválido
                </h1>

                <p className="mx-auto mb-6 max-w-xs text-sm text-[var(--color-text-medium)]">
                  {errorMessage || "O código informado não foi encontrado ou já foi utilizado anteriormente."}
                </p>

                <div className="mb-6 rounded-xl bg-white/80 p-4 backdrop-blur-sm">
                  <p className="mb-1 text-xs text-[var(--color-text-medium)]">Código digitado:</p>
                  <p className="font-mono text-lg tracking-wider text-[var(--color-text-dark)]">
                    {inputCode || "—"}
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--color-text-dark)] transition-colors hover:bg-[var(--color-bg-light)]"
                >
                  <ArrowClockwise size={16} weight="bold" />
                  Tentar novamente
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal de Histórico */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[80vh] w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] p-4">
              <h2 className="text-lg font-bold text-[var(--color-text-dark)]">
                Validações Recentes
              </h2>
              <button
                onClick={() => setShowHistory(false)}
                className="rounded-lg p-1 text-[var(--color-text-medium)] hover:bg-[var(--color-bg-light)]"
              >
                <X size={24} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {validationHistory.length === 0 ? (
                <p className="py-8 text-center text-sm text-[var(--color-text-medium)]">
                  Nenhuma validação registrada
                </p>
              ) : (
                <div className="space-y-3">
                  {validationHistory.map((item, index) => (
                    <div
                      key={index}
                      className={`rounded-xl border p-3 ${
                        item.status === "success"
                          ? "border-[var(--color-roc-success)]/30 bg-[var(--color-roc-success)]/5"
                          : "border-[var(--color-roc-danger)]/30 bg-[var(--color-roc-danger)]/5"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-[var(--color-text-dark)]">
                          {item.code}
                        </span>
                        {item.status === "success" ? (
                          <CheckCircle
                            size={18}
                            weight="fill"
                            className="text-[var(--color-roc-success)]"
                          />
                        ) : (
                          <XCircle
                            size={18}
                            weight="fill"
                            className="text-[var(--color-roc-danger)]"
                          />
                        )}
                      </div>
                      <p className="text-xs text-[var(--color-text-medium)]">
                        {item.restaurant} • {item.offer}
                      </p>
                      <p className="mt-1 text-[10px] text-[var(--color-text-medium)]">
                        {new Date(item.validatedAt).toLocaleString("pt-BR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-3 text-center sm:py-4">
        <p className="text-xs text-white/50 sm:text-sm">
          © 2026 ROC Passaporte — Portal do Lojista
        </p>
      </footer>
    </div>
  );
}
