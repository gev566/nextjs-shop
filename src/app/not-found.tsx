import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="text-6xl font-bold text-zinc-300">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Страница не найдена</h1>
      <Link href="/" className="mt-4 inline-block text-indigo-700 hover:underline">
        Вернуться в каталог
      </Link>
    </div>
  );
}
