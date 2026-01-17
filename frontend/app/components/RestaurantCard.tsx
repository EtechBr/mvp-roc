"use client";

import Link from "next/link";
import { MapPin, ArrowRight } from "@phosphor-icons/react";

interface Restaurant {
  id: number;
  name: string;
  city: string;
  discount: string;
  logo?: string;
  category?: string;
  description?: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link 
      href={`/account/vouchers/${restaurant.id}`}
      className="group block rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-white)] shadow-sm transition-all hover:border-[var(--color-roc-primary)] hover:shadow-lg overflow-hidden"
    >
      <div className="relative h-40 bg-gradient-to-br from-[var(--color-roc-primary-light)]/10 to-[var(--color-roc-primary-light)]/20 flex items-center justify-center">
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {restaurant.logo || "🍽️"}
        </span>
        <div className="absolute top-3 right-3 bg-[var(--color-roc-primary)] text-[var(--color-white)] px-3 py-1 rounded-full text-sm font-bold">
          {restaurant.discount}
        </div>
      </div>
      
      <div className="p-5">
        {restaurant.category && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-[var(--color-text-medium)] bg-[var(--color-bg-light)] px-2 py-1 rounded-full">
              {restaurant.category}
            </span>
          </div>
        )}
        
        <h3 className="text-xl font-semibold text-[var(--color-text-dark)] mb-2">
          {restaurant.name}
        </h3>
        
        <div className="flex items-center gap-1 text-sm text-[var(--color-text-medium)] mb-4">
          <MapPin size={14} weight="fill" className="text-[var(--color-roc-primary)]" />
          <span>{restaurant.city}</span>
        </div>

        {restaurant.description && (
          <p className="text-sm text-[var(--color-text-medium)] mb-4">
            {restaurant.description}
          </p>
        )}
        
        <div className="flex items-center text-[var(--color-roc-primary)] font-medium text-sm">
          Ver oferta
          <ArrowRight size={16} weight="bold" className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

