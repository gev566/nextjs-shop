"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { buildRows, cartTotals, FREE_DELIVERY_FROM, useCart } from "@/lib/cart";
import { formatPrice, plural } from "@/lib/format";
import { useHydrated } from "@/lib/useHydrated";
import { ProductArt } from "./ProductArt";

export function CartView() {
  const hydrated = useHydrated();
  const { lines, setQty, remove, clear } = useCart();
  const rows = buildRows(lines, products);
  const totals = cartTotals(rows);

  if (!hydrated) return <p className="text-zinc-500">Загружаем корзину…</p>;

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center">
        <p className="text-lg font-medium">Корзина пуста</p>
        <Link href="/" className="mt-3 inline-block text-indigo-700 hover:underline">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  const left = FREE_DELIVERY_FROM - totals.subtotal;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <ul className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
        {rows.map(({ product, qty, sum }) => (
          <li key={product.id} className="flex flex-wrap items-center gap-4 p-4">
            <ProductArt category={product.category} color={product.color} className="h-16 w-20 shrink-0" />
            <div className="min-w-40 flex-1">
              <Link href={`/product/${product.id}`} className="font-medium hover:text-indigo-700">
                {product.name}
              </Link>
              <p className="text-sm text-zinc-500">{formatPrice(product.price)} за шт.</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setQty(product.id, qty - 1, product.stock)}
                disabled={qty <= 1}
                aria-label={`Уменьшить количество: ${product.name}`}
                className="h-8 w-8 rounded-md border border-zinc-300 disabled:opacity-40"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                max={product.stock}
                value={qty}
                onChange={(e) => setQty(product.id, Number(e.target.value), product.stock)}
                aria-label={`Количество: ${product.name}`}
                className="h-8 w-14 rounded-md border border-zinc-300 text-center"
              />
              <button
                onClick={() => setQty(product.id, qty + 1, product.stock)}
                disabled={qty >= product.stock}
                aria-label={`Увеличить количество: ${product.name}`}
                className="h-8 w-8 rounded-md border border-zinc-300 disabled:opacity-40"
              >
                +
              </button>
            </div>
            <p className="w-28 text-right font-semibold">{formatPrice(sum)}</p>
            <button
              onClick={() => remove(product.id)}
              aria-label={`Удалить: ${product.name}`}
              className="text-sm text-zinc-400 hover:text-rose-600"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Итого</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>
              {totals.count} {plural(totals.count, ["товар", "товара", "товаров"])}
            </dt>
            <dd>{formatPrice(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Доставка</dt>
            <dd>{totals.delivery === 0 ? "бесплатно" : formatPrice(totals.delivery)}</dd>
          </div>
          <div className="flex justify-between border-t border-zinc-200 pt-2 text-base font-semibold">
            <dt>К оплате</dt>
            <dd data-testid="cart-total">{formatPrice(totals.total)}</dd>
          </div>
        </dl>
        {left > 0 && (
          <p className="mt-3 rounded-lg bg-indigo-50 p-2 text-xs text-indigo-800">
            До бесплатной доставки осталось {formatPrice(left)}
          </p>
        )}
        <Link
          href="/checkout"
          className="mt-4 block rounded-lg bg-indigo-600 py-2.5 text-center font-medium text-white hover:bg-indigo-700"
        >
          Оформить заказ
        </Link>
        <button onClick={clear} className="mt-2 w-full text-sm text-zinc-500 hover:text-rose-600">
          Очистить корзину
        </button>
      </aside>
    </div>
  );
}
