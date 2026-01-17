import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] font-sans text-[var(--color-text-dark)]">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-[var(--spacing-6)] px-[var(--spacing-4)] py-[var(--spacing-6)] md:px-[var(--spacing-5)] md:py-[var(--spacing-7)]">
        <header className="flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">
            <span className="text-[var(--color-roc-primary)]">ROC</span> Passaporte
          </div>
          <Link
            href="/benefits"
            className="rounded-full bg-[var(--color-roc-primary)] px-4 py-2 text-sm font-medium text-[var(--color-white)] hover:bg-[var(--color-roc-primary-dark)]"
          >
            Assinar
          </Link>
        </header>

        <section className="grid gap-[var(--spacing-5)] md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center">
          <div className="space-y-[var(--spacing-4)]">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Passaporte ROC: 25 restaurantes, 90 dias para economizar em Rondônia.
            </h1>
            <p className="text-base leading-relaxed text-[var(--color-text-medium)] md:text-lg">
              Compre seu passaporte digital por R$ 99,99 e desbloqueie 25 vouchers exclusivos,
              um em cada restaurante participante nas principais cidades de Rondônia.
            </p>
            <div className="flex flex-col gap-[var(--spacing-2)] text-sm text-[var(--color-text-medium)]">
              <div>✓ 25 restaurantes parceiros em 5 cidades</div>
              <div>✓ 90 dias de validade a partir do início da campanha</div>
              <div>✓ Uso simples por QR Code ou código no próprio celular</div>
            </div>
            <div className="flex flex-col gap-[var(--spacing-2)] sm:flex-row">
              <Link
                href="/benefits"
                className="flex-1 rounded-full bg-[var(--color-roc-primary)] px-6 py-3 text-center text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-roc-primary-dark)]"
              >
                Ver benefícios e assinar
              </Link>
              <Link
                href="/benefits"
                className="flex-1 rounded-full border border-[var(--color-border)] px-6 py-3 text-center text-sm font-semibold text-[var(--color-roc-primary)] hover:bg-[var(--color-white)]"
              >
                Conhecer benefícios
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-white)] p-[var(--spacing-4)] shadow-soft">
            <h2 className="mb-[var(--spacing-3)] text-lg font-semibold text-[var(--color-text-dark)]">
              Por que escolher?
            </h2>
            <ul className="space-y-[var(--spacing-2)] text-sm text-[var(--color-text-medium)]">
              <li className="flex items-start gap-[var(--spacing-2)]">
                <span className="mt-0.5 text-[var(--color-roc-success)]">✓</span>
                <span>Economia garantida com descontos de até 30%</span>
              </li>
              <li className="flex items-start gap-[var(--spacing-2)]">
                <span className="mt-0.5 text-[var(--color-roc-success)]">✓</span>
                <span>Validação rápida e fácil com QR Code</span>
              </li>
              <li className="flex items-start gap-[var(--spacing-2)]">
                <span className="mt-0.5 text-[var(--color-roc-success)]">✓</span>
                <span>Acesso imediato após o pagamento</span>
              </li>
              <li className="flex items-start gap-[var(--spacing-2)]">
                <span className="mt-0.5 text-[var(--color-roc-success)]">✓</span>
                <span>Use digital ou físico, você escolhe</span>
              </li>
            </ul>
          </div>
        </section>

        <section
          id="como-funciona"
          className="grid gap-[var(--spacing-4)] border-t border-[var(--color-border)] pt-[var(--spacing-4)] md:grid-cols-3"
        >
          <div className="space-y-[var(--spacing-1)]">
            <h3 className="text-sm font-semibold uppercase text-[var(--color-text-dark)]">
              1. Assine o passaporte
            </h3>
            <p className="text-sm text-[var(--color-text-medium)]">
              Crie sua conta rapidamente com CPF, e-mail e senha.
            </p>
          </div>
          <div className="space-y-[var(--spacing-1)]">
            <h3 className="text-sm font-semibold uppercase text-[var(--color-text-dark)]">
              2. Compre o passaporte
            </h3>
            <p className="text-sm text-[var(--color-text-medium)]">
              Realize o pagamento de R$ 99,99 e receba seus 25 vouchers automaticamente.
            </p>
          </div>
          <div className="space-y-[var(--spacing-1)]">
            <h3 className="text-sm font-semibold uppercase text-[var(--color-text-dark)]">
              3. Use nos restaurantes
            </h3>
            <p className="text-sm text-[var(--color-text-medium)]">
              Apresente o QR Code ou código no restaurante e aproveite seu desconto.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
