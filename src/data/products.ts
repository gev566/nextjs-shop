export type CategoryId = "laptops" | "phones" | "audio" | "watches" | "accessories";

export interface Category {
  id: CategoryId;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number; // в рублях
  oldPrice?: number;
  rating: number; // 0–5
  stock: number;
  description: string;
  specs: Record<string, string>;
  color: string; // цвет плашки-иллюстрации
}

export const categories: Category[] = [
  { id: "laptops", name: "Ноутбуки" },
  { id: "phones", name: "Смартфоны" },
  { id: "audio", name: "Аудио" },
  { id: "watches", name: "Часы" },
  { id: "accessories", name: "Аксессуары" },
];

// Учебный каталог: названия и характеристики выдуманы
export const products: Product[] = [
  {
    id: "aero-14",
    name: "Ноутбук Aero 14",
    category: "laptops",
    price: 89990,
    oldPrice: 99990,
    rating: 4.7,
    stock: 8,
    description: "Лёгкий 14-дюймовый ноутбук для работы и учёбы: тихий, держит заряд целый день.",
    specs: { Экран: '14" IPS, 2560×1600', Процессор: "8 ядер", Память: "16 ГБ", Накопитель: "512 ГБ SSD", Вес: "1,3 кг" },
    color: "#4f6bed",
  },
  {
    id: "forge-16",
    name: "Ноутбук Forge 16",
    category: "laptops",
    price: 149990,
    rating: 4.8,
    stock: 3,
    description: "Мощный 16-дюймовый ноутбук для разработки, монтажа и игр.",
    specs: { Экран: '16" 165 Гц', Процессор: "14 ядер", Память: "32 ГБ", Накопитель: "1 ТБ SSD", Вес: "2,2 кг" },
    color: "#2b3a67",
  },
  {
    id: "note-13",
    name: "Ноутбук Note 13",
    category: "laptops",
    price: 54990,
    rating: 4.3,
    stock: 15,
    description: "Компактный и недорогой ноутбук для документов, браузера и видео.",
    specs: { Экран: '13,3" Full HD', Процессор: "4 ядра", Память: "8 ГБ", Накопитель: "256 ГБ SSD", Вес: "1,2 кг" },
    color: "#7b8cc4",
  },
  {
    id: "pulse-x",
    name: "Смартфон Pulse X",
    category: "phones",
    price: 69990,
    oldPrice: 79990,
    rating: 4.6,
    stock: 12,
    description: "Флагман с ярким экраном и хорошей камерой для ночной съёмки.",
    specs: { Экран: '6,7" OLED 120 Гц', Память: "256 ГБ", Камера: "50 Мп", Батарея: "5000 мА·ч" },
    color: "#e0566b",
  },
  {
    id: "pulse-mini",
    name: "Смартфон Pulse Mini",
    category: "phones",
    price: 39990,
    rating: 4.4,
    stock: 20,
    description: "Небольшой смартфон, который удобно держать одной рукой.",
    specs: { Экран: '6,1" OLED', Память: "128 ГБ", Камера: "48 Мп", Батарея: "4000 мА·ч" },
    color: "#f08a7e",
  },
  {
    id: "basic-a5",
    name: "Смартфон Basic A5",
    category: "phones",
    price: 14990,
    rating: 4.0,
    stock: 0,
    description: "Простой смартфон с большой батареей — на звонки, мессенджеры и карты.",
    specs: { Экран: '6,5" IPS', Память: "64 ГБ", Камера: "13 Мп", Батарея: "6000 мА·ч" },
    color: "#c97b84",
  },
  {
    id: "wave-pro",
    name: "Наушники Wave Pro",
    category: "audio",
    price: 19990,
    oldPrice: 24990,
    rating: 4.8,
    stock: 25,
    description: "Беспроводные наушники с активным шумоподавлением и чехлом-зарядкой.",
    specs: { Тип: "TWS", Шумоподавление: "Активное", Работа: "до 30 ч с кейсом", Защита: "IPX4" },
    color: "#1f9d8b",
  },
  {
    id: "studio-over",
    name: "Наушники Studio Over",
    category: "audio",
    price: 29990,
    rating: 4.5,
    stock: 6,
    description: "Полноразмерные наушники с мягкими амбушюрами для музыки и звонков.",
    specs: { Тип: "Полноразмерные", Подключение: "Bluetooth 5.3, кабель", Работа: "до 40 ч", Вес: "250 г" },
    color: "#167a6c",
  },
  {
    id: "boom-mini",
    name: "Колонка Boom Mini",
    category: "audio",
    price: 6990,
    rating: 4.2,
    stock: 30,
    description: "Маленькая влагозащищённая колонка для улицы и поездок.",
    specs: { Мощность: "10 Вт", Работа: "до 12 ч", Защита: "IP67", Вес: "350 г" },
    color: "#4cb8a6",
  },
  {
    id: "time-s2",
    name: "Часы Time S2",
    category: "watches",
    price: 24990,
    rating: 4.5,
    stock: 9,
    description: "Смарт-часы с пульсометром, GPS и уведомлениями с телефона.",
    specs: { Экран: '1,4" AMOLED', Датчики: "Пульс, SpO2, GPS", Работа: "до 7 дней", Защита: "5 ATM" },
    color: "#e3a83b",
  },
  {
    id: "fit-band",
    name: "Браслет Fit Band",
    category: "watches",
    price: 4990,
    oldPrice: 5990,
    rating: 4.1,
    stock: 40,
    description: "Фитнес-браслет: шаги, сон и пульс, до двух недель без зарядки.",
    specs: { Экран: '1,1" AMOLED', Датчики: "Пульс, сон", Работа: "до 14 дней", Защита: "5 ATM" },
    color: "#d48f2a",
  },
  {
    id: "charge-65",
    name: "Зарядка Charge 65",
    category: "accessories",
    price: 3490,
    rating: 4.6,
    stock: 50,
    description: "Быстрая зарядка на 65 Вт с двумя портами USB-C — подходит и ноутбуку, и телефону.",
    specs: { Мощность: "65 Вт", Порты: "2× USB-C", Технология: "GaN" },
    color: "#8a6fd1",
  },
  {
    id: "power-20k",
    name: "Повербанк Power 20K",
    category: "accessories",
    price: 4490,
    rating: 4.4,
    stock: 18,
    description: "Внешний аккумулятор на 20 000 мА·ч, заряжает телефон 4–5 раз.",
    specs: { Ёмкость: "20 000 мА·ч", Мощность: "22,5 Вт", Порты: "USB-C, USB-A" },
    color: "#6f56b8",
  },
  {
    id: "desk-hub",
    name: "Хаб Desk Hub 7в1",
    category: "accessories",
    price: 5990,
    rating: 4.3,
    stock: 2,
    description: "USB-C хаб: HDMI 4K, три USB-A, кардридер и проброс зарядки.",
    specs: { Порты: "HDMI, 3× USB-A, SD, microSD, USB-C PD", Видео: "4K 30 Гц" },
    color: "#a08ae0",
  },
];
