"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { useHydrated } from "@/lib/useHydrated";

export function AddToCartButton({ product, size = "md" }: { product: Product; size?: "md" | "lg" }) {
  const hydrated = useHydrated();
  const inCart = useCart((s) => s.lines.find((l) => l.id === product.id)?.qty ?? 0);
  const add = useCart((s) => s.add);

  const base =
    size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm";

  if (product.stock === 0) {
    return (
      <button disabled className={`${base} w-full cursor-not-allowed rounded-lg bg-zinc-200 text-zinc-500`}>
        Нет в наличии
      </button>
    );
  }

  if (hydrated && inCart > 0) {
    return (
      <Link
        href="/cart"
        className={`${base} block w-full rounded-lg border border-indigo-600 text-center font-medium text-indigo-700 hover:bg-indigo-50`}
      >
        В корзине: {inCart} — перейти
      </Link>
    );
  }

  return (
    <button
      onClick={() => add(product)}
      className={`${base} w-full rounded-lg bg-indigo-600 font-medium text-white hover:bg-indigo-700`}
    >
      В корзину
    </button>
  );
}
