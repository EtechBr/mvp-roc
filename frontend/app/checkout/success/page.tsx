"use client";

import { CheckCircle, Gift, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-light)] px-[var(--spacing-4)] py-[var(--spacing-5)]">
      <div className="w-full max-w-md space-y-6">
        <div className="rounded-2xl bg-[var(--color-white)] p-[var(--spacing-4)] text-center shadow-soft">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-[var(--color-roc-success)]/10 p-4">
              <CheckCircle size={48} className="text-[var(--color-roc-success)]" weight="fill" />
            </div>
          </div>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">Pagamento confirmado!</h1>
          <p className="mb-6 text-sm text-[var(--color-text-medium)]">
            Seu Passaporte ROC foi adquirido com sucesso. Seus vouchers já estão disponíveis!
          </p>

          <div className="mb-6 rounded-lg border border-[var(--color-roc-primary)] bg-[var(--color-roc-primary-light)]/10 p-4 text-left">
            <div className="mb-2 flex items-center gap-2">
              <Gift size={20} className="text-[var(--color-roc-accent)]" weight="fill" />
              <span className="text-sm font-semibold text-[var(--color-text-dark)]">
                O que você recebeu:
              </span>
            </div>
            <ul className="space-y-1 text-xs text-[var(--color-text-medium)]">
              <li>• 25 vouchers exclusivos</li>
              <li>• Válidos por 90 dias</li>
              <li>• Uso digital (QR Code) e físico</li>
              <li>• Descontos em 25 restaurantes</li>
            </ul>
          </div>

          <Link
            href="/account/vouchers"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-roc-primary)] px-4 py-3 text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-roc-primary-dark)]"
          >
            Ver meus vouchers
            <ArrowRight size={16} weight="bold" />
          </Link>

          <p className="mt-4 text-center text-xs text-[var(--color-text-medium)]">
            Você também receberá um e-mail com os detalhes da sua compra
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-6 text-center shadow-soft">
          <h2 className="mb-2 text-sm font-semibold text-[var(--color-text-dark)]">
            Próximos passos
          </h2>
          <p className="text-xs text-[var(--color-text-medium)]">
            Acesse sua área do usuário para visualizar todos os vouchers e começar a usar seus
            benefícios nos restaurantes parceiros.
          </p>
        </div>
      </div>
    </div>
  );
}

