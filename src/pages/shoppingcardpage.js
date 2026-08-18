import { bindCartEvents, renderCartPage } from "../shopping_cart/cart.js";
import { getCart } from "../shopping_cart/cartData.js";

export function initShoppingCartPage() {
  const cartContainer = document.getElementById("cart-container");
  if (!cartContainer) return;

  function refreshCart(cart, message = "") {
    renderCart(cart, message);
    document.dispatchEvent(new CustomEvent("cart:updated", { detail: cart }));
  }

  function renderCart(cart, message = "") {
    cartContainer.innerHTML = renderCartPage(cart);
    if (message) {
      const messageElement = cartContainer.querySelector("[data-cart-message]");
      messageElement.textContent = message;
      messageElement.classList.remove("hidden");
    }
  }

  renderCart(getCart());
  bindCartEvents(cartContainer, refreshCart);
}
