import "./css/style.css";
import { renderNavigationComponent, bindNavigationEvents } from "./components/navigation.js";
import { renderNewsletterComponent } from "./components/newsletter.js";
import { renderFooterComponent } from "./components/footer.js";
import { bindCartEvents, renderCartPage } from "./pages/cart/cart.js";
import { getCart, getCartSummary } from "./pages/cart/cartData.js";

const navigation = document.getElementById("navigation-container");
const cartContainer = document.getElementById("cart-container");

function showNavigation(cart) {
  const summary = getCartSummary(cart);
  navigation.innerHTML = renderNavigationComponent({
    cartCount: summary.count,
    cartTotal: `$${summary.total.toFixed(2)}`,
    activeHref: location.pathname,
  });
  bindNavigationEvents(navigation);
}

function showCart(cart, message = "") {
  cartContainer.innerHTML = renderCartPage(cart);
  bindCartEvents(cartContainer, showCartAndNavigation);

  if (message) {
    const messageElement = cartContainer.querySelector("[data-cart-message]");
    messageElement.textContent = message;
    messageElement.classList.remove("hidden");
  }
}

function showCartAndNavigation(cart, message = "") {
  showNavigation(cart);
  showCart(cart, message);
}

showCartAndNavigation(getCart());
document.getElementById("newsletter-container").innerHTML = renderNewsletterComponent();
document.getElementById("footer-container").innerHTML = renderFooterComponent();