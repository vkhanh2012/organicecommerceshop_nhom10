import { SOCIAL_ICONS, iconStar } from "../components/icons.js";

import cabbage1Svg from "../assets/images/cabbage1.svg";
import cabbage2Svg from "../assets/images/cabbage2.svg";
import cabbage3Svg from "../assets/images/cabbage3.svg";
import cabbage4Svg from "../assets/images/cabbage4.svg";
import largecabageSvg from "../assets/images/largecabage.svg";
import videoSvg from "../assets/images/video.svg";

// 1. DATA ĐỘNG MẶC ĐỊNH CHO CẢ 3 PHẦN
export const defaultProductData = {
  name: "Chinese Cabbage",
  inStock: true,
  sku: "2,51,594",
  rating: 4,
  reviewsCount: 4,
  originalPrice: 48.00,
  currentPrice: 17.28,
  discountLabel: "64% Off",
  brand: "FarmFresh", 
  description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
  category: { name: "Vegetables", link: "#" },
  tags: [
    { name: "Vegetables", link: "#" },
    { name: "Healthy", link: "#" },
    { name: "Chinese", link: "#" },
    { name: "Cabbage", link: "#" },
    { name: "Green Cabbage", link: "#" }
  ],
  additionalInfo: {
    weight: "0.3",
    color: "Green",
    type: "Organic",
    category: "Vegetables",
    stockStatus: "Available (5,413)",
    tags: ["Vegetables", "Healthy", "Chinese", "Cabbage", "Green Cabbage"],
    discount: "64% Discount",
    discountSub: "Save your 64% money with us",
    organic: "100% Organic",
    organicSub: "100% Organic Vegetables"
  },
  feedbacks: [
    {
      id: 1,
      name: "Kristin Watson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      rating: 5,
      time: "2 min ago",
      comment: "Duis at ullamcorper nulla, eu dictum eros."
    },
    {
      id: 2,
      name: "Jane Cooper",
      avatar: null,
      rating: 5,
      time: "30 Apr, 2021",
      comment: 'Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to "bolt" or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants.'
    },
    {
      id: 3,
      name: "Jacob Jones",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      rating: 5,
      time: "2 min ago",
      comment: "Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus."
    },
    {
      id: 4,
      name: "Ralph Edwards",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      rating: 5,
      time: "2 min ago",
      comment: "200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom Non-GMO Productive Brassica rapa VAR. chinensis, a.k.a. Canton's Choice, Bok Choy, from USA."
    }
  ],
  mainImage: largecabageSvg,
  thumbnails: [cabbage1Svg, cabbage2Svg, cabbage3Svg, cabbage4Svg],
  videoImage: videoSvg
};


