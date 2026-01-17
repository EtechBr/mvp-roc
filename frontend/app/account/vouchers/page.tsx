"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { MapPin, Gift, CheckCircle, MagnifyingGlass } from "@phosphor-icons/react";

// Dados mockados dos vouchers - será substituído por API
const vouchers = [
  { id: 1, restaurantName: "Restaurante Sabor do Norte", city: "Porto Velho", discount: "20% OFF", used: false },
  { id: 2, restaurantName: "Cantina Italiana", city: "Porto Velho", discount: "15% OFF", used: false },
  { id: 3, restaurantName: "Churrascaria Gaúcha", city: "Porto Velho", discount: "25% OFF", used: false },
  { id: 4, restaurantName: "Sushi House", city: "Porto Velho", discount: "30% OFF", used: false },
  { id: 5, restaurantName: "Pizzaria Forno a Lenha", city: "Porto Velho", discount: "20% OFF", used: false },
  { id: 6, restaurantName: "Restaurante Beira Rio", city: "Ji-Paraná", discount: "15% OFF", used: false },
  { id: 7, restaurantName: "Café Central", city: "Ji-Paraná", discount: "10% OFF", used: false },
  { id: 8, restaurantName: "Bistrô Moderno", city: "Ji-Paraná", discount: "20% OFF", used: false },
  { id: 9, restaurantName: "Restaurante Tropical", city: "Ariquemes", discount: "15% OFF", used: false },
  { id: 10, restaurantName: "Lanchonete Express", city: "Ariquemes", discount: "10% OFF", used: false },
  { id: 11, restaurantName: "Restaurante do Vale", city: "Vilhena", discount: "20% OFF", used: false },
  { id: 12, restaurantName: "Cantina Mineira", city: "Vilhena", discount: "15% OFF", used: false },
  { id: 13, restaurantName: "Sabor Caseiro", city: "Cacoal", discount: "10% OFF", used: false },
  { id: 14, restaurantName: "Restaurante Família", city: "Cacoal", discount: "15% OFF", used: false },
  { id: 15, restaurantName: "Churrascaria Premium", city: "Porto Velho", discount: "25% OFF", used: false },
  { id: 16, restaurantName: "Restaurante Mar e Terra", city: "Porto Velho", discount: "20% OFF", used: false },
  { id: 17, restaurantName: "Café Gourmet", city: "Ji-Paraná", discount: "10% OFF", used: false },
  { id: 18, restaurantName: "Pizzaria Artesanal", city: "Ariquemes", discount: "20% OFF", used: false },
  { id: 19, restaurantName: "Restaurante Vegetariano", city: "Vilhena", discount: "15% OFF", used: false },
  { id: 20, restaurantName: "Lanchonete 24h", city: "Cacoal", discount: "10% OFF", used: false },
  { id: 21, restaurantName: "Bistrô Francês", city: "Porto Velho", discount: "30% OFF", used: false },
  { id: 22, restaurantName: "Restaurante Árabe", city: "Ji-Paraná", discount: "20% OFF", used: false },
  { id: 23, restaurantName: "Cantina Mexicana", city: "Ariquemes", discount: "15% OFF", used: false },
  { id: 24, restaurantName: "Restaurante Japonês", city: "Vilhena", discount: "25% OFF", used: false },
  { id: 25, restaurantName: "Churrascaria Rodízio", city: "Cacoal", discount: "20% OFF", used: false },
];

const cities = Array.from(new Set(vouchers.map((v) => v.city)));
const categories = ["Todos", "Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal"];

