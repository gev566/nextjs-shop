"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { buildRows, cartTotals, useCart } from "@/lib/cart";
import { useHydrated } from "@/lib/useHydrated";

export function Header() {
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const { count } = cartTotals(buildRows(lines, products));

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
          Next<span className="text-indigo-600">Shop</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link href="/" className="text-zinc-600 hover:text-zinc-900">
            Каталог
          </Link>
          <Link href="/cart" className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900" aria-label={`Корзина, товаров: ${hydrated ? count : 0}`}>
            Корзина
            {hydrated && count > 0 && (
              <span className="min-w-5 rounded-full bg-indigo-600 px-1.5 text-center text-xs leading-5 text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
