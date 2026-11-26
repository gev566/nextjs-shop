"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { categories, products } from "@/data/products";
import { filterProducts, parseQuery, sortOptions, toSearchParams, type CatalogQuery } from "@/lib/catalog";
import { plural } from "@/lib/format";
import { ProductCard } from "./ProductCard";

/**
 * Каталог на клиенте: при static export сервера нет, поэтому фильтры
 * читаются из адресной строки через useSearchParams — ссылкой с фильтрами можно поделиться.
 */
export function Catalog() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = parseQuery(new URLSearchParams(params.toString()));
  const [search, setSearch] = useState(query.q ?? "");

  const update = (patch: Partial<CatalogQuery>) => {
    const next = toSearchParams({ ...query, ...patch }).toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  };

  // Поиск с задержкой, чтобы не менять URL на каждую букву
  useEffect(() => {
    if (search.trim() === (query.q ?? "")) return;
    const t = setTimeout(() => update({ q: search.trim() }), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const list = filterProducts(products, query);
  const hasFilters = Boolean(query.q || query.category || query.inStock || query.sort !== "popular");

  return (
    <section>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Категории">
        {[{ id: "", name: "Все" }, ...categories].map((c) => {
          const active = (query.category ?? "") === c.id;
          return (
            <button
              key={c.id || "all"}
              onClick={() => update({ category: c.id as CatalogQuery["category"] })}
              aria-pressed={active}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                active ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по названию и описанию"
          aria-label="Поиск"
          className="w-full min-w-0 rounded-lg sm:w-auto sm:flex-1 sm:basis-0 border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
        />
        <select
          value={query.sort}
          onChange={(e) => update({ sort: e.target.value as CatalogQuery["sort"] })}
          aria-label="Сортировка"
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input type="checkbox" checked={query.inStock} onChange={(e) => update({ inStock: e.target.checked })} />
          Только в наличии
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-zinc-500">
        <p aria-live="polite">
          Найдено {list.length} {plural(list.length, ["товар", "товара", "товаров"])}
        </p>
        {hasFilters && (
          <button
            onClick={() => {
              setSearch("");
              router.replace(pathname, { scroll: false });
            }}
            className="text-indigo-700 hover:underline"
          >
            Сбросить фильтры
          </button>
        )}
      </div>

      {list.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-zinc-500">Ничего не нашлось — попробуйте изменить фильтры.</p>
      )}
    </section>
  );
}
