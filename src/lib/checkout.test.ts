import { describe, expect, it } from "vitest";
import { emptyForm, makeOrderNumber, validateCheckout } from "./checkout";

const valid = { ...emptyForm, name: "Геворг", phone: "+374 33 01-10-32", address: "Ереван, ул. Абовяна, 1" };

describe("validateCheckout", () => {
  it("принимает корректную форму", () => {
    expect(validateCheckout(valid)).toEqual({});
  });

  it("требует имя, телефон и адрес для курьера", () => {
    const errors = validateCheckout(emptyForm);
    expect(Object.keys(errors).sort()).toEqual(["address", "name", "phone"]);
  });

  it("при самовывозе адрес не нужен", () => {
    expect(validateCheckout({ ...valid, delivery: "pickup", address: "" })).toEqual({});
  });

  it("проверяет e-mail, только если он указан", () => {
    expect(validateCheckout({ ...valid, email: "bad@" }).email).toBeDefined();
    expect(validateCheckout({ ...valid, email: "a@b.ru" }).email).toBeUndefined();
  });
});

describe("makeOrderNumber", () => {
  it("строит номер из даты", () => {
    expect(makeOrderNumber(new Date(2026, 10, 26, 9, 5, 7))).toBe("NS-261126-090507");
  });
});
