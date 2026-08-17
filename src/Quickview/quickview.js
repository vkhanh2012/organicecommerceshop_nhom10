import { renderImage, bindImageEvents } from "../descriptions/Image.js";
import { renderProductInfo } from "../descriptions/ProductInfo.js";
import {
  defaultProductData,
  PRODUCTS_MAP
} from "../descriptions/productdata.js";
import { getCart, saveCart } from "../shopping_cart/cartData.js";
import productListJson from "../data/products.json";

// Render HTML cho Modal Quick View
export function renderQuickViewModal(product) {
  return /*html*/ `
    <div
      id="quick-view-modal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in"
    >
      <div
        class="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        <!-- Nút đóng -->
        <button
          id="close-quick-view"
          type="button"
          class="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-all cursor-pointer z-10"
        >
          ✕
        </button>

        <!-- Nội dung -->
        <div
          id="quick-view-content"
          class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          ${renderImage(product)}
          ${renderProductInfo(product)}
        </div>
      </div>
    </div>
  `;
}

// Mở Quick View
export function openQuickView(productDataOrId) {
  let product = null;
  let targetData = null;

  // A. Nếu truyền vào là Object
  if (typeof productDataOrId === "object" && productDataOrId !== null) {
    targetData = productDataOrId;
  } 
  // B. Nếu truyền vào là ID (Number/String) -> Tìm trong products.json
  else if (typeof productDataOrId === "number" || typeof productDataOrId === "string") {
    targetData = productListJson.find(p => p.id === Number(productDataOrId));
  }

  // 1. Tìm trong PRODUCTS_MAP theo Tên sản phẩm
  if (targetData?.name && PRODUCTS_MAP) {
    const matchedKey = Object.keys(PRODUCTS_MAP).find(
      k => k.toLowerCase().trim() === targetData.name.toLowerCase().trim()
    );
    if (matchedKey) {
      product = PRODUCTS_MAP[matchedKey];
    }
  }

  // 2. Nếu món bấm vào chưa có trong PRODUCTS_MAP (Ví dụ: Green Capsicum, Eggplant, Green Apple...)
  // Ghép Tên, Giá, Ảnh của món vừa bấm vào để hiển thị, không bị ép về Bắp cải!
  if (!product && targetData) {
    const mainImgUrl = targetData.image || targetData.mainImage || defaultProductData.mainImage;
    const itemThumbnails = targetData.thumbnails || [
      mainImgUrl,
      mainImgUrl,
      mainImgUrl,
      mainImgUrl
    ];

    product = {
      ...defaultProductData,
      id: targetData.id || Date.now(),
      name: targetData.name || defaultProductData.name,
      currentPrice: targetData.price || targetData.currentPrice || 12.00,
      originalPrice: targetData.oldPrice || targetData.originalPrice || null,
      rating: targetData.rating || 4,
      mainImage: mainImgUrl,
      thumbnails: itemThumbnails,
      category: { name: targetData.category || "Vegetables", link: "#" }
    };
  }

  // 3. Cuối cùng mới dùng defaultProductData nếu không tìm thấy bất kỳ thông tin nào
  if (!product) {
    product = defaultProductData;
  }

  console.log("QUICK VIEW PRODUCT FINAL:", product);

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
    if (modalContainer) {
      modalContainer.innerHTML = "";
    }
  };

  closeBtn?.addEventListener("click", closeModal);

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Kích hoạt sự kiện bấm ảnh nhỏ đổi ảnh lớn
  bindImageEvents(modalContainer);

  // ==============================
  // QUANTITY STEPPER
  // ==============================
  const qtyInput =
    modalContainer.querySelector(".quantity-stepper-input") ||
    modalContainer.querySelector("[data-quantity-val]");

  const decBtn =
    modalContainer.querySelector('[data-action="decrement"]') ||
    modalContainer.querySelector('[data-action="decrease-qty"]');

  const incBtn =
    modalContainer.querySelector('[data-action="increment"]') ||
    modalContainer.querySelector('[data-action="increase-qty"]');

  if (decBtn && qtyInput) {
    decBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let current = Number(qtyInput.value || qtyInput.textContent) || 1;
      if (current > 1) {
        if ("value" in qtyInput) {
          qtyInput.value = current - 1;
        } else {
          qtyInput.textContent = current - 1;
        }
      }
    });
  }

  if (incBtn && qtyInput) {
    incBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let current = Number(qtyInput.value || qtyInput.textContent) || 1;
      if ("value" in qtyInput) {
        qtyInput.value = current + 1;
      } else {
        qtyInput.textContent = current + 1;
      }
    });
  }

  // ==============================
  // ADD TO CART
  // ==============================
  const addBtn = modalContainer.querySelector('[data-action="add-to-cart"]');

  if (addBtn) {
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const count = qtyInput
        ? Number(qtyInput.value || qtyInput.textContent) || 1
        : 1;

      const cart = getCart();

      const existing = cart.find(item => item.name === product.name);

      if (existing) {
        existing.quantity += count;
      } else {
        cart.push({
          id: product.id || Date.now(),
          name: product.name,
          image: product.mainImage,
          price: product.currentPrice,
          quantity: count
        });
      }

      saveCart(cart);

      closeModal();

      const toast = document.createElement("div");
      toast.className =
        "fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white text-sm font-medium px-5 py-3 rounded-lg shadow-xl";
      toast.textContent = `${product.name} added to cart.`;

      document.body.appendChild(toast);

      setTimeout(() => {
        toast.remove();
      }, 3000);
    });
  }
}

// ======================================
// BẮT SỰ KIỆN QUICK VIEW THÔNG MINH (3 LỚP BẮT DỮ LIỆU)
// ======================================
document.addEventListener("click", (e) => {
  const eyeBtn = e.target.closest('[data-action="quick-view"]') ||
                 e.target.closest('[aria-label="Xem nhanh"]');

  if (!eyeBtn) return;

  e.preventDefault();
  e.stopPropagation();

  let productData = null;

  // Lớp 1: Đọc từ data-product
  if (eyeBtn.dataset.product) {
    try {
      productData = JSON.parse(decodeURIComponent(eyeBtn.dataset.product));
    } catch (err) {
      console.error("Không đọc được data-product:", err);
    }
  }

  // Lớp 2: Đọc từ data-id hoặc dataset của card cha
  if (!productData) {
    const productId = eyeBtn.dataset.id || eyeBtn.closest('[data-id]')?.dataset.id;
    if (productId) {
      const foundInJson = productListJson.find(p => p.id === Number(productId));
      if (foundInJson) {
        productData = foundInJson;
      }
    }
  }

  // Lớp 3: Đọc trực tiếp Tên, Giá, Ảnh từ HTML thẻ Card vừa bấm
  if (!productData) {
    const card = eyeBtn.closest(".product-card") || eyeBtn.closest(".group") || eyeBtn.parentElement?.parentElement;
    if (card) {
      const name = card.querySelector(".name, h3, a")?.textContent?.trim();
      const priceText = card.querySelector(".price")?.textContent?.replace(/[^0-9.]/g, "");
      const image = card.querySelector("img")?.src;
      if (name) {
        productData = {
          name,
          price: Number(priceText) || 12,
          image
        };
      }
    }
  }

  console.log("CLICK QUICK VIEW CAPTURED:", productData);

  openQuickView(productData);
});