import "./css/style.css";

import {
  renderNavigationComponent,
  bindNavigationEvents
} from "./components/navigation.js";

import { renderHomepageComponent } from "./pages/homepage.js";
import { renderFooterComponent } from "./components/footer.js";
import { bindHeroEvents } from "./home/hero.js";
import { initShoppingCartPage } from "./pages/shoppingcardpage.js";
import { getCart, getCartSummary } from "./shopping_cart/cartData.js";

function initNavigation() {
  const navigation = document.getElementById("navigation-container");

  if (!navigation) return;

  const cart = getCart();
  const summary = getCartSummary(cart);

  navigation.innerHTML = renderNavigationComponent({
    cartCount: summary.count,
    cartTotal: `$${summary.total.toFixed(2)}`,
    cartItems: cart,
    activeHref: location.pathname
  });

  bindNavigationEvents(navigation);
}

async function initHomepage() {
  const homepage = document.getElementById("homepage-container");

  if (!homepage) return;

  homepage.innerHTML = await renderHomepageComponent();
  bindHeroEvents(homepage);
}

function initFooter() {
  const footer = document.getElementById("footer-container");

  if (!footer) return;

  footer.innerHTML = renderFooterComponent();
}

initNavigation();

if (document.getElementById("homepage-container")) {
  initHomepage();
  initFooter();
}

if (document.getElementById("cart-container")) {
  initShoppingCartPage();
}