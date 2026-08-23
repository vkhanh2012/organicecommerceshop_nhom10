// src/components/productCard.js

import {
  iconHeart,
  iconEye,
  iconBag,
  iconStar
} from "../components/icons.js";

import productList from "../data/products.json";
import productData from "../data/productdata.json";
import { getImageUrl } from "../utils/assets.js";

// =====================================================
// LẤY DATA TỪ productdata.json
// =====================================================

const {
  defaultProductData,
  mangoProductData,
  tomatoProductData,
  redcapsicumProductData
} = productData;


// =====================================================
// TẠO PRODUCTS MAP TỪ JSON
// =====================================================

const PRODUCTS_MAP = productData.PRODUCTS_MAP || {};


// =====================================================
// DANH SÁCH PRODUCT DATA
// =====================================================

const PRODUCTS = [
  defaultProductData,
  mangoProductData,
  tomatoProductData,
  redcapsicumProductData
].filter(Boolean);


// =====================================================
// CLASS
// =====================================================

const CLASS = {
  card:
    "product-card w-full flex flex-col justify-between group relative bg-white border border-neutral-200 rounded-lg p-3 transition-all duration-300 hover:border-[#20B526] hover:shadow-[0px_0px_12px_0px_rgba(32,181,38,0.32)]",

  imageWrap:
    "relative aspect-square w-full rounded-lg overflow-hidden bg-white flex items-center justify-center mb-3 block cursor-pointer p-1",

  image:
    "w-full h-full object-contain transition-transform duration-300 group-hover:scale-105",

  tags:
    "absolute top-4 left-4 z-10 flex gap-1 pointer-events-none",

  tagSale:
    "bg-[#EA4335] text-white text-xs font-medium font-poppins px-2 py-1 rounded-sm flex items-center gap-1",

  tagBest:
    "bg-sky-500 text-white text-xs font-medium font-poppins px-2 py-1 rounded-sm",

  actions:
    "absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity",

  actionBtn:
    "w-10 h-10 rounded-full bg-white border border-neutral-100 shadow flex items-center justify-center text-neutral-700 hover:bg-[#20B526] hover:text-white hover:border-[#20B526] transition-colors cursor-pointer",

  body:
    "px-1 flex flex-col flex-1 justify-between mt-auto",

  name:
    "font-poppins text-sm text-neutral-600 mb-1 transition-colors md:group-hover:text-[#20B526] block cursor-pointer font-normal line-clamp-1",

  priceRow:
    "flex items-center justify-between mb-1 mt-auto pt-1",

  price:
    "font-poppins text-base font-medium text-zinc-900",

  priceOld:
    "font-poppins text-base text-neutral-400 line-through ml-1.5 font-normal",

  cartBtn:
    "w-10 h-10 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center transition-colors md:group-hover:bg-[#20B526] md:group-hover:text-white cursor-pointer shrink-0",

  rating:
    "flex items-center gap-0.5 mt-1",

  grid:
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch",
};


// =====================================================
// HÀM TÌM PRODUCT DATA THEO TÊN
// =====================================================

function findProductDataByName(name) {
  if (!name) return null;

  const nameKey = name.toLowerCase().trim();

  const found = PRODUCTS.find(
    product =>
      product &&
      product.name &&
      product.name.toLowerCase().trim() === nameKey
  );

  if (found) return found;

  const mapKey = Object.keys(PRODUCTS_MAP).find(
    key => key.toLowerCase().trim() === nameKey
  );

  if (mapKey) {
    const dataKey = PRODUCTS_MAP[mapKey];
    if (dataKey && productData[dataKey]) {
      return productData[dataKey];
    }
  }

  return null;
}


// =====================================================
// BẢNG BỐ TRÍ ẢNH
// =====================================================

const PRODUCT_IMAGE_MAP = {};

PRODUCTS.forEach(product => {
  if (product && product.name && product.mainImage) {
    PRODUCT_IMAGE_MAP[product.name.toLowerCase().trim()] = product.mainImage;
  }
});


// =====================================================
// BỘ GIẢI MÃ ẢNH THÔNG MINH
// =====================================================

function resolveImage(p = {}) {
  let imgPath = p.image || p.mainImage || (Array.isArray(p.thumbnails) && p.thumbnails[0]);

  if (!imgPath) {
    const dataProduct = findProductDataByName(p.name);
    if (dataProduct && dataProduct.mainImage) {
      imgPath = dataProduct.mainImage;
    }
  }

  if (!imgPath) {
    const nameKey = (p.name || "").toLowerCase().trim();
    if (PRODUCT_IMAGE_MAP[nameKey]) {
      imgPath = PRODUCT_IMAGE_MAP[nameKey];
    }
  }

  if (!imgPath || typeof imgPath !== "string" || imgPath.includes("undefined")) {
    imgPath = defaultProductData?.mainImage || "";
  }

  if (imgPath.startsWith("/images/") || imgPath.startsWith("images/")) {
    return getImageUrl(imgPath);
  }

  return imgPath;
}


// =====================================================
// PRODUCT CARD (EXPORT)
// =====================================================

