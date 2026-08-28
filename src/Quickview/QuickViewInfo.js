// src/Quickview/QuickViewInfo.js

import { SOCIAL_ICONS, iconStar } from "../components/icons.js";

export function renderQuickViewInfo(product = {}) {
  const starsHtml = Array.from({ length: 5 }, (_, index) => {
    return iconStar(index < (product.rating || 4));
  }).join("");

  const tagsList = Array.isArray(product.tags) && product.tags.length > 0
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
      return `<a href="${tagLink}" class="text-neutral-500 hover:text-neutral-900 transition-colors leading-5">${tagName}</a>`;
    })
    .join(`<span class="text-neutral-500 font-normal mr-1">,</span>`);
    .join(`<span class="text-neutral-500 font-normal mr-1">,</span>`);

  const categoryName = typeof product.category === "object"
    ? product.category?.name || "Vegetables"
    : product.category || "Vegetables";

  const categoryLink = typeof product.category === "object"
    ? product.category?.link || "#"
    : "#";

  return /*html*/ `
    <!-- CỘT PHẢI FIGMA: THÔNG TIN SẢN PHẨM QUICK VIEW -->
    <div data-qv-info-container class="w-full flex flex-col justify-start gap-6 font-['Poppins'] select-none">

      <!-- KHỐI 1: TÊN, ĐÁNH GIÁ & GIÁ -->
      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-3">
          <!-- TÊN SẢN PHẨM + BADGE IN STOCK -->
          <div class="flex items-center gap-2 flex-wrap">
            <h2 class="text-3xl lg:text-4xl font-semibold text-neutral-900 leading-10">
            <h2 class="text-3xl lg:text-4xl font-semibold text-neutral-900 leading-10">
              ${product.name || "Chinese Cabbage"}
            </h2>
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
              <span class="text-neutral-500 ml-1 text-sm font-normal leading-5">
                ${product.reviewsCount || 4} Review
              </span>
            </div>

            <span class="text-neutral-400 font-medium leading-5">•</span>
            <span class="text-neutral-400 font-medium leading-5">•</span>

            <div class="flex items-center gap-1 text-sm">
              <span class="text-neutral-800 font-medium leading-5">SKU:</span>
              <span class="text-neutral-500 font-normal leading-5">${product.sku || "2,51,594"}</span>
            </div>
          </div>
        </div>

        <!-- GIÁ SẢN PHẨM & DISCOUNT BADGE FIGMA -->
        <div class="flex items-center gap-3">
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
              $${Number(product.currentPrice || product.price || 17.28).toFixed(2)}
            </span>
          </div>

          ${
            product.discountLabel
              ? `
                <span class="bg-error/10 text-error text-sm font-medium px-2.5 py-[3px] rounded-[30px] leading-5">
                  ${product.discountLabel}
                </span>
              `
              : ""
          }
        </div>

        <!-- LINE DIVIDER -->
        <div class="w-full h-0 border-b border-neutral-200"></div>
      </div>

      <!-- KHỐI 2: BRAND, SHARE & DESCRIPTION -->
      <div class="flex flex-col gap-4">
        <div class="w-full flex items-center justify-between text-sm flex-wrap gap-4 pb-3">
          <!-- BRAND FIGMA -->
          <div class="flex items-center gap-2">
            <span class="text-neutral-500 font-normal">Brand:</span>
            ${
              product.brandLogo
                ? `<img src="${product.brandLogo}" alt="${product.brand || 'Brand'}" class="h-14 w-auto object-contain" />`
                : `<span class="text-neutral-900 font-medium text-sm">${product.brand || 'Farm Fresh'}</span>`
                : `<span class="text-neutral-900 font-medium text-sm">${product.brand || 'Farm Fresh'}</span>`
            }
          </div>

          <!-- SHARE ITEM FIGMA -->
          <div class="flex items-center gap-2.5">
            <span class="text-neutral-900 font-normal leading-5">Share item:</span>
            <span class="text-neutral-900 font-normal leading-5">Share item:</span>
            <div class="flex items-center gap-[5px]">
               <a href="#" class="w-10 h-10 rounded-full text-neutral-600 hover:bg-primary hover:text-white flex items-center justify-center transition-colors" aria-label="Facebook">
                ${SOCIAL_ICONS.facebook}
              </a>
               <a href="#" class="w-10 h-10 rounded-full text-neutral-600 hover:bg-primary hover:text-white flex items-center justify-center transition-colors" aria-label="Twitter">
                ${SOCIAL_ICONS.twitter}
              </a>
              <a href="#" class="w-10 h-10 rounded-full text-neutral-600 hover:bg-primary hover:text-white flex items-center justify-center transition-colors" aria-label="Pinterest">
                ${SOCIAL_ICONS.pinterest}
              </a>
              <a href="#" class="w-10 h-10 rounded-full text-neutral-600 hover:bg-primary hover:text-white flex items-center justify-center transition-colors" aria-label="Instagram">
                ${SOCIAL_ICONS.instagram}
              </a>
            </div>
          </div>
        </div>

        <!-- MÔ TẢ FIGMA -->
        <p class="max-w-[568px] text-sm font-normal leading-relaxed text-neutral-500">
          ${product.description || "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar."}
        </p>
      </div>

      <!-- KHỐI 3: STEPPER, ADD TO CART, WISHLIST FIGMA -->
      <div class="relative -top-1 w-full border-b border-neutral-200 py-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <!-- BỘ TĂNG GIẢM SỐ LƯỢNG FIGMA -->
        <div class="flex h-[51px] w-[124px] items-center justify-between rounded-full border border-neutral-200 p-2 bg-white shrink-0">
          <button
            type="button"
            class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors shrink-0"
            class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors shrink-0"
            data-qv-action="decrement"
            aria-label="Decrease quantity"
          >
            <svg width="11" height="2" viewBox="0 0 11 2" fill="none">
              <path d="M0.75 0.75H10.0833" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <input
            data-qv-input="quantity"
            class="quantity-stepper-input w-10 text-center font-normal text-base text-neutral-900 bg-transparent outline-none border-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            class="quantity-stepper-input w-10 text-center font-normal text-base text-neutral-900 bg-transparent outline-none border-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            min="1"
            value="1"
          />

          <button
            type="button"
            class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors shrink-0"
            class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors shrink-0"
            data-qv-action="increment"
            aria-label="Increase quantity"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M0.75 5.41667H10.0833M5.41667 0.75V10.0833" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- NÚT ADD TO CART FIGMA -->
        <button
          type="button"
          data-qv-action="add-to-cart"
          data-product-id="${product.id || ''}"
          class="h-[51px] w-full min-w-0 flex-1 bg-primary hover:bg-primary-dark text-white font-semibold rounded-[43px] flex items-center justify-center gap-4 transition-colors cursor-pointer px-10"
        >
          <span class="text-base font-semibold leading-5">Add to Cart</span>
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

        <!-- NÚT WISHLIST FIGMA -->
        <button
          type="button"
          data-qv-action="wishlist"
          data-product-id="${product.id || ''}"
          class="w-[51px] h-[51px] rounded-full bg-primary/10 hover:bg-primary/20 text-primary-dark flex items-center justify-center transition-all cursor-pointer shrink-0"
          aria-label="Wishlist"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C742F" stroke-width="1.5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>

      <!-- KHỐI 4: CATEGORY & TAGS FIGMA -->
      <div class="flex flex-col gap-3 text-sm">
        <div class="flex items-center gap-1.5">
          <span class="text-neutral-900 font-medium leading-5">Category:</span>
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
          <span class="text-neutral-900 font-medium leading-5">Tag:</span>
          <div class="flex items-center gap-1 flex-wrap">
            ${tagsHtml}
          </div>
        </div>
      </div>

    </div>
  `;
}

