// src/pages/checkoutpage.js

import { renderCheckout, bindCheckoutEvents } from "../checkout/checkout.js";
import { getCart } from "../shopping_cart/cartData.js";

export function initCheckoutPage() {
  const container = document.getElementById("checkout-container");
  if (!container) return;

  const cart = getCart(); // Đảm bảo luôn truyền MẢNG giỏ hàng
  container.innerHTML = renderCheckout(cart);

  bindCheckoutEvents(container);
}