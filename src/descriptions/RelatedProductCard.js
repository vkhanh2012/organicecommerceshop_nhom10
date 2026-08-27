// src/components/productCard.js

import {
  iconHeart,
  iconEye,
  iconBag,
  iconStar
} from "../components/icons.js";

import { addProductToCart } from "../shopping_cart/cartData.js";
import { getImageUrl, attachImageUrls } from "../utils/assets.js";
import productsData from "../data/products.json";

// =====================================================
// CSS CLASSES DÀNH CHO CARD & GRID (HOVER VIỀN XANH & GẠCH CHÂN CHỮ)
// =====================================================
const CLASS = {
  // CARD TRANG HOME (Hover viền xanh #2C742F & shadow nhẹ)
  cardHome: `
    product-card
    group
    relative
    flex
    h-full
    w-full
    cursor-pointer
    flex-col
    justify-between
    bg-white
    p-3.5
    rounded-2xl
    border
    border-neutral-200
    transition-all
    duration-300
    hover:z-20
    hover:border-primary-dark
    hover:shadow-[0_4px_20px_rgba(0,178,7,0.18)]
  `,

  // CARD TRANG SHOP (Hover viền xanh #2C742F & shadow nhẹ)
  cardShop: `
    product-card
    group
    relative
    flex
    h-full
    w-full
    cursor-pointer
    flex-col
    justify-between
    overflow-hidden
    rounded-2xl
    border
    border-neutral-200
    bg-white
    p-3.5
    transition-all
    duration-300
    hover:z-20
    hover:border-primary-dark
    hover:shadow-[0_4px_20px_rgba(0,178,7,0.18)]
    xl:h-96
  `,

  imageWrap:
    "relative aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center mb-3 block cursor-pointer shrink-0 p-2",

  image:
    "w-full h-full object-contain transition-transform duration-300 group-hover:scale-105",

  tags:
    "absolute top-2 left-2 z-10 flex gap-1 pointer-events-none",

  tagSale:
    "bg-outstock text-white text-[11px] font-semibold font-poppins px-2 py-0.5 rounded-md",

  tagBest:
    "bg-best-tag text-white text-[11px] font-semibold font-poppins px-2 py-0.5 rounded-md",

  actions:
    "absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity",

  actionBtn:
    "w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-md md:shadow-none md:border md:border-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors cursor-pointer",

  body:
    "px-0.5 flex flex-col flex-1 justify-between mt-1",

  // TÊN SẢN PHẨM: HOVER ĐỔI MÀU XANH + GẠCH CHÂN (group-hover:underline group-hover:text-[#2C742F])
  name:
    "font-poppins text-sm md:text-base font-normal text-neutral-800 mb-1.5 transition-colors group-hover:text-primary-dark group-hover:underline hover:underline block cursor-pointer line-clamp-1 leading-6",

  priceRow:
    "flex items-center justify-between mb-1 mt-auto pt-1",

  price:
    "font-poppins text-base md:text-lg font-semibold text-neutral-900",

  priceOld:
    "font-poppins text-xs md:text-sm text-neutral-400 line-through ml-1.5 font-normal",

  // NÚT GIỎ HÀNG THỜI TRANG (Nền xanh khi hover card)
  cartBtn:
    "w-10 h-10 md:w-11 md:h-11 rounded-full bg-neutral-100 text-neutral-800 flex items-center justify-center transition-all md:group-hover:bg-primary md:group-hover:text-white cursor-pointer shrink-0 shadow-xs",

  rating:
    "flex items-center gap-0.5 mt-1",

  // GRID HOME (5 CỘT)
  gridHome:
    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 items-stretch w-full",

  // GRID SHOP (3 CỘT)
  gridShop:
    "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full"
};

