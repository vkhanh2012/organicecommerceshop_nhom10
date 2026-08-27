// src/Quickview/quickview.js

import {
  renderQuickViewImage,
  bindQuickViewImageEvents
} from "./QuickViewImage.js";

import {
  renderQuickViewInfo,
  bindQuickViewInfoEvents
} from "./QuickViewInfo.js";

import { getCart, saveCart, addProductToCart } from "../shopping_cart/cartData.js";

// =====================================================
// DEFAULT PRODUCT FALLBACK
// =====================================================
const defaultProductData = {
  id: 1,
  name: "Chinese Cabbage",
  inStock: true,
  sku: "2,51,594",
  rating: 4,
  reviewsCount: 4,
  originalPrice: 48.0,
  currentPrice: 17.28,
  discountLabel: "64% Off",
  brand: "FarmFresh",
  brandLogo: "/src/assets/images/brand.svg",
  description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
  category: { name: "Vegetables", link: "#" },
  tags: [
    { name: "Vegetables", link: "#" },
    { name: "Healthy", link: "#" },
    { name: "Chinese", link: "#" },
    { name: "Cabbage", link: "#" },
    { name: "Green Cabbage", link: "#" }
  ],
  mainImage: "/src/assets/images/largecabage.svg",
  thumbnails: [
    "/src/assets/images/cabbage1.svg",
    "/src/assets/images/cabbage2.svg",
    "/src/assets/images/cabbage3.svg",
    "/src/assets/images/cabbage4.svg"
  ]
};

function normalizeProduct(product) {
  if (!product) return defaultProductData;

  const currentPrice = Number(product.currentPrice ?? product.price ?? defaultProductData.currentPrice ?? 0);
  const originalPrice = product.originalPrice ?? product.oldPrice ?? defaultProductData.originalPrice ?? null;
  const image = product.mainImage || product.image || defaultProductData.mainImage || "";
  const thumbnails = Array.isArray(product.thumbnails) && product.thumbnails.length > 0
    ? product.thumbnails
    : [image, image, image, image];

  return {
    ...defaultProductData,
    ...product,
    id: product.id ?? defaultProductData.id ?? Date.now(),
    sku: product.sku || defaultProductData.sku || product.id || "2,51,594",
    name: product.name || defaultProductData.name || "Product",
    currentPrice,
    originalPrice,
    price: currentPrice,
    oldPrice: originalPrice,
    mainImage: image,
    image,
    thumbnails,
    tags: Array.isArray(product.tags) ? product.tags : defaultProductData.tags || [],
    rating: Number(product.rating ?? defaultProductData.rating ?? 4),
    reviewsCount: Number(product.reviewsCount ?? defaultProductData.reviewsCount ?? 4),
    description: product.description ?? defaultProductData.description ?? "",
  };
}

// =====================================================
// RENDER QUICK VIEW MODAL (FIGMA SPECIFICATIONS)
// =====================================================
export function renderQuickViewModal(product) {
  const safeProduct = normalizeProduct(product);

  return /*html*/ `
    <div
      id="quick-view-modal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6"
    >
      <div
        class="container-custom bg-white rounded-2xl shadow-2xl p-6 sm:p-10 overflow-y-auto max-h-[90vh] relative"
      >
        <!-- CLOSE BUTTON FIGMA -->
        <button
          id="close-quick-view"
          type="button"
          class="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-all cursor-pointer z-50 font-bold text-lg"
          aria-label="Close modal"
        >
          ✕
        </button>

        <!-- CONTENT GRID FIGMA -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div class="lg:col-span-6 w-full flex justify-center">
            ${renderQuickViewImage(safeProduct)}
          </div>
          <div class="lg:col-span-6 w-full">
            ${renderQuickViewInfo(safeProduct)}
          </div>
        </div>
      </div>
    </div>
  `;
}

// =====================================================
// OPEN QUICK VIEW
// =====================================================
export function openQuickView(productDataOrId) {
  let targetProduct = null;

  if (typeof productDataOrId === "object" && productDataOrId !== null) {
    targetProduct = productDataOrId;
  }

  const product = normalizeProduct(targetProduct);

  let modalContainer = document.getElementById("modal-root");
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "modal-root";
    document.body.appendChild(modalContainer);
  }

  modalContainer.innerHTML = renderQuickViewModal(product);

  const modal = modalContainer.querySelector("#quick-view-modal");
  const closeBtn = modalContainer.querySelector("#close-quick-view");

  const handleEscape = (event) => {
    if (event.key === "Escape") closeModal();
  };

  const closeModal = () => {
    modalContainer.innerHTML = "";
    document.removeEventListener("keydown", handleEscape);
  };

  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", handleEscape);

  // BIND ISOLATED IMAGE & INFO EVENTS
  bindQuickViewImageEvents(modalContainer);

  bindQuickViewInfoEvents(modalContainer, ({ quantity }) => {
    // THÊM SẢN PHẨM VÀO GIỎ HÀNG & TỰ ĐỘNG BẮN SỰ KIỆN CẬP NHẬT HEADER/POPUP
    addProductToCart(product, quantity);

    closeModal();
    showToast(`${product.name} added to cart (${quantity}).`);
  });
}

// =====================================================
// TOAST NOTIFICATION
// =====================================================
function showToast(message) {
  const oldToast = document.getElementById("quick-view-toast");
  if (oldToast) oldToast.remove();

  const toast = document.createElement("div");
  toast.id = "quick-view-toast";
  toast.className = `
    fixed bottom-6 right-6 z-[99999] bg-[#1A1A1A] text-white
    text-sm font-medium px-5 py-3 rounded-lg shadow-xl transition-all
  `;
  toast.textContent = message;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// =====================================================
// QUICK VIEW GLOBAL EVENT LISTENER
// =====================================================
document.addEventListener("click", (event) => {
  const eyeBtn = event.target.closest('[data-action="quick-view"]');
  if (!eyeBtn) return;

  event.preventDefault();
  event.stopPropagation();

  let productData = null;

  if (eyeBtn.dataset.product) {
    try {
      productData = JSON.parse(decodeURIComponent(eyeBtn.dataset.product));
    } catch (err) {}
  }

  const card = eyeBtn.closest(".product-card");
  const id = eyeBtn.getAttribute("data-id") || card?.getAttribute("data-id");

  if (productData) {
    openQuickView(productData);
    return;
  }

  if (card) {
    const nameElement = card.querySelector(".name") || card.querySelector("a");
    const imageElement = card.querySelector("img");
    const priceElement = card.querySelector(".price");

    const name = nameElement?.textContent?.trim() || "Product";
    const image = imageElement?.src || "";
    const price = Number(priceElement?.textContent?.replace(/[^0-9.]/g, "")) || 0;

    openQuickView({
      id: id || Date.now(),
      name,
      price,
      currentPrice: price,
      image,
      mainImage: image,
      thumbnails: [image, image, image, image],
    });
  }
});