export default function VouchersPage() {
  const [user] = useState({ name: "João Silva" }); // Mock - em produção viria do contexto de autenticação
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filtrar vouchers
  const filteredVouchers = vouchers.filter((voucher) => {
    const matchesCity = !selectedCity || voucher.city === selectedCity;
    const matchesCategory =
      selectedCategory === "Todos" ||
      (selectedCategory === "Porto Velho" && voucher.city === "Porto Velho") ||
      (selectedCategory === "Ji-Paraná" && voucher.city === "Ji-Paraná") ||
      (selectedCategory === "Ariquemes" && voucher.city === "Ariquemes") ||
      (selectedCategory === "Vilhena" && voucher.city === "Vilhena") ||
      (selectedCategory === "Cacoal" && voucher.city === "Cacoal");
    const matchesSearch =
      !searchTerm ||
      voucher.restaurantName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCity && matchesCategory && matchesSearch;
  });

  const availableCount = filteredVouchers.filter((v) => !v.used).length;
  const usedCount = filteredVouchers.filter((v) => v.used).length;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg-light)]">
      <Header />

      <main className="flex-1 pb-[var(--spacing-5)] pt-24">
        <div className="mx-auto max-w-7xl px-[var(--spacing-4)]">
          {/* Welcome Banner */}
          <div className="mb-[var(--spacing-4)] rounded-2xl bg-[var(--color-roc-primary)] px-[var(--spacing-5)] py-[var(--spacing-4)] text-[var(--color-white)] shadow-soft md:py-[var(--spacing-5)]">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Olá, {user.name}! 👋
            </h1>
            <p className="text-sm md:text-base text-[var(--color-white)]/80">
              Seus vouchers do Passaporte ROC estão prontos para uso. Escolha um restaurante e comece a economizar hoje!
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Gift size={20} weight="fill" />
                <span>{availableCount} disponíveis</span>
              </div>
              {usedCount > 0 && (
                <div className="flex items-center gap-2 text-[var(--color-bg-light)]">
                  <CheckCircle size={20} weight="fill" />
                  <span>{usedCount} utilizados</span>
                </div>
              )}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-[var(--spacing-4)] flex flex-col gap-[var(--spacing-3)] md:flex-row">
            <div className="flex-1 relative">
              <MagnifyingGlass className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-medium)]" />
              <input
                type="text"
                placeholder="Buscar restaurantes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] py-3 pl-12 pr-4 text-sm outline-none focus:border-[var(--color-roc-primary)] focus:ring-2 focus:ring-[var(--color-roc-primary-light)]/40"
              />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] px-4 py-3 text-sm outline-none focus:border-[var(--color-roc-primary)] focus:ring-2 focus:ring-[var(--color-roc-primary-light)]/40"
            >
              <option value="">Todas as cidades</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div className="mb-[var(--spacing-4)] flex gap-[var(--spacing-2)] overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-[var(--color-roc-primary)] text-[var(--color-white)]"
                    : "border border-[var(--color-border)] bg-[var(--color-white)] text-[var(--color-text-medium)] hover:bg-[var(--color-bg-light)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Vouchers Grid */}
          {filteredVouchers.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[var(--color-text-medium)]">
                Nenhum voucher encontrado com os filtros selecionados.
              </p>
            </div>
          ) : (
            <div className="grid gap-[var(--spacing-3)] sm:grid-cols-2 lg:grid-cols-3">
              {filteredVouchers.map((voucher) => (
                <Link
                  key={voucher.id}
                  href={`/account/vouchers/${voucher.id}`}
                  className={`group rounded-2xl border-2 bg-[var(--color-white)] p-[var(--spacing-4)] shadow-soft transition-all hover:shadow-medium ${
                    voucher.used
                      ? "border-[var(--color-border)] opacity-60 grayscale"
                      : "border-[var(--color-border)] hover:border-[var(--color-roc-primary-light)]"
                  }`}
                >
                  <div className="mb-[var(--spacing-3)] flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-[var(--spacing-2)]">
                        <MapPin
                          size={16}
                          weight="fill"
                          className={
                            voucher.used
                              ? "text-[var(--color-text-medium)]"
                              : "text-[var(--color-roc-primary)]"
                          }
                        />
                        <span className="text-xs font-medium uppercase text-[var(--color-text-medium)]">
                          Voucher #{voucher.id}
                        </span>
                      </div>
                      <h3
                        className={`mb-1 text-lg font-semibold ${
                          voucher.used
                            ? "text-[var(--color-text-medium)]"
                            : "text-[var(--color-text-dark)]"
                        }`}
                      >
                        {voucher.restaurantName}
                      </h3>
                      <p className="text-sm text-[var(--color-text-medium)]">{voucher.city}</p>
                    </div>
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        voucher.used
                          ? "bg-[var(--color-bg-light)] text-[var(--color-text-medium)]"
                          : "bg-[var(--color-roc-primary-light)]/10 text-[var(--color-roc-primary)]"
                      }`}
                    >
                      {voucher.used ? "Utilizado" : "Disponível"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-[var(--spacing-2)]">
                    <div className="flex items-center gap-[var(--spacing-2)]">
                      <Gift
                        size={18}
                        weight="fill"
                        className={
                          voucher.used
                            ? "text-[var(--color-text-medium)]"
                            : "text-[var(--color-roc-accent)]"
                        }
                      />
                      <span
                        className={`text-sm font-semibold ${
                          voucher.used
                            ? "text-[var(--color-text-medium)]"
                            : "text-[var(--color-text-dark)]"
                        }`}
                      >
                        {voucher.discount}
                      </span>
                    </div>
                    {!voucher.used && (
                      <span className="text-xs font-medium text-[var(--color-roc-primary)] group-hover:underline">
                        Usar agora →
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
