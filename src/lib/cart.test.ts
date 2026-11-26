import { beforeEach, describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { buildRows, cartTotals, DELIVERY_PRICE, useCart } from "./cart";

const aero = products.find((p) => p.id === "aero-14")!; // stock 8
const hub = products.find((p) => p.id === "desk-hub")!; // stock 2
const soldOut = products.find((p) => p.stock === 0)!;

beforeEach(() => useCart.setState({ lines: [] }));

describe("useCart", () => {
  it("добавляет товар и увеличивает количество при повторе", () => {
    useCart.getState().add(aero);
    useCart.getState().add(aero, 2);
    expect(useCart.getState().lines).toEqual([{ id: "aero-14", qty: 3 }]);
  });

  it("не даёт положить больше остатка и товар без остатка", () => {
    useCart.getState().add(hub, 10);
    useCart.getState().add(soldOut);
    expect(useCart.getState().lines).toEqual([{ id: "desk-hub", qty: 2 }]);
  });

  it("setQty ограничивает значение от 1 до остатка", () => {
    useCart.getState().add(aero);
    useCart.getState().setQty("aero-14", 0, aero.stock);
    expect(useCart.getState().lines[0].qty).toBe(1);
    useCart.getState().setQty("aero-14", 99, aero.stock);
    expect(useCart.getState().lines[0].qty).toBe(8);
  });

  it("удаляет и очищает", () => {
    useCart.getState().add(aero);
    useCart.getState().add(hub);
    useCart.getState().remove("aero-14");
    expect(useCart.getState().lines.map((l) => l.id)).toEqual(["desk-hub"]);
    useCart.getState().clear();
    expect(useCart.getState().lines).toEqual([]);
  });

  it("сохраняет корзину в localStorage", () => {
    useCart.getState().add(aero);
    expect(localStorage.getItem("nextjs-shop-cart")).toContain("aero-14");
  });
});

describe("cartTotals", () => {
  it("платная доставка для небольшой суммы", () => {
    const rows = buildRows([{ id: "desk-hub", qty: 1 }], products);
    expect(cartTotals(rows)).toEqual({ count: 1, subtotal: 5990, delivery: DELIVERY_PRICE, total: 5990 + DELIVERY_PRICE });
  });

  it("бесплатная доставка от порога и для пустой корзины", () => {
    expect(cartTotals(buildRows([{ id: "aero-14", qty: 1 }], products)).delivery).toBe(0);
    expect(cartTotals([])).toEqual({ count: 0, subtotal: 0, delivery: 0, total: 0 });
  });

  it("пропускает товары, которых больше нет в каталоге", () => {
    expect(buildRows([{ id: "ghost", qty: 1 }], products)).toEqual([]);
  });
});
