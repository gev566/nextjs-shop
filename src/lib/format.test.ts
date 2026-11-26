import { describe, expect, it } from "vitest";
import { discountPercent, formatPrice, plural } from "./format";

describe("formatPrice", () => {
  it("форматирует рубли без копеек", () => {
    expect(formatPrice(89990).replace(/\s/g, " ")).toBe("89 990 ₽");
  });
});

describe("plural", () => {
  const forms: [string, string, string] = ["товар", "товара", "товаров"];
  it.each([
    [1, "товар"],
    [2, "товара"],
    [5, "товаров"],
    [11, "товаров"],
    [12, "товаров"],
    [21, "товар"],
    [22, "товара"],
    [0, "товаров"],
  ])("%i → %s", (n, expected) => {
    expect(plural(n, forms)).toBe(expected);
  });
});

describe("discountPercent", () => {
  it("считает скидку и игнорирует некорректную старую цену", () => {
    expect(discountPercent(90, 100)).toBe(10);
    expect(discountPercent(100)).toBe(0);
    expect(discountPercent(100, 90)).toBe(0);
  });
});
