import "./css/style.css";

import {
  renderNavigationComponent,
  bindNavigationEvents,
} from "./components/navigation.js";
import { renderFooterComponent } from "./components/footer.js";
import { renderNewsletterComponent } from "./components/newsletter.js";
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
    activeHref: location.pathname,
  });

  bindNavigationEvents(navigation, cart);
}

function initSharedSections() {
  const newsletter = document.getElementById("newsletter-container");
  const footer = document.getElementById("footer-container");

  if (newsletter) newsletter.innerHTML = renderNewsletterComponent();
  if (footer) footer.innerHTML = renderFooterComponent();
}

async function initCurrentPage() {
  initNavigation();

  if (document.getElementById("homepage-container")) {
    const [
      { renderHomepageComponent },
      { bindHeroEvents },
      { bindCardEvents },
      { bindCountdowns },
      { initNewsletterPopupPage },
    ] = await Promise.all([
      import("./pages/homepage.js"),
      import("./home/hero.js"),
      import("./components/productcard.js"),
      import("./components/countdown.js"),
      import("./pages/newsletterpopup.js"),
    ]);

    const homepage = document.getElementById("homepage-container");
    homepage.innerHTML = await renderHomepageComponent();
    bindHeroEvents(homepage);
    bindCardEvents(homepage);
    bindCountdowns(homepage);
    import("./Quickview/quickview.js");
    initNewsletterPopupPage();
  } else if (document.getElementById("product-grid-container")) {
    const { initShopPage } = await import("./pages/shop.js");
    await initShopPage();
    import("./Quickview/quickview.js");
  } else if (document.getElementById("cart-container")) {
    const { initShoppingCartPage } = await import("./pages/shoppingcardpage.js");
    initShoppingCartPage();
  } else if (document.getElementById("signup-container")) {
    const { initSignupPage } = await import("./pages/signuppage.js");
    initSignupPage();
  } else if (document.getElementById("signin-container")) {
    const { initSignInPage } = await import("./pages/signin.js");
    initSignInPage();
  } else if (document.getElementById("aboutus-section")) {
    const { initAboutPage } = await import("./pages/about.js");
    initAboutPage();
  } else if (document.getElementById("wishlist-section")) {
    const { initWishlistPage } = await import("./pages/wishlist.js");
    initWishlistPage();
  } else if (document.getElementById("checkout-container")) {
    const { initCheckoutPage } = await import("./pages/checkoutpage.js");
    initCheckoutPage();
  } else if (document.getElementById("description-container")) {
    const [{ initDetailsPage }] = await Promise.all([
      import("./pages/details.js"),
      import("./Quickview/quickview.js"),
    ]);
    initDetailsPage();
  }

  initSharedSections();

}

initCurrentPage().catch((error) => {
  console.error("Unable to initialize page", error);
});

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
