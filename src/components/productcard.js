// src/components/productCard.js
// Dựa theo component "Product 5n" (264×327px) trong Main Components.
// Mobile-first: mặc định luôn hiện nút wishlist/quick-view/add-to-cart
// (mobile không có hover), từ md: trở lên mới ẩn và chỉ hiện khi hover

import { iconHeart, iconEye, iconBag, iconStar } from "./icons.js"
import { renderPagination } from "./pagination.js"

const CLASS = {
  card: "product-card max-w-78 mx-auto group relative bg-white border border-neutral-200 rounded-lg p-1.25 transition-all duration-300 hover:border-primary hover:shadow-[0_0_12px_rgba(0,178,7,0.25)]",
  imageWrap:
    "relative aspect-square rounded-md overflow-hidden bg-white flex items-center justify-center mb-3",
  image: "w-full h-full object-cover",
  tags: "absolute top-2 left-2 z-10 flex gap-1",
  tagSale:
    "bg-error text-white text-[11px] font-semibold font-poppins px-2 py-1 rounded",
  tagBest:
    "bg-sky-500 text-white text-[11px] font-semibold font-poppins px-2 py-1 rounded",
  actions:
    "absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity",
  actionBtn:
    "w-8 h-8 md:w-9 md:h-9 rounded-full bg-white shadow flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors",
  body: "px-1",
  name: "font-poppins text-sm text-neutral-900 mb-1 transition-colors md:group-hover:text-primary",
  priceRow: "flex items-center justify-between mb-1",
  price: "font-poppins text-sm md:text-base font-medium text-neutral-900",
  priceOld:
    "font-poppins text-xs md:text-sm text-neutral-400 line-through ml-1",
  cartBtn:
    "w-11 h-11 rounded-full bg-neutral-50 text-neutral-700 flex items-center justify-center transition-colors md:group-hover:bg-primary md:group-hover:text-white",
  rating: "flex items-center gap-0.5",
  grid: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-6 w-full items-start",
}

/**
 * @param {Object} p
 * @param {string} p.name
 * @param {number} p.price
 * @param {number|null} p.oldPrice - giá gốc nếu đang giảm giá
 * @param {string} p.image - url ảnh sản phẩm
 * @param {number} p.rating - số sao 0-5
 * @param {string|null} p.saleTag - vd "Sale 50%"
 * @param {string|null} p.bestTag - vd "Best Sale"
 */
export function renderProductCard({
  name = "Tên sản phẩm",
  price = 0,
  oldPrice = null,
  image = "",
  rating = 4,
  saleTag = null,
  bestTag = null,
} = {}) {
  const starsHtml = Array.from({ length: 5 })
    .map(
      (_, i) =>
        `<span class="${i < rating ? "text-warning" : "text-neutral-200"}">${iconStar(i < rating)}</span>`,
    )
    .join("")

  const tagsHtml =
    saleTag || bestTag
      ? `<div class="${CLASS.tags}">
        ${saleTag ? `<span class="${CLASS.tagSale}">${saleTag}</span>` : ""}
        ${bestTag ? `<span class="${CLASS.tagBest}">${bestTag}</span>` : ""}
      </div>`
      : ""

  return `
  <div class="${CLASS.card} group">
    <div class="${CLASS.imageWrap}">
      ${tagsHtml}
      <img src="${image}" alt="${name}" class="${CLASS.image}" loading="lazy" />

      <div class="${CLASS.actions}">
        <button type="button" class="${CLASS.actionBtn}" aria-label="Thêm vào yêu thích">${iconHeart}</button>
        <button type="button" class="${CLASS.actionBtn}" aria-label="Xem nhanh">${iconEye}</button>
      </div>
    </div>

    <div class="${CLASS.body}">
      <div class="${CLASS.name}">${name}</div>
      <div class="${CLASS.priceRow}">
        <div>
          <span class="${CLASS.price}">$${price.toFixed(2)}</span>
          ${oldPrice ? `<span class="${CLASS.priceOld}">$${oldPrice.toFixed(2)}</span>` : ""}
        </div>
        <button type="button" class="${CLASS.cartBtn}" aria-label="Thêm vào giỏ hàng">${iconBag}</button>
      </div>
      <div class="${CLASS.rating}">${starsHtml}</div>
    </div>
  </div>
  `
}

/**
 * Render 1 lưới sản phẩm — mobile-first: 2 cột -> sm:3 -> lg:5
 */
export function renderProductGrid(products = []) {
  const itemsHtml = products.map(renderProductCard).join("")
  return `
    <div class="w-full">
      <div class="${CLASS.grid}">${itemsHtml}</div>
      <div id="pagination">
        ${renderPagination()}
      </div>
    </div>  
      `
}