export function renderProductCard(p = {}) {
  const id = p.id || 1;
  const name = p.name || "Tên sản phẩm";
  const image = resolveImage(p);

  const price =
    p.price !== undefined
      ? p.price
      : (p.currentPrice !== undefined ? p.currentPrice : 0);

  const oldPrice =
    p.oldPrice !== undefined
      ? p.oldPrice
      : (p.originalPrice !== undefined ? p.originalPrice : null);

  const rating = p.rating || 4;
  const saleTag = p.saleTag || p.discountLabel || null;
  const bestTag = p.bestTag || null;

  const detailUrl = `./descriptions.html?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`;

  const productDataStr = encodeURIComponent(
    JSON.stringify({
      ...p,
      id,
      name,
      price,
      oldPrice,
      image
    })
  );

  const starsHtml = Array.from({ length: 5 })
    .map(
      (_, i) => `
        <span class="${i < rating ? "text-warning" : "text-neutral-200"} text-xs">
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

      <!-- PRODUCT IMAGE -->
      <a
        href="${detailUrl}"
        data-action="view-detail"
        class="${CLASS.imageWrap}"
        aria-label="Xem chi tiết ${name}"
      >
        ${tagsHtml}
        <img
          src="${image}"
          alt="${name}"
          class="${CLASS.image}"
          loading="lazy"
          onerror="this.onerror=null; this.src='${defaultProductData?.mainImage || ""}';"
        />
      </a>

      <!-- ACTION BUTTONS -->
      <div class="${CLASS.actions}">
        <button
          type="button"
          data-action="wishlist"
          data-id="${id}"
          class="${CLASS.actionBtn}"
          aria-label="Thêm vào yêu thích"
        >
          ${iconHeart}
        </button>

        <button
          type="button"
          data-action="quick-view"
          data-id="${id}"
          data-product="${productDataStr}"
          class="${CLASS.actionBtn}"
          aria-label="Xem nhanh"
        >
          ${iconEye}
        </button>
      </div>

      <!-- PRODUCT BODY -->
      <div class="${CLASS.body}">
        <a
          href="${detailUrl}"
          data-action="view-detail"
          class="${CLASS.name}"
        >
          ${name}
        </a>

        <div class="${CLASS.priceRow}">
          <div>
            <span class="${CLASS.price}">
              $${Number(price).toFixed(2)}
            </span>
            ${
              oldPrice !== null && oldPrice !== undefined && oldPrice !== ""
                ? `
                  <span class="${CLASS.priceOld}">
                    $${Number(oldPrice).toFixed(2)}
                  </span>
                `
                : ""
            }
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

        <div class="${CLASS.rating}">
          ${starsHtml}
        </div>
      </div>

    </article>
  `;
}


// =====================================================
// CLICK EVENT
// =====================================================

document.addEventListener("click", (e) => {
  const detailLink = e.target.closest('[data-action="view-detail"]');

  if (!detailLink) return;

  const href = detailLink.getAttribute("href");

  if (
    href &&
    !e.target.closest('[data-action="wishlist"]') &&
    !e.target.closest('[data-action="quick-view"]') &&
    !e.target.closest('[data-action="add-to-cart"]')
  ) {
    e.preventDefault();
    window.location.href = href;
  }
});


// =====================================================
// RENDER PRODUCT GRID
// =====================================================

export function renderProductGrid(products = []) {
  const itemsHtml = products.map(renderProductCard).join("");

  return `
    <div class="w-full">
      <div class="${CLASS.grid}">
        ${itemsHtml}
      </div>
    </div>
  `;
}


// =====================================================
// RENDER RELATED PRODUCTS
// =====================================================

export function renderRelatedProducts(
  currentProduct = {},
  allProducts = productList
) {
  let displayProducts = [];

  if (
    currentProduct.relatedProducts &&
    Array.isArray(currentProduct.relatedProducts) &&
    currentProduct.relatedProducts.length > 0
  ) {
    displayProducts = [...currentProduct.relatedProducts];
  } else if (
    currentProduct.relatedIds &&
    Array.isArray(currentProduct.relatedIds)
  ) {
    displayProducts = (allProducts || productList).filter(p =>
      currentProduct.relatedIds.includes(p.id)
    );
  }

  if (displayProducts.length < 4) {
    let categoryName = "";

    if (currentProduct.category) {
      categoryName =
        typeof currentProduct.category === "object"
          ? currentProduct.category.name
          : currentProduct.category;
    }

    const existingNames = new Set(
      displayProducts.map(p => p.name?.toLowerCase())
    );

    if (currentProduct.name) {
      existingNames.add(currentProduct.name.toLowerCase());
    }

    const sourceProducts = allProducts || productList;

    const remainingCandidates = sourceProducts.filter(
      p =>
        p.id !== currentProduct.id &&
        !existingNames.has(p.name?.toLowerCase())
    );

    const sameCategoryCandidates = remainingCandidates.filter(p => {
      let category = p.category;
      if (typeof category === "object") category = category.name;
      return category === categoryName;
    });

    const otherCandidates = remainingCandidates.filter(p => {
      let category = p.category;
      if (typeof category === "object") category = category.name;
      return category !== categoryName;
    });

    const seed = Number(currentProduct.id) || 1;

    sameCategoryCandidates.sort(
      (a, b) => ((a.id * seed * 13) % 11) - ((b.id * seed * 13) % 11)
    );

    otherCandidates.sort(
      (a, b) => ((a.id * seed * 17) % 13) - ((b.id * seed * 17) % 13)
    );

    const pool = [...sameCategoryCandidates, ...otherCandidates];
    const needed = 4 - displayProducts.length;

    displayProducts = [...displayProducts, ...pool.slice(0, needed)];
  }

  const final4Products = displayProducts.slice(0, 4);
  const cardsHtml = final4Products.map(renderProductCard).join("");

  return `
    <section class="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-16">
      <!-- TIÊU ĐỀ: Căn giữa tuyệt đối theo trục khung chứa -->
      <div class="w-full text-center mb-6">
        <h2 class="text-[32px] font-semibold text-zinc-900 font-poppins leading-tight inline-block">
          Related Products
        </h2>
      </div>

      <!-- LƯỚI CARD: Căn đều 4 cột, ép rộng đầy đủ khung -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full justify-center items-stretch">
        ${cardsHtml}
      </div>
    </section>
  `;
}