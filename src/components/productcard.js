// src/components/productCard.js

import {
  iconHeart,
  iconEye,
  iconBag,
  iconStar
} from "./icons.js";
import { addProductToCart } from "../shopping_cart/cartData.js";
import { getImageUrl, attachImageUrls } from "../utils/assets.js";
import productsData from "../data/products.json";

const CLASS = {
  card:
    "product-card w-full h-full group relative bg-white flex flex-col justify-between transition-all duration-300 hover:z-20 hover:shadow-[0_0_15px_rgba(0,0,0,0.12)] cursor-pointer lg:h-[327px]",

  imageWrap:
    "relative overflow-hidden bg-white flex items-center justify-center block cursor-pointer shrink-0 lg:h-[240px]",

  image:
    "w-full h-full object-cover",

  tags:
    "absolute top-4 left-4 z-10 flex gap-1 pointer-events-none",

  tagSale:
    "bg-error text-white text-sm font-medium font-poppins px-2 py-1 leading-[21px] rounded",

  tagBest:
    "bg-sky-500 text-white text-sm font-medium font-poppins px-2 py-1 leading-[21px] rounded",

  actions:
    "absolute top-4 right-4 z-20 flex flex-col gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity",

  actionBtn:
    "w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors cursor-pointer",

  body:
    "relative h-[87px] px-3 pt-[9px] pb-[7px] flex flex-col flex-none",

  name:
    "font-poppins text-sm font-normal leading-[27px] text-neutral-700 transition-colors md:group-hover:text-primary block hover:underline cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis",

  priceRow:
    "flex items-center mt-[1px] leading-none",

  price:
    "font-poppins text-base font-medium leading-[24px] text-neutral-900",

  priceOld:
    "font-poppins text-sm font-normal leading-[21px] text-neutral-400 line-through ml-1",

  cartBtn:
    "absolute right-4 top-[23px] w-10 h-10 rounded-full bg-neutral-50 text-neutral-700 flex items-center justify-center transition-colors md:group-hover:bg-primary md:group-hover:text-white cursor-pointer shrink-0",

  rating:
    "flex items-center gap-0 mt-[1px] h-[18px]",

  grid:
    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-neutral-200 border border-neutral-200 w-full items-stretch",
};
// =====================================================
// HIỂN THỊ THÔNG BÁO (TOAST) GÓC PHẢI DƯỚI
// =====================================================
function showToast(message) {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "fixed bottom-5 right-5 bg-[#1a1a1a] text-white px-5 py-3 rounded-lg shadow-lg font-poppins text-sm font-semibold z-50 transition-all duration-300 opacity-0 translate-y-2 pointer-events-none";
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
// XỬ LÝ ẢNH CHUẨN
// =====================================================
function resolveImage(p = {}) {
  let imgPath = p.image || p.mainImage || (Array.isArray(p.thumbnails) && p.thumbnails[0]) || "";
  if (typeof getImageUrl === "function" && (imgPath.startsWith("/images/") || imgPath.startsWith("images/"))) {
    return getImageUrl(imgPath);
  }
  return imgPath;
}

// =====================================================
// HÀM TẢI DANH SÁCH SẢN PHẨM (CHO HOMEPAGE)
// =====================================================
export async function getProducts() {
  if (typeof attachImageUrls === "function") {
    return attachImageUrls(productsData);
  }
  return productsData;
}

// =====================================================
// RENDER PRODUCT CARD
// =====================================================
export function renderProductCard(p = {}) {
  const {
    id = 1,
    name = "Tên sản phẩm",
    price = 0,
    oldPrice = null,
    rating = 4,
    saleTag = null,
    bestTag = null
  } = p;

  const image = resolveImage(p);
  const detailUrl = `./descriptions.html?id=${id}`;

  const productDataStr = encodeURIComponent(
    JSON.stringify({ ...p, id, name, price, oldPrice, image })
  );

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
    <article class="${CLASS.card}" data-id="${id}">
      <a href="${detailUrl}" class="${CLASS.imageWrap}" aria-label="Xem chi tiết ${name}">
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
        <a href="${detailUrl}" class="${CLASS.name}" title="${name}">${name}</a>

        <div>
          <div class="${CLASS.priceRow}">
            <div>
              <span class="${CLASS.price}">$${Number(price).toFixed(2)}</span>
              ${oldPrice ? `<span class="${CLASS.priceOld}">$${Number(oldPrice).toFixed(2)}</span>` : ""}
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
// RENDER PRODUCT GRID (5 CỘT CHO HOME, 3 CỘT CHO SHOP)
// =====================================================
export function renderProductGrid(products = [], page = "home") {
  const itemsHtml = products.map(renderProductCard).join("");
  const gridClass = page === "shop"
    ? "grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 items-stretch"
    : CLASS.grid;

  return `
    <div class="w-full">
      <div class="${gridClass}">${itemsHtml}</div>
    </div>
  `;
}

// =====================================================
// LẮNG NGHE SỰ KIỆN CLICK (THÊM GIỎ HÀNG & THÔNG BÁO)
// =====================================================
export function bindCardEvents(container = document) {
  container.addEventListener("click", (e) => {
    const btn = e.target.closest('[data-action="add-to-cart"]');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const rawData = btn.getAttribute("data-product");
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
  });
}