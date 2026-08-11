  export function renderImage(product) {
  const thumbnailsHtml = product.thumbnails.map((thumb, index) => `
    <div class="w-[80px] h-[90px] border border-white/20 hover:border-[#00B207] rounded-lg overflow-hidden p-1 bg-white cursor-pointer transition-all flex items-center justify-center">
      <img src="${thumb}" alt="${product.name} Thumbnail ${index + 1}" class="w-full h-full object-contain" />
    </div>
  `).join("");
  return /*html*/ `
    <!-- CỘT TRÁI: KHU VỰC HÌNH ẢNH -->
    <div class="lg:col-span-6 flex flex-col sm:flex-row gap-4">
      <div class="flex sm:flex-col items-center gap-3 order-2 sm:order-1 shrink-0">
        <div class="text-gray-400 hover:text-gray-900 cursor-pointer p-1">
          <i class="fa-solid fa-chevron-up text-sm"></i>
        </div>
        
        <!-- Ảnh nhỏ -->
        ${thumbnailsHtml}
        
        <div class="text-gray-400 hover:text-gray-900 cursor-pointer p-1">
          <i class="fa-solid fa-chevron-down text-sm"></i>
        </div>
      </div>
      
      <!-- Hình ảnh sản phẩm lớn -->
      <div class="w-full aspect-square bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-6 order-1 sm:order-2">
        <img src="${product.mainImage}" alt="${product.name} img main" class="w-full h-full object-contain" />
      </div>
    </div>
  `;
}