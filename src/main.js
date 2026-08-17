import "./css/style.css";
import "./pages/signin.js"
import "./pages/details.js"

import {
  renderNavigationComponent,
  bindNavigationEvents
} from "./components/navigation.js";


import { renderHomepageComponent } from "./pages/homepage.js";
import { renderFooterComponent } from "./components/footer.js";
import { renderNewsletterComponent } from "./components/newsletter.js";
import { bindHeroEvents } from "./home/hero.js";
import { initShoppingCartPage } from "./pages/shoppingcardpage.js";
import { initNewsletterPopupPage } from "./pages/newsletterpopup.js";
import { initSignupPage } from "./pages/signuppage.js";
import { getCart, getCartSummary } from "./shopping_cart/cartData.js";
import {initSignInPage} from "./pages/signin.js"
import { initShopPage } from "./pages/shop.js";


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

function initNewsletter() {
  const newsletter = document.getElementById("newsletter-container");
  if (!newsletter) return;
  newsletter.innerHTML = renderNewsletterComponent();
}

if (document.getElementById("homepage-container")) {
  initNavigation();
  initHomepage().then(() => initNewsletterPopupPage());
  initFooter();
}

if (document.getElementById("cart-container")) {
  initShoppingCartPage();
}

if(document.getElementById("product-grid-container")){
  initNavigation();
  initShopPage();
  initNewsletter();
  initFooter();
}

if (document.getElementById("signup-container")) {
  initNavigation();
  initSignupPage();
  initNewsletter();
  initFooter();
}

if(document.getElementById("signin-container")){
  initNavigation();
  initSignInPage();
  initNewsletter();
  initFooter();
}

