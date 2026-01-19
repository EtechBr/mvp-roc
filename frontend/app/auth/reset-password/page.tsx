"use client";

import { useState, useEffect, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeSlash,
  ArrowLeft,
  ShieldCheck,
  Key,
  CheckCircle,
  Warning,
  SpinnerGap,
} from "@phosphor-icons/react";
import { apiClient, ApiError } from "@/app/lib/api";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validar token ao carregar a página
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false);
        setIsTokenValid(false);
        return;
      }

      try {
        const result = await apiClient.validateResetToken(token);
        setIsTokenValid(result.valid);
      } catch (err) {
        setIsTokenValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validações
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("As senhas não coincidem");
      return;
    }

    setIsLoading(true);

    try {
      await apiClient.resetPassword(token!, password, passwordConfirmation);
      setIsSuccess(true);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Erro ao redefinir senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading de validação
  if (isValidating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)] px-4">
        <div className="text-center">
          <SpinnerGap size={40} className="mx-auto mb-4 animate-spin text-[var(--color-roc-primary)]" />
          <p className="text-sm text-[var(--color-text-medium)]">Validando link...</p>
        </div>
      </div>
    );
  }

  // Token inválido ou expirado
  if (!isTokenValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-roc-danger)]/10">
            <Warning size={32} weight="fill" className="text-[var(--color-roc-danger)]" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-[var(--color-text-dark)]">
            Link inválido ou expirado
          </h1>
          <p className="mb-6 text-sm text-[var(--color-text-medium)]">
            Este link de redefinição de senha não é válido ou já expirou.
            Os links são válidos por apenas 1 hora.
          </p>
          <div className="space-y-3">
            <Link
              href="/auth/forgot-password"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-roc-primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--color-roc-primary-dark)]"
            >
              Solicitar novo link
            </Link>
            <Link
              href="/auth/login"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-text-dark)] transition-all hover:bg-[var(--color-bg-light)]"
            >
              <ArrowLeft size={18} />
              Voltar ao login
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Sucesso
  if (isSuccess) {
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
            Senha redefinida!
          </h1>
          <p className="mb-6 text-sm text-[var(--color-text-medium)]">
            Sua senha foi alterada com sucesso. Você já pode fazer login com sua nova senha.
          </p>
          <Link
            href="/auth/login"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-roc-primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--color-roc-primary-dark)]"
          >
            Ir para o login
          </Link>
        </motion.div>
      </div>
    );
  }

  // Formulário de redefinição
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
            <Key size={28} weight="fill" className="text-[var(--color-roc-primary)]" />
          </div>

          {/* Título */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">
              Criar nova senha
            </h1>
            <p className="mt-2 text-sm text-[var(--color-text-medium)]">
              Digite sua nova senha abaixo. Ela deve ter pelo menos 6 caracteres.
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
            {/* Nova senha */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-dark)]"
              >
                <Lock size={16} weight="fill" className="text-[var(--color-text-medium)]" />
                Nova senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 pr-12 text-sm outline-none transition-all focus:border-[var(--color-roc-primary)] focus:ring-2 focus:ring-[var(--color-roc-primary)]/20 disabled:opacity-50"
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--color-text-medium)] hover:text-[var(--color-text-dark)] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirmar senha */}
            <div className="space-y-1">
              <label
                htmlFor="passwordConfirmation"
                className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-dark)]"
              >
                <Lock size={16} weight="fill" className="text-[var(--color-text-medium)]" />
                Confirmar nova senha
              </label>
              <div className="relative">
                <input
                  id="passwordConfirmation"
                  type={showPasswordConfirmation ? "text" : "password"}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 pr-12 text-sm outline-none transition-all focus:border-[var(--color-roc-primary)] focus:ring-2 focus:ring-[var(--color-roc-primary)]/20 disabled:opacity-50"
                  placeholder="Digite novamente"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--color-text-medium)] hover:text-[var(--color-text-dark)] transition-colors"
                  tabIndex={-1}
                >
                  {showPasswordConfirmation ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-roc-primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--color-roc-primary-dark)] hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <SpinnerGap size={20} className="animate-spin" />
                  Redefinindo...
                </>
              ) : (
                "Redefinir senha"
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
          <span>Conexão segura com criptografia SSL</span>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)]">
          <SpinnerGap size={40} className="animate-spin text-[var(--color-roc-primary)]" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
