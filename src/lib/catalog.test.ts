import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { filterProducts, getProduct, getRelated, parseQuery, toSearchParams } from "./catalog";

describe("parseQuery / toSearchParams", () => {
  it("отбрасывает неизвестные категории и сортировки", () => {
    const q = parseQuery(new URLSearchParams("category=cars&sort=random&q=  wave "));
    expect(q).toEqual({ q: "wave", category: "", sort: "popular", inStock: false });
  });

  it("туда и обратно даёт тот же запрос", () => {
    const params = toSearchParams({ q: "pro", category: "audio", sort: "price-asc", inStock: true });
    expect(params.toString()).toBe("q=pro&category=audio&sort=price-asc&inStock=1");
    expect(parseQuery(params)).toEqual({ q: "pro", category: "audio", sort: "price-asc", inStock: true });
  });

  it("не пишет значения по умолчанию в URL", () => {
    expect(toSearchParams({ q: "", category: "", sort: "popular", inStock: false }).toString()).toBe("");
  });
});

describe("filterProducts", () => {
  it("фильтрует по категории", () => {
    const list = filterProducts(products, { category: "phones" });
    expect(list.length).toBeGreaterThan(0);
    expect(list.every((p) => p.category === "phones")).toBe(true);
  });

  it("ищет без учёта регистра по названию и описанию", () => {
    expect(filterProducts(products, { q: "WAVE" }).map((p) => p.id)).toEqual(["wave-pro"]);
    expect(filterProducts(products, { q: "шумоподавлением" }).map((p) => p.id)).toContain("wave-pro");
  });

  it("скрывает товары без остатка", () => {
    expect(filterProducts(products, { inStock: true }).some((p) => p.stock === 0)).toBe(false);
  });

  it("сортирует по цене, не меняя исходный массив", () => {
    const before = products.map((p) => p.id);
    const asc = filterProducts(products, { sort: "price-asc" }).map((p) => p.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    const desc = filterProducts(products, { sort: "price-desc" }).map((p) => p.price);
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
    expect(products.map((p) => p.id)).toEqual(before);
  });
});

describe("getProduct / getRelated", () => {
  it("находит товар и похожие из той же категории", () => {
    const p = getProduct("aero-14")!;
    const related = getRelated(p);
    expect(related.every((r) => r.category === "laptops" && r.id !== "aero-14")).toBe(true);
    expect(getProduct("nope")).toBeUndefined();
  });
});
