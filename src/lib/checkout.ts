export interface CheckoutForm {
  name: string;
  phone: string;
  email: string;
  address: string;
  delivery: "courier" | "pickup";
  comment: string;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>;

export const emptyForm: CheckoutForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  delivery: "courier",
  comment: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Оставляет в телефоне только цифры и проверяет длину (10–15 цифр) */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function validateCheckout(form: CheckoutForm): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (form.name.trim().length < 2) errors.name = "Укажите имя";
  const digits = normalizePhone(form.phone);
  if (digits.length < 10 || digits.length > 15) errors.phone = "Телефон должен содержать 10–15 цифр";
  if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) errors.email = "Неверный формат e-mail";
  if (form.delivery === "courier" && form.address.trim().length < 5) errors.address = "Укажите адрес доставки";
  if (form.comment.length > 500) errors.comment = "Не больше 500 символов";
  return errors;
}

/** Номер заказа для экрана «Спасибо» — в учебном проекте заказ никуда не отправляется */
export function makeOrderNumber(date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `NS-${date.getFullYear() % 100}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}
