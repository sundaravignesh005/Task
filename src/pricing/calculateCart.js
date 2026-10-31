

export const COUPON_CODE = "SAVE10";
export const COUPON_MIN_PAISE = 100000; 
export const FREE_SHIPPING_ABOVE_PAISE = 99900; 
export const SHIPPING_PAISE = 5000;

const toPaise = (rupees) => Math.round(rupees * 100);
    const toRupees = (paise) => paise / 100;

/**
     * @param {{price:number, qty:number}[]} items
   * @param {string} [couponCode]
 */





export function calculateCart(items, couponCode = "") {
  const lines = Array.isArray(items) ? items : [];

  //  this will bee the subtotal amt
  const subtotal = lines.reduce(
    (sum, l) => sum + toPaise(l.price) * Math.max(0, Math.floor(l.qty)),
    0
  );

  // this onee will be  the Coupon

  const code = String(couponCode ?? "").trim().toUpperCase();

  let discount = 0;

  let appliedCoupon = null;

  let message = "";

  if (code) {

    if (code !== COUPON_CODE) {

      message = `"${code}" is not a valid coupon code.`;

    } else if (subtotal < COUPON_MIN_PAISE) {

      message = `${COUPON_CODE} needs a subtotal of at least ₹1000.`;  // it show the meassage 
    } else {
      discount = Math.round((subtotal * 10) / 100);
      appliedCoupon = COUPON_CODE;
      message = `${COUPON_CODE} applied: 10% off.`;
    }
  }

  const afterDiscount = subtotal - discount;

  // 3. Shipping (judged after coupon; empty cart ships nothing)
  const shipping =
    subtotal === 0 ? 0 : afterDiscount > FREE_SHIPPING_ABOVE_PAISE ? 0 : SHIPPING_PAISE;

  // 4. GST on amount after discount, not on shipping
  const gst = Math.round((afterDiscount * 18) / 100);

  // 5. Total
  const total = afterDiscount + shipping + gst;

  return {
    subtotal: toRupees(subtotal),
    discount: toRupees(discount),
    afterDiscount: toRupees(afterDiscount),
    shipping: toRupees(shipping),
    gst: toRupees(gst),
    total: toRupees(total),
    appliedCoupon,
    message,
  };
}
