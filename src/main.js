import "./css/style.css";

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
import { initShopPage } from "./pages/shop.js";
import { initAboutPage } from "./pages/about.js";
import { initWishlistPage } from "./pages/wishlist.js";
import { initSigninPage } from "./pages/signin.js";
import { initCheckoutPage } from "./pages/checkoutpage.js";
import { initDetailsPage } from "./pages/details.js";
import { addProduct, getCart, getCartSummary, saveCart } from "./shopping_cart/cartData.js";

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

  bindNavigationEvents(navigation, cart);
}

async function initHomepage() {
  const homepage = document.getElementById("homepage-container");

  if (!homepage) return;

  homepage.innerHTML = await renderHomepageComponent();
  bindHeroEvents(homepage);
}

function initShopPage(){
  const shopPage = document.getElementById("shop-container");

  if(shopPage){
    shopPage.innerHTML = initShopPage();
  }
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

function initSharedComponents() {
  initNavigation();
  initNewsletter();
  initFooter();

  document.addEventListener("cart:updated", (event) => {
    initNavigation();

    if (event.detail?.openPopup) {
      document.querySelector("[data-cart-open]")?.click();
    }
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-cart]");
    if (!button || button.disabled) return;

    const stepper = button.closest("section, article, div")?.querySelector(".quantity-stepper-input");
    const quantity = button.hasAttribute("data-cart-use-stepper")
      ? Number(stepper?.value) || 1
      : 1;

    const product = {
      id: button.dataset.cartId,
      name: button.dataset.cartName,
      image: button.dataset.cartImage,
      price: Number(button.dataset.cartPrice),
      quantity,
    };

    const updatedCart = addProduct(getCart(), product);
    saveCart(updatedCart);
    document.dispatchEvent(new CustomEvent("cart:updated", {
      detail: { cart: updatedCart }
    }));
    showCartMessage(`${product.name} added to cart.`);
  });

}

function showCartMessage(message) {
  document.querySelector("[data-cart-toast]")?.remove();

  const toast = document.createElement("div");
  toast.dataset.cartToast = "";
  toast.className = "fixed bottom-5 right-5 z-[110] rounded-lg bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-lg";
  toast.textContent = message;
  document.body.append(toast);

  setTimeout(() => toast.remove(), 2000);
}

async function initCurrentPage() {
  if (document.getElementById("homepage-container")) {
    await initHomepage();
    setTimeout(initNewsletterPopupPage, 1500);
    return;
  }

  if (document.getElementById("cart-container")) return initShoppingCartPage();
  if (document.getElementById("signup-container")) return initSignupPage();
  if (document.getElementById("product-grid-container")) return initShopPage();
  if (document.getElementById("aboutus-section")) return initAboutPage();
  if (document.getElementById("wishlist-section")) return initWishlistPage();
  if (document.getElementById("signin-form-container")) return initSigninPage();
  if (document.getElementById("checkout-container")) return initCheckoutPage();
  if (document.getElementById("description-container")) return initDetailsPage();
}

async function main() {
  initSharedComponents();
  await initCurrentPage();
}

main();
