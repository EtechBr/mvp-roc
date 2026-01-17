import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)] px-[var(--spacing-4)]">
      <div className="w-full max-w-md rounded-2xl bg-[var(--color-white)] p-[var(--spacing-4)] shadow-soft">
        <h1 className="mb-6 text-center text-2xl font-semibold tracking-tight">
          Fazer login
        </h1>
        <form className="space-y-4">
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block font-medium text-[var(--color-text-dark)]">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-roc-primary)] focus:ring-1 focus:ring-[var(--color-roc-primary)]"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block font-medium text-[var(--color-text-dark)]">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-roc-primary)] focus:ring-1 focus:ring-[var(--color-roc-primary)]"
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
          Ainda não tem conta?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-[var(--color-roc-primary)] hover:underline"
          >
            Assine agora
          </Link>
        </p>
      </div>
    </div>
  );
}

