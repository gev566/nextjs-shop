import { Suspense } from "react";
import { Catalog } from "@/components/Catalog";

export default function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Каталог</h1>
      <p className="mt-1 text-zinc-500">Ноутбуки, смартфоны, аудио и аксессуары</p>
      <div className="mt-6">
        {/* useSearchParams в static export требует Suspense */}
        <Suspense fallback={<p className="text-zinc-500">Загружаем каталог…</p>}>
          <Catalog />
        </Suspense>
      </div>
    </>
  );
}
