import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getCategoryName, getProduct, getRelated } from "@/lib/catalog";
import { discountPercent, formatPrice } from "@/lib/format";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { AddToCartButton } from "@/components/AddToCartButton";

type Props = { params: Promise<{ id: string }> };

// Все страницы товаров собираются заранее (SSG)
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const discount = discountPercent(product.price, product.oldPrice);
  const related = getRelated(product);

  return (
    <>
      <nav className="text-sm text-zinc-500" aria-label="Хлебные крошки">
        <Link href="/" className="hover:underline">Каталог</Link>
        {" / "}
        <Link href={`/?category=${product.category}`} className="hover:underline">
          {getCategoryName(product.category)}
        </Link>
      </nav>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <ProductArt category={product.category} color={product.color} className="aspect-square w-full" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-2 text-zinc-500">★ {product.rating.toFixed(1)}</p>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-semibold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-zinc-400 line-through">{formatPrice(product.oldPrice)}</span>
                <span className="rounded-md bg-rose-600 px-2 py-0.5 text-sm font-semibold text-white">−{discount}%</span>
              </>
            )}
          </div>
          <p className={`mt-2 text-sm ${product.stock > 0 ? "text-emerald-700" : "text-zinc-500"}`}>
            {product.stock === 0 ? "Нет в наличии" : product.stock <= 3 ? `Осталось ${product.stock} шт.` : "В наличии"}
          </p>
          <div className="mt-5 max-w-xs">
            <AddToCartButton product={product} size="lg" />
          </div>
          <p className="mt-6 leading-relaxed text-zinc-700">{product.description}</p>
          <h2 className="mt-6 font-semibold">Характеристики</h2>
          <dl className="mt-2 divide-y divide-zinc-200 text-sm">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2">
                <dt className="text-zinc-500">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Похожие товары</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </>
  );
}
