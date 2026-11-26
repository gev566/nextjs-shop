import "@/test/navigation";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { Catalog } from "./Catalog";
import { replace } from "@/test/navigation";

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  replace.mockClear();
});

describe("Catalog", () => {
  it("показывает все товары", () => {
    render(<Catalog />);
    expect(screen.getByText(/Найдено 14 товаров/)).toBeInTheDocument();
  });

  it("читает фильтры из URL", () => {
    window.history.replaceState(null, "", "/?category=audio");
    render(<Catalog />);
    expect(screen.getByText(/Найдено 3 товара/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Аудио" })).toHaveAttribute("aria-pressed", "true");
  });

  it("клик по категории пишет её в URL", async () => {
    render(<Catalog />);
    await userEvent.click(screen.getByRole("button", { name: "Часы" }));
    expect(replace).toHaveBeenCalledWith("/?category=watches", { scroll: false });
  });

  it("сообщает, если ничего не нашлось", () => {
    window.history.replaceState(null, "", "/?q=холодильник");
    render(<Catalog />);
    expect(screen.getByText(/Ничего не нашлось/)).toBeInTheDocument();
  });
});
