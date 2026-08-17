import { SOCIAL_ICONS, iconStar } from "../components/icons.js";

export function renderProductInfo(product) {
  const starsHtml = Array.from({ length: 5 }, (_, index) => {
    return iconStar(index < product.rating);
  }).join("");
  
  const tagsHtml = product.tags.map(tag => `
    <a href="${tag.link}" class="text-gray-400 hover:text-[#1A1A1A] transition-colors">${tag.name}</a>
  `).join(`<span class="text-gray-500">,</span>`);

  return /*html*/ `
    <!-- CỘT PHẢI: KHỐI THÔNG TIN -->
    <div class="lg:col-span-6 flex flex-col justify-start">
        <div class="flex items-center gap-3 flex-wrap">
          <h1 class="text-3xl font-semibold text-gray-900">${product.name}</h1>
          ${product.inStock ? `<span class="bg-[#20B526]/20 text-[#2C742F] text-xs font-semibold px-2.5 py-1 rounded">In Stock</span>` : ''}
        </div>
        
        <!-- Đánh giá sao & SKU -->
        <div class="flex items-center gap-3 mt-3 text-sm text-gray-500 flex-wrap">
          <div class="flex items-center gap-0.5 text-yellow-400">
            ${starsHtml}
          </div>
          <span>${product.reviewsCount} Review${product.reviewsCount > 1 ? 's' : ''}</span>
          <span class="text-gray-300">•</span>
          <span>SKU: <strong class="text-gray-700 font-medium">${product.sku}</strong></span>
        </div>

        <!-- Giá sản phẩm -->
        <div class="flex items-center gap-3 mt-5 pb-5 border-b border-gray-100 flex-wrap">
          ${product.originalPrice ? `<span class="text-lg text-gray-400 line-through">$${product.originalPrice.toFixed(2)}</span>` : ''}
          <span class="text-2xl font-semibold text-[#00B207]">$${product.currentPrice.toFixed(2)}</span>
          ${product.discountLabel ? `<span class="bg-red-50 text-[#00B207] text-xs font-semibold px-2.5 py-1 rounded-full">${product.discountLabel}</span>` : ''}
        </div>

        <!-- Brand & Share Button -->
        <div class="flex items-center justify-between py-4 border-b border-gray-100 text-sm flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <span class="text-gray-500">Brand:</span>
            <div class="flex items-center gap-1">
              ${product.brandLogo ? `<img src="${product.brandLogo}" alt="${product.brand}" class="h-8 w-auto" />` : ''}
              <span class="font-medium text-gray-900">${product.brand || 'FarmFresh'}</span>
            </div>
          </div>
          
          <!-- Share item -->
          <div class="flex items-center gap-2">
            <span class="text-gray-500">Share item:</span>
            <div class="flex items-center gap-2">
              <a href="#" class="w-8 h-8 rounded-full bg-[#00B207] text-white flex items-center justify-center hover:bg-[#009e06] transition-colors" aria-label="Facebook">
                ${SOCIAL_ICONS.facebook}
              </a>
              <a href="#" class="w-8 h-8 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors" aria-label="Twitter">
                ${SOCIAL_ICONS.twitter}
              </a>
              <a href="#" class="w-8 h-8 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors" aria-label="Pinterest">
                ${SOCIAL_ICONS.pinterest}
              </a>
              <a href="#" class="w-8 h-8 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors" aria-label="Instagram">
                ${SOCIAL_ICONS.instagram}
              </a>
            </div>
          </div>
        </div>
        
        <p class="text-sm text-gray-500 leading-relaxed mt-5">
          ${product.description}
        </p>
        
        <!-- Chọn số lượng & Add to Cart -->
        <div class="flex flex-col sm:flex-row items-center gap-4 mt-6 pb-6 border-b border-gray-100">
          
          <!-- 📌 Nút Chọn số lượng nằm ngang chuẩn hệt Shopping Cart -->
          <div class="flex h-[44px] w-[124px] items-center justify-between rounded-full border border-gray-200 p-1 bg-white shrink-0 select-none">
            <button
              type="button"
              class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors shrink-0"
              data-action="decrement"
            >
              <svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75 0.75H10.0833" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <input
              class="quantity-stepper-input w-10 text-center font-semibold text-sm text-gray-900 bg-transparent outline-none border-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              min="1"
              value="1"
            />

            <button
              type="button"
              class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors shrink-0"
              data-action="increment"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75 5.41667H10.0833M5.41667 0.75V10.0833V0.75Z" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <!-- Nút Add to Cart -->
          <button data-action="add-to-cart" class="w-full max-w-[447px] h-[51px] bg-[#00B307] hover:bg-[#00B207] text-white font-semibold rounded-full flex items-center justify-center gap-2.5 shadow-xs transition-colors cursor-pointer select-none">
            <span class="text-[15px] tracking-wide font-medium">Add to Cart</span>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.81706 6.48336H2.31706L0.650391 15.65H15.6504L13.9837 6.48336H11.4837M4.81706 6.48336V3.98336C4.81706 2.14241 6.30944 0.650024 8.15039 0.650024C9.99134 0.650024 11.4837 2.14241 11.4837 3.98336V6.48336M4.81706 6.48336H11.4837M4.81706 6.48336V8.98336M11.4837 6.48336V8.98336" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Wishlist -->
          <button class="w-12 h-12 rounded-full bg-[#00B207]/8 hover:bg-[#00B207]/15 text-[#00B207] flex items-center justify-center transition-all cursor-pointer shrink-0" aria-label="Thêm vào danh sách yêu thích">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="52" height="52" rx="26" fill="#20B526" fill-opacity="0.1"/>
              <path d="M25.9996 33.5451C9.33328 24.3334 20.9999 14.3334 25.9996 20.6567C30.9999 14.3334 42.6666 24.3334 25.9996 33.5451Z" stroke="#2C742F" stroke-width="1.5"/>
            </svg>
          </button>
        </div>
        
        <div class="mt-6 text-sm space-y-2">
          <div>
            <span class="text-black-500">Category:</span>
            <a href="${product.category.link}" class="text-gray-400 font-medium hover:text-[#00B207] ml-1 transition-colors">${product.category.name}</a>
          </div>
      
          <div class="flex items-start gap-1 flex-wrap">
            <span class="text-black-500">Tag:</span>
            ${tagsHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}