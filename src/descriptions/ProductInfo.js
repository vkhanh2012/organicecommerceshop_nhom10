import { SOCIAL_ICONS, iconStar } from "../components/icons.js";
import { renderQuantityComponent } from "../components/quantity.js";
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
          
          <!-- In Stock -->
          ${product.inStock ? `
          <svg width="71" height="29" viewBox="0 0 71 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="71" height="29" rx="4" fill="#20B526" fill-opacity="0.2"/>
            <path d="M10.352 9.242V19H9.078V9.242H10.352ZM16.2613 11.188C17.1946 11.188 17.9506 11.4727 18.5293 12.042C19.108 12.602 19.3973 13.414 19.3973 14.478V19H18.1373V14.66C18.1373 13.8947 17.946 13.3113 17.5633 12.91C17.1806 12.4993 16.658 12.294 15.9953 12.294C15.3233 12.294 14.7866 12.504 14.3853 12.924C13.9933 13.344 13.7973 13.9553 13.7973 14.758V19H12.5233V11.328H13.7973V12.42C14.0493 12.028 14.39 11.7247 14.8193 11.51C15.258 11.2953 15.7386 11.188 16.2613 11.188ZM28.3048 19.098C27.6608 19.098 27.0821 18.986 26.5688 18.762C26.0648 18.5287 25.6681 18.2113 25.3788 17.81C25.0895 17.3993 24.9401 16.928 24.9308 16.396H26.2888C26.3355 16.8533 26.5221 17.2407 26.8488 17.558C27.1848 17.866 27.6701 18.02 28.3048 18.02C28.9115 18.02 29.3875 17.8707 29.7328 17.572C30.0875 17.264 30.2648 16.872 30.2648 16.396C30.2648 16.0227 30.1621 15.7193 29.9568 15.486C29.7515 15.2527 29.4948 15.0753 29.1868 14.954C28.8788 14.8327 28.4635 14.702 27.9408 14.562C27.2968 14.394 26.7788 14.226 26.3868 14.058C26.0041 13.89 25.6728 13.6287 25.3928 13.274C25.1221 12.91 24.9868 12.4247 24.9868 11.818C24.9868 11.286 25.1221 10.8147 25.3928 10.404C25.6635 9.99333 26.0415 9.676 26.5268 9.452C27.0215 9.228 27.5861 9.116 28.2208 9.116C29.1355 9.116 29.8821 9.34467 30.4608 9.802C31.0488 10.2593 31.3801 10.866 31.4548 11.622H30.0548C30.0081 11.2487 29.8121 10.922 29.4668 10.642C29.1215 10.3527 28.6641 10.208 28.0948 10.208C27.5628 10.208 27.1288 10.348 26.7928 10.628C26.4568 10.8987 26.2888 11.2813 26.2888 11.776C26.2888 12.1307 26.3868 12.42 26.5828 12.644C26.7881 12.868 27.0355 13.0407 27.3248 13.162C27.6235 13.274 28.0388 13.4047 28.5708 13.554C29.2148 13.7313 29.7328 13.9087 30.1248 14.086C30.5168 14.254 30.8528 14.52 31.1328 14.884C31.4128 15.2387 31.5528 15.724 31.5528 16.34C31.5528 16.816 31.4268 17.264 31.1748 17.684C30.9228 18.104 30.5495 18.4447 30.0548 18.706C29.5601 18.9673 28.9768 19.098 28.3048 19.098ZM34.9816 12.378V16.9C34.9816 17.2733 35.0609 17.5393 35.2196 17.698C35.3783 17.8473 35.6536 17.922 36.0456 17.922H36.9836V19H35.8356C35.1263 19 34.5943 18.8367 34.2396 18.51C33.8849 18.1833 33.7076 17.6467 33.7076 16.9V12.378H32.7136V11.328H33.7076V9.396H34.9816V11.328H36.9836V12.378H34.9816ZM41.8732 19.126C41.1546 19.126 40.5012 18.9627 39.9132 18.636C39.3346 18.3093 38.8772 17.8473 38.5412 17.25C38.2146 16.6433 38.0512 15.9433 38.0512 15.15C38.0512 14.366 38.2192 13.6753 38.5552 13.078C38.9006 12.4713 39.3672 12.0093 39.9552 11.692C40.5432 11.3653 41.2012 11.202 41.9292 11.202C42.6572 11.202 43.3152 11.3653 43.9032 11.692C44.4912 12.0093 44.9532 12.4667 45.2892 13.064C45.6346 13.6613 45.8072 14.3567 45.8072 15.15C45.8072 15.9433 45.6299 16.6433 45.2752 17.25C44.9299 17.8473 44.4586 18.3093 43.8612 18.636C43.2639 18.9627 42.6012 19.126 41.8732 19.126ZM41.8732 18.006C42.3306 18.006 42.7599 17.8987 43.1612 17.684C43.5626 17.4693 43.8846 17.1473 44.1272 16.718C44.3792 16.2887 44.5052 15.766 44.5052 15.15C44.5052 14.534 44.3839 14.0113 44.1412 13.582C43.8986 13.1527 43.5812 12.8353 43.1892 12.63C42.7972 12.4153 42.3726 12.308 41.9152 12.308C41.4486 12.308 41.0192 12.4153 40.6272 12.63C40.2446 12.8353 39.9366 13.1527 39.7032 13.582C39.4699 14.0113 39.3532 14.534 39.3532 15.15C39.3532 15.7753 39.4652 16.3027 39.6892 16.732C39.9226 17.1613 40.2306 17.4833 40.6132 17.698C40.9959 17.9033 41.4159 18.006 41.8732 18.006ZM47.0063 15.15C47.0063 14.3567 47.165 13.666 47.4823 13.078C47.7996 12.4807 48.2383 12.0187 48.7983 11.692C49.3676 11.3653 50.0163 11.202 50.7443 11.202C51.687 11.202 52.4616 11.4307 53.0683 11.888C53.6843 12.3453 54.0903 12.98 54.2863 13.792H52.9143C52.7836 13.3253 52.527 12.9567 52.1443 12.686C51.771 12.4153 51.3043 12.28 50.7443 12.28C50.0163 12.28 49.4283 12.532 48.9803 13.036C48.5323 13.5307 48.3083 14.2353 48.3083 15.15C48.3083 16.074 48.5323 16.788 48.9803 17.292C49.4283 17.796 50.0163 18.048 50.7443 18.048C51.3043 18.048 51.771 17.9173 52.1443 17.656C52.5176 17.3947 52.7743 17.0213 52.9143 16.536H54.2863C54.081 17.32 53.6703 17.95 53.0543 18.426C52.4383 18.8927 51.6683 19.126 50.7443 19.126C50.0163 19.126 49.3676 18.9627 48.7983 18.636C48.2383 18.3093 47.7996 17.8473 47.4823 17.25C47.165 16.6527 47.0063 15.9527 47.0063 15.15ZM60.2702 19L57.2602 15.612V19H55.9862V8.64H57.2602V14.73L60.2142 11.328H61.9922L58.3802 15.15L62.0062 19H60.2702Z" fill="#2C742F"/>
          </svg>` : ''}
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
          ${product.discountLabel ? `<span class="bg-red-50 text-red-500 text-xs font-semibold px-2.5 py-1 rounded-full">${product.discountLabel}</span>` : ''}
        </div>

        <!-- Brand & Share Button -->
        <div class="flex items-center justify-between py-4 border-b border-gray-100 text-sm flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <span class="text-gray-500">Brand:</span>
            <div class="flex items-center gap-1">
              <!-- Bạn có thể truyền logo brand động vào đây, hiện đang hardcode SVG Logo -->
       <img
    src="${product.brandLogo}"
    alt="${product.brand}"
    class="h-8 w-auto"
  />
  <span class="font-medium text-gray-900">${product.brand}</span>
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
        
        <!-- Đoạn mô tả sản phẩm ngắn -->
        <p class="text-sm text-gray-500 leading-relaxed mt-5">
          ${product.description}
        </p>
        
        <!-- Chọn số lượng, Add to Cart & Wishlist -->
        <div class="flex flex-col sm:flex-row items-center gap-4 mt-6 pb-6 border-b border-gray-100">
          <!-- Chọn số lượng -->
          <div class="flex items-center border border-gray-200 rounded-full p-1 bg-gray-50 w-full sm:w-auto justify-between gap-6 shrink-0">
            ${renderQuantityComponent()}
          </div>
          <!-- Add to Cart -->
          <button class="w-full max-w-[447px] h-[51px] bg-[#00B307] hover:bg-[#00B207] text-white font-semibold rounded-full flex items-center justify-center gap-2.5 shadow-xs transition-colors cursor-pointer select-none">
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
        
        <!-- Category & Tags -->
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
