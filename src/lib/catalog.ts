import { categories, products, type CategoryId, type Product } from "@/data/products";

export type SortKey = "popular" | "price-asc" | "price-desc" | "rating";

export interface CatalogQuery {
  q?: string;
  category?: CategoryId | "";
  sort?: SortKey;
  inStock?: boolean;
}

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Сначала популярные" },
  { value: "price-asc", label: "Сначала дешёвые" },
  { value: "price-desc", label: "Сначала дорогие" },
  { value: "rating", label: "По рейтингу" },
];

const sortKeys = sortOptions.map((o) => o.value);
const categoryIds = categories.map((c) => c.id);

/** Разбирает параметры адресной строки в безопасный запрос (мусор отбрасывается) */
export function parseQuery(params: URLSearchParams): CatalogQuery {
  const category = params.get("category") ?? "";
  const sort = params.get("sort") ?? "";
  return {
    q: params.get("q")?.trim() ?? "",
    category: (categoryIds as string[]).includes(category) ? (category as CategoryId) : "",
    sort: (sortKeys as string[]).includes(sort) ? (sort as SortKey) : "popular",
    inStock: params.get("inStock") === "1",
  };
}

/** Обратное преобразование: в URL попадают только непустые значения */
export function toSearchParams(query: CatalogQuery): URLSearchParams {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.category) params.set("category", query.category);
  if (query.sort && query.sort !== "popular") params.set("sort", query.sort);
  if (query.inStock) params.set("inStock", "1");
  return params;
}

export function filterProducts(list: Product[], query: CatalogQuery): Product[] {
  const q = query.q?.trim().toLowerCase() ?? "";
  const result = list.filter((p) => {
    if (query.category && p.category !== query.category) return false;
    if (query.inStock && p.stock === 0) return false;
    if (q && !`${p.name} ${p.description}`.toLowerCase().includes(q)) return false;
    return true;
  });

  // Сортируем копию, исходный массив не трогаем
  switch (query.sort) {
    case "price-asc":
      return result.sort((a, b) => a.price - b.price);
    case "price-desc":
      return result.sort((a, b) => b.price - a.price);
    case "rating":
      return result.sort((a, b) => b.rating - a.rating);
    default:
      return result;
  }
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategoryName(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.name ?? id;
}

/** Похожие товары: та же категория, без самого товара */
export function getRelated(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
