export function renderImage(product) {
  const thumbnails = Array.isArray(product?.thumbnails) ? product.thumbnails : [];
  const fullImages = Array.isArray(product?.images) && product.images.length > 0 ? product.images : [];
  const mainImage = product?.mainImage || fullImages[0] || thumbnails[0] || "";
  const productName = product?.name || "Product";

  const thumbnailsHtml = thumbnails
    .map((thumb, index) => {
      const fullSrc = fullImages[index] || (index === 0 && product?.mainImage ? product.mainImage : thumb);
      const isSelected = fullSrc === mainImage || (index === 0 && !product?.mainImage);

      return `
        <div
          data-action="select-thumb"
          data-src="${fullSrc}"
          data-index="${index}"
          class="thumbnail-item w-[80px] h-[90px] shrink-0 cursor-pointer overflow-hidden bg-white rounded-[4px] flex items-center justify-center transition-all duration-200 ${
            isSelected ? "border border-[#00B207]" : "border border-transparent hover:border-[#00B207]"
          }"
        >
          <img
            src="${thumb}"
            alt="${productName} Thumbnail ${index + 1}"
            class="w-full h-full object-cover rounded-[4px] pointer-events-none select-none"
          />
        </div>
      `;
    })
    .join("");

  return /*html*/ `
    <div
      id="product-gallery"
      class="lg:col-span-6 w-full lg:w-[648px] max-w-[648px] h-auto lg:h-[556px] flex flex-col sm:flex-row items-center sm:items-start gap-3 select-none"
    >
      <!-- THUMBNAILS CONTAINER (Đã hạ thêm 2px thành pt-[42px]) -->
      <div class="order-2 sm:order-1 w-full sm:w-[80px] h-full shrink-0 flex sm:flex-col items-center gap-3 pt-[42px]">
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
        <div id="thumbnail-list" class="flex sm:flex-col items-center gap-3">
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
        class="order-1 sm:order-2 w-full sm:w-[556px] max-w-[556px] h-[400px] sm:h-[556px] aspect-square shrink-0 bg-white flex items-center justify-center overflow-hidden rounded-lg border border-gray-200 p-0"
      >
        <img
          id="main-product-image"
          src="${mainImage}"
          alt="${productName} img main"
          class="w-full h-full object-cover transition-all duration-200 select-none"
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
      thumb.classList.remove("border-[#00B207]");
      thumb.classList.add("border-transparent");
    });

    activeThumb.classList.remove("border-transparent");
    activeThumb.classList.add("border-[#00B207]");
  };

  const changeMainImage = (thumb) => {
    if (!thumb) return;
    const newSrc = thumb.getAttribute("data-src");
    if (!newSrc) return;

    mainImg.src = newSrc;
    setActiveThumbnail(thumb);
  };

  // Click vào từng Thumbnail
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", (e) => {
      changeMainImage(e.currentTarget);
    });
  });

  // Nút Prev
  const prevBtn = gallery.querySelector('[data-action="thumb-prev"]');
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const activeIndex = thumbs.findIndex((thumb) => thumb.classList.contains("border-[#00B207]"));
      if (activeIndex <= 0) return;
      changeMainImage(thumbs[activeIndex - 1]);
    });
  }

  // Nút Next
  const nextBtn = gallery.querySelector('[data-action="thumb-next"]');
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const activeIndex = thumbs.findIndex((thumb) => thumb.classList.contains("border-[#00B207]"));
      if (activeIndex === -1 || activeIndex >= thumbs.length - 1) return;
      changeMainImage(thumbs[activeIndex + 1]);
    });
  }
}