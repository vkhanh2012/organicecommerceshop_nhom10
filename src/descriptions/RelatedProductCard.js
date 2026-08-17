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
    "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 lg:gap-6 w-full items-start",
};

// =====================================================
// PRODUCT CARD (TỰ ĐỘNG CHUẨN HÓA CẢ JSON VÀ PRODUCTDATA.JS)
// =====================================================
export function renderProductCard(p = {}) {
  const id = p.id || 1;
  const name = p.name || "Tên sản phẩm";

  // 📌 1. Tự động nhận diện cả p.price (từ products.json) và p.currentPrice (từ productdata.js)
  const price = p.price !== undefined ? p.price : (p.currentPrice !== undefined ? p.currentPrice : 0);

  // 📌 2. Tự động nhận diện cả p.oldPrice (từ products.json) và p.originalPrice (từ productdata.js)
  const oldPrice = p.oldPrice !== undefined ? p.oldPrice : (p.originalPrice !== undefined ? p.originalPrice : null);

  // 📌 3. Tự động nhận diện cả p.image (từ products.json) và p.mainImage (từ productdata.js)
  const image = p.image || p.mainImage || (p.thumbnails && p.thumbnails[0]) || "";

  const rating = p.rating || 4;
  const saleTag = p.saleTag || p.discountLabel || null;
  const bestTag = p.bestTag || null;

  const detailUrl = `/product_detail.html?id=${id}&name=${encodeURIComponent(name)}`;
  const productDataStr = encodeURIComponent(JSON.stringify({
    ...p,
    id,
    name,
    price,
    oldPrice,
    image
  }));

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
// 📌 RENDER RELATED PRODUCTS (LUÔN ĐẢM BẢO ĐỦ 4 CỘT - GIÁ & ẢNH ĐỘNG 100%)
// =====================================================
export function renderRelatedProducts(currentProduct = {}, allProducts = productList) {
  let displayProducts = [];

  // 1. NẾU SẢN PHẨM CÓ DANH SÁCH CHỈ ĐỊNH RIÊNG TRONG productdata.js
  if (currentProduct.relatedProducts && Array.isArray(currentProduct.relatedProducts) && currentProduct.relatedProducts.length > 0) {
    displayProducts = [...currentProduct.relatedProducts];
  }
  else if (currentProduct.relatedIds && Array.isArray(currentProduct.relatedIds)) {
    displayProducts = (allProducts || productList).filter(p => currentProduct.relatedIds.includes(p.id));
  }

  // 2. NẾU CHƯA ĐỦ 4 MÓN -> BỔ SUNG THÊM CÁC MÓN KHÁC CHO ĐỦ HẲN 4 CỘT
  if (displayProducts.length < 4) {
    let categoryName = "";
    if (currentProduct.category) {
      categoryName = typeof currentProduct.category === "object" ? currentProduct.category.name : currentProduct.category;
    }

    const existingNames = new Set(displayProducts.map(p => p.name?.toLowerCase()));
    existingNames.add(currentProduct.name?.toLowerCase());

    const remainingCandidates = (allProducts || productList).filter(
      p => p.id !== currentProduct.id && !existingNames.has(p.name?.toLowerCase())
    );

    const sameCategoryCandidates = remainingCandidates.filter(p => p.category === categoryName);
    const otherCandidates = remainingCandidates.filter(p => p.category !== categoryName);

    const seed = Number(currentProduct.id) || 1;
    sameCategoryCandidates.sort((a, b) => ((a.id * seed * 13) % 11) - ((b.id * seed * 13) % 11));
    otherCandidates.sort((a, b) => ((a.id * seed * 17) % 13) - ((b.id * seed * 17) % 13));

    const pool = [...sameCategoryCandidates, ...otherCandidates];
    const needed = 4 - displayProducts.length;
    displayProducts = [...displayProducts, ...pool.slice(0, needed)];
  }

  // Cắt lấy chuẩn 4 sản phẩm
  const final4Products = displayProducts.slice(0, 4);
  const cardsHtml = final4Products.map(renderProductCard).join("");

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