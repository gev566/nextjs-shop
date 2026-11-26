import type { Metadata } from "next";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "NextShop — магазин техники", template: "%s · NextShop" },
  description: "Учебный интернет-магазин на Next.js 15, React 19, TypeScript и Tailwind CSS.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t border-zinc-200 py-6 text-center text-xs text-zinc-500">
          Демо-проект Геворга Баблояна · Next.js, TypeScript, Tailwind ·{" "}
          <a href="https://github.com/gev566/nextjs-shop" className="hover:underline">
            исходный код
          </a>
        </footer>
      </body>
    </html>
  );
}
