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
import { initSignInPage } from "./signin.js";

// Import danh sách sản phẩm từ file products.json
import productList from "../data/products.json"; 

// 📌 Lấy sản phẩm khớp với ID trên URL (product_detail.html?id=...)
function getActiveProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = Number(urlParams.get("id"));

  const found = productList.find(item => item.id === productId);

  if (!found) return defaultProductData;

  return {
    ...defaultProductData,
    id: found.id,
    name: found.name,
    currentPrice: found.price,
    originalPrice: found.oldPrice,
    rating: found.rating,
    mainImage: found.image,
    thumbnails: [
      found.image,
      ...(defaultProductData.thumbnails || []).slice(1)
    ],
    category: { name: found.category || "Vegetables", link: "#" }
  };
}

// Thông báo Toast ở góc phải màn hình
function showToastNotification(message) {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white text-sm font-medium px-5 py-3 rounded-lg shadow-xl transition-all duration-300 transform translate-y-10 opacity-0 pointer-events-none flex items-center gap-2";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  
  toast.classList.remove("translate-y-10", "opacity-0", "pointer-events-none");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-10", "opacity-0", "pointer-events-none");
  }, 3000);
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

  bindNavigationEvents(navigation, cart);
}

let currentTab = "descriptions";

function bindProductDetailActions(container, currentProduct) {
  const qtyInput = container.querySelector(".quantity-stepper-input") || container.querySelector("[data-quantity-val]");
  const decBtn = container.querySelector('[data-action="decrement"]') || container.querySelector('[data-action="decrease-qty"]');
  const incBtn = container.querySelector('[data-action="increment"]') || container.querySelector('[data-action="increase-qty"]');

  if (decBtn && qtyInput) {
    decBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let current = Number(qtyInput.value || qtyInput.textContent) || 1;
      if (current > 1) {
        if ("value" in qtyInput) qtyInput.value = current - 1;
        else qtyInput.textContent = current - 1;
      }
    });
  }

  if (incBtn && qtyInput) {
    incBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let current = Number(qtyInput.value || qtyInput.textContent) || 1;
      if ("value" in qtyInput) qtyInput.value = current + 1;
      else qtyInput.textContent = current + 1;
    });
  }

  const addBtn = container.querySelector('[data-action="add-to-cart"]');
  if (addBtn) {
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const count = qtyInput
        ? (Number(qtyInput.value || qtyInput.textContent) || 1)
        : 1;

      const cart = getCart();
      const productImage = currentProduct.mainImage || currentProduct.image || (currentProduct.thumbnails && currentProduct.thumbnails[0]) || "";

      const existing = cart.find(item => item.name === currentProduct.name);

      if (existing) {
        existing.quantity += count;
        if (!existing.image) existing.image = productImage;
      } else {
        cart.push({
          id: currentProduct.id || Date.now(),
          name: currentProduct.name,
          image: productImage,
          price: currentProduct.currentPrice,
          quantity: count
        });
      }

      saveCart(cart);
      initNavigation();
      showToastNotification(`${currentProduct.name} added to cart.`);
    });
  }
}

function renderDescriptionSection(container) {
  const currentProduct = getActiveProduct();

  container.innerHTML = renderDescription(
    currentProduct,
    currentTab
  );

  bindImageEvents(container);
  bindProductDetailActions(container, currentProduct);

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
    initFooter();
  }

  if (document.getElementById("cart-container")) {
    initShoppingCartPage();
  }

  const descriptionContainer = document.getElementById("description-container");

  if (descriptionContainer) {
    initNavigation();

    const breadcrumbContainer = document.getElementById("breadcrumb-container");
    if (breadcrumbContainer) {
      breadcrumbContainer.innerHTML = renderBreadCrumb();
    }

    renderDescriptionSection(descriptionContainer);

    initNewsletter();
    initFooter();
  }
});