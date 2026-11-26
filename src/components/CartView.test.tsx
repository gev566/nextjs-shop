import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { useCart } from "@/lib/cart";
import { CartView } from "./CartView";

beforeEach(() => useCart.setState({ lines: [] }));

const total = () => screen.getByTestId("cart-total").textContent?.replace(/\s/g, " ");

describe("CartView", () => {
  it("пустая корзина", () => {
    render(<CartView />);
    expect(screen.getByText("Корзина пуста")).toBeInTheDocument();
  });

  it("меняет количество и пересчитывает сумму", async () => {
    useCart.setState({ lines: [{ id: "boom-mini", qty: 1 }] });
    render(<CartView />);
    expect(total()).toBe("7 480 ₽"); // 6990 + доставка 490
    await userEvent.click(screen.getByRole("button", { name: /Увеличить количество/ }));
    expect(total()).toBe("14 470 ₽");
  });

  it("удаляет товар", async () => {
    useCart.setState({ lines: [{ id: "boom-mini", qty: 1 }] });
    render(<CartView />);
    await userEvent.click(screen.getByRole("button", { name: /Удалить/ }));
    expect(screen.getByText("Корзина пуста")).toBeInTheDocument();
  });
});
