import { renderNavigationComponent, bindNavigationEvents } from "../components/navigation.js";
import { renderNewsletterComponent } from "../components/newsletter.js";
import { renderFooterComponent } from "../components/footer.js";
import { bindCartEvents, renderCartPage } from "../shopping_card/cart.js";
import { getCart, getCartSummary } from "../shopping_card/cartData.js";

export function initShoppingCartPage() {
  const navigation = document.getElementById("navigation-container");
  const cartContainer = document.getElementById("cart-container");

  function renderNavigation(cart) {
    const summary = getCartSummary(cart);
    navigation.innerHTML = renderNavigationComponent({
      cartCount: summary.count,
      cartTotal: `$${summary.total.toFixed(2)}`,
      cartItems: cart,
      activeHref: location.pathname,
    });
    bindNavigationEvents(navigation);
  }

  function renderCart(cart, message = "") {
    cartContainer.innerHTML = renderCartPage(cart);
    bindCartEvents(cartContainer, refreshPage);

    if (message) {
      const messageElement = cartContainer.querySelector("[data-cart-message]");
      messageElement.textContent = message;
      messageElement.classList.remove("hidden");
    }
  }

  function refreshPage(cart, message = "") {
    renderNavigation(cart);
    renderCart(cart, message);
  }

  refreshPage(getCart());
  document.getElementById("newsletter-container").innerHTML = renderNewsletterComponent();
  document.getElementById("footer-container").innerHTML = renderFooterComponent();
}