// =====================================================
// TOAST NOTIFICATION GÓC PHẢI DƯỚI
// =====================================================
function showToast(message) {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = `
      fixed bottom-5 right-5 bg-neutral-900 text-white px-5 py-3 rounded-lg shadow-lg font-poppins text-sm font-semibold z-50 transition-all duration-300 opacity-0 translate-y-2 pointer-events-none
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.remove("opacity-0", "translate-y-2", "pointer-events-none");
  toast.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-2", "pointer-events-none");
  }, 2500);
}

// =====================================================
// XỬ LÝ ĐƯỜNG DẪN ẢNH VITE & FALLBACK
// =====================================================
function resolveImage(p = {}) {
  let imgPath = p.image || p.mainImage || (Array.isArray(p.thumbnails) && p.thumbnails[0]) || "";
  if (typeof getImageUrl === "function" && (imgPath.startsWith("/images/") || imgPath.startsWith("images/"))) {
    return getImageUrl(imgPath);
  }
  return imgPath || "/src/assets/images/cabbage1.svg";
}

// =====================================================
// HÀM TẢI DANH SÁCH SẢN PHẨM
// =====================================================
export async function getProducts() {
  if (typeof attachImageUrls === "function") {
    return attachImageUrls(productsData);
  }
  return productsData;
}

// =====================================================
// RENDER PRODUCT CARD (CHUẨN HOME & SHOP)
// =====================================================
export function renderProductCard(p = {}, page = "home") {
  const id = p.id || 1;
  const name = p.name || "Tên sản phẩm";
  const image = resolveImage(p);

  const price = p.price !== undefined ? p.price : (p.currentPrice !== undefined ? p.currentPrice : 0);
  const oldPrice = p.oldPrice !== undefined ? p.oldPrice : (p.originalPrice !== undefined ? p.originalPrice : null);
  const rating = p.rating || 4;
  const saleTag = p.saleTag || p.discountLabel || null;
  const bestTag = p.bestTag || null;

  const detailUrl = `./descriptions.html?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`;

  const productDataStr = encodeURIComponent(
    JSON.stringify({ ...p, id, name, price, oldPrice, image })
  );

  const cardClass = page === "shop" ? CLASS.cardShop : CLASS.cardHome;

  const starsHtml = Array.from({ length: 5 })
    .map((_, i) => `
      <span class="${i < rating ? "text-warning" : "text-neutral-200"}">
        ${iconStar(i < rating)}
      </span>
    `).join("");

  const tagsHtml = (saleTag || bestTag) ? `
    <div class="${CLASS.tags}">
      ${saleTag ? `<span class="${CLASS.tagSale}">${saleTag}</span>` : ""}
      ${bestTag ? `<span class="${CLASS.tagBest}">${bestTag}</span>` : ""}
    </div>
  ` : "";

  return `
    <article class="${cardClass}" data-id="${id}">
      <a href="${detailUrl}" data-action="view-detail" class="${CLASS.imageWrap}" aria-label="Xem chi tiết ${name}">
        ${tagsHtml}
        <img src="${image}" alt="${name}" class="${CLASS.image}" loading="lazy" />
      </a>

      <div class="${CLASS.actions}">
        <button type="button" data-action="wishlist" data-id="${id}" class="${CLASS.actionBtn}" aria-label="Wishlist">
          ${iconHeart}
        </button>
        <button type="button" data-action="quick-view" data-id="${id}" data-product="${productDataStr}" class="${CLASS.actionBtn}" aria-label="Quick view">
          ${iconEye}
        </button>
      </div>

      <div class="${CLASS.body}">
        <a href="${detailUrl}" data-action="view-detail" class="${CLASS.name}" title="${name}">${name}</a>

        <div>
          <div class="${CLASS.priceRow}">
            <div>
              <span class="${CLASS.price}">$${Number(price).toFixed(2)}</span>
              ${oldPrice !== null && oldPrice !== undefined && oldPrice !== "" ? `<span class="${CLASS.priceOld}">$${Number(oldPrice).toFixed(2)}</span>` : ""}
            </div>

            <button
              type="button"
              data-action="add-to-cart"
              data-id="${id}"
              data-product="${productDataStr}"
              class="${CLASS.cartBtn}"
              aria-label="Thêm ${name} vào giỏ hàng"
            >
              ${iconBag}
            </button>
          </div>

          <div class="${CLASS.rating}">${starsHtml}</div>
        </div>
      </div>
    </article>
  `;
}

// =====================================================
// RENDER PRODUCT GRID (TỰ ĐỘNG THEO TRANG HOME / SHOP)
// =====================================================
export function renderProductGrid(products = [], page = "home") {
  const itemsHtml = products.map((product) => renderProductCard(product, page)).join("");
  const gridClass = page === "shop" ? CLASS.gridShop : CLASS.gridHome;

  return `
    <div class="w-full">
      <div class="${gridClass}">${itemsHtml}</div>
    </div>
  `;
}

// =====================================================
// LẮNG NGHE SỰ KIỆN CLICK (THÊM GIỎ HÀNG, WISHLIST, DETAILS)
// =====================================================
export function bindCardEvents(container = document) {
  container.addEventListener("click", (e) => {
    // THÊM VÀO GIỎ HÀNG
    const cartBtn = e.target.closest('[data-action="add-to-cart"]');
    if (cartBtn) {
      e.preventDefault();
      e.stopPropagation();

      const rawData = cartBtn.getAttribute("data-product");
      if (!rawData) return;

      try {
        const product = JSON.parse(decodeURIComponent(rawData));
        if (typeof addProductToCart === "function") {
          addProductToCart(product, 1);
        }
        showToast(`${product.name} added to cart.`);
      } catch (err) {
        console.error("Lỗi thêm giỏ hàng:", err);
      }
      return;
    }

    // YÊU THÍCH (WISHLIST)
    const wishlistBtn = e.target.closest('[data-action="wishlist"]');
    if (wishlistBtn) {
      e.preventDefault();
      e.stopPropagation();

      const card = wishlistBtn.closest(".product-card");
      const name = card?.querySelector("a")?.textContent?.trim() || "Product";
      showToast(`${name} added to wishlist.`);
      return;
    }

    // XEM NHANH (QUICK VIEW)
    const quickViewBtn = e.target.closest('[data-action="quick-view"]');
    if (quickViewBtn) {
      // Nút QuickView được lắng nghe bởi quickview.js
      return;
    }
  });
}

// =====================================================
// RENDER RELATED PRODUCTS (SẢN PHẨM LIÊN QUAN TRANG DETAIL)
// =====================================================
export function renderRelatedProducts(currentProduct = {}, allProducts = productsData) {
  let displayProducts = [];

  if (currentProduct.relatedProducts && Array.isArray(currentProduct.relatedProducts) && currentProduct.relatedProducts.length > 0) {
    displayProducts = [...currentProduct.relatedProducts];
  } else if (currentProduct.relatedIds && Array.isArray(currentProduct.relatedIds)) {
    displayProducts = (allProducts || productsData).filter((product) => currentProduct.relatedIds.includes(product.id));
  }

  if (displayProducts.length < 4) {
    const existingIds = new Set(displayProducts.map((p) => String(p.id)));
    if (currentProduct.id) existingIds.add(String(currentProduct.id));

    const candidates = (allProducts || productsData).filter((p) => !existingIds.has(String(p.id)));
    displayProducts = [...displayProducts, ...candidates.slice(0, 4 - displayProducts.length)];
  }

  const finalProducts = displayProducts.slice(0, 4);
  const cardsHtml = finalProducts.map((product) => renderProductCard(product, "home")).join("");

  return `
    <section class="mt-8 mb-20 w-full">
      <div class="w-full text-center mb-6">
        <h2 class="text-[32px] font-semibold text-neutral-900 font-poppins leading-tight inline-block">
          Related Products
        </h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full justify-center items-stretch">
        ${cardsHtml}
      </div>
    </section>
  `;
}