export function bindQuickViewInfoEvents(modalContainer, onAddToCart = null) {
  if (!modalContainer) return;

  const container = modalContainer.querySelector("[data-qv-info-container]") || modalContainer;
  const qtyInput = container.querySelector('[data-qv-input="quantity"]');
  const decBtn = container.querySelector('[data-qv-action="decrement"]');
  const incBtn = container.querySelector('[data-qv-action="increment"]');
  const addToCartBtn = container.querySelector('[data-qv-action="add-to-cart"]');

  if (qtyInput) {
    if (decBtn) {
      decBtn.addEventListener("click", () => {
        const currentVal = parseInt(qtyInput.value, 10) || 1;
        if (currentVal > 1) qtyInput.value = currentVal - 1;
      });
    }

    if (incBtn) {
      incBtn.addEventListener("click", () => {
        const currentVal = parseInt(qtyInput.value, 10) || 1;
        qtyInput.value = currentVal + 1;
      });
    }

    qtyInput.addEventListener("change", () => {
      const val = parseInt(qtyInput.value, 10);
      if (isNaN(val) || val < 1) qtyInput.value = 1;
    });
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const productId = addToCartBtn.getAttribute("data-product-id");
      const quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;

      if (typeof onAddToCart === "function") {
        onAddToCart({ productId, quantity, button: addToCartBtn });
      }
    });
  }
}
