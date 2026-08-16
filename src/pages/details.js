import "../css/style.css";

import {
  renderNavigationComponent,
  bindNavigationEvents
} from "../components/navigation.js";

import { renderBreadCrumb } from "../descriptions/breadcrumb.js";
import { renderDescription } from "../descriptions/descriptions.js";
import { defaultProductData } from "../descriptions/productdata.js";
import { bindImageEvents } from "../descriptions/Image.js";
import { renderFooterComponent } from "../components/footer.js";
import { renderNewsletterComponent } from "../components/newsletter.js";
import { bindHeroEvents } from "../home/hero.js";
import { initShoppingCartPage } from "./shoppingcardpage.js";
import { initNewsletterPopupPage } from "./newsletterpopup.js";
import { initSignupPage } from "./signuppage.js";
import {
  getCart,
  getCartSummary,
  saveCart
} from "../shopping_cart/cartData.js";
import { renderSignInForm } from "../../signin/signin.js";

async function initHomepage() {
  const homepage = document.getElementById("homepage-container");
  if (!homepage) return;

  if (typeof renderHomepageComponent === "function") {
    homepage.innerHTML = await renderHomepageComponent();

    if (typeof bindHeroEvents === "function") {
      bindHeroEvents(homepage);
    }
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

  // QUAN TRỌNG:
  // Gắn sự kiện cho nút mở/đóng giỏ hàng
  bindNavigationEvents(navigation, cart);
}

// Biến lưu trạng thái Tab hiện tại
let currentTab = "descriptions";

// Xử lý sự kiện nút số lượng & Add to Cart trực tiếp
function bindProductDetailActions(container) {
  const qtyVal = container.querySelector("[data-quantity-val]");
  const decBtn = container.querySelector('[data-action="decrease-qty"]');
  const incBtn = container.querySelector('[data-action="increase-qty"]');

  if (decBtn && qtyVal) {
    decBtn.addEventListener("click", (e) => {
      e.preventDefault();

      let current = Number(qtyVal.textContent) || 1;

      if (current > 1) {
        qtyVal.textContent = current - 1;
      }
    });
  }

  if (incBtn && qtyVal) {
    incBtn.addEventListener("click", (e) => {
      e.preventDefault();

      let current = Number(qtyVal.textContent) || 1;

      qtyVal.textContent = current + 1;
    });
  }

  const addBtn = container.querySelector('[data-action="add-to-cart"]');

  if (addBtn) {
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const count = qtyVal
        ? Number(qtyVal.textContent) || 1
        : 1;

      const cart = getCart();

      const existing = cart.find(
        item => item.name === defaultProductData.name
      );

      if (existing) {
        existing.quantity += count;
      } else {
        cart.push({
          id: Date.now(),
          name: defaultProductData.name,
          image: defaultProductData.mainImage,
          price: defaultProductData.currentPrice,
          quantity: count
        });
      }

      saveCart(cart);

      window.location.href = "./cart.html";
    });
  }
}

function renderDescriptionSection(container) {
  container.innerHTML = renderDescription(
    defaultProductData,
    currentTab
  );

  // Kích hoạt sự kiện bấm ảnh nhỏ đổi ảnh lớn
  bindImageEvents(container);

  // Kích hoạt sự kiện số lượng & Add to cart
  bindProductDetailActions(container);

  // Sự kiện chuyển Tab khi bấm vào các nút Tab
  const tabLinks = container.querySelectorAll(".tab-link");

  tabLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const selectedTab = link.getAttribute("data-tab");

      if (selectedTab && selectedTab !== currentTab) {
        currentTab = selectedTab;

        renderDescriptionSection(container);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("homepage-container")) {
    initNavigation();

    initHomepage().then(() => {
      if (typeof initNewsletterPopupPage === "function") {
        initNewsletterPopupPage();
      }
    });

    initFooter();
  }

  if (document.getElementById("cart-container")) {
    initShoppingCartPage();
  }

  if (document.getElementById("signup-container")) {
    initNavigation();
    initSignupPage();
    initNewsletter();
    initFooter();
  }

  if (document.getElementById("signin-container")) {
    initNavigation();
    renderSignInForm();
    initNewsletter();
    initFooter();
  }

  // Trang Chi tiết sản phẩm (Details Page)
  const descriptionContainer = document.getElementById(
    "description-container"
  );

  if (descriptionContainer) {
    initNavigation();

    const breadcrumbContainer = document.getElementById(
      "breadcrumb-container"
    );

    if (breadcrumbContainer) {
      breadcrumbContainer.innerHTML = renderBreadCrumb();
    }

    renderDescriptionSection(descriptionContainer);

    initNewsletter();
    initFooter();
  }
});