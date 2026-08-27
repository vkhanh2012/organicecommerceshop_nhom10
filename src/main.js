import "./css/style.css";

import {
  renderNavigationComponent,
  bindNavigationEvents
} from "./components/navigation.js";

import { renderHomepageComponent } from "./pages/homepage.js";
import { renderFooterComponent } from "./components/footer.js";
import { renderNewsletterComponent } from "./components/newsletter.js";

import { bindHeroEvents } from "./home/hero.js";
import { bindCardEvents } from "./components/productcard.js";

import { initShoppingCartPage } from "./pages/shoppingcardpage.js";
import { initNewsletterPopupPage } from "./pages/newsletterpopup.js";
import { initSignupPage } from "./pages/signuppage.js";
import { initShopPage } from "./pages/shop.js";
import { initAboutPage } from "./pages/about.js";
import { initWishlistPage } from "./pages/wishlist.js";
import { initSignInPage } from "./pages/signin.js";
import { initCheckoutPage } from "./pages/checkoutpage.js";
import { initDetailsPage } from "./pages/details.js";

import {
  getCart,
  getCartSummary
} from "./shopping_cart/cartData.js";


// =====================================================
// QUICK VIEW
// =====================================================
//
// QUAN TRỌNG:
// Nếu file quickview.js của bạn nằm ở:
// src/components/quickview.js
// thì giữ dòng dưới.
//
// Nếu nó nằm ở:
// src/shop/quickview.js
// thì đổi thành:
// import "./shop/quickview.js";
//

import "./Quickview/quickview.js";


// =====================================================
// NAVIGATION
// =====================================================

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

  bindNavigationEvents(navigation, cart);
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
  bindCardEvents(homepage);
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

  const newsletter =
    document.getElementById(
      "newsletter-container"
    );

  if (!newsletter) return;

  newsletter.innerHTML =
    renderNewsletterComponent();
}


// =====================================================
// HOMEPAGE
// =====================================================

if (
  document.getElementById(
    "homepage-container"
  )
) {

  initNavigation();

  initHomepage()
    .then(() => {
      initNewsletterPopupPage();
    });
  initNewsletter();  
  initFooter();
}


// =====================================================
// SHOP
// =====================================================

if (
  document.getElementById(
    "product-grid-container"
  )
) {

  initNavigation();

  initShopPage();

  initNewsletter();

  initFooter();
}


// =====================================================
// SHOPPING CART
// =====================================================

if (
  document.getElementById(
    "cart-container"
  )
) {

  initNavigation();

  initShoppingCartPage();

  initNewsletter();

  initFooter();
}


// =====================================================
// SIGN UP
// =====================================================

if (
  document.getElementById(
    "signup-container"
  )
) {

  initNavigation();

  initSignupPage();

  initNewsletter();

  initFooter();
}


// =====================================================
// SIGN IN
// =====================================================

if (
  document.getElementById(
    "signin-container"
  )
) {

  initNavigation();

  initSignInPage();

  initNewsletter();

  initFooter();
}


// =====================================================
// ABOUT
// =====================================================

if (
  document.getElementById(
    "aboutus-section"
  )
) {

  initNavigation();

  initAboutPage();

  initNewsletter();

  initFooter();
}


// =====================================================
// WISHLIST
// =====================================================

if (
  document.getElementById(
    "wishlist-section"
  )
) {

  initNavigation();

  initWishlistPage();

  initNewsletter();

  initFooter();
}


// =====================================================
// CHECKOUT
// =====================================================

if (
  document.getElementById(
    "checkout-container"
  )
) {

  initNavigation();

  initCheckoutPage();

  initNewsletter();

  initFooter();
}


// =====================================================
// DESCRIPTION
// =====================================================

if (
  document.getElementById(
    "description-container"
  )
) {

  initNavigation();

  initDetailsPage();

  initNewsletter();

  initFooter();
}

// Đồng bộ Header + Cart Popup khi giỏ hàng thay đổi
document.addEventListener("cart:updated", (event) => {
  const shouldKeepPopupOpen = Boolean(event.detail?.openPopup);

  initNavigation();

  if (shouldKeepPopupOpen) {
    requestAnimationFrame(() => {
      document.querySelector("[data-cart-overlay]")?.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    });
  }
});
