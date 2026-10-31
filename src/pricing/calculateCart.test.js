import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateCart } from "./calculateCart.js";

const tee = (qty) => ({ price: 800, qty });

test("Example A", () => {
  const r = calculateCart([tee(2)], "SAVE10");
  
  assert.equal(r.subtotal, 1600);

  assert.equal(r.discount, 160);
  
  assert.equal(r.shipping, 0);
  
  assert.equal(r.gst, 259.2);
  
  assert.equal(r.total, 1699.2);
});

test("Example B", () => {
  const r = calculateCart([tee(1)], "");
 
  assert.deepEqual([r.subtotal, r.discount, r.shipping, r.gst, r.total], [800, 0, 50, 144, 994]);

});

test("Example C", () => {
  const r = calculateCart([{ price: 400, qty: 1 }, { price: 600, qty: 1 }], "SAVE10");
  assert.deepEqual([r.subtotal, r.discount, r.shipping, r.gst, r.total], [1000, 100, 50, 162, 1112]);
});

test("3 x 199.99 is exact", () => {
  assert.equal(calculateCart([{ price: 199.99, qty: 3 }]).subtotal, 599.97);
});

test("coupon is case/space insensitive", () => {
  assert.equal(calculateCart([tee(2)], "  save10 ").appliedCoupon, "SAVE10");
});

test("invalid code changes nothing", () => {
  const r = calculateCart([tee(2)], "SAVE20");
  assert.equal(r.appliedCoupon, null);
  assert.equal(r.discount, 0);
  assert.match(r.message, /not a valid/);
});

test("subtotal 999.99 rejects SAVE10", () => {
  const r = calculateCart([{ price: 999.99, qty: 1 }], "SAVE10");
  assert.equal(r.appliedCoupon, null);
  assert.equal(r.discount, 0);
  assert.match(r.message, /at least/);
});

test("exactly 999 still pays shipping; 999.01 is free", () => {
  assert.equal(calculateCart([{ price: 999, qty: 1 }]).shipping, 50);
  assert.equal(calculateCart([{ price: 999.01, qty: 1 }]).shipping, 0);
});

test("empty cart", () => {
  const r = calculateCart([], "SAVE10");
  assert.equal(r.shipping, 0);
  assert.equal(r.total, 0);
  assert.equal(r.appliedCoupon, null);
});
