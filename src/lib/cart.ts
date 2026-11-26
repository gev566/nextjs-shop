"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export interface CartLine {
  id: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number, max: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (product, qty = 1) =>
        set((state) => {
          if (product.stock === 0) return state;
          const existing = state.lines.find((l) => l.id === product.id);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.id === product.id ? { ...l, qty: clamp(l.qty + qty, 1, product.stock) } : l,
              ),
            };
          }
          return { lines: [...state.lines, { id: product.id, qty: clamp(qty, 1, product.stock) }] };
        }),
      setQty: (id, qty, max) =>
        set((state) => ({
          lines: state.lines.map((l) => (l.id === id ? { ...l, qty: clamp(Math.floor(qty) || 1, 1, max) } : l)),
        })),
      remove: (id) => set((state) => ({ lines: state.lines.filter((l) => l.id !== id) })),
      clear: () => set({ lines: [] }),
    }),
    { name: "nextjs-shop-cart", version: 1 },
  ),
);

export interface CartRow {
  product: Product;
  qty: number;
  sum: number;
}

/** Собирает строки корзины с товарами; удалённые из каталога товары пропускаются */
export function buildRows(lines: CartLine[], catalog: Product[]): CartRow[] {
  return lines.flatMap((line) => {
    const product = catalog.find((p) => p.id === line.id);
    return product ? [{ product, qty: line.qty, sum: product.price * line.qty }] : [];
  });
}

export const FREE_DELIVERY_FROM = 50000;
export const DELIVERY_PRICE = 490;

export function cartTotals(rows: CartRow[]) {
  const count = rows.reduce((n, r) => n + r.qty, 0);
  const subtotal = rows.reduce((n, r) => n + r.sum, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_PRICE;
  return { count, subtotal, delivery, total: subtotal + delivery };
}
