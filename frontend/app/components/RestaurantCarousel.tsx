"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ForkKnife } from "@phosphor-icons/react";

interface Restaurant {
  id: number;
  name: string;
  city: string;
  discount: string;
  image: string;
  category?: string;
}

// Dados mockados dos restaurantes
const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Restaurante Sabor do Norte",
    city: "Porto Velho",
    discount: "20% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+1",
    category: "Brasileira",
  },
  {
    id: 2,
    name: "Cantina Italiana",
    city: "Porto Velho",
    discount: "15% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+2",
    category: "Italiana",
  },
  {
    id: 3,
    name: "Churrascaria Gaúcha",
    city: "Porto Velho",
    discount: "25% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+3",
    category: "Churrascaria",
  },
  {
    id: 4,
    name: "Sushi House",
    city: "Porto Velho",
    discount: "30% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+4",
    category: "Japonesa",
  },
  {
    id: 5,
    name: "Pizzaria Forno a Lenha",
    city: "Porto Velho",
    discount: "20% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+5",
    category: "Pizzaria",
  },
  {
    id: 6,
    name: "Restaurante Beira Rio",
    city: "Ji-Paraná",
    discount: "15% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+6",
    category: "Brasileira",
  },
  {
    id: 7,
    name: "Café Central",
    city: "Ji-Paraná",
    discount: "10% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+7",
    category: "Cafeteria",
  },
  {
    id: 8,
    name: "Bistrô Moderno",
    city: "Ji-Paraná",
    discount: "20% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+8",
    category: "Contemporânea",
  },
  {
    id: 9,
    name: "Restaurante Tropical",
    city: "Ariquemes",
    discount: "15% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+9",
    category: "Brasileira",
  },
  {
    id: 10,
    name: "Lanchonete Express",
    city: "Ariquemes",
    discount: "10% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+10",
    category: "Fast Food",
  },
  {
    id: 11,
    name: "Restaurante do Vale",
    city: "Vilhena",
    discount: "20% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+11",
    category: "Brasileira",
  },
  {
    id: 12,
    name: "Cantina Mineira",
    city: "Vilhena",
    discount: "15% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+12",
    category: "Brasileira",
  },
  {
    id: 13,
    name: "Sabor Caseiro",
    city: "Cacoal",
    discount: "10% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+13",
    category: "Brasileira",
  },
  {
    id: 14,
    name: "Restaurante Família",
    city: "Cacoal",
    discount: "15% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+14",
    category: "Brasileira",
  },
  {
    id: 15,
    name: "Churrascaria Premium",
    city: "Porto Velho",
    discount: "25% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+15",
    category: "Churrascaria",
  },
  {
    id: 16,
    name: "Restaurante Mar e Terra",
    city: "Porto Velho",
    discount: "20% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+16",
    category: "Brasileira",
  },
  {
    id: 17,
    name: "Café Gourmet",
    city: "Ji-Paraná",
    discount: "10% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+17",
    category: "Cafeteria",
  },
  {
    id: 18,
    name: "Pizzaria Artesanal",
    city: "Ariquemes",
    discount: "20% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+18",
    category: "Pizzaria",
  },
  {
    id: 19,
    name: "Restaurante Vegetariano",
    city: "Vilhena",
    discount: "15% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+19",
    category: "Vegetariana",
  },
  {
    id: 20,
    name: "Lanchonete 24h",
    city: "Cacoal",
    discount: "10% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+20",
    category: "Fast Food",
  },
  {
    id: 21,
    name: "Bistrô Francês",
    city: "Porto Velho",
    discount: "30% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+21",
    category: "Francesa",
  },
  {
    id: 22,
    name: "Restaurante Árabe",
    city: "Ji-Paraná",
    discount: "20% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+22",
    category: "Árabe",
  },
  {
    id: 23,
    name: "Cantina Mexicana",
    city: "Ariquemes",
    discount: "15% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+23",
    category: "Mexicana",
  },
  {
    id: 24,
    name: "Restaurante Japonês",
    city: "Vilhena",
    discount: "25% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+24",
    category: "Japonesa",
  },
  {
    id: 25,
    name: "Churrascaria Rodízio",
    city: "Cacoal",
    discount: "20% OFF",
    image: "https://via.placeholder.com/400x300.png?text=Restaurante+25",
    category: "Churrascaria",
  },
];

const CARDS_PER_PAGE = 5; // Número de cards por página
const AUTO_SLIDE_INTERVAL = 4000; // 4 segundos

export function RestaurantCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const maxIndex = Math.ceil(restaurants.length / CARDS_PER_PAGE) - 1;

  // Auto-play do carrossel
  useEffect(() => {
    if (isHovered) return; // Pausa quando o mouse está sobre o carrossel

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [isHovered, maxIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      return prev === 0 ? maxIndex : prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const visibleRestaurants = restaurants.slice(
    currentIndex * CARDS_PER_PAGE,
    currentIndex * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container do Carrossel */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 gap-[var(--spacing-4)] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {visibleRestaurants.map((restaurant) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] shadow-soft transition-all hover:border-[var(--color-roc-primary)] hover:shadow-medium"
              >
                {/* Imagem do Restaurante */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Badge de Desconto */}
                  <div className="absolute top-3 right-3 rounded-full bg-[var(--color-roc-primary)] px-3 py-1 text-sm font-bold text-[var(--color-white)] shadow-medium">
                    {restaurant.discount}
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-[var(--spacing-4)]">
                  {restaurant.category && (
                    <div className="mb-2 flex items-center gap-2">
                      <ForkKnife
                        size={14}
                        weight="fill"
                        className="text-[var(--color-roc-primary)]"
                      />
                      <span className="text-xs font-medium text-[var(--color-text-medium)]">
                        {restaurant.category}
                      </span>
                    </div>
                  )}
                  <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-dark)]">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-medium)]">
                    <MapPin
                      size={16}
                      weight="fill"
                      className="text-[var(--color-roc-primary)]"
                    />
                    <span>{restaurant.city}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Botões de Navegação */}
      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-[var(--color-white)] p-3 shadow-medium transition-all hover:bg-[var(--color-roc-primary)] hover:text-[var(--color-white)] md:-translate-x-8"
        aria-label="Restaurante anterior"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 rounded-full bg-[var(--color-white)] p-3 shadow-medium transition-all hover:bg-[var(--color-roc-primary)] hover:text-[var(--color-white)] md:translate-x-8"
        aria-label="Próximo restaurante"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Indicadores de Página */}
      <div className="mt-[var(--spacing-4)] flex justify-center gap-2">
        {Array.from({ length: Math.ceil(restaurants.length / CARDS_PER_PAGE) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-[var(--color-roc-primary)]"
                  : "w-2 bg-[var(--color-border)] hover:bg-[var(--color-roc-primary-light)]"
              }`}
              aria-label={`Ir para página ${index + 1}`}
            />
          )
        )}
      </div>
    </div>
  );
}

