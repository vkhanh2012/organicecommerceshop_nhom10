// src/descriptions/ProductInfo.js

import { SOCIAL_ICONS, iconStar } from "../components/icons.js";
import { isInWishlist } from "../wishlist/wishlistData.js";
import { getImageUrl } from "../utils/assets.js";

export function renderProductInfo(product = {}) {
  const productData = encodeURIComponent(JSON.stringify(product));
  const productInWishlist = isInWishlist(product.id);
  const starsHtml = Array.from({ length: 5 }, (_, index) => {
    return iconStar(index < (product.rating || 5));
  }).join("");

  const tagsList = Array.isArray(product.tags)
    ? product.tags
    : [
        { name: "Vegetables", link: "#" },
        { name: "Healthy", link: "#" },
        { name: "Chinese", link: "#" },
        { name: "Cabbage", link: "#" },
        { name: "Green Cabbage", link: "#" },
      ];

  const tagsHtml = tagsList
    .map((tag) => {
      const tagName = typeof tag === "string" ? tag : tag.name;
      const tagLink = typeof tag === "string" ? "#" : tag.link || "#";
      return `<a href="${tagLink}" class="text-neutral-500 hover:text-neutral-900 transition-colors leading-5">${tagName}</a>`;
    })
    .join(`<span class="text-neutral-500 font-normal mr-1">,</span>`);

  const categoryName = typeof product.category === "object"
    ? product.category?.name || "Vegetables"
    : product.category || "Vegetables";
  const categoryLink = typeof product.category === "object"
    ? product.category?.link || "#"
    : "#";

  return /*html*/ `
    <!-- CỘT PHẢI: Đã thêm pl-[5px] để toàn bộ khối thông tin dịch sang phải 5px -->
    <div class="flex w-full min-w-0 flex-col justify-start gap-5 font-['Poppins'] select-none sm:gap-6">

      <!-- KHỐI 1: TÊN, ĐÁNH GIÁ & GIÁ -->
      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-3">
          <!-- TÊN SẢN PHẨM + BADGE IN STOCK -->
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="min-w-0 break-words text-2xl font-semibold leading-8 text-neutral-900 sm:text-3xl sm:leading-10 lg:text-4xl">
              ${product.name || "Chinese Cabbage"}
            </h1>
            ${
              product.inStock !== false
                ? `
                  <span class="bg-primary/20 text-primary-dark text-sm font-normal px-2 py-1 rounded-sm leading-5">
                    In Stock
                  </span>
                `
                : ""
            }
          </div>

          <!-- RATING + REVIEWS + SKU -->
          <div class="flex items-center gap-3 text-sm flex-wrap">
            <div class="flex items-center gap-1">
              <div class="flex items-center gap-0.5 text-warning [&>svg]:h-4 [&>svg]:w-4">
                ${starsHtml}
              </div>
              <span class="text-neutral-500 ml-1 text-sm font-normal leading-6">
                ${product.reviewsCount || 4} Review
              </span>
            </div>

            <span class="text-neutral-400 font-medium leading-5">•</span>

            <div class="flex items-center gap-1 text-sm">
              <span class="text-neutral-800 font-medium leading-5">SKU:</span>
              <span class="text-neutral-500 font-normal leading-5">${product.sku || "2,51,594"}</span>
            </div>
          </div>
        </div>

        <!-- GIÁ SẢN PHẨM & DISCOUNT BADGE -->
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex items-center gap-1">
            ${
              product.originalPrice || product.oldPrice
                ? `
                  <span class="mr-1 text-lg font-normal leading-7 text-neutral-400 line-through">
                    $${Number(product.originalPrice || product.oldPrice).toFixed(2)}
                  </span>
                `
                : ""
            }
            <span class="text-xl font-medium leading-8 text-primary-dark lg:text-2xl">
              $${Number(product.currentPrice ?? product.price ?? 17.28).toFixed(2)}
            </span>
          </div>

          ${product.discountLabel ? `<span class="bg-error/10 text-error text-sm font-medium px-2.5 py-[3px] rounded-[30px] leading-5">${product.discountLabel}</span>` : ""}
        </div>

        <!-- LINE DIVIDER -->
        <div class="w-full h-0 border-b border-neutral-200"></div>
      </div>

      <!-- KHỐI 2: BRAND, SHARE & DESCRIPTION -->
      <div class="flex flex-col gap-4 -mt-1">
        <div class="flex w-full flex-col items-start gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <!-- BRAND -->
          <div class="flex items-center gap-2">
            <span class="text-neutral-500">Brand:</span>
            ${product.brandLogo
              ? `<img src="${getImageUrl(product.brandLogo)}" alt="${product.brand || 'Brand'}" class="h-14 w-auto object-contain" />`
              : `<span class="font-medium text-neutral-900">${product.brand || "Farm Fresh"}</span>`}
          </div>
          <!-- SHARE -->
          <div class="flex w-full min-w-0 flex-wrap items-center gap-2.5 sm:w-auto sm:flex-nowrap">
            <span class="text-neutral-900 font-normal leading-5">Share item:</span>
            <div class="flex min-w-0 items-center gap-1 sm:gap-[5px]">
               <a href="#" class="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-primary hover:text-white sm:h-10 sm:w-10" aria-label="Facebook">
                ${SOCIAL_ICONS.facebook}
              </a>
              <a href="#" class="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-primary hover:text-white sm:h-10 sm:w-10" aria-label="Twitter">
                ${SOCIAL_ICONS.twitter}
              </a>
              <a href="#" class="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-primary hover:text-white sm:h-10 sm:w-10" aria-label="Pinterest">
                ${SOCIAL_ICONS.pinterest}
              </a>
              <a href="#" class="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-primary hover:text-white sm:h-10 sm:w-10" aria-label="Instagram">
                ${SOCIAL_ICONS.instagram}
              </a>
            </div>
          </div>
        </div>

        <!-- MÔ TẢ -->
        <p class="text-sm text-neutral-500 leading-5 font-normal max-w-[568px] -mt-0">
          ${product.description || "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar."}
        </p>
      </div>

      <!-- KHỐI 3: STEPPER, ADD TO CART, WISHLIST -->
      <div class="relative top-1 grid w-full grid-cols-[88px_minmax(0,1fr)_44px] items-center gap-2 border-y border-neutral-200 py-4 sm:grid-cols-[124px_minmax(0,1fr)_51px] sm:gap-3">
        <!-- BỘ TĂNG GIẢM SỐ LƯỢNG -->
        <div class="flex h-11 w-[88px] min-w-0 items-center justify-between rounded-pill border border-neutral-200 bg-white p-1 sm:h-[51px] sm:w-[124px] sm:p-2">
          <button
            type="button"
            class="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200 sm:h-8 sm:w-8"
            data-action="decrement"
          >
            <svg width="11" height="2" viewBox="0 0 11 2" fill="none">
              <path d="M0.75 0.75H10.0833" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <input
            class="quantity-stepper-input min-w-0 w-6 bg-transparent p-0 text-center text-sm font-normal text-neutral-900 outline-none [appearance:textfield] sm:w-10 sm:text-base [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="number"
            min="1"
            value="1"
          />

          <button
            type="button"
            class="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200 sm:h-8 sm:w-8"
            data-action="increment"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M0.75 5.41667H10.0833M5.41667 0.75V10.0833" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- NÚT ADD TO CART -->
        <button
          data-action="add-to-cart"
          class="flex h-11 min-h-11 w-full min-w-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[43px] bg-primary px-2 font-semibold text-white transition-colors hover:bg-primary-dark sm:h-[51px] sm:min-h-[51px] sm:gap-4 sm:px-6"
        >
          <span class="text-sm font-semibold leading-5 sm:text-base">
            Add to Cart
          </span>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path
              d="M4.81706 6.48336H2.31706L0.650391 15.65H15.6504L13.9837 6.48336H11.4837M4.81706 6.48336V3.98336C4.81706 2.14241 6.30944 0.650024 8.15039 0.650024C9.99134 0.650024 11.4837 2.14241 11.4837 3.98336V6.48336M4.81706 6.48336H11.4837M4.81706 6.48336V8.98336M11.4837 6.48336V8.98336"
              stroke="white"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <!-- NÚT WISHLIST -->
        <button
          type="button"
          data-action="wishlist"
          data-id="${product.id || ""}"
          data-product="${productData}"
          class="flex h-11 min-h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary/10 text-primary-dark transition-all hover:bg-primary/20 sm:h-[51px] sm:min-h-[51px] sm:w-[51px]"
          aria-pressed="${productInWishlist}"
          aria-label="${productInWishlist ? "Remove" : "Add"} ${product.name || "product"} ${productInWishlist ? "from" : "to"} wishlist"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="${productInWishlist ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>

      <!-- KHỐI 4: CATEGORY & TAGS -->
      <div class="relative flex min-w-0 flex-col gap-3 text-sm sm:top-2">
        <div class="flex items-center gap-1.5">
          <span class="text-neutral-900 font-medium leading-5">Category:</span>
          <a
            href="${categoryLink}"
            class="text-neutral-500 font-normal hover:text-primary transition-colors leading-5"
          >
            ${categoryName}
          </a>
        </div>

        <div class="flex items-start gap-1.5 flex-wrap">
          <span class="text-neutral-900 font-medium leading-5">Tag:</span>
          <div class="flex items-center gap-1 flex-wrap">
            ${tagsHtml}
          </div>
        </div>
      </div>

    </div>
  `;
}
