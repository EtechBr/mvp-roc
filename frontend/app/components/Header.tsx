"use client";

import Link from "next/link";
import { User, SignOut } from "@phosphor-icons/react";

export function Header() {
  const user = { name: "João Silva" };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-white)] shadow-soft">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-[var(--spacing-4)]">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-[var(--color-roc-primary)]">ROC</span> Passaporte
        </Link>

        <nav className="flex items-center gap-[var(--spacing-3)]">
          <div className="flex items-center gap-[var(--spacing-2)] text-sm text-[var(--color-text-medium)]">
            <User size={20} weight="fill" className="text-[var(--color-text-medium)]" />
            <span className="hidden sm:inline">{user.name}</span>
          </div>
          <Link
            href="/auth/login"
            className="flex items-center gap-[var(--spacing-2)] rounded-full border border-[var(--color-border)] px-[var(--spacing-3)] py-2 text-sm font-medium text-[var(--color-text-dark)] hover:bg-[var(--color-bg-light)]"
          >
            <SignOut size={18} weight="fill" className="text-[var(--color-roc-danger)]" />
            <span className="hidden sm:inline">Sair</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

