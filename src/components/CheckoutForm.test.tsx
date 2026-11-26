import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { useCart } from "@/lib/cart";
import { CheckoutForm } from "./CheckoutForm";

beforeEach(() => useCart.setState({ lines: [{ id: "wave-pro", qty: 1 }] }));

describe("CheckoutForm", () => {
  it("показывает ошибки и не оформляет пустую форму", async () => {
    render(<CheckoutForm />);
    await userEvent.click(screen.getByRole("button", { name: "Подтвердить заказ" }));
    expect(screen.getByText("Укажите имя")).toBeInTheDocument();
    expect(screen.getByLabelText("Имя *")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Имя *")).toHaveFocus();
    expect(useCart.getState().lines).toHaveLength(1);
  });

  it("оформляет заказ и очищает корзину", async () => {
    render(<CheckoutForm />);
    await userEvent.type(screen.getByLabelText("Имя *"), "Геворг");
    await userEvent.type(screen.getByLabelText("Телефон *"), "+37433011032");
    await userEvent.click(screen.getByLabelText("Самовывоз"));
    await userEvent.click(screen.getByRole("button", { name: "Подтвердить заказ" }));
    expect(screen.getByText("Спасибо за заказ!")).toBeInTheDocument();
    expect(useCart.getState().lines).toEqual([]);
  });
});
