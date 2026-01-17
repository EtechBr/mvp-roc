"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Envelope, Lock, IdentificationCard, Check } from "@phosphor-icons/react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Formatação de CPF: 000.000.000-00
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

  // Validação de CPF (formato básico)
  const validateCPF = (cpf: string): boolean => {
    const numbers = cpf.replace(/\D/g, "");
    return numbers.length === 11;
  };

  // Validação de senha
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormData({ ...formData, cpf: formatted });
    if (errors.cpf) {
      setErrors({ ...errors, cpf: "" });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
    if (errors.password) {
      setErrors({ ...errors, password: "" });
    }
    // Limpar erro de confirmação quando a senha principal mudar
    if (errors.passwordConfirmation && e.target.value === formData.passwordConfirmation) {
      setErrors({ ...errors, passwordConfirmation: "" });
    }
  };

  const handlePasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, passwordConfirmation: e.target.value });
    if (errors.passwordConfirmation) {
      setErrors({ ...errors, passwordConfirmation: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validações
    if (!formData.name.trim()) {
      newErrors.name = "Nome completo é obrigatório";
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = "CPF é obrigatório";
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF deve ter 11 dígitos";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres";
    }

    if (!formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "As senhas não coincidem";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "Você deve aceitar os termos de uso";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Se passou nas validações, simular envio
    setErrors({});
    setSubmitted(true);

    // Aqui seria feita a chamada à API
    // Por enquanto apenas simula sucesso
    console.log("Dados do formulário:", {
      name: formData.name,
      cpf: formData.cpf.replace(/\D/g, ""), // Enviar apenas números
      email: formData.email,
      password: formData.password, // Em produção, isso seria hashado no backend
    });

    // Redirecionar para checkout após cadastro (em produção)
    // setTimeout(() => {
    //   window.location.href = "/checkout";
    // }, 2000);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)] px-[var(--spacing-4)]">
        <div className="w-full max-w-md rounded-2xl bg-[var(--color-white)] p-[var(--spacing-4)] text-center shadow-soft">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-[var(--color-roc-success)]/10 p-4">
              <Check size={32} className="text-[var(--color-roc-success)]" weight="fill" />
            </div>
          </div>
          <h2 className="mb-2 text-xl font-semibold tracking-tight">Cadastro realizado!</h2>
          <p className="mb-6 text-sm text-[var(--color-text-medium)]">
            Sua conta foi criada com sucesso. Você já pode prosseguir para o pagamento do passaporte.
          </p>
          <Link
            href="/checkout"
            className="inline-block rounded-lg bg-[var(--color-roc-primary)] px-6 py-2 text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-roc-primary-dark)]"
          >
            Continuar para pagamento
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)] px-[var(--spacing-4)] py-[var(--spacing-5)]">
      <div className="w-full max-w-md rounded-2xl bg-[var(--color-white)] p-[var(--spacing-4)] shadow-soft">
        <div className="mb-6 text-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-[var(--color-roc-primary)]">ROC</span> Passaporte
          </Link>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Assinar Passaporte ROC</h1>
          <p className="mt-2 text-xs text-[var(--color-text-medium)]">
            Preencha os dados abaixo para criar sua conta e assinar o passaporte
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1 text-sm">
            <label
              htmlFor="name"
              className="flex items-center gap-2 font-medium text-[var(--color-text-dark)]"
            >
              <User size={16} weight="fill" className="text-[var(--color-text-medium)]" />
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 ${
                errors.name
                  ? "border-[var(--color-roc-danger)]/60 focus:border-[var(--color-roc-danger)] focus:ring-[var(--color-roc-danger)]"
                  : "border-[var(--color-border)] focus:border-[var(--color-roc-primary)] focus:ring-[var(--color-roc-primary)]"
              }`}
              placeholder="João Silva"
            />
            {errors.name && (
              <p className="text-xs text-[var(--color-roc-danger)]">{errors.name}</p>
            )}
          </div>

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
              CPF <span className="text-red-500">*</span>
            </label>
            <input
              id="cpf"
              type="text"
              maxLength={14}
              value={formData.cpf}
              onChange={handleCPFChange}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 ${
                errors.cpf
                  ? "border-[var(--color-roc-danger)]/60 focus:border-[var(--color-roc-danger)] focus:ring-[var(--color-roc-danger)]"
                  : "border-[var(--color-border)] focus:border-[var(--color-roc-primary)] focus:ring-[var(--color-roc-primary)]"
              }`}
              placeholder="000.000.000-00"
            />
            {errors.cpf && (
              <p className="text-xs text-[var(--color-roc-danger)]">{errors.cpf}</p>
            )}
            <p className="text-xs text-[var(--color-text-medium)]">
              Essencial para vincular o passaporte e validação no restaurante
            </p>
          </div>

          <div className="space-y-1 text-sm">
            <label
              htmlFor="email"
              className="flex items-center gap-2 font-medium text-[var(--color-text-dark)]"
            >
              <Envelope size={16} weight="fill" className="text-[var(--color-text-medium)]" />
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 ${
                errors.email
                  ? "border-[var(--color-roc-danger)]/60 focus:border-[var(--color-roc-danger)] focus:ring-[var(--color-roc-danger)]"
                  : "border-[var(--color-border)] focus:border-[var(--color-roc-primary)] focus:ring-[var(--color-roc-primary)]"
              }`}
              placeholder="seu@email.com"
            />
            {errors.email && (
              <p className="text-xs text-[var(--color-roc-danger)]">{errors.email}</p>
            )}
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
              onChange={handlePasswordChange}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 ${
                errors.password
                  ? "border-[var(--color-roc-danger)]/60 focus:border-[var(--color-roc-danger)] focus:ring-[var(--color-roc-danger)]"
                  : "border-[var(--color-border)] focus:border-[var(--color-roc-primary)] focus:ring-[var(--color-roc-primary)]"
              }`}
              placeholder="Mínimo 6 caracteres"
            />
            {errors.password && (
              <p className="text-xs text-[var(--color-roc-danger)]">{errors.password}</p>
            )}
          </div>

          <div className="space-y-1 text-sm">
            <label
              htmlFor="passwordConfirmation"
              className="flex items-center gap-2 font-medium text-[var(--color-text-dark)]"
            >
              <Lock size={16} weight="fill" className="text-[var(--color-text-medium)]" />
              Confirmar senha
            </label>
            <input
              id="passwordConfirmation"
              type="password"
              value={formData.passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 ${
                errors.passwordConfirmation
                  ? "border-[var(--color-roc-danger)]/60 focus:border-[var(--color-roc-danger)] focus:ring-[var(--color-roc-danger)]"
                  : "border-[var(--color-border)] focus:border-[var(--color-roc-primary)] focus:ring-[var(--color-roc-primary)]"
              }`}
              placeholder="Digite a senha novamente"
            />
            {errors.passwordConfirmation && (
              <p className="text-xs text-[var(--color-roc-danger)]">
                {errors.passwordConfirmation}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2 text-xs text-[var(--color-text-medium)]">
              <input
                id="terms"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => {
                  setFormData({ ...formData, termsAccepted: e.target.checked });
                  if (errors.termsAccepted) setErrors({ ...errors, termsAccepted: "" });
                }}
                className="mt-1 h-4 w-4 rounded border-[var(--color-border)]"
              />
              <label htmlFor="terms">
                Eu li e aceito os termos de uso do Rondônia Oferta Club.
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-xs text-[var(--color-roc-danger)]">{errors.termsAccepted}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Criar conta e continuar
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[var(--color-text-medium)]">
          Já tem uma conta?{" "}
          <Link
            href="/"
            className="font-medium text-[var(--color-roc-primary)] hover:underline"
          >
            Voltar para início
          </Link>
        </p>
      </div>
    </div>
  );
}
