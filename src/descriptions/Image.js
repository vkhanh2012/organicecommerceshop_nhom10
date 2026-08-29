// src/descriptions/Image.js
import largeCabbageImage from "../assets/images/largecabage.svg";
import { getImageUrl } from "../utils/assets.js";

function resolveDescriptionImage(path, fallback = largeCabbageImage) {
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

function isVideoPlaceholder(path) {
  return typeof path === "string" && /(?:^|\/)video\.svg(?:[?#].*)?$/i.test(path);
}

export function renderImage(product) {
  const productImage = isVideoPlaceholder(product?.image) ? "" : product?.image;
  const productMainImage = isVideoPlaceholder(product?.mainImage) ? "" : product?.mainImage;
  const validThumbnails = Array.isArray(product?.thumbnails)
    ? product.thumbnails.filter((image) => !isVideoPlaceholder(image))
    : [];
  const validFullImages = Array.isArray(product?.images)
    ? product.images.filter((image) => !isVideoPlaceholder(image))
    : [];

  const rawThumbnails = validThumbnails.length > 0
    ? validThumbnails
    : [productMainImage || productImage || ""];
  const rawFullImages = validFullImages.length > 0 ? validFullImages : rawThumbnails;

  const thumbnails = rawThumbnails.map((image) => resolveDescriptionImage(image));
  const fullImages = rawFullImages.map((image) => resolveDescriptionImage(image));

  // The detail gallery should open with the same resolved source as its first
  // thumbnail. Product `image` is the smaller catalogue card image and is not
  // always suitable (or available) as the detail image after deployment.
  const rawMainImage = productMainImage || rawThumbnails[0] || productImage;
  const mainImage = resolveDescriptionImage(
    rawMainImage || fullImages[0] || thumbnails[0],
    thumbnails[0] || largeCabbageImage,
  );

  const productName = product?.name || "Product";

  const thumbnailsHtml = thumbnails
    .map((thumb, index) => {
      const fullSrc = fullImages[index] || thumb;
      const isSelected = index === 0;

      return `
        <div
          data-action="select-thumb"
          data-src="${fullSrc}"
          data-index="${index}"
          class="thumbnail-item flex h-20 w-[72px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[4px] bg-white transition-all duration-200 sm:h-[90px] sm:w-[80px] ${
            isSelected ? "border-2 border-primary" : "border border-neutral-200 hover:border-primary"
          }"
        >
          <img
            src="${thumb}"
            alt="${productName} Thumbnail ${index + 1}"
            width="80"
            height="90"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-contain p-1 pointer-events-none select-none"
          />
        </div>
      `;
    })
    .join("");

  return /*html*/ `
    <div
      id="product-gallery"
      class="flex w-full max-w-[648px] min-w-0 flex-col items-center gap-3 select-none sm:flex-row sm:items-start"
    >
      <!-- DANH SÁCH THUMBNAIL DỌC BÊN TRÁI FIGMA -->
      <div class="order-2 flex h-full max-h-[556px] w-full min-w-0 shrink-0 items-center justify-between gap-2 overflow-hidden sm:order-1 sm:w-[80px] sm:flex-col">
        <!-- MŨI TÊN LÊN -->
        <button
          type="button"
          data-action="thumb-prev"
            class="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center text-neutral-400 transition-colors hover:text-neutral-900 [&>svg]:-rotate-90 sm:[&>svg]:rotate-0"
          aria-label="Previous image"
        >
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6L6 1L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- THUMBNAIL LIST -->
        <div id="thumbnail-list" class="flex w-full min-w-0 items-center gap-2 overflow-x-auto scroll-smooth pb-1 sm:max-h-[460px] sm:w-auto sm:flex-col sm:gap-3 sm:overflow-hidden sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          ${thumbnailsHtml}
        </div>

        <!-- MŨI TÊN XUỐNG -->
        <button
          type="button"
          data-action="thumb-next"
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
        id="product-main-image-frame"
        class="order-1 flex h-60 w-full items-center justify-center overflow-hidden bg-white p-2 sm:order-2 sm:h-auto sm:aspect-square sm:w-[calc(100%_-_92px)] min-[1400px]:w-[556px]"
        style="background-image: url('${mainImage}'); background-position: center; background-repeat: no-repeat; background-size: contain;"
      >
        <img
          id="main-product-image"
          src="${mainImage}"
          alt="${productName} img main"
          width="556"
          height="556"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          class="sr-only"
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
  const mainImageFrame = gallery.querySelector("#product-main-image-frame");

  const thumbs = Array.from(gallery.querySelectorAll('[data-action="select-thumb"]'));
  if (!thumbs.length) return;

  const setActiveThumbnail = (activeThumb) => {
    thumbs.forEach((thumb) => {
      thumb.classList.remove("border-primary", "border-2");
      thumb.classList.add("border-neutral-200", "border", "hover:border-primary");
    });

    activeThumb.classList.remove("border-neutral-200", "border", "hover:border-primary");
    activeThumb.classList.add("border-primary", "border-2");
  };

  const changeMainImage = (thumb) => {
    if (!thumb) return;
    const newSrc = thumb.getAttribute("data-src");
    if (!newSrc) return;

    mainImg.src = newSrc;
    if (mainImageFrame) {
      mainImageFrame.style.backgroundImage = `url(${JSON.stringify(newSrc)})`;
    }
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
    const mainImageFrame = gallery.querySelector("#product-main-image-frame");
    if (mainImageFrame) {
      mainImageFrame.style.backgroundImage = `url(${JSON.stringify(newSrc)})`;
    }
    const thumbs = gallery.querySelectorAll('[data-action="select-thumb"]');
    thumbs.forEach((t) => {
      t.classList.remove("border-primary", "border-2");
      t.classList.add("border-neutral-200", "border");
    });
    thumb.classList.remove("border-neutral-200", "border");
    thumb.classList.add("border-primary", "border-2");
  }
});
