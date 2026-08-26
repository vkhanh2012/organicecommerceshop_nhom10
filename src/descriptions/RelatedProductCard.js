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
    "product-card w-full h-full flex flex-col justify-between group relative bg-white border border-neutral-200 rounded-xl p-3 transition-all duration-300 hover:border-primary hover:shadow-[0_4px_20px_rgba(0,178,7,0.15)]",

  imageWrap:
    "relative aspect-square w-full rounded-lg overflow-hidden bg-white flex items-center justify-center mb-3 block cursor-pointer p-2",

  image:
    "w-full h-full object-contain transition-transform duration-300 group-hover:scale-105",

  tags:
    "absolute top-2 left-2 z-10 flex gap-1 pointer-events-none",

  tagSale:
    "bg-error text-white text-[11px] font-semibold font-poppins px-2 py-0.5 rounded",

  tagBest:
    "bg-sky-500 text-white text-[11px] font-semibold font-poppins px-2 py-0.5 rounded",

  actions:
    "absolute top-2 right-2 z-20 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity",

  actionBtn:
    "w-8 h-8 md:w-9 md:h-9 rounded-full bg-white shadow flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors cursor-pointer",

  body:
    "px-1 flex flex-col flex-1 justify-between mt-auto",

  name:
    "font-poppins text-sm text-neutral-900 mb-1 transition-colors md:group-hover:text-primary block hover:underline cursor-pointer font-medium line-clamp-1",

  priceRow:
    "flex items-center justify-between mb-1 mt-auto pt-2",

  price:
    "font-poppins text-sm md:text-base font-semibold text-neutral-900",

  priceOld:
    "font-poppins text-xs md:text-sm text-neutral-400 line-through ml-1.5",

  cartBtn:
    "w-10 h-10 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center transition-colors hover:bg-primary hover:text-white cursor-pointer shrink-0",

  rating:
    "flex items-center gap-0.5 mt-1",

  grid:
    "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch",
};


// =====================================================
// HÀM TÌM PRODUCT DATA THEO TÊN
// =====================================================

function findProductDataByName(name) {
  if (!name) return null;

  const nameKey = name.toLowerCase().trim();

  // Tìm trong PRODUCTS
  const found = PRODUCTS.find(
    product =>
      product &&
      product.name &&
      product.name.toLowerCase().trim() === nameKey
  );

  if (found) return found;

  // Tìm thông qua PRODUCTS_MAP
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
// BẢNG Bố TRÍ ẢNH
// =====================================================

const PRODUCT_IMAGE_MAP = {};

// Tự động lấy ảnh từ productdata.json
PRODUCTS.forEach(product => {
  if (product && product.name && product.mainImage) {
    PRODUCT_IMAGE_MAP[product.name.toLowerCase().trim()] = product.mainImage;
  }
});


// =====================================================
// BỘ GIẢI MÃ ẢNH THÔNG MINH
// =====================================================

function resolveImage(p = {}) {
  // 1. Ưu tiên lấy ảnh trực tiếp từ đối tượng p
  let imgPath = p.image || p.mainImage || (Array.isArray(p.thumbnails) && p.thumbnails[0]);

  // 2. Nếu p không chứa đường dẫn ảnh, tìm trong productData theo tên
  if (!imgPath) {
    const dataProduct = findProductDataByName(p.name);
    if (dataProduct && dataProduct.mainImage) {
      imgPath = dataProduct.mainImage;
    }
  }

  // 3. Tìm trong PRODUCT_IMAGE_MAP
  if (!imgPath) {
    const nameKey = (p.name || "").toLowerCase().trim();
    if (PRODUCT_IMAGE_MAP[nameKey]) {
      imgPath = PRODUCT_IMAGE_MAP[nameKey];
    }
  }

  // 4. Nếu vẫn không có, dùng ảnh mặc định
  if (!imgPath || typeof imgPath !== "string" || imgPath.includes("undefined")) {
    imgPath = defaultProductData?.mainImage || "";
  }

  // 5. Chuyển đổi đường dẫn ảnh chuẩn bằng getImageUrl
  if (imgPath.startsWith("/images/") || imgPath.startsWith("images/")) {
    return getImageUrl(imgPath);
  }

  return imgPath;
}


// =====================================================
// PRODUCT CARD
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

  // LINK DETAIL
  const detailUrl = `./descriptions.html?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`;

  // DATA CHO QUICK VIEW / CART (Truyền đúng đường dẫn ảnh chuẩn)
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

  // RATING
  const starsHtml = Array.from({ length: 5 })
    .map(
      (_, i) => `
        <span class="${i < rating ? "text-warning" : "text-neutral-200"} text-xs">
          ${iconStar(i < rating)}
        </span>
      `
    )
    .join("");

  // TAG
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

        <!-- Wishlist -->
        <button
          type="button"
          data-action="wishlist"
          data-id="${id}"
          class="${CLASS.actionBtn}"
          aria-label="Thêm vào yêu thích"
        >
          ${iconHeart}
        </button>

        <!-- Quick View -->
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

        <!-- PRODUCT NAME -->
        <a
          href="${detailUrl}"
          data-action="view-detail"
          class="${CLASS.name}"
        >
          ${name}
        </a>

        <!-- PRICE + CART -->
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

          <!-- Add To Cart -->
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

        <!-- RATING -->
        <div class="${CLASS.rating}">
          ${starsHtml}
        </div>

      </div>

    </article>
  `;
}


// =====================================================
// TỰ ĐỘNG BẮT CLICK ĐIỀU HƯỚNG DETAIL
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

  // RELATED PRODUCTS CÓ SẴN
  if (
    currentProduct.relatedProducts &&
    Array.isArray(currentProduct.relatedProducts) &&
    currentProduct.relatedProducts.length > 0
  ) {
    displayProducts = [...currentProduct.relatedProducts];
  }
  // RELATED IDS
  else if (
    currentProduct.relatedIds &&
    Array.isArray(currentProduct.relatedIds)
  ) {
    displayProducts = (allProducts || productList).filter(p =>
      currentProduct.relatedIds.includes(p.id)
    );
  }

  // CHƯA ĐỦ 4 SẢN PHẨM
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
    <section class="w-full max-w-[1320px] mx-auto px-4 md:px-8 mt-16 mb-20">
      <h2 class="text-2xl sm:text-[32px] font-semibold text-center text-neutral-900 mb-8 font-poppins">
        Related Products
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch">
        ${cardsHtml}
      </div>
    </section>
  `;
}
