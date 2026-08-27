// src/descriptions/Image.js

import cabbage1Svg from "../assets/images/cabbage1.svg";
import cabbage2Svg from "../assets/images/cabbage2.svg";
import cabbage3Svg from "../assets/images/cabbage3.svg";
import cabbage4Svg from "../assets/images/cabbage4.svg";
import largecabageSvg from "../assets/images/largecabage.svg";
import { getImageUrl } from "../utils/assets.js";

const DEFAULT_THUMBS = [cabbage1Svg, cabbage2Svg, cabbage3Svg, cabbage4Svg];

function resolveSrc(src, fallback = largecabageSvg) {
  if (!src || typeof src !== "string" || src.includes("undefined")) {
    return fallback;
  }
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:") || src.startsWith("/src/") || src.startsWith("src/")) {
    return src;
  }
  if (typeof getImageUrl === "function") {
    const resolved = getImageUrl(src);
    if (resolved && resolved !== src) return resolved;
  }
  if (src.startsWith("/images/") || src.startsWith("images/")) {
    return fallback;
  }
  return src || fallback;
}

export function renderImage(product = {}) {
  const rawThumbnails = Array.isArray(product?.thumbnails) && product.thumbnails.length > 0
    ? product.thumbnails
    : DEFAULT_THUMBS;

  const validThumbnails = rawThumbnails.map((thumb, i) => resolveSrc(thumb, DEFAULT_THUMBS[i % DEFAULT_THUMBS.length]));

  const rawMainImage = product?.mainImage || product?.image;
  let mainImage = resolveSrc(rawMainImage, validThumbnails[0] || largecabageSvg);
  if (rawMainImage && rawMainImage.startsWith("/images/product/") && validThumbnails[0]) {
    mainImage = validThumbnails[0];
  }

  const productName = product?.name || "Product";

  const thumbnailsHtml = validThumbnails
    .map((thumbSrc, index) => {
      const isSelected = index === 0;

      return `
        <div
          data-action="select-thumb"
          data-src="${thumbSrc}"
          data-index="${index}"
          class="thumbnail-item w-[80px] h-[90px] shrink-0 cursor-pointer overflow-hidden bg-white rounded-[4px] flex items-center justify-center transition-all duration-200 ${
            isSelected ? "border-2 border-[#00B207]" : "border border-gray-200 hover:border-[#00B207]"
          }"
        >
          <img
            src="${thumbSrc}"
            alt="${productName} Thumbnail ${index + 1}"
            class="w-full h-full object-contain p-1 pointer-events-none select-none"
            onerror="this.onerror=null; this.src='${DEFAULT_THUMBS[index % DEFAULT_THUMBS.length]}';"
          />
        </div>
      `;
    })
    .join("");

  return /*html*/ `
    <div
      id="product-gallery"
      class="col-span-12 lg:col-span-6 w-full max-w-[648px] flex flex-col sm:flex-row items-center sm:items-start gap-4 select-none"
    >
      <!-- THUMBNAILS CONTAINER -->
      <div class="order-2 sm:order-1 w-full sm:w-[80px] shrink-0 flex sm:flex-col items-center justify-between gap-2 h-full max-h-[556px]">
        <!-- MŨI TÊN LÊN -->
        <button
          type="button"
          data-action="thumb-prev"
          class="w-6 h-6 shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
          aria-label="Previous image"
        >
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6L6 1L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- DANH SÁCH THUMBNAIL -->
        <div id="thumbnail-list" class="flex sm:flex-col items-center gap-3 overflow-hidden mt-1">
          ${thumbnailsHtml}
        </div>

        <!-- MŨI TÊN XUỐNG -->
        <button
          type="button"
          data-action="thumb-next"
          class="w-6 h-6 shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
          aria-label="Next image"
        >
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- MAIN IMAGE CONTAINER -->
      <div
        class="order-1 sm:order-2 shrink-0 w-full sm:w-[556px] h-[350px] sm:h-[556px] aspect-square bg-white flex items-center justify-center overflow-hidden rounded-lg border border-gray-200 p-2"
      >
        <img
          id="main-product-image"
          src="${mainImage}"
          alt="${productName} img main"
          class="w-full h-full object-contain transition-all duration-200 select-none"
          onerror="this.onerror=null; this.src='${largecabageSvg}';"
        />
      </div>
    </div>
  `;
}

// BIND IMAGE EVENTS
export function bindImageEvents(container = document) {
  const gallery = container.querySelector("#product-gallery") || container;
  if (!gallery) return;

  const mainImg = gallery.querySelector("#main-product-image");
  if (!mainImg) return;

  const thumbs = Array.from(gallery.querySelectorAll('[data-action="select-thumb"]'));
  if (!thumbs.length) return;

  const setActiveThumbnail = (activeThumb) => {
    thumbs.forEach((thumb) => {
      thumb.classList.remove("border-[#00B207]", "border-2");
      thumb.classList.add("border-gray-200", "border");
    });

    activeThumb.classList.remove("border-gray-200", "border");
    activeThumb.classList.add("border-[#00B207]", "border-2");
  };

  const changeMainImage = (thumb) => {
    if (!thumb) return;
    const newSrc = thumb.getAttribute("data-src");
    if (!newSrc) return;

    mainImg.src = newSrc;
    setActiveThumbnail(thumb);
  };

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", (e) => {
      changeMainImage(e.currentTarget);
    });
  });

  const prevBtn = gallery.querySelector('[data-action="thumb-prev"]');
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const activeIndex = thumbs.findIndex((thumb) => thumb.classList.contains("border-[#00B207]"));
      if (activeIndex <= 0) return;
      changeMainImage(thumbs[activeIndex - 1]);
    });
  }

  const nextBtn = gallery.querySelector('[data-action="thumb-next"]');
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const activeIndex = thumbs.findIndex((thumb) => thumb.classList.contains("border-[#00B207]"));
      if (activeIndex === -1 || activeIndex >= thumbs.length - 1) return;
      changeMainImage(thumbs[activeIndex + 1]);
    });
  }
}

// GLOBAL EVENT DELEGATION FOR THUMBNAIL CLICK
document.addEventListener("click", (e) => {
  const thumb = e.target.closest('[data-action="select-thumb"]');
  if (!thumb) return;

  const newSrc = thumb.getAttribute("data-src");
  const gallery = thumb.closest("#product-gallery") || document.getElementById("product-gallery");
  if (gallery && newSrc) {
    const mainImg = gallery.querySelector("#main-product-image");
    if (mainImg) {
      mainImg.src = newSrc;
    }
    const thumbs = gallery.querySelectorAll('[data-action="select-thumb"]');
    thumbs.forEach((t) => {
      t.classList.remove("border-[#00B207]", "border-2");
      t.classList.add("border-gray-200", "border");
    });
    thumb.classList.remove("border-gray-200", "border");
    thumb.classList.add("border-[#00B207]", "border-2");
  }
});