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
import { toggleWishlist } from "../wishlist/wishlistData.js";
import { getImageUrl } from "../utils/assets.js";

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
  brandLogo: getImageUrl("/images/brand.svg"),
  description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
  category: { name: "Vegetables", link: "#" },
  tags: [
    { name: "Vegetables", link: "#" },
    { name: "Healthy", link: "#" },
    { name: "Chinese", link: "#" },
    { name: "Cabbage", link: "#" },
    { name: "Green Cabbage", link: "#" }
  ],
  mainImage: getImageUrl("/images/largecabage.svg"),
  thumbnails: [
    getImageUrl("/images/cabbage1.svg"),
    getImageUrl("/images/cabbage2.svg"),
    getImageUrl("/images/cabbage3.svg"),
    getImageUrl("/images/cabbage4.svg")
  ]
};

function normalizeProduct(product) {
  if (!product) return defaultProductData;

  const currentPrice = Number(product.currentPrice ?? product.price ?? defaultProductData.currentPrice ?? 0);
  const originalPrice = product.originalPrice ?? product.oldPrice ?? defaultProductData.originalPrice ?? null;
  // `image` is the product card/catalog image. Prefer it over a stale
  // `mainImage` that may have been inherited from the fallback product.
  const image = getImageUrl(product.image || product.mainImage || defaultProductData.mainImage || "");
  const thumbnails = Array.isArray(product.thumbnails) && product.thumbnails.length > 0
    ? product.thumbnails.map(getImageUrl)
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
    brandLogo: getImageUrl(product.brandLogo || defaultProductData.brandLogo),
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
      class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/70 p-2 sm:p-6"
    >
      <div
        class="relative max-h-[calc(100dvh-16px)] w-full max-w-[1320px] overflow-y-auto overscroll-contain rounded-lg bg-white p-4 shadow-2xl sm:max-h-[calc(100dvh-48px)] sm:p-8 lg:px-10 lg:pb-10 lg:pt-8"
      >
        <!-- CLOSE BUTTON FIGMA -->
        <button
          id="close-quick-view"
          type="button"
          class="sticky left-full top-0 z-50 -mb-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-xl font-normal text-neutral-500 shadow-sm transition-colors hover:text-primary"
          aria-label="Close modal"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- CONTENT GRID FIGMA -->
        <div class="grid grid-cols-1 items-start gap-6 pt-1 lg:grid-cols-2 lg:gap-6 lg:pt-0 min-[1400px]:grid-cols-[648px_minmax(0,568px)]">
          <div class="flex w-full min-w-0 justify-center">
            ${renderQuickViewImage(safeProduct)}
          </div>
          <div class="w-full min-w-0 pt-0 lg:pt-2">
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
  document.body.classList.add("overflow-hidden");

  const modal = modalContainer.querySelector("#quick-view-modal");
  const closeBtn = modalContainer.querySelector("#close-quick-view");

  const handleEscape = (event) => {
    if (event.key === "Escape") closeModal();
  };

  const closeModal = () => {
    modalContainer.innerHTML = "";
    document.body.classList.remove("overflow-hidden");
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
  }, () => {
    const { added } = toggleWishlist(product);
    showToast(
      `${product.name} ${added ? "added to" : "removed from"} wishlist.`,
    );
    return added;
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
    fixed bottom-6 right-6 z-[99999] bg-neutral-900 text-white
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
