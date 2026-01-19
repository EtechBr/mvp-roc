"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Envelope,
  ArrowLeft,
  ShieldCheck,
  PaperPlaneTilt,
  CheckCircle,
} from "@phosphor-icons/react";
import { apiClient, ApiError } from "@/app/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await apiClient.forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Erro ao enviar email. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-roc-success)]/10">
            <CheckCircle size={32} weight="fill" className="text-[var(--color-roc-success)]" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-[var(--color-text-dark)]">
            E-mail enviado!
          </h1>
          <p className="mb-6 text-sm text-[var(--color-text-medium)]">
            Se existe uma conta com o e-mail <strong>{email}</strong>, você receberá
            instruções para redefinir sua senha em breve.
          </p>
          <p className="mb-6 text-xs text-[var(--color-text-medium)]">
            Não recebeu? Verifique sua pasta de spam ou tente novamente.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
              }}
              className="w-full rounded-xl border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-text-dark)] transition-all hover:bg-[var(--color-bg-light)]"
            >
              Tentar outro e-mail
            </button>
            <Link
              href="/auth/login"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-roc-primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--color-roc-primary-dark)]"
            >
              <ArrowLeft size={18} />
              Voltar ao login
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-[var(--color-roc-primary)]">ROC</span>{" "}
            <span className="text-[var(--color-text-dark)]">Passaporte</span>
          </Link>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-6 sm:p-8 shadow-soft"
        >
          {/* Ícone */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-roc-primary)]/10">
            <PaperPlaneTilt size={28} weight="fill" className="text-[var(--color-roc-primary)]" />
          </div>

          {/* Título */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">
              Esqueceu sua senha?
            </h1>
            <p className="mt-2 text-sm text-[var(--color-text-medium)]">
              Digite seu e-mail e enviaremos instruções para redefinir sua senha.
            </p>
          </div>

          {/* Erro */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 rounded-xl bg-[var(--color-roc-danger)]/10 border border-[var(--color-roc-danger)]/20 px-4 py-3 text-sm text-[var(--color-roc-danger)]"
            >
              {error}
            </motion.div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-dark)]"
              >
                <Envelope size={16} weight="fill" className="text-[var(--color-text-medium)]" />
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm outline-none transition-all focus:border-[var(--color-roc-primary)] focus:ring-2 focus:ring-[var(--color-roc-primary)]/20 disabled:opacity-50"
                placeholder="seu@email.com"
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-roc-primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--color-roc-primary-dark)] hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Enviando...
                </>
              ) : (
                "Enviar instruções"
              )}
            </button>
          </form>

          {/* Link para voltar */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-roc-primary)] hover:underline"
            >
              <ArrowLeft size={16} />
              Voltar ao login
            </Link>
          </div>
        </motion.div>

        {/* Indicador de segurança */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--color-text-medium)]">
          <ShieldCheck size={16} weight="fill" className="text-[var(--color-roc-success)]" />
          <span>Seus dados estão protegidos</span>
        </div>
      </div>
    </div>
  );
}
