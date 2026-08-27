// src/pages/checkoutpage.js

import { renderCheckout, bindCheckoutEvents } from "../checkout/checkout.js";
import { bindLocationEvents } from "../checkout/Location.js";
import { getCart } from "../shopping_cart/cartData.js";

export function initCheckoutPage() {
  const container = document.getElementById("checkout-container");
  if (!container) return;

  const cart = getCart();
  container.innerHTML = renderCheckout(cart);

  // Gắn các sự kiện form validation và chuyển đổi quốc gia/tỉnh thành
  bindCheckoutEvents(container);
  bindLocationEvents(container);
}