"use client";

import { useState } from "react";
import { QrCode, IdentificationCard, Lock, CheckCircle, User, Copy } from "@phosphor-icons/react";

export default function ValidatePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [validationMethod, setValidationMethod] = useState<"qr" | "cpf">("cpf");
  const [step, setStep] = useState<"login" | "validate" | "confirm" | "success">("login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    cpf: "",
  });

  // Dados mockados do voucher após validação
  const [voucherData, setVoucherData] = useState<{
    userName: string;
    cpf: string;
    restaurantName: string;
    discount: string;
  } | null>(null);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return value;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login mockado - em produção seria validação com backend
    if (formData.username && formData.password) {
      setIsLoggedIn(true);
      setStep("validate");
    }
  };

  const handleValidateCPF = (e: React.FormEvent) => {
    e.preventDefault();
    const cpfNumbers = formData.cpf.replace(/\D/g, "");
    
    // Validação mockada - em produção seria busca no backend
    if (cpfNumbers.length === 11) {
      // Simular busca do voucher
      setVoucherData({
        userName: "João Silva",
        cpf: formData.cpf,
        restaurantName: "Restaurante Parceiro",
        discount: "20% OFF",
      });
      setStep("confirm");
    }
  };

  const handleConfirmUse = () => {
    // Confirmar uso do voucher
    setStep("success");
    // Em produção: chamada à API para invalidar o voucher
    setTimeout(() => {
      setStep("validate");
      setFormData({ ...formData, cpf: "" });
      setVoucherData(null);
    }, 3000);
  };

  const handleQRScan = () => {
    // Simular escaneamento de QR Code
    // Em produção: usar biblioteca de leitura de QR Code da câmera
    alert("Funcionalidade de escaneamento será implementada com biblioteca de câmera");
  };

  // Tela de Login
  if (step === "login") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)] px-[var(--spacing-4)]">
        <div className="w-full max-w-md rounded-2xl bg-[var(--color-white)] p-[var(--spacing-4)] shadow-soft">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              <span className="text-[var(--color-roc-primary)]">ROC</span> Validação
            </h1>
            <p className="mt-2 text-xs text-[var(--color-text-medium)]">
              Acesso restrito para restaurantes parceiros
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-sm">
              <label
                htmlFor="username"
                className="flex items-center gap-2 font-medium text-[var(--color-text-dark)]"
              >
                <User size={16} weight="fill" className="text-[var(--color-text-medium)]" />
                Usuário
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-roc-primary)] focus:ring-1 focus:ring-[var(--color-roc-primary)]"
                placeholder="Digite seu usuário"
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label
                htmlFor="password"
                className="flex items-center gap-2 font-medium text-[var(--color-text-dark)]"
              >
                <Lock size={16} weight="fill" className="text-[var(--color-text-medium)]" />
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-roc-primary)] focus:ring-1 focus:ring-[var(--color-roc-primary)]"
                placeholder="Digite sua senha"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-[var(--color-roc-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-roc-primary-dark)]"
            >
              Entrar
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-[var(--color-text-medium)]">
            Credenciais fornecidas pelo administrador do ROC
          </p>
        </div>
      </div>
    );
  }

  // Tela de Sucesso
  if (step === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)] px-[var(--spacing-4)]">
        <div className="w-full max-w-md rounded-2xl bg-[var(--color-white)] p-[var(--spacing-4)] text-center shadow-soft">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-[var(--color-roc-success)]/10 p-4">
              <CheckCircle size={48} className="text-[var(--color-roc-success)]" weight="fill" />
            </div>
          </div>
          <h2 className="mb-2 text-xl font-semibold tracking-tight">Voucher validado!</h2>
          <p className="text-sm text-[var(--color-text-medium)]">
            O voucher foi utilizado com sucesso
          </p>
        </div>
      </div>
    );
  }

  // Tela de Confirmação
  if (step === "confirm" && voucherData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)] px-[var(--spacing-4)]">
        <div className="w-full max-w-md rounded-2xl bg-[var(--color-white)] p-[var(--spacing-4)] shadow-soft">
          <h2 className="mb-4 text-center text-xl font-semibold tracking-tight">
            Confirmar uso do voucher
          </h2>

          <div className="mb-6 space-y-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-light)] p-4">
            <div>
              <p className="text-xs font-medium text-[var(--color-text-medium)]">Restaurante</p>
              <p className="text-sm font-semibold text-[var(--color-text-dark)]">
                {voucherData.restaurantName}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--color-text-medium)]">Cliente</p>
              <p className="text-sm font-semibold text-[var(--color-text-dark)]">
                {voucherData.userName}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--color-text-medium)]">CPF</p>
              <p className="text-sm font-semibold text-[var(--color-text-dark)]">
                {voucherData.cpf}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--color-text-medium)]">Desconto</p>
              <p className="text-sm font-semibold text-[var(--color-roc-primary)]">
                {voucherData.discount}
              </p>
            </div>
          </div>

          <button
            onClick={handleConfirmUse}
            className="w-full rounded-lg bg-[var(--color-roc-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-roc-primary-dark)]"
          >
            Confirmar uso
          </button>

          <button
            onClick={() => {
              setStep("validate");
              setFormData({ ...formData, cpf: "" });
              setVoucherData(null);
            }}
            className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-white)] px-4 py-2 text-sm font-medium text-[var(--color-text-medium)] hover:bg-[var(--color-bg-light)]"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  // Tela de Validação
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] px-[var(--spacing-4)] py-[var(--spacing-5)]">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">
            <span className="text-[var(--color-roc-primary)]">ROC</span> Validação
          </h1>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setStep("login");
              setFormData({ username: "", password: "", cpf: "" });
            }}
            className="text-xs text-[var(--color-text-medium)] hover:text-[var(--color-text-dark)]"
          >
            Sair
          </button>
        </div>

        <div className="rounded-2xl bg-[var(--color-white)] p-[var(--spacing-4)] shadow-soft">
          <p className="mb-6 text-center text-sm text-[var(--color-text-medium)]">
            Escolha o método de validação
          </p>

          {/* Seletor de método */}
          <div className="mb-6 flex gap-3 rounded-lg border border-[var(--color-border)] p-1">
            <button
              type="button"
              onClick={() => setValidationMethod("qr")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                validationMethod === "qr"
                  ? "bg-[var(--color-roc-primary)] text-[var(--color-white)]"
                  : "text-[var(--color-text-medium)] hover:bg-[var(--color-bg-light)]"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <QrCode size={18} weight={validationMethod === "qr" ? "fill" : "regular"} />
                Escanear QR Code
              </div>
            </button>
            <button
              type="button"
              onClick={() => setValidationMethod("cpf")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                validationMethod === "cpf"
                  ? "bg-[var(--color-roc-primary)] text-[var(--color-white)]"
                  : "text-[var(--color-text-medium)] hover:bg-[var(--color-bg-light)]"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <IdentificationCard size={18} weight={validationMethod === "cpf" ? "fill" : "regular"} />
                Digitar CPF
              </div>
            </button>
          </div>

          {validationMethod === "qr" ? (
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleQRScan}
                className="w-full rounded-lg border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg-light)] px-4 py-8 text-sm font-medium text-[var(--color-text-medium)] hover:border-[var(--color-roc-primary)] hover:bg-[var(--color-roc-primary-light)]/10"
              >
                <div className="flex flex-col items-center gap-2">
                  <QrCode size={32} className="text-[var(--color-text-medium)]" weight="fill" />
                  <span>Ativar câmera para escanear QR Code</span>
                </div>
              </button>
              <p className="text-center text-xs text-[var(--color-text-medium)]">
                Apontar a câmera para o QR Code exibido na tela do cliente
              </p>
            </div>
          ) : (
            <form onSubmit={handleValidateCPF} className="space-y-4">
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="cpf"
                  className="flex items-center gap-2 font-medium text-[var(--color-text-dark)]"
                >
                  <IdentificationCard
                    size={16}
                    weight="fill"
                    className="text-[var(--color-text-medium)]"
                  />
                  CPF do cliente
                </label>
                <input
                  id="cpf"
                  type="text"
                  maxLength={14}
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => {
                    const formatted = formatCPF(e.target.value);
                    setFormData({ ...formData, cpf: formatted });
                  }}
                  className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-roc-primary)] focus:ring-1 focus:ring-[var(--color-roc-primary)]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[var(--color-roc-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-roc-primary-dark)]"
              >
                Buscar voucher
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
