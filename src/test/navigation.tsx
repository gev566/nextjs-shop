import { vi } from "vitest";

// Простая подмена next/navigation: URL хранится в window.location
export const replace = vi.fn((url: string) => {
  window.history.replaceState(null, "", url);
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace, push: replace }),
  usePathname: () => window.location.pathname,
  useSearchParams: () => new URLSearchParams(window.location.search),
}));
