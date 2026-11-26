import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = { title: "Оформление заказа" };

export default function CheckoutPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Оформление заказа</h1>
      <CheckoutForm />
    </>
  );
}
