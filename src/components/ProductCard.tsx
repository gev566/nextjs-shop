import Link from "next/link";
import type { Product } from "@/data/products";
import { discountPercent, formatPrice } from "@/lib/format";
import { ProductArt } from "./ProductArt";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product.price, product.oldPrice);
  return (
    <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <Link href={`/product/${product.id}`} className="group block">
        <div className="relative">
          <ProductArt category={product.category} color={product.color} className="aspect-[4/3] w-full" />
          {discount > 0 && (
            <span className="absolute left-2 top-2 rounded-md bg-rose-600 px-2 py-0.5 text-xs font-semibold text-white">
              −{discount}%
            </span>
          )}
        </div>
        <h3 className="mt-3 font-medium text-zinc-900 group-hover:text-indigo-700">{product.name}</h3>
      </Link>
      <p className="mt-1 text-sm text-zinc-500">★ {product.rating.toFixed(1)}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
        {product.oldPrice && (
          <span className="text-sm text-zinc-400 line-through">{formatPrice(product.oldPrice)}</span>
        )}
      </div>
      <div className="mt-auto pt-3">
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
