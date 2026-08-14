export function renderImage(product) {
  const thumbnailsHtml = product.thumbnails.map((thumb, index) => {
    const isSelected = thumb === product.mainImage || index === 0;
    return `
      <div data-action="select-thumb" data-src="${thumb}" class="thumbnail-item w-[80px] h-[90px] border ${isSelected ? 'border-[#00B207]' : 'border-gray-200'} hover:border-[#00B207] rounded-lg overflow-hidden p-1 bg-white cursor-pointer transition-all flex items-center justify-center">
        <img src="${thumb}" alt="${product.name} Thumbnail ${index + 1}" class="w-full h-full object-contain pointer-events-none" />
      </div>
    `;
  }).join("");

  return /*html*/ `
    <!-- CỘT TRÁI: KHU VỰC HÌNH ẢNH -->
    <div id="product-gallery" class="lg:col-span-6 flex flex-col sm:flex-row gap-4">
      <div class="flex sm:flex-col items-center gap-3 order-2 sm:order-1 shrink-0">
        <div class="text-gray-400 hover:text-gray-900 cursor-pointer p-1">
          <i class="fa-solid fa-chevron-up text-sm"></i>
        </div>
        
        <!-- Danh sách ảnh nhỏ -->
        ${thumbnailsHtml}
        
        <div class="text-gray-400 hover:text-gray-900 cursor-pointer p-1">
          <i class="fa-solid fa-chevron-down text-sm"></i>
        </div>
      </div>
      
      <!-- Hình ảnh sản phẩm lớn -->
      <div class="w-full aspect-square bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-6 order-1 sm:order-2">
        <img id="main-product-image" src="${product.mainImage}" alt="${product.name} img main" class="w-full h-full object-contain transition-all duration-200" />
      </div>
    </div>
  `;
}

// 📌 Hàm lắng nghe sự kiện bấm ảnh nhỏ đổi ảnh lớn
export function bindImageEvents(container = document) {
  const gallery = container.querySelector("#product-gallery") || container;
  if (!gallery) return;

  const mainImg = gallery.querySelector("#main-product-image");
  const thumbs = gallery.querySelectorAll('[data-action="select-thumb"]');

  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      const newSrc = thumb.getAttribute("data-src");
      if (newSrc && mainImg) {
        // Đổi đường dẫn ảnh lớn
        mainImg.src = newSrc;

        // Đổi màu viền active xanh lá cho ảnh nhỏ vừa bấm
        thumbs.forEach(t => {
          t.classList.remove("border-[#00B207]");
          t.classList.add("border-gray-200");
        });
        thumb.classList.remove("border-gray-200");
        thumb.classList.add("border-[#00B207]");
      }
    });
  });
}