// 2. HÀM RENDER TẤT CẢ GỘP TRONG 1 FILE
export function renderDescription(product = defaultProductData) {
  // Render danh sách ảnh nhỏ
  const thumbnailsHtml = product.thumbnails.map((thumb, index) => `
    <div class="w-[80px] h-[90px] border border-white/20 hover:border-[#00B207] rounded-lg overflow-hidden p-1 bg-white cursor-pointer transition-all flex items-center justify-center">
      <img src="${thumb}" alt="${product.name} Thumbnail ${index + 1}" class="w-full h-full object-contain" />
    </div>
  `).join("");

  // Render sao đánh giá
  const starsHtml = Array.from({ length: 5 }, (_, index) => iconStar(index < product.rating)).join("");

  // Render danh sách tags sản phẩm
  const tagsHtml = product.tags.map(tag => `
    <a href="${tag.link}" class="text-gray-400 hover:text-[#1A1A1A] transition-colors">${tag.name}</a>
  `).join(`<span class="text-gray-500">,</span>`);

  // Render danh sách tags Additional Info
  const addInfoTagsHtml = (product.additionalInfo.tags || []).map((tag) => {
    if (tag.toLowerCase() === 'chinese') {
      return `<strong class="text-gray-900 font-medium">${tag}</strong>`;
    }
    return tag;
  }).join(', ');

  // Render danh sách Customer Feedback
  const feedbacksHtml = (product.feedbacks || []).map((item) => {
    const feedbackStars = Array.from({ length: 5 }, (_, i) => iconStar(i < item.rating)).join('');
    const avatarHtml = item.avatar 
      ? `<img src="${item.avatar}" alt="${item.name}" class="w-10 h-10 rounded-full object-cover shrink-0" />`
      : `<div class="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center shrink-0">
           <i class="fa-solid fa-user text-sm"></i>
         </div>`;

    return `
      <div class="py-5 border-b border-gray-100 last:border-b-0 space-y-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            ${avatarHtml}
            <div>
              <h4 class="text-sm font-semibold text-gray-900 leading-none">${item.name}</h4>
              <div class="flex items-center gap-0.5 mt-1.5">
                ${feedbackStars}
              </div>
            </div>
          </div>
          <span class="text-xs text-gray-400">${item.time}</span>
        </div>

        <p class="text-sm text-gray-500 leading-relaxed pt-1">
          ${item.comment}
        </p>
      </div>
    `;
  }).join('');

  return /*html*/ `
    <div class="container-custom mx-auto px-4 md:px-8 pt-12">
    
    <!-- 1. THÔNG TIN SẢN PHẨM PHÍA TRÊN -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16">
      
      <!-- CỘT TRÁI: HÌNH ẢNH SẢN PHẨM -->
      <div class="lg:col-span-6 flex flex-col sm:flex-row gap-4">
        <div class="flex sm:flex-col items-center gap-3 order-2 sm:order-1 shrink-0">
          <div class="text-gray-400 hover:text-gray-900 cursor-pointer p-1">
            <i class="fa-solid fa-chevron-up text-sm"></i>
          </div>
          ${thumbnailsHtml}
          <div class="text-gray-400 hover:text-gray-900 cursor-pointer p-1">
            <i class="fa-solid fa-chevron-down text-sm"></i>
          </div>
        </div>
        
        <div class="w-full aspect-square bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-6 order-1 sm:order-2">
          <img src="${product.mainImage}" alt="${product.name} img main" class="w-full h-full object-contain" />
        </div>
      </div>

      <!-- CỘT PHẢI: KHỐI THÔNG TIN CHI TIẾT SẢN PHẨM -->
      <div class="lg:col-span-6 flex flex-col justify-start">
        <div class="flex items-center gap-3 flex-wrap">
          <h1 class="text-3xl font-semibold text-gray-900">${product.name}</h1>
          
          ${product.inStock ? `
          <svg width="71" height="29" viewBox="0 0 71 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="71" height="29" rx="4" fill="#20B526" fill-opacity="0.2"/>
            <path d="M10.352 9.242V19H9.078V9.242H10.352ZM16.2613 11.188C17.1946 11.188 17.9506 11.4727 18.5293 12.042C19.108 12.602 19.3973 13.414 19.3973 14.478V19H18.1373V14.66C18.1373 13.8947 17.946 13.3113 17.5633 12.91C17.1806 12.4993 16.658 12.294 15.9953 12.294C15.3233 12.294 14.7866 12.504 14.3853 12.924C13.9933 13.344 13.7973 13.9553 13.7973 14.758V19H12.5233V11.328H13.7973V12.42C14.0493 12.028 14.39 11.7247 14.8193 11.51C15.258 11.2953 15.7386 11.188 16.2613 11.188ZM28.3048 19.098C27.6608 19.098 27.0821 18.986 26.5688 18.762C26.0648 18.5287 25.6681 18.2113 25.3788 17.81C25.0895 17.3993 24.9401 16.928 24.9308 16.396H26.2888C26.3355 16.8533 26.5221 17.2407 26.8488 17.558C27.1848 17.866 27.6701 18.02 28.3048 18.02C28.9115 18.02 29.3875 17.8707 29.7328 17.572C30.0875 17.264 30.2648 16.872 30.2648 16.396C30.2648 16.0227 30.1621 15.7193 29.9568 15.486C29.7515 15.2527 29.4948 15.0753 29.1868 14.954C28.8788 14.8327 28.4635 14.702 27.9408 14.562C27.2968 14.394 26.7788 14.226 26.3868 14.058C26.0041 13.89 25.6728 13.6287 25.3928 13.274C25.1221 12.91 24.9868 12.4247 24.9868 11.818C24.9868 11.286 25.1221 10.8147 25.3928 10.404C25.6635 9.99333 26.0415 9.676 26.5268 9.452C27.0215 9.228 27.5861 9.116 28.2208 9.116C29.1355 9.116 29.8821 9.34467 30.4608 9.802C31.0488 10.2593 31.3801 10.866 31.4548 11.622H30.0548C30.0081 11.2487 29.8121 10.922 29.4668 10.642C29.1215 10.3527 28.6641 10.208 28.0948 10.208C27.5628 10.208 27.1288 10.348 26.7928 10.628C26.4568 10.8987 26.2888 11.2813 26.2888 11.776C26.2888 12.1307 26.3868 12.42 26.5828 12.644C26.7881 12.868 27.0355 13.0407 27.3248 13.162C27.6235 13.274 28.0388 13.4047 28.5708 13.554C29.2148 13.7313 29.7328 13.9087 30.1248 14.086C30.5168 14.254 30.8528 14.52 31.1328 14.884C31.4128 15.2387 31.5528 16.34 31.5528 16.34C31.5528 16.816 31.4268 17.264 31.1748 17.684C30.9228 18.104 30.5495 18.4447 30.0548 18.706C29.5601 18.9673 28.9768 19.098 28.3048 19.098ZM34.9816 12.378V16.9C34.9816 17.2733 35.0609 17.5393 35.2196 17.698C35.3783 17.8473 35.6536 17.922 36.0456 17.922H36.9836V19H35.8356C35.1263 19 34.5943 18.8367 34.2396 18.51C33.8849 18.1833 33.7076 17.6467 33.7076 16.9V12.378H32.7136V11.328H33.7076V9.396H34.9816V11.328H36.9836V12.378H34.9816ZM41.8732 19.126C41.1546 19.126 40.5012 18.9627 39.9132 18.636C39.3346 18.3093 38.8772 17.8473 38.5412 17.25C38.2146 16.6433 38.0512 15.9433 38.0512 15.15C38.0512 14.366 38.2192 13.6753 38.5552 13.078C38.9006 12.4713 39.3672 12.0093 39.9552 11.692C40.5432 11.3653 41.2012 11.202 41.9292 11.202C42.6572 11.202 43.3152 11.3653 43.9032 11.692C44.4912 12.0093 44.9532 12.4667 45.2892 13.064C45.6346 13.6613 45.8072 14.3567 45.8072 15.15C45.8072 15.9433 45.6299 16.6433 45.2752 17.25C44.9299 17.8473 44.4586 18.3093 43.8612 18.636C43.2639 18.9627 42.6012 19.126 41.8732 19.126ZM41.8732 18.006C42.3306 18.006 42.7599 17.8987 43.1612 17.684C43.5626 17.4693 43.8846 17.1473 44.1272 16.718C44.3792 16.2887 44.5052 15.766 44.5052 15.15C44.5052 14.534 44.3839 14.0113 44.1412 13.582C43.8986 13.1527 43.5812 12.8353 43.1892 12.63C42.7972 12.4153 42.3726 12.308 41.9152 12.308C41.4486 12.308 41.0192 12.4153 40.6272 12.63C40.2446 12.8353 39.9366 13.1527 39.7032 13.582C39.4699 14.0113 39.3532 14.534 39.3532 15.15C39.3532 15.7753 39.4652 16.3027 39.6892 16.732C39.9226 17.1613 40.2306 17.4833 40.6132 17.698C40.9959 17.9033 41.4159 18.006 41.8732 18.006ZM47.0063 15.15C47.0063 14.3567 47.165 13.666 47.4823 13.078C47.7996 12.4807 48.2383 12.0187 48.7983 11.692C49.3676 11.3653 50.0163 11.202 50.7443 11.202C51.687 11.202 52.4616 11.4307 53.0683 11.888C53.6843 12.3453 54.0903 12.98 54.2863 13.792H52.9143C52.7836 13.3253 52.527 12.9567 52.1443 12.686C51.771 12.4153 51.3043 12.28 50.7443 12.28C50.0163 12.28 49.4283 12.532 48.9803 13.036C48.5323 13.5307 48.3083 14.2353 48.3083 15.15C48.3083 16.074 48.5323 16.788 48.9803 17.292C49.4283 17.796 50.0163 18.048 50.7443 18.048C51.3043 18.048 51.771 17.9173 52.1443 17.656C52.5176 17.3947 52.7743 17.0213 52.9143 16.536H54.2863C54.081 17.32 53.6703 17.95 53.0543 18.426C52.4383 18.8927 51.6683 19.126 50.7443 19.126C50.0163 19.126 49.3676 18.9627 48.7983 18.636C48.2383 18.3093 47.7996 17.8473 47.4823 17.25C47.165 16.6527 47.0063 15.9527 47.0063 15.15ZM60.2702 19L57.2602 15.612V19H55.9862V8.64H57.2602V14.73L60.2142 11.328H61.9922L58.3802 15.15L62.0062 19H60.2702Z" fill="#2C742F"/>
          </svg>` : ''}
        </div>
        
        <div class="flex items-center gap-3 mt-3 text-sm text-gray-500 flex-wrap">
          <div class="flex items-center gap-0.5 text-yellow-400">
            ${starsHtml}
          </div>
          <span>${product.reviewsCount} Review${product.reviewsCount > 1 ? 's' : ''}</span>
          <span class="text-gray-300">•</span>
          <span>SKU: <strong class="text-gray-700 font-medium">${product.sku}</strong></span>
        </div>

        <div class="flex items-center gap-3 mt-5 pb-5 border-b border-gray-100 flex-wrap">
          ${product.originalPrice ? `<span class="text-lg text-gray-400 line-through">$${product.originalPrice.toFixed(2)}</span>` : ''}
          <span class="text-2xl font-semibold text-[#00B207]">$${product.currentPrice.toFixed(2)}</span>
          ${product.discountLabel ? `<span class="bg-red-50 text-red-500 text-xs font-semibold px-2.5 py-1 rounded-full">${product.discountLabel}</span>` : ''}
        </div>

        <div class="flex items-center justify-between py-4 border-b border-gray-100 text-sm flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <span class="text-gray-500">Brand:</span>
            <div class="flex items-center gap-1">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.4" y="0.4" width="55.2" height="55.2" rx="3.6" fill="white" stroke="#E6E6E6" stroke-width="0.8"/>
                <path d="M17.1333 21.0016C29.2644 8.40397 43.2617 21.0016 43.2617 21.0016C43.2617 21.0016 29.2644 33.5992 17.1333 21.0016Z" fill="#36C63F"/>
                <path d="M34.8938 26.196C39.954 24.6073 43.4454 21.4993 43.5916 21.3677L44 21.0001L43.5916 20.6324C43.4454 20.5009 39.954 17.3927 34.8938 15.804C31.902 14.8648 28.9897 14.6615 26.2377 15.2C22.858 15.8613 19.7256 17.6464 16.9243 20.5054L12 20.5054L12 21.4946L16.9243 21.4946C19.7257 24.3536 22.8579 26.1388 26.2377 26.8C28.9897 27.3385 31.9021 27.1353 34.8938 26.196ZM26.4097 25.8258C23.5163 25.256 20.806 23.8006 18.3384 21.4946L25.3259 21.4946L27.9805 24.1493L28.6798 23.4498L26.7247 21.4947L32.5294 21.4947L32.5294 20.5055L29.0575 20.5055L31.0127 18.5503L30.3133 17.8509L27.6587 20.5055L22.992 20.5055L24.4806 19.0169L23.7812 18.3175L21.5931 20.5056L18.3384 20.5056C20.806 18.1996 23.5163 16.7442 26.4097 16.1743C28.9942 15.6653 31.7388 15.8551 34.5674 16.7384C38.4272 17.9438 41.4068 20.133 42.4887 21.0001C41.4067 21.8673 38.4272 24.0564 34.5674 25.2618C31.7389 26.1451 28.9942 26.3349 26.4097 25.8258Z" fill="#009F06"/>
              </svg>
            </div>
          </div>
          
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
        
        <div class="flex flex-col sm:flex-row items-center gap-4 mt-6 pb-6 border-b border-gray-100">
          <div class="flex items-center border border-gray-200 rounded-full p-1 bg-gray-50 w-full sm:w-auto justify-between gap-6 shrink-0">
            <button class="w-8 h-8 rounded-full bg-white text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors shadow-xs cursor-pointer">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="34" height="34" rx="17" fill="#F2F2F2"/>
                <path d="M12.334 17H21.6673" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <span class="text-sm font-semibold text-gray-800 min-w-[20px] text-center select-none">5</span>

            <button class="w-8 h-8 rounded-full bg-white text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors shadow-xs cursor-pointer">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="34" height="34" rx="17" fill="#F2F2F2"/>
                <path d="M12.334 17H21.6673M17.0007 12.3333V21.6666V12.3333Z" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <button class="w-full max-w-[447px] h-[51px] bg-[#00B307] hover:bg-[#00B207] text-white font-semibold rounded-full flex items-center justify-center gap-2.5 shadow-xs transition-colors cursor-pointer select-none">
            <span class="text-[15px] tracking-wide font-medium">Add to Cart</span>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.81706 6.48336H2.31706L0.650391 15.65H15.6504L13.9837 6.48336H11.4837M4.81706 6.48336V3.98336C4.81706 2.14241 6.30944 0.650024 8.15039 0.650024C9.99134 0.650024 11.4837 2.14241 11.4837 3.98336V6.48336M4.81706 6.48336H11.4837M4.81706 6.48336V8.98336M11.4837 6.48336V8.98336" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
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
    
    <!-- 2. THANH PHÂN CHIA TABS BÊN DƯỚI -->
    <div class="border-b border-gray-200 flex justify-center gap-10">
      <a href="#descriptions" class="px-2 py-4 text-base font-semibold text-gray-900 border-b-2 border-[#00B207] transition-all duration-200">
          Descriptions
      </a>
      <a href="#additional-info" class="px-2 py-4 text-base font-medium text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-[#00B207] transition-all duration-200">
          Additional Information
      </a>
      <a href="#customer-feedback" class="px-2 py-4 text-base font-medium text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-[#00B207] transition-all duration-200">
          Customer Feedback
      </a>
    </div>

    <!-- 3. NỘI DUNG TAB 1: DESCRIPTIONS -->
    <div id="descriptions" class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12">
      <div class="lg:col-span-7 space-y-6">
        <p class="text-sm text-gray-400 leading-relaxed">
          Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet nisl porttitor vel. Etiam tincidunt metus vel dui interdum sollicitudin. Mauris sem ante, vestibulum nec orci vitae, aliquam mollis lacus. Sed et condimentum arcu, id molestie tellus. Nulla facilisi. Nam scelerisque vitae justo a convallis. Morbi urna ipsum, placerat quis commodo quis, egestas elementum leo. Donec convallis mollis enim. Aliquam id mi quam. Phasellus nec fringilla elit.
        </p>
      
        <p class="text-sm text-gray-400 leading-relaxed">
          Nulla mauris tellus, feugiat quis pharetra sed, gravida ac dui. Sed iaculis, metus faucibus elementum tincidunt, turpis mi viverra velit, pellentesque tristique neque mi eget nulla. Proin luctus elementum neque et pharetra.
        </p>
        
        <div class="space-y-3.5 pt-2">
          <div class="flex items-start gap-3">
            <div class="w-5 h-5 bg-[#00B207] text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#00B307"/>
                <path d="M14.4173 7.125L8.68815 12.8542L6.08398 10.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="text-sm text-gray-400 font-light">100 g of fresh leaves provides.</span>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-5 h-5 bg-[#00B207] text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#00B307"/>
                <path d="M14.4173 7.125L8.68815 12.8542L6.08398 10.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="text-sm text-gray-400 font-light">Aliquam ac est at augue volutpat elementum.</span>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-5 h-5 bg-[#00B207] text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#00B307"/>
                <path d="M14.4173 7.125L8.68815 12.8542L6.08398 10.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="text-sm text-gray-400 font-light">Quisque nec enim eget sapien molestie.</span>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-5 h-5 bg-[#00B207] text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#00B307"/>
                <path d="M14.4173 7.125L8.68815 12.8542L6.08398 10.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="text-sm text-gray-400 font-light">Proin convallis odio volutpat finibus posuere.</span>
          </div>
        </div>
        
        <p class="text-sm text-gray-400 leading-relaxed pt-2">
          Cras et diam maximus, accumsan sapien et, sollicitudin velit. Nulla blandit eros non turpis lobortis iaculis at ut massa.
        </p>
      </div>
    
      <div class="lg:col-span-5 space-y-6">
        <div class="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xs border border-gray-100">
             <img src="${product.videoImage}" alt="video" class="w-full h-full object-contain" />
        </div>
      </div>
    </div>

    <!-- 4. NỘI DUNG TAB 2: ADDITIONAL INFORMATION -->
    <div id="additional-info" class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-16 border-t border-gray-100 mt-16">
      <div class="lg:col-span-7 space-y-4 text-sm">
        <div class="grid grid-cols-3 sm:grid-cols-4 py-1.5 border-b border-gray-50">
          <span class="text-gray-900 font-medium">Weight:</span>
          <span class="text-gray-500 col-span-2 sm:col-span-3">${product.additionalInfo.weight}</span>
        </div>

        <div class="grid grid-cols-3 sm:grid-cols-4 py-1.5 border-b border-gray-50">
          <span class="text-gray-900 font-medium">Color:</span>
          <span class="text-gray-500 col-span-2 sm:col-span-3">${product.additionalInfo.color}</span>
        </div>

        <div class="grid grid-cols-3 sm:grid-cols-4 py-1.5 border-b border-gray-50">
          <span class="text-gray-900 font-medium">Type:</span>
          <span class="text-gray-500 col-span-2 sm:col-span-3">${product.additionalInfo.type}</span>
        </div>

        <div class="grid grid-cols-3 sm:grid-cols-4 py-1.5 border-b border-gray-50">
          <span class="text-gray-900 font-medium">Category:</span>
          <span class="text-gray-500 col-span-2 sm:col-span-3">${product.additionalInfo.category}</span>
        </div>

        <div class="grid grid-cols-3 sm:grid-cols-4 py-1.5 border-b border-gray-50">
          <span class="text-gray-900 font-medium">Stock Status:</span>
          <span class="text-gray-500 col-span-2 sm:col-span-3">${product.additionalInfo.stockStatus}</span>
        </div>

        <div class="grid grid-cols-3 sm:grid-cols-4 py-1.5">
          <span class="text-gray-900 font-medium">Tags:</span>
          <span class="text-gray-500 col-span-2 sm:col-span-3">${addInfoTagsHtml}</span>
        </div>
      </div>

      <div class="lg:col-span-5 space-y-4">
        <div class="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xs border border-gray-100 bg-gray-100 flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" alt="Promo Banner" class="w-full h-full object-cover" />
          <div class="absolute inset-0 flex items-center justify-center bg-black/10">
            <button class="w-14 h-14 bg-[#00B207] hover:bg-[#009e06] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer">
              <svg class="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        </div>

        <div class="p-4 rounded-xl border border-gray-100 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-[#00B207]/10 flex items-center justify-center shrink-0 text-[#00B207]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 2 0 010 2.828l-7 7a2 2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
            </div>
            <div>
              <h4 class="text-xs font-semibold text-gray-900">${product.additionalInfo.discount}</h4>
              <p class="text-[11px] text-gray-400 mt-0.5">${product.additionalInfo.discountSub}</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-[#00B207]/10 flex items-center justify-center shrink-0 text-[#00B207]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            </div>
            <div>
              <h4 class="text-xs font-semibold text-gray-900">${product.additionalInfo.organic}</h4>
              <p class="text-[11px] text-gray-400 mt-0.5">${product.additionalInfo.organicSub}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. NỘI DUNG TAB 3: CUSTOMER FEEDBACK -->
    <div id="customer-feedback" class="max-w-4xl pt-16 border-t border-gray-100 mt-16 space-y-6">
      <h3 class="text-xl font-semibold text-gray-900">Customer Feedback</h3>
      <div class="divide-y divide-gray-100">
        ${feedbacksHtml}
      </div>

      <div class="pt-2">
        <button class="bg-[#00B207]/10 hover:bg-[#00B207]/20 text-[#00B207] font-semibold text-sm py-2.5 px-8 rounded-full transition-all duration-200 cursor-pointer">
          Load More
        </button>
      </div>
    </div>

  </div>
  `;
}