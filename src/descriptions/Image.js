// src/descriptions/Image.js
import { getImageUrl } from "../utils/assets.js";

export function renderImage(product) {
  const resolveImage = (path = "") =>
    getImageUrl(String(path).replace(/^\/src\/assets/, ""));

  const thumbnails = (Array.isArray(product?.thumbnails) && product.thumbnails.length > 0
    ? product.thumbnails
    : [product?.mainImage || product?.image || ""])
    .map(resolveImage);

  const fullImages = (Array.isArray(product?.images) && product.images.length > 0
    ? product.images
    : thumbnails)
    .map(resolveImage);

  const mainImage = resolveImage(product?.mainImage || product?.image) || fullImages[0] || thumbnails[0] || "";
  const productName = product?.name || "Product";

  const thumbnailsHtml = thumbnails
    .map((thumb, index) => {
      const fullSrc = fullImages[index] || thumb;
      const isSelected = fullSrc === mainImage || (index === 0 && !product?.mainImage);

      return `
        <div
          data-action="select-thumb"
          data-src="${fullSrc}"
          data-index="${index}"
          class="thumbnail-item w-[80px] h-[90px] shrink-0 cursor-pointer overflow-hidden bg-white rounded-[4px] flex items-center justify-center transition-all duration-200 ${
            isSelected
              ? "border-2 border-primary"
              : "border border-neutral-200 hover:border-primary"
          }"
        >
          <img
            src="${thumb}"
            alt="${productName} Thumbnail ${index + 1}"
            class="w-full h-full object-contain p-1 pointer-events-none select-none"
          />
        </div>
      `;
    })
    .join("");

  return /*html*/ `
    <div
      id="product-gallery"
      class="col-span-12 lg:col-span-6 w-full max-w-[648px] mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-4 select-none"
    >
      <!-- DANH SÁCH THUMBNAIL DỌC BÊN TRÁI FIGMA -->
      <div class="order-2 sm:order-1 w-full sm:w-[80px] shrink-0 flex sm:flex-col items-center justify-between gap-2 h-full max-h-[556px]">
        <!-- MŨI TÊN LÊN -->
        <button
          type="button"
          data-action="thumb-prev"
          class="w-6 h-6 shrink-0 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
          aria-label="Previous image"
        >
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6L6 1L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- THUMBNAIL LIST -->
        <div id="thumbnail-list" class="flex w-full min-w-0 items-center gap-3 overflow-x-auto scroll-smooth sm:w-auto sm:flex-col sm:overflow-hidden sm:max-h-[460px]">
          ${thumbnailsHtml}
        </div>

        <!-- MŨI TÊN XUỐNG -->
        <button
          type="button"
          data-action="thumb-next"
          class="w-6 h-6 shrink-0 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
          aria-label="Next image"
        >
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- MAIN IMAGE CONTAINER FIGMA (556x556 SQUARE) -->
      <div
        class="order-1 sm:order-2 flex-1 min-w-0 w-full max-w-[556px] aspect-square bg-white flex items-center justify-center overflow-hidden rounded-lg border border-neutral-200 p-4"
      >
        <img
          id="main-product-image"
          src="${mainImage}"
          alt="${productName} img main"
          class="w-full h-full object-contain transition-all duration-200 select-none"
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
      thumb.classList.remove("border-primary", "border-2");
      thumb.classList.add("border-neutral-200", "border");
    });

    activeThumb.classList.remove("border-neutral-200", "border");
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

  const prevBtn = gallery.querySelector('[data-action="thumb-prev"]');
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const activeIndex = thumbs.findIndex((thumb) => thumb.classList.contains("border-primary"));
      if (activeIndex <= 0) return;
      changeMainImage(thumbs[activeIndex - 1]);
    });
  }

  const nextBtn = gallery.querySelector('[data-action="thumb-next"]');
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const activeIndex = thumbs.findIndex((thumb) => thumb.classList.contains("border-primary"));
      if (activeIndex === -1 || activeIndex >= thumbs.length - 1) return;
      changeMainImage(thumbs[activeIndex + 1]);
    });
  }
}
