"use client";

import { useEffect, useState } from "react";

/**
 * Корзина хранится в localStorage, а страницы собираются заранее (static export).
 * До монтирования показываем «пустое» состояние, иначе HTML с сервера не совпадёт с клиентом.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
