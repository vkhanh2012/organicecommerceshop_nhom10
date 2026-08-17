// src/components/productCard.js

import {
  iconHeart,
  iconEye,
  iconBag,
  iconStar
} from "../components/icons.js";

import productList from "../data/products.json";

export function getProducts() {
  return productList;
}

const CLASS = {
  card:
    "product-card max-w-78 mx-auto group relative bg-white border border-neutral-200 rounded-lg p-1.25 transition-all duration-300 hover:border-primary hover:shadow-[0_0_12px_rgba(0,178,7,0.25)]",
  imageWrap:
    "relative aspect-square rounded-md overflow-hidden bg-white flex items-center justify-center mb-3 block cursor-pointer",
  image:
    "w-full h-full object-cover",
  tags:
    "absolute top-2 left-2 z-10 flex gap-1 pointer-events-none",
  tagSale:
    "bg-error text-white text-[11px] font-semibold font-poppins px-2 py-1 rounded",
  tagBest:
    "bg-sky-500 text-white text-[11px] font-semibold font-poppins px-2 py-1 rounded",
  actions:
    "absolute top-2 right-2 z-20 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity",
  actionBtn:
    "w-8 h-8 md:w-9 md:h-9 rounded-full bg-white shadow flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors cursor-pointer",
  body:
    "px-1",
  name:
    "font-poppins text-sm text-neutral-900 mb-1 transition-colors md:group-hover:text-primary block hover:underline cursor-pointer",
  priceRow:
    "flex items-center justify-between mb-1",
  price:
    "font-poppins text-sm md:text-base font-medium text-neutral-900",
  priceOld:
    "font-poppins text-xs md:text-sm text-neutral-400 line-through ml-1",
  cartBtn:
    "w-11 h-11 rounded-full bg-neutral-50 text-neutral-700 flex items-center justify-center transition-colors md:group-hover:bg-primary md:group-hover:text-white cursor-pointer",
  rating:
    "flex items-center gap-0.5",
  grid:
    "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-6 w-full items-start",
};

// =====================================================
// PRODUCT CARD
// =====================================================
export function renderProductCard(p = {}) {
  const {
    id = 1,
    name = "Tên sản phẩm",
    price = 0,
    oldPrice = null,
    image = "",
    rating = 4,
    saleTag = null,
    bestTag = null
  } = p;

  const detailUrl = `/product_detail.html?id=${id}&name=${encodeURIComponent(name)}`;
  const productDataStr = encodeURIComponent(JSON.stringify(p));

  const starsHtml = Array.from({ length: 5 })
    .map(
      (_, i) => `
        <span class="${i < rating ? "text-warning" : "text-neutral-200"}">
          ${iconStar(i < rating)}
        </span>
      `
    )
    .join("");

  const tagsHtml =
    saleTag || bestTag
      ? `
        <div class="${CLASS.tags}">
          ${saleTag ? `<span class="${CLASS.tagSale}">${saleTag}</span>` : ""}
          ${bestTag ? `<span class="${CLASS.tagBest}">${bestTag}</span>` : ""}
        </div>
      `
      : "";

  return `
    <article class="${CLASS.card}" data-id="${id}">
      <a href="${detailUrl}" class="${CLASS.imageWrap}" aria-label="Xem chi tiết ${name}">
        ${tagsHtml}
        <img src="${image}" alt="${name}" class="${CLASS.image}" loading="lazy" />
      </a>

      <div class="${CLASS.actions}">
        <button type="button" data-action="wishlist" data-id="${id}" class="${CLASS.actionBtn}" aria-label="Thêm vào yêu thích">
          ${iconHeart}
        </button>

        <button type="button" data-action="quick-view" data-id="${id}" data-product="${productDataStr}" class="${CLASS.actionBtn}" aria-label="Xem nhanh">
          ${iconEye}
        </button>
      </div>

      <div class="${CLASS.body}">
        <a href="${detailUrl}" class="${CLASS.name}">
          ${name}
        </a>

        <div class="${CLASS.priceRow}">
          <div>
            <span class="${CLASS.price}">$${Number(price).toFixed(2)}</span>
            ${oldPrice !== null && oldPrice !== undefined && oldPrice !== "" ? `<span class="${CLASS.priceOld}">$${Number(oldPrice).toFixed(2)}</span>` : ""}
          </div>

          <button type="button" data-action="add-to-cart" data-id="${id}" data-product="${productDataStr}" class="${CLASS.cartBtn}" aria-label="Thêm ${name} vào giỏ hàng">
            ${iconBag}
          </button>
        </div>

        <div class="${CLASS.rating}">
          ${starsHtml}
        </div>
      </div>
    </article>
  `;
}

// =====================================================
// RENDER PRODUCT GRID
// =====================================================
export function renderProductGrid(products = []) {
  const itemsHtml = products.map(renderProductCard).join("");
  return `
    <div class="w-full">
      <div class="${CLASS.grid}">${itemsHtml}</div>
    </div>
  `;
}

// =====================================================
// 📌 RENDER RELATED PRODUCTS (4 CỘT SẢN PHẨM LIÊN QUAN)
// =====================================================
export function renderRelatedProducts(currentProduct = {}, allProducts = productList) {
  // Lọc sản phẩm liên quan (bỏ sản phẩm đang xem)
  let related = (allProducts || productList).filter(p => p.id !== currentProduct.id);

  // Nếu sản phẩm hiện tại có danh mục, ưu tiên hiển thị các món cùng danh mục
  if (currentProduct.category) {
    const categoryName = typeof currentProduct.category === "object"
      ? currentProduct.category.name
      : currentProduct.category;

    const sameCategory = related.filter(p => p.category === categoryName);
    if (sameCategory.length >= 4) {
      related = sameCategory;
    }
  }

  // Lấy 4 sản phẩm đầu tiên
  const displayProducts = related.slice(0, 4);

  const cardsHtml = displayProducts.map(renderProductCard).join("");

  return /*html*/ `
    <section class="w-full max-w-[1320px] mx-auto px-4 md:px-8 mt-16 mb-20">
      <h2 class="text-2xl sm:text-[32px] font-semibold text-center text-gray-900 mb-8 font-poppins">
        Related Products
      </h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-start">
        ${cardsHtml}
      </div>
    </section>
  `;
}