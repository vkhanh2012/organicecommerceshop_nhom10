import { SOCIAL_ICONS, iconStar } from "../components/icons.js";
import { renderQuantityComponent } from "../components/quantity.js";

export function renderProductInfo(product) {
  const starsHtml = Array.from({ length: 5 }, (_, index) => iconStar(index < product.rating)).join("");
  
  const tagsHtml = product.tags.map(tag => `
    <a href="${tag.link}" class="text-gray-400 hover:text-[#1A1A1A] transition-colors">${tag.name}</a>
  `).join(`<span class="text-gray-500">,</span>`);

  return /*html*/ `
    <div class="lg:col-span-6 flex flex-col justify-start">
        <div class="flex items-center gap-3 flex-wrap">
          <h1 class="text-3xl font-semibold text-gray-900">${product.name}</h1>
          ${product.inStock ? `<span class="bg-[#20B526]/20 text-[#2C742F] text-xs font-semibold px-2.5 py-1 rounded">In Stock</span>` : ''}
        </div>
        
        <div class="flex items-center gap-3 mt-3 text-sm text-gray-500 flex-wrap">
          <div class="flex items-center gap-0.5 text-yellow-400">${starsHtml}</div>
          <span>${product.reviewsCount} Reviews</span>
          <span class="text-gray-300">•</span>
          <span>SKU: <strong class="text-gray-700 font-medium">${product.sku}</strong></span>
        </div>

        <div class="flex items-center gap-3 mt-5 pb-5 border-b border-gray-100 flex-wrap">
          ${product.originalPrice ? `<span class="text-lg text-gray-400 line-through">$${product.originalPrice.toFixed(2)}</span>` : ''}
          <span class="text-2xl font-semibold text-[#00B207]">$${product.currentPrice.toFixed(2)}</span>
          ${product.discountLabel ? `<span class="bg-red-50 text-red-500 text-xs font-semibold px-2.5 py-1 rounded-full">${product.discountLabel}</span>` : ''}
        </div>

        <p class="text-sm text-gray-500 leading-relaxed mt-5">${product.description}</p>
        
        <!-- Chọn số lượng & Add to Cart -->
        <div class="flex flex-col sm:flex-row items-center gap-4 mt-6 pb-6 border-b border-gray-100">
          ${renderQuantityComponent(1)}
          <button data-action="add-to-cart" type="button" class="w-full max-w-[447px] h-[51px] bg-[#00B307] hover:bg-[#00B207] text-white font-semibold rounded-full flex items-center justify-center gap-2.5 shadow-xs transition-colors cursor-pointer select-none">
            <span class="text-[15px] tracking-wide font-medium">Add to Cart</span>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.81706 6.48336H2.31706L0.650391 15.65H15.6504L13.9837 6.48336H11.4837M4.81706 6.48336V3.98336C4.81706 2.14241 6.30944 0.650024 8.15039 0.650024C9.99134 0.650024 11.4837 2.14241 11.4837 3.98336V6.48336M4.81706 6.48336H11.4837M4.81706 6.48336V8.98336M11.4837 6.48336V8.98336" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div class="mt-6 text-sm space-y-2">
          <div>
            <span class="text-gray-500">Category:</span>
            <a href="${product.category.link}" class="text-gray-900 font-medium hover:text-[#00B207] ml-1 transition-colors">${product.category.name}</a>
          </div>
          <div class="flex items-start gap-1 flex-wrap">
            <span class="text-gray-500">Tag:</span> ${tagsHtml}
          </div>
        </div>
    </div>
  `;
}