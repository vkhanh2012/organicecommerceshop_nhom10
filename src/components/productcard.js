// src/components/productCard.js
// Home: 5 sản phẩm / hàng
// Shop: 3 sản phẩm / hàng

import {
  iconHeart,
  iconEye,
  iconBag,
  iconStar,
} from "./icons.js";

import productsData
  from "../data/products.json";

import { attachImageUrls }
  from "../utils/assets.js";


const CLASS = {

  card:
    "product-card group relative bg-white border border-neutral-200 " +
    "rounded-none p-4 transition-all duration-300 " +
    "hover:border-primary " +
    "hover:shadow-[0_0_12px_rgba(0,178,7,0.25)]",

  imageWrap:
    "relative aspect-square rounded-md overflow-hidden bg-white " +
    "flex items-center justify-center mb-3",

  image:
    "w-full h-full object-cover",

  tags:
    "absolute top-2 left-2 z-10 flex gap-1",

  tagSale:
    "bg-error text-white text-[11px] font-semibold font-poppins " +
    "px-2 py-1 rounded",

  tagBest:
    "bg-sky-500 text-white text-[11px] font-semibold font-poppins " +
    "px-2 py-1 rounded",

  actions:
    "absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-100 " +
    "md:opacity-0 md:group-hover:opacity-100 transition-opacity",

  actionBtn:
    "w-8 h-8 md:w-9 md:h-9 rounded-full bg-white shadow flex " +
    "items-center justify-center text-neutral-700 " +
    "hover:bg-primary hover:text-white transition-colors",

  body:
    "px-1",

  name:
    "font-poppins text-sm text-neutral-900 mb-1 truncate " +
    "transition-colors md:group-hover:text-primary",

  priceRow:
    "flex items-center justify-between mb-1",

  price:
    "font-poppins text-sm md:text-base font-medium text-neutral-900",

  priceOld:
    "font-poppins text-xs md:text-sm text-neutral-400 " +
    "line-through ml-1",

  cartBtn:
    "w-11 h-11 rounded-full bg-neutral-50 text-neutral-700 flex " +
    "items-center justify-center cursor-pointer transition-colors " +
    "hover:bg-primary hover:text-white",

  rating:
    "flex items-center gap-0.5",

  // HOME: 5 sản phẩm / hàng trên desktop
  grid:
    "grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 " +
    "lg:grid-cols-5 lg:gap-0",
};


/**
 * Render Product Card
 */
export function renderProductCard(
  {
    id,
    name = "Tên sản phẩm",
    price = 0,
    oldPrice = null,
    image = "",
    rating = 4,
    saleTag = null,
    bestTag = null,
  } = {}
) {

  // ==========================================
  // RATING
  // ==========================================

  const starsHtml = Array.from(
    { length: 5 }
  )
    .map(
      (_, i) => `
        <span
          class="${i < rating
            ? "text-warning"
            : "text-neutral-200"}"
        >
          ${iconStar(i < rating)}
        </span>
      `
    )
    .join("");


  // ==========================================
  // TAG
  // ==========================================

  const tagsHtml =
    saleTag || bestTag
      ? `
          <div class="${CLASS.tags}">

            ${
              saleTag
                ? `
                  <span class="${CLASS.tagSale}">
                    ${saleTag}
                  </span>
                `
                : ""
            }

            ${
              bestTag
                ? `
                  <span class="${CLASS.tagBest}">
                    ${bestTag}
                  </span>
                `
                : ""
            }

          </div>
        `
      : "";


  // ==========================================
  // DỮ LIỆU CHO QUICK VIEW
  // ==========================================

  const quickViewData = encodeURIComponent(
    JSON.stringify({
      id,
      name,
      price,
      oldPrice,
      image,
      rating
    })
  );


  // ==========================================
  // LINK DESCRIPTION
  // ==========================================

  const descriptionUrl =
    `./descriptions.html?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`;


  // ==========================================
  // PRODUCT CARD
  // ==========================================

  return `
    <article
      class="${CLASS.card}"
      data-product-id="${id}"
    >

      <!-- PRODUCT IMAGE -->

      <div class="${CLASS.imageWrap}">

        ${tagsHtml}

        <a
          href="${descriptionUrl}"
          class="block w-full h-full"
        >
          <img
            src="${image}"
            alt="${name}"
            width="254"
            height="230"
            loading="lazy"
            decoding="async"
            class="${CLASS.image}"
          >
        </a>


        <!-- ACTION BUTTONS -->

        <div class="${CLASS.actions}">

          <button
            type="button"
            class="${CLASS.actionBtn}"
            aria-label="Wishlist"
          >
            ${iconHeart}
          </button>


        <button 
  type="button" 
  data-action="quick-view"
  data-id="${id}"
  data-product-name="${name}"
  data-product-price="${price}"
  data-product-image="${image}"
  class="${CLASS.actionBtn}" 
  aria-label="Xem nhanh"
>
  ${iconEye}
</button>

        </div>

      </div>


      <!-- PRODUCT BODY -->

      <div class="${CLASS.body}">

        <!-- PRODUCT NAME -->

        <a
          href="${descriptionUrl}"
          class="${CLASS.name} block"
        >
          ${name}
        </a>


        <!-- PRICE -->

        <div class="${CLASS.priceRow}">

          <div>

            <span class="${CLASS.price}">
              $${Number(price).toFixed(2)}
            </span>

            ${
              oldPrice !== null &&
              oldPrice !== undefined &&
              oldPrice !== ""
                ? `
                  <span class="${CLASS.priceOld}">
                    $${Number(oldPrice).toFixed(2)}
                  </span>
                `
                : ""
            }

          </div>


          <!-- ADD TO CART -->

          <button
            type="button"
            class="${CLASS.cartBtn}"
            aria-label="Thêm vào giỏ hàng"
            data-add-cart
            data-cart-id="${id}"
            data-cart-name="${name}"
            data-cart-image="${image}"
            data-cart-price="${price}"
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


/**
 * Render lưới sản phẩm
 *
 * HOME:
 * - Mobile: 2
 * - Tablet: 3
 * - Desktop: 5
 *
 * SHOP:
 * - Mobile: 2
 * - Tablet: 2
 * - Desktop: 3
 */
export function renderProductGrid(
  products = [],
  page = "home"
) {

  const itemsHtml = products
    .map(renderProductCard)
    .join("");


  // ==========================================
  // SHOP = 3 SẢN PHẨM / HÀNG
  // HOME = 5 SẢN PHẨM / HÀNG
  // ==========================================

  const gridClass =
    page === "shop"
      ? "grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      : CLASS.grid;


  return `
    <div class="${gridClass}">
      ${itemsHtml}
    </div>
  `;
}


/**
 * Get Products
 */
export async function getProducts() {

  return attachImageUrls(productsData);

}