import { renderCheckout } from "../checkout/checkout.js";
import { getCart, getCartSummary } from "../shopping_cart/cartData.js";

export function initCheckoutPage() {
  const container = document.getElementById("checkout-container");
  if (!container) return;

  const cart = getCart();
  const summary = getCartSummary(cart);

  container.innerHTML = renderCheckout({
    cartItems: cart.map((item) => ({
      ...item,
      price: item.price * item.quantity,
    })),
    subtotal: summary.total,
    shipping: 0,
    total: summary.total,
  });
}
