"use client";

import Link from "next/link";
import { MapPin, ForkKnife, Calendar, Gift } from "@phosphor-icons/react";
import { RestaurantCard } from "../components/RestaurantCard";

// Dados mockados dos restaurantes - será substituído por API
const restaurants = [
  { id: 1, name: "Restaurante Sabor do Norte", city: "Porto Velho", discount: "20% OFF" },
  { id: 2, name: "Cantina Italiana", city: "Porto Velho", discount: "15% OFF" },
  { id: 3, name: "Churrascaria Gaúcha", city: "Porto Velho", discount: "25% OFF" },
  { id: 4, name: "Sushi House", city: "Porto Velho", discount: "30% OFF" },
  { id: 5, name: "Pizzaria Forno a Lenha", city: "Porto Velho", discount: "20% OFF" },
  { id: 6, name: "Restaurante Beira Rio", city: "Ji-Paraná", discount: "15% OFF" },
  { id: 7, name: "Café Central", city: "Ji-Paraná", discount: "10% OFF" },
  { id: 8, name: "Bistrô Moderno", city: "Ji-Paraná", discount: "20% OFF" },
  { id: 9, name: "Restaurante Tropical", city: "Ariquemes", discount: "15% OFF" },
  { id: 10, name: "Lanchonete Express", city: "Ariquemes", discount: "10% OFF" },
  { id: 11, name: "Restaurante do Vale", city: "Vilhena", discount: "20% OFF" },
  { id: 12, name: "Cantina Mineira", city: "Vilhena", discount: "15% OFF" },
  { id: 13, name: "Sabor Caseiro", city: "Cacoal", discount: "10% OFF" },
  { id: 14, name: "Restaurante Família", city: "Cacoal", discount: "15% OFF" },
  { id: 15, name: "Churrascaria Premium", city: "Porto Velho", discount: "25% OFF" },
  { id: 16, name: "Restaurante Mar e Terra", city: "Porto Velho", discount: "20% OFF" },
  { id: 17, name: "Café Gourmet", city: "Ji-Paraná", discount: "10% OFF" },
  { id: 18, name: "Pizzaria Artesanal", city: "Ariquemes", discount: "20% OFF" },
  { id: 19, name: "Restaurante Vegetariano", city: "Vilhena", discount: "15% OFF" },
  { id: 20, name: "Lanchonete 24h", city: "Cacoal", discount: "10% OFF" },
  { id: 21, name: "Bistrô Francês", city: "Porto Velho", discount: "30% OFF" },
  { id: 22, name: "Restaurante Árabe", city: "Ji-Paraná", discount: "20% OFF" },
  { id: 23, name: "Cantina Mexicana", city: "Ariquemes", discount: "15% OFF" },
  { id: 24, name: "Restaurante Japonês", city: "Vilhena", discount: "25% OFF" },
  { id: 25, name: "Churrascaria Rodízio", city: "Cacoal", discount: "20% OFF" },
];

const cities = Array.from(new Set(restaurants.map((r) => r.city)));

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] font-sans text-[var(--color-text-dark)]">
      <main className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col gap-[var(--spacing-6)] px-4 py-[var(--spacing-6)] md:px-6 lg:px-8 xl:px-12 md:py-[var(--spacing-7)]">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-[var(--color-roc-primary)]">ROC</span> Passaporte
          </Link>
          <nav className="flex gap-3 text-sm font-medium">
            <Link
              href="/auth/login"
              className="rounded-full px-4 py-2 text-[var(--color-text-medium)] hover:bg-[var(--color-white)]"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-[var(--color-roc-primary)] px-4 py-2 text-[var(--color-white)] hover:bg-[var(--color-roc-primary-dark)]"
            >
              Assinar
            </Link>
          </nav>
        </header>

        <section className="space-y-[var(--spacing-4)]">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Seus benefícios exclusivos
            </h1>
            <p className="text-base leading-relaxed text-[var(--color-text-medium)] md:text-lg">
              Com o Passaporte ROC, você tem acesso a 25 restaurantes parceiros em 5 cidades de
              Rondônia
            </p>
          </div>

          <div className="grid gap-[var(--spacing-3)] md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-[var(--spacing-2)] rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] p-[var(--spacing-3)] shadow-soft">
              <div className="rounded-full bg-[var(--color-roc-primary-light)]/10 p-2">
                <ForkKnife size={24} className="text-[var(--color-roc-primary)]" weight="fill" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-dark)]">
                  25 Restaurantes
                </p>
                <p className="text-xs text-[var(--color-text-medium)]">Parceiros exclusivos</p>
              </div>
            </div>

            <div className="flex items-center gap-[var(--spacing-2)] rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] p-[var(--spacing-3)] shadow-soft">
              <div className="rounded-full bg-[var(--color-roc-primary-light)]/10 p-2">
                <MapPin size={24} className="text-[var(--color-roc-primary)]" weight="fill" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-dark)]">5 Cidades</p>
                <p className="text-xs text-[var(--color-text-medium)]">Em Rondônia</p>
              </div>
            </div>

            <div className="flex items-center gap-[var(--spacing-2)] rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] p-[var(--spacing-3)] shadow-soft">
              <div className="rounded-full bg-[var(--color-roc-primary-light)]/10 p-2">
                <Calendar size={24} className="text-[var(--color-roc-primary)]" weight="fill" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-dark)]">90 Dias</p>
                <p className="text-xs text-[var(--color-text-medium)]">De validade</p>
              </div>
            </div>

            <div className="flex items-center gap-[var(--spacing-2)] rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] p-[var(--spacing-3)] shadow-soft">
              <div className="rounded-full bg-[var(--color-roc-accent)]/10 p-2">
                <Gift size={24} className="text-[var(--color-roc-accent)]" weight="fill" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-dark)]">Descontos</p>
                <p className="text-xs text-[var(--color-text-medium)]">De 10% a 30%</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-[var(--spacing-3)]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Restaurantes parceiros</h2>
            <select className="h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-white)] px-3 text-sm outline-none focus:border-[var(--color-roc-primary)] focus:ring-1 focus:ring-[var(--color-roc-primary)]">
              <option value="">Todas as cidades</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--color-roc-primary)] bg-[var(--color-roc-primary-light)]/10 p-[var(--spacing-5)] text-center">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">Pronto para começar?</h2>
          <p className="mb-6 text-sm text-[var(--color-text-medium)]">
            Adquira seu Passaporte ROC por apenas R$ 99,99 e tenha acesso a todos esses benefícios
          </p>
          <Link
            href="/auth/register"
            className="inline-block rounded-full bg-[var(--color-roc-primary)] px-8 py-3 text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-roc-primary-dark)]"
          >
            Assinar agora
          </Link>
        </section>
      </main>
    </div>
  );
}

