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
import { initSignInPage } from "./pages/signin.js";
import { initCheckoutPage } from "./pages/checkoutpage.js";
import { initDetailsPage } from "./pages/details.js";
import { addProduct, getCart, getCartSummary, saveCart } from "./shopping_cart/cartData.js";

function initNavigation() {

  const navigation =
    document.getElementById(
      "navigation-container"
    );

  if (!navigation) return;

  const cart = getCart();

  const summary =
    getCartSummary(cart);

  navigation.innerHTML =
    renderNavigationComponent({

      cartCount:
        summary.count,

      cartTotal:
        `$${summary.total.toFixed(2)}`,

      cartItems:
        cart,

      activeHref:
        location.pathname
    });

  bindNavigationEvents(navigation);
}


// =====================================================
// HOMEPAGE
// =====================================================

async function initHomepage() {

  const homepage =
    document.getElementById(
      "homepage-container"
    );

  if (!homepage) return;

  homepage.innerHTML =
    await renderHomepageComponent();

  bindHeroEvents(homepage);

  initNewsletterPopupPage();
}


// =====================================================
// FOOTER
// =====================================================

function initFooter() {

  const footer =
    document.getElementById(
      "footer-container"
    );

  if (!footer) return;

  footer.innerHTML =
    renderFooterComponent();
}


// =====================================================
// NEWSLETTER
// =====================================================

function initNewsletter() {
  const newsletter = document.getElementById("newsletter-container");
  if (!newsletter) return;

  newsletter.innerHTML =
    renderNewsletterComponent();
}

// =====================================================
// ĐIỀU HƯỚNG CÁC TRANG TRONG ỨNG DỤNG
// =====================================================

if (document.getElementById("homepage-container")) {
  initNavigation();
  initHomepage().then(() => initNewsletterPopupPage());
  initFooter();
}

if (document.getElementById("cart-container")) {
  initShoppingCartPage();
}

if (document.getElementById("product-grid-container")){
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

if (document.getElementById("signin-container")){
  initNavigation();
  initSignInPage();
  initNewsletter();
  initFooter();
}

if (document.getElementById("aboutus-section")) {
  initNavigation();
  initAboutPage();
  initNewsletter();
  initFooter();
}

if (document.getElementById("wishlist-section")) {
  initNavigation();
  initWishlistPage();
  initNewsletter();
  initFooter();
}

if (document.getElementById("checkout-container")) {
  initNavigation();
  initCheckoutPage();
  initNewsletter();
  initFooter();
}

// 📌 ĐÂY LÀ ĐOẠN ĐÃ BỔ SUNG ĐỂ MỞ TRANG CHI TIẾT SẢN PHẨM!
if (document.getElementById("description-container")) {
  initNavigation();
  initDetailsPage();
  initNewsletter();
  initFooter();
}