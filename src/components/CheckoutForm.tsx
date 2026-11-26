"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";
import { buildRows, cartTotals, useCart } from "@/lib/cart";
import { emptyForm, makeOrderNumber, validateCheckout, type CheckoutErrors, type CheckoutForm as Form } from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { useHydrated } from "@/lib/useHydrated";

const inputClass =
  "mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-indigo-500";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-zinc-700">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function CheckoutForm() {
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const totals = cartTotals(buildRows(lines, products));
  const [form, setForm] = useState<Form>(emptyForm);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [order, setOrder] = useState<{ number: string; total: number } | null>(null);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const fieldProps = (key: keyof Form) => ({
    id: key,
    value: form[key],
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    className: `${inputClass} ${errors[key] ? "border-rose-500" : "border-zinc-300"}`,
  });

  if (order) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center" role="status">
        <p className="text-2xl font-semibold text-emerald-800">Спасибо за заказ!</p>
        <p className="mt-2 text-emerald-900">
          Номер заказа <b>{order.number}</b>, сумма {formatPrice(order.total)}.
        </p>
        <p className="mt-1 text-sm text-emerald-700">Это демо-магазин: заказ никуда не отправляется.</p>
        <Link href="/" className="mt-4 inline-block text-indigo-700 hover:underline">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  if (!hydrated) return <p className="text-zinc-500">Загрузка…</p>;

  if (totals.count === 0) {
    return (
      <p className="text-zinc-600">
        В корзине нет товаров.{" "}
        <Link href="/" className="text-indigo-700 hover:underline">
          Перейти в каталог
        </Link>
      </p>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateCheckout(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setOrder({ number: makeOrderNumber(), total: totals.total });
    clear();
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5">
        <Field id="name" label="Имя *" error={errors.name}>
          <input {...fieldProps("name")} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
        </Field>
        <Field id="phone" label="Телефон *" error={errors.phone}>
          <input {...fieldProps("phone")} onChange={(e) => set("phone", e.target.value)} type="tel" autoComplete="tel" placeholder="+7 900 000-00-00" />
        </Field>
        <Field id="email" label="E-mail" error={errors.email}>
          <input {...fieldProps("email")} onChange={(e) => set("email", e.target.value)} type="email" autoComplete="email" />
        </Field>
        <fieldset>
          <legend className="text-sm font-medium text-zinc-700">Способ получения</legend>
          <div className="mt-2 flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="delivery" checked={form.delivery === "courier"} onChange={() => set("delivery", "courier")} />
              Курьером
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="delivery" checked={form.delivery === "pickup"} onChange={() => set("delivery", "pickup")} />
              Самовывоз
            </label>
          </div>
        </fieldset>
        {form.delivery === "courier" && (
          <Field id="address" label="Адрес доставки *" error={errors.address}>
            <input {...fieldProps("address")} onChange={(e) => set("address", e.target.value)} autoComplete="street-address" />
          </Field>
        )}
        <Field id="comment" label="Комментарий" error={errors.comment}>
          <textarea {...fieldProps("comment")} onChange={(e) => set("comment", e.target.value)} rows={3} />
        </Field>
      </div>
      <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5">
        <p className="flex justify-between text-base font-semibold">
          <span>К оплате</span>
          <span>{formatPrice(totals.total)}</span>
        </p>
        <button type="submit" className="mt-4 w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white hover:bg-indigo-700">
          Подтвердить заказ
        </button>
        <Link href="/cart" className="mt-2 block text-center text-sm text-zinc-500 hover:text-zinc-800">
          Вернуться в корзину
        </Link>
      </aside>
    </form>
  );
}
