export function renderImage(product) {
  const thumbnails = product.thumbnails && product.thumbnails.length > 0
    ? product.thumbnails
    : [product.mainImage, product.mainImage, product.mainImage, product.mainImage];

  const thumbnailsHtml = thumbnails.map((thumb, index) => {
    const isSelected = thumb === product.mainImage || index === 0;
    return `
      <div
        data-action="select-thumb"
        data-src="${thumb}"
        class="thumbnail-item w-20 h-[96px] border ${isSelected ? 'border-green-600' : 'border-transparent'} hover:border-green-600 rounded-xs overflow-hidden p-1 bg-white cursor-pointer transition-all flex items-center justify-center shrink-0"
      >
        <img src="${thumb}" alt="${product.name} Thumbnail ${index + 1}" class="w-full h-full object-contain pointer-events-none" />
      </div>
    `;
  }).join("");

  return /*html*/ `
    <!-- CỘT TRÁI: GALLERY HÌNH ẢNH -->
    <div id="product-gallery" class="lg:col-span-6 flex flex-col sm:flex-row gap-6 items-start">
      
      <!-- DANH SÁCH ANH NHỎ VERTICAL -->
      <div class="flex sm:flex-col items-center gap-2 order-2 sm:order-1 shrink-0 w-full sm:w-auto overflow-x-auto sm:overflow-visible">
        <div class="text-neutral-400 hover:text-zinc-900 cursor-pointer p-1 hidden sm:block">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 7L7 1L13 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        ${thumbnailsHtml}

        <div class="text-neutral-400 hover:text-zinc-900 cursor-pointer p-1 hidden sm:block">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 1L7 7L13 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- HÌNH ẢNH SẢN PHẨM CHÍNH -->
      <div class="w-full aspect-square bg-white border border-neutral-100 rounded-lg flex items-center justify-center p-4 order-1 sm:order-2 overflow-hidden">
        <img
          id="main-product-image"
          src="${product.mainImage}"
          alt="${product.name} img main"
          class="w-full h-full object-contain transition-all duration-200"
        />
      </div>

    </div>
  `;
}

// LẮNG NGHE SỰ KIỆN CLICK ĐỔI ẢNH (GIỮ NGUYÊN)
export function bindImageEvents(container = document) {
  const gallery = container.querySelector("#product-gallery") || container;
  if (!gallery) return;

  const mainImg = gallery.querySelector("#main-product-image");
  const thumbs = gallery.querySelectorAll('[data-action="select-thumb"]');

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const newSrc = thumb.getAttribute("data-src");
      if (newSrc && mainImg) {
        mainImg.src = newSrc;

        thumbs.forEach((t) => {
          t.classList.remove("border-green-600");
          t.classList.add("border-transparent");
        });
        thumb.classList.remove("border-transparent");
        thumb.classList.add("border-green-600");
      }
    });
  });
}