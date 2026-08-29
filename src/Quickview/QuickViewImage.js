// src/Quickview/QuickViewImage.js

import largeCabbageImage from "../assets/images/largecabage.svg";
import { getImageUrl } from "../utils/assets.js";

function resolveQuickViewImage(path, fallback = largeCabbageImage) {
  if (!path || typeof path !== "string") return fallback;

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  const normalizedPath = path.startsWith("/src/assets/")
    ? path.replace("/src/assets", "")
    : path;

  return getImageUrl(normalizedPath) || fallback;
}

export function renderQuickViewImage(product) {
  const rawThumbnails = Array.isArray(product?.thumbnails) && product.thumbnails.length > 0
    ? product.thumbnails
    : [product?.mainImage || product?.image || ""];

  const rawFullImages = Array.isArray(product?.images) && product.images.length > 0
    ? product.images
    : rawThumbnails;

  const thumbnails = rawThumbnails.map((image) => resolveQuickViewImage(image));
  const fullImages = rawFullImages.map((image) => resolveQuickViewImage(image));

  const mainImage = resolveQuickViewImage(
    product?.mainImage || rawThumbnails[0] || product?.image || fullImages[0] || thumbnails[0],
    thumbnails[0] || largeCabbageImage
  );
  const productName = product?.name || "Product";

  const thumbnailsHtml = thumbnails
    .map((thumb, index) => {
      const fullSrc = fullImages[index] || thumb;
      // Several products intentionally reuse one image for every thumbnail.
      // Selection is positional, so identical URLs must not activate every item.
      const isSelected = index === 0;

      return `
        <div
          data-qv-action="select-thumb"
          data-src="${fullSrc}"
          data-index="${index}"
          class="qv-thumbnail-item flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[4px] bg-white transition-all duration-200 sm:h-[90px] sm:w-[80px] ${
            isSelected
              ? "border-2 border-primary"
              : "border-2 border-transparent hover:border-neutral-200"
          }"
        >
          <img
            src="${thumb}"
            alt="${productName} Thumbnail ${index + 1}"
            class="w-full h-full object-contain p-1 pointer-events-none select-none"
            onerror="this.onerror=null; this.src='${mainImage}';"
          />
        </div>
      `;
    })
    .join("");

  return /*html*/ `
    <div
      id="qv-product-gallery"
      class="flex w-full max-w-[648px] min-w-0 flex-col items-center gap-3 select-none sm:flex-row sm:items-start"
    >
      <!-- DANH SÁCH THUMBNAIL DỌC BÊN TRÁI FIGMA -->
      <div class="order-2 flex h-full max-h-[556px] w-full min-w-0 shrink-0 items-center justify-between gap-2 overflow-hidden sm:order-1 sm:w-[80px] sm:flex-col">
        <!-- MŨI TÊN LÊN -->
        <button
          type="button"
          data-qv-action="thumb-prev"
            class="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center text-neutral-400 transition-colors hover:text-neutral-900 [&>svg]:-rotate-90 sm:[&>svg]:rotate-0"
          aria-label="Previous image"
        >
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6L6 1L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- THUMBNAIL LIST -->
        <div id="qv-thumbnail-list" class="flex w-full min-w-0 items-center gap-2 overflow-x-auto scroll-smooth sm:max-h-[460px] sm:w-auto sm:flex-col sm:gap-3 sm:overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          ${thumbnailsHtml}
        </div>

        <!-- MŨI TÊN XUỐNG -->
        <button
          type="button"
          data-qv-action="thumb-next"
            class="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center text-neutral-400 transition-colors hover:text-neutral-900 [&>svg]:-rotate-90 sm:[&>svg]:rotate-0"
          aria-label="Next image"
        >
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- MAIN IMAGE CONTAINER FIGMA (556x556 SQUARE) -->
      <div
        class="order-1 flex h-60 w-full max-w-[556px] flex-none items-center justify-center overflow-hidden bg-white p-2 sm:order-2 sm:h-auto sm:aspect-square sm:flex-1"
      >
        <img
          id="qv-main-product-image"
          src="${mainImage}"
          alt="${productName} img main"
          class="h-full w-full object-contain object-center transition-all duration-200 select-none"
          onerror="this.onerror=null; this.src='${thumbnails[0] || largeCabbageImage}';"
        />
      </div>
    </div>
  `;
}

// BIND QUICKVIEW IMAGE EVENTS (ISOLATED TO PREVENT CONFLICTS)
export function bindQuickViewImageEvents(container = document) {
  const gallery = container.querySelector("#qv-product-gallery") || container;
  if (!gallery) return;

  const mainImg = gallery.querySelector("#qv-main-product-image");
  if (!mainImg) return;

  const thumbs = Array.from(gallery.querySelectorAll('[data-qv-action="select-thumb"]'));
  if (!thumbs.length) return;

  const setActiveThumbnail = (activeThumb) => {
    thumbs.forEach((thumb) => {
      thumb.classList.remove("border-primary", "border-neutral-200", "hover:border-primary");
      thumb.classList.add("border-2", "border-transparent", "hover:border-neutral-200");
    });

    activeThumb.classList.remove(
      "border-transparent",
      "border-neutral-200",
      "hover:border-neutral-200",
    );
    activeThumb.classList.add("border-primary", "border-2");
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

  const prevBtn = gallery.querySelector('[data-qv-action="thumb-prev"]');
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const activeIndex = thumbs.findIndex((thumb) => thumb.classList.contains("border-primary"));
      if (activeIndex <= 0) return;
      changeMainImage(thumbs[activeIndex - 1]);
    });
  }

  const nextBtn = gallery.querySelector('[data-qv-action="thumb-next"]');
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const activeIndex = thumbs.findIndex((thumb) => thumb.classList.contains("border-primary"));
      if (activeIndex === -1 || activeIndex >= thumbs.length - 1) return;
      changeMainImage(thumbs[activeIndex + 1]);
    });
  }
}
