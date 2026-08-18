import { renderImage, bindImageEvents } from "../descriptions/Image.js";
import { renderProductInfo } from "../descriptions/ProductInfo.js";
import productData from "../data/productdata.json";
import { addProductToCart } from "../shopping_cart/cartData.js";

export function renderQuickViewModal(product) {
  return /*html*/ `
    <div id="quick-view-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div class="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        <button id="close-quick-view" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-all cursor-pointer z-10">
          ✕
        </button>

        <div id="quick-view-content" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          ${renderImage(product)}
          ${renderProductInfo(product)}
        </div>

      </div>
    </div>
  `;
}

export function openQuickView(productData) {
  const product = {
    ...defaultProductData,
    id: productData?.id || defaultProductData.id,
    name: productData?.name || defaultProductData.name,
    currentPrice: productData?.price || productData?.currentPrice || 12.00,
    originalPrice: productData?.oldPrice || productData?.originalPrice || null,
    rating: productData?.rating || 4,
    mainImage: productData?.image || productData?.mainImage || defaultProductData.mainImage,
    thumbnails: [
      productData?.image || productData?.mainImage || defaultProductData.mainImage,
      ...(defaultProductData.thumbnails || []).slice(1)
    ],
    category: { name: productData?.category || "Vegetables", link: "#" }
  };

  let modalContainer = document.getElementById("modal-root");
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "modal-root";
    document.body.appendChild(modalContainer);
  }

  modalContainer.innerHTML = renderQuickViewModal(product);

  const modal = document.getElementById("quick-view-modal");
  const closeBtn = document.getElementById("close-quick-view");

  const closeModal = () => {
    if (modalContainer) modalContainer.innerHTML = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  bindImageEvents(modalContainer);

  const qtyInput = modalContainer.querySelector(".quantity-stepper-input") || modalContainer.querySelector("[data-quantity-val]");
  const decBtn = modalContainer.querySelector('[data-action="decrease-qty"]') || modalContainer.querySelector('[data-action="decrement"]');
  const incBtn = modalContainer.querySelector('[data-action="increase-qty"]') || modalContainer.querySelector('[data-action="increment"]');

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

  const addBtn = modalContainer.querySelector('[data-action="add-to-cart"]');
  if (addBtn) {
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const count = qtyInput ? (Number(qtyInput.value || qtyInput.textContent) || 1) : 1;
      addProductToCart(product, count);
      closeModal();

      const toast = document.createElement("div");
      toast.className = "fixed bottom-6 right-6 z-50 bg-neutral-900 text-white text-sm font-medium px-5 py-3 rounded-lg shadow-xl";
      toast.textContent = `${product.name} added to cart.`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    });
  }
}

// 📌 TỰ ĐỘNG BẮT NÚT CON MẮT TOÀN BỘ WEB (THÔNG MINH)
document.addEventListener("click", (e) => {
  const eyeBtn = e.target.closest('[data-action="quick-view"]') || 
                 e.target.closest('[aria-label="Xem nhanh"]') ||
                 e.target.closest('.actionBtn:nth-child(2)');

  if (eyeBtn) {
    e.preventDefault();
    e.stopPropagation();

    let productData = null;

    if (eyeBtn.dataset.product) {
      try {
        productData = JSON.parse(decodeURIComponent(eyeBtn.dataset.product));
      } catch (err) {
        console.error(err);
      }
    }

    if (!productData) {
      const card = eyeBtn.closest(".product-card") || eyeBtn.closest(".group");
      if (card) {
        const name = card.querySelector(".name")?.textContent?.trim() || "Product";
        const priceText = card.querySelector(".price")?.textContent?.replace(/[^0-9.]/g, "") || "0";
        const image = card.querySelector("img")?.src || "";
        productData = {
          name,
          price: Number(priceText),
          image
        };
      }
    }

    openQuickView(productData || defaultProductData);
  }
});