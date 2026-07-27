import { SOCIAL_ICONS, iconStar } from "../components/icons.js";

import cabbage1Svg from "../assets/images/cabbage1.svg";
import cabbage2Svg from "../assets/images/cabbage2.svg";
import cabbage3Svg from "../assets/images/cabbage3.svg";
import cabbage4Svg from "../assets/images/cabbage4.svg";
import largecabageSvg from "../assets/images/largecabage.svg";
import videoSvg from "../assets/images/video.svg";

export function renderDescription() {
    return /*html*/ `
    <div class="container-custom mx-auto px-4 md:px-8 pt-12">
    
    <!-- THÔNG TIN CHI TIẾT SẢN PHẨM PHÍA TRÊN (Product Top Info) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16">
      
      <!-- CỘT TRÁI: KHU VỰC HÌNH ẢNH (Bên trái) -->
      <div class="lg:col-span-6 flex flex-col sm:flex-row gap-4">
        <div class="flex sm:flex-col items-center gap-3 order-2 sm:order-1 shrink-0">
          <div class="text-gray-400 hover:text-gray-900 cursor-pointer p-1">
            <i class="fa-solid fa-chevron-up text-sm"></i>
          </div>
          
          <!-- Ảnh nhỏ 1 -->
          <div class="w-[80px] h-[90px] border border-white/20 hover:border-[#00B207] rounded-lg overflow-hidden p-1 bg-white cursor-pointer transition-all flex items-center justify-center">
            <img src="${cabbage1Svg}" alt="Chinese Cabbage Thumbnail 1" class="w-full h-full object-contain" />
          </div>
          
          <!-- Ảnh nhỏ 2 -->
          <div class="w-[80px] h-[90px] border border-white/20 hover:border-[#00B207] rounded-lg overflow-hidden p-1 bg-white cursor-pointer transition-all flex items-center justify-center">
            <img src="${cabbage2Svg}" alt="Chinese Cabbage Thumbnail 2" class="w-full h-full object-contain" />
          </div>
          
          <!-- Ảnh nhỏ 3 -->
          <div class="w-[80px] h-[90px] border border-white/20 hover:border-[#00B207] rounded-lg overflow-hidden p-1 bg-white cursor-pointer transition-all flex items-center justify-center">
            <img src="${cabbage3Svg}" alt="Chinese Cabbage Thumbnail 3" class="w-full h-full object-contain" />
          </div>
          
          <!-- Ảnh nhỏ 4 -->
          <div class="w-[80px] h-[90px] border border-white/20 hover:border-[#00B207] rounded-lg overflow-hidden p-1 bg-white cursor-pointer transition-all flex items-center justify-center">
            <img src="${cabbage4Svg}" alt="Chinese Cabbage Thumbnail 4" class="w-full h-full object-contain" />
          </div>
          
          <!-- Mũi tên cuộn xuống -->
          <div class="text-gray-400 hover:text-gray-900 cursor-pointer p-1">
            <i class="fa-solid fa-chevron-down text-sm"></i>
          </div>
        </div>
        <!-- Hình ảnh sản phẩm lớn -->
        <div class="w-full aspect-square bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-6 order-1 sm:order-2">
          <img src="${largecabageSvg}" alt="Chinese Cabbage img main" class="w-full h-full object-contain" /> />
        </div>
      </div>
      <!-- CỘT PHẢI: KHỐI THÔNG TIN CHỮ & NÚT (Bên phải) -->
      <div class="lg:col-span-6 flex flex-col justify-start">
        <div class="flex items-center gap-3 flex-wrap">
          <h1 class="text-3xl font-semibold text-gray-900">Chinese Cabbage</h1>
          <!-- In Stock -->
          <svg width="71" height="29" viewBox="0 0 71 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="71" height="29" rx="4" fill="#20B526" fill-opacity="0.2"/>
            <path d="M10.352 9.242V19H9.078V9.242H10.352ZM16.2613 11.188C17.1946 11.188 17.9506 11.4727 18.5293 12.042C19.108 12.602 19.3973 13.414 19.3973 14.478V19H18.1373V14.66C18.1373 13.8947 17.946 13.3113 17.5633 12.91C17.1806 12.4993 16.658 12.294 15.9953 12.294C15.3233 12.294 14.7866 12.504 14.3853 12.924C13.9933 13.344 13.7973 13.9553 13.7973 14.758V19H12.5233V11.328H13.7973V12.42C14.0493 12.028 14.39 11.7247 14.8193 11.51C15.258 11.2953 15.7386 11.188 16.2613 11.188ZM28.3048 19.098C27.6608 19.098 27.0821 18.986 26.5688 18.762C26.0648 18.5287 25.6681 18.2113 25.3788 17.81C25.0895 17.3993 24.9401 16.928 24.9308 16.396H26.2888C26.3355 16.8533 26.5221 17.2407 26.8488 17.558C27.1848 17.866 27.6701 18.02 28.3048 18.02C28.9115 18.02 29.3875 17.8707 29.7328 17.572C30.0875 17.264 30.2648 16.872 30.2648 16.396C30.2648 16.0227 30.1621 15.7193 29.9568 15.486C29.7515 15.2527 29.4948 15.0753 29.1868 14.954C28.8788 14.8327 28.4635 14.702 27.9408 14.562C27.2968 14.394 26.7788 14.226 26.3868 14.058C26.0041 13.89 25.6728 13.6287 25.3928 13.274C25.1221 12.91 24.9868 12.4247 24.9868 11.818C24.9868 11.286 25.1221 10.8147 25.3928 10.404C25.6635 9.99333 26.0415 9.676 26.5268 9.452C27.0215 9.228 27.5861 9.116 28.2208 9.116C29.1355 9.116 29.8821 9.34467 30.4608 9.802C31.0488 10.2593 31.3801 10.866 31.4548 11.622H30.0548C30.0081 11.2487 29.8121 10.922 29.4668 10.642C29.1215 10.3527 28.6641 10.208 28.0948 10.208C27.5628 10.208 27.1288 10.348 26.7928 10.628C26.4568 10.8987 26.2888 11.2813 26.2888 11.776C26.2888 12.1307 26.3868 12.42 26.5828 12.644C26.7881 12.868 27.0355 13.0407 27.3248 13.162C27.6235 13.274 28.0388 13.4047 28.5708 13.554C29.2148 13.7313 29.7328 13.9087 30.1248 14.086C30.5168 14.254 30.8528 14.52 31.1328 14.884C31.4128 15.2387 31.5528 15.724 31.5528 16.34C31.5528 16.816 31.4268 17.264 31.1748 17.684C30.9228 18.104 30.5495 18.4447 30.0548 18.706C29.5601 18.9673 28.9768 19.098 28.3048 19.098ZM34.9816 12.378V16.9C34.9816 17.2733 35.0609 17.5393 35.2196 17.698C35.3783 17.8473 35.6536 17.922 36.0456 17.922H36.9836V19H35.8356C35.1263 19 34.5943 18.8367 34.2396 18.51C33.8849 18.1833 33.7076 17.6467 33.7076 16.9V12.378H32.7136V11.328H33.7076V9.396H34.9816V11.328H36.9836V12.378H34.9816ZM41.8732 19.126C41.1546 19.126 40.5012 18.9627 39.9132 18.636C39.3346 18.3093 38.8772 17.8473 38.5412 17.25C38.2146 16.6433 38.0512 15.9433 38.0512 15.15C38.0512 14.366 38.2192 13.6753 38.5552 13.078C38.9006 12.4713 39.3672 12.0093 39.9552 11.692C40.5432 11.3653 41.2012 11.202 41.9292 11.202C42.6572 11.202 43.3152 11.3653 43.9032 11.692C44.4912 12.0093 44.9532 12.4667 45.2892 13.064C45.6346 13.6613 45.8072 14.3567 45.8072 15.15C45.8072 15.9433 45.6299 16.6433 45.2752 17.25C44.9299 17.8473 44.4586 18.3093 43.8612 18.636C43.2639 18.9627 42.6012 19.126 41.8732 19.126ZM41.8732 18.006C42.3306 18.006 42.7599 17.8987 43.1612 17.684C43.5626 17.4693 43.8846 17.1473 44.1272 16.718C44.3792 16.2887 44.5052 15.766 44.5052 15.15C44.5052 14.534 44.3839 14.0113 44.1412 13.582C43.8986 13.1527 43.5812 12.8353 43.1892 12.63C42.7972 12.4153 42.3726 12.308 41.9152 12.308C41.4486 12.308 41.0192 12.4153 40.6272 12.63C40.2446 12.8353 39.9366 13.1527 39.7032 13.582C39.4699 14.0113 39.3532 14.534 39.3532 15.15C39.3532 15.7753 39.4652 16.3027 39.6892 16.732C39.9226 17.1613 40.2306 17.4833 40.6132 17.698C40.9959 17.9033 41.4159 18.006 41.8732 18.006ZM47.0063 15.15C47.0063 14.3567 47.165 13.666 47.4823 13.078C47.7996 12.4807 48.2383 12.0187 48.7983 11.692C49.3676 11.3653 50.0163 11.202 50.7443 11.202C51.687 11.202 52.4616 11.4307 53.0683 11.888C53.6843 12.3453 54.0903 12.98 54.2863 13.792H52.9143C52.7836 13.3253 52.527 12.9567 52.1443 12.686C51.771 12.4153 51.3043 12.28 50.7443 12.28C50.0163 12.28 49.4283 12.532 48.9803 13.036C48.5323 13.5307 48.3083 14.2353 48.3083 15.15C48.3083 16.074 48.5323 16.788 48.9803 17.292C49.4283 17.796 50.0163 18.048 50.7443 18.048C51.3043 18.048 51.771 17.9173 52.1443 17.656C52.5176 17.3947 52.7743 17.0213 52.9143 16.536H54.2863C54.081 17.32 53.6703 17.95 53.0543 18.426C52.4383 18.8927 51.6683 19.126 50.7443 19.126C50.0163 19.126 49.3676 18.9627 48.7983 18.636C48.2383 18.3093 47.7996 17.8473 47.4823 17.25C47.165 16.6527 47.0063 15.9527 47.0063 15.15ZM60.2702 19L57.2602 15.612V19H55.9862V8.64H57.2602V14.73L60.2142 11.328H61.9922L58.3802 15.15L62.0062 19H60.2702Z" fill="#2C742F"/>
          </svg>
        </div>
        
       <!-- Dòng đánh giá sao & SKU -->
    <div class="flex items-center gap-3 mt-3 text-sm text-gray-500 flex-wrap">
          <div class="flex items-center gap-0.5 text-yellow-400">
              ${iconStar(true)}
     ${iconStar(true)}
     ${iconStar(true)}
     ${iconStar(true)}
     ${iconStar(false)} 
          </div>

          <span>4 Review</span>
          <span class="text-gray-300">•</span>
          <span>SKU: <strong class="text-gray-700 font-medium">2,51,594</strong></span>
        </div>
        <div class="flex items-center gap-3 mt-5 pb-5 border-b border-gray-100 flex-wrap">
          <span class="text-lg text-gray-400 line-through">$48.00</span>
          <span class="text-2xl font-semibold text-[#00B207]">$17.28</span>
          <span class="bg-red-50 text-red-500 text-xs font-semibold px-2.5 py-1 rounded-full">
            64% Off
          </span>
        </div>


        <!-- Brand & Share Button -->
        <div class="flex items-center justify-between py-4 border-b border-gray-100 text-sm flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <span class="text-gray-500">Brand:</span>
            <div class="flex items-center gap-1">
              <!-- Logo Brand SVG -->
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.4" y="0.4" width="55.2" height="55.2" rx="3.6" fill="white" stroke="#E6E6E6" stroke-width="0.8"/>
                <path d="M17.1333 21.0016C29.2644 8.40397 43.2617 21.0016 43.2617 21.0016C43.2617 21.0016 29.2644 33.5992 17.1333 21.0016Z" fill="#36C63F"/>
                <path d="M34.8938 26.196C39.954 24.6073 43.4454 21.4993 43.5916 21.3677L44 21.0001L43.5916 20.6324C43.4454 20.5009 39.954 17.3927 34.8938 15.804C31.902 14.8648 28.9897 14.6615 26.2377 15.2C22.858 15.8613 19.7256 17.6464 16.9243 20.5054L12 20.5054L12 21.4946L16.9243 21.4946C19.7257 24.3536 22.8579 26.1388 26.2377 26.8C28.9897 27.3385 31.9021 27.1353 34.8938 26.196ZM26.4097 25.8258C23.5163 25.256 20.806 23.8006 18.3384 21.4946L25.3259 21.4946L27.9805 24.1493L28.6798 23.4498L26.7247 21.4947L32.5294 21.4947L32.5294 20.5055L29.0575 20.5055L31.0127 18.5503L30.3133 17.8509L27.6587 20.5055L22.992 20.5055L24.4806 19.0169L23.7812 18.3175L21.5931 20.5056L18.3384 20.5056C20.806 18.1996 23.5163 16.7442 26.4097 16.1743C28.9942 15.6653 31.7388 15.8551 34.5674 16.7384C38.4272 17.9438 41.4068 20.133 42.4887 21.0001C41.4067 21.8673 38.4272 24.0564 34.5674 25.2618C31.7389 26.1451 28.9942 26.3349 26.4097 25.8258Z" fill="#009F06"/>
              </svg>
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
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.
        </p>
        <!-- Chọn số lượng, Thêm vào giỏ & Thêm vào Yêu thích -->
        <div class="flex flex-col sm:flex-row items-center gap-4 mt-6 pb-6 border-b border-gray-100">
          <!-- Chọn số lượng -->
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
            <a href="#" class="text-gray-400 font-medium hover:text-[#00B207] ml-1 transition-colors">Vegetables</a>
          </div>
      
          <div class="flex items-start gap-1 flex-wrap">
            <span class="text-black-500">Tag:</span>
            <a href="#" class="text-gray-400 hover:text-[#1A1A1A] transition-colors">Vegetables</a>
            <span class="text-gray-500">,</span>
            <a href="#" class="text-gray-400 hover:text-[#1A1A1A] transition-colors">Healthy</a>
            <span class="text-gray-500">,</span>
            <a href="#" class="text-gray-400 hover:text-[#1A1A1A] transition-colors">Chinese</a>
            <span class="text-gray-500">,</span>
            <a href="#" class="text-gray-400 hover:text-[#1A1A1A] transition-colors">Cabbage</a>
            <span class="text-gray-500">,</span>
            <a href="#" class="text-gray-400 hover:text-[#1A1A1A] transition-colors">Green Cabbage</a>
          </div>
        </div>
      </div>
    </div>
    <!-- THANH PHÂN CHIA TABS BÊN DƯỚI (Tabs Row Container) -->
    <div class="border-b border-gray-200 flex justify-center gap-10">
      <a href="#" class="px-2 py-4 text-base font-medium text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-[#00B207] transition-all duration-200">
          Descriptions
      </a>
      <a href="#" class="px-2 py-4 text-base font-medium text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-[#00B207] transition-all duration-200">
          Additional Information
      </a>
      <a href="#" class="px-2 py-4 text-base font-medium text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-[#00B207] transition-all duration-200">
          Customer Feedback
      </a>
    </div>
    <!-- PHẦN 3: NỘI DUNG CHI TIẾT -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12">
      
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
                <g clip-path="url(#clip0_460_43041)">
                <rect width="20" height="20" rx="10" fill="#00B307"/>
                <path d="M14.4173 7.125L8.68815 12.8542L6.08398 10.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_460_43041">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </div>
            <span class="text-sm text-gray-400 font-light">100 g of fresh leaves provides.</span>
          </div>
          
          <div class="flex items-start gap-3">
            <div class="w-5 h-5 bg-[#00B207] text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_460_43041)">
                <rect width="20" height="20" rx="10" fill="#00B307"/>
                <path d="M14.4173 7.125L8.68815 12.8542L6.08398 10.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_460_43041">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </div>
            <span class="text-sm text-gray-400 font-light">Aliquam ac est at augue volutpat elementum.</span>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-5 h-5 bg-[#00B207] text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_460_43041)">
                <rect width="20" height="20" rx="10" fill="#00B307"/>
                <path d="M14.4173 7.125L8.68815 12.8542L6.08398 10.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_460_43041">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </div>
            <span class="text-sm text-gray-400 font-light">Quisque nec enim eget sapien molestie.</span>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-5 h-5 bg-[#00B207] text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_460_43041)">
                <rect width="20" height="20" rx="10" fill="#00B307"/>
                <path d="M14.4173 7.125L8.68815 12.8542L6.08398 10.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_460_43041">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </div>
            <span class="text-sm text-gray-400 font-light">Proin convallis odio volutpat finibus posuere.</span>
          </div>
        </div>
        <!-- Đoạn văn kết bài -->
        <p class="text-sm text-gray-400 leading-relaxed pt-2">
          Cras et diam maximus, accumsan sapien et, sollicitudin velit. Nulla blandit eros non turpis lobortis iaculis at ut massa.
        </p>
      </div>
    
      <div class="lg:col-span-5 space-y-6">
        
        <div class="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xs border border-gray-100">
             <img src="${videoSvg}" alt="video" class="w-full h-full object-contain" />

        </div>
        <!-- Giảm giá & Thực phẩm tự nhiên -->

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <!-- Giảm giá -->
          <div class="flex items-center gap-3 p-4 border border-gray-200/80 rounded-xl bg-white shadow-xs">
            <div class="w-12 h-12 rounded-lg bg-[#00B207]/10 text-[#00B207] flex items-center justify-center shrink-0">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_460_43081)">
<path d="M28.0671 24.2501C28.326 24.2501 28.5359 24.0402 28.5359 23.7813V12.5313C28.5359 11.9718 28.3178 11.3995 27.9219 10.9198L24.4454 6.70769C24.2633 6.487 24.0539 6.301 23.8265 6.15287C23.8405 6.00962 23.8484 5.86494 23.8484 5.71887V0.468872C23.8484 0.209997 23.6385 0.00012207 23.3797 0.00012207C23.1208 0.00012207 22.9109 0.209997 22.9109 0.468872C22.9109 0.468872 22.91 5.76356 22.9096 5.78593C22.7762 5.76231 22.6409 5.75012 22.5047 5.75012H16.4422C16.0154 5.75012 15.597 5.86987 15.2224 6.08994C15.2062 6.09575 15.1902 6.10225 15.1744 6.10994L10.605 8.33568C10.0987 8.58962 9.69392 9.01556 9.46498 9.535C9.46248 9.54069 9.46011 9.54637 9.45786 9.55212L7.56861 14.3441C7.47367 14.585 7.59192 14.8572 7.83279 14.9522C7.88923 14.9744 7.94736 14.9849 8.00461 14.9849C8.19148 14.9849 8.36811 14.8724 8.44079 14.688L10.3264 9.90525C10.4682 9.58844 10.7161 9.32887 11.0204 9.17612L13.4347 8.00019L11.0249 10.9199C10.6641 11.357 10.4734 11.9143 10.4734 12.5314V28.7189C10.4734 28.9074 10.49 29.092 10.52 29.2719L5.68992 27.1316C4.59879 26.6482 4.10429 25.364 4.58779 24.269C4.58986 24.2642 4.59186 24.2594 4.59386 24.2547L7.64904 16.6619C7.74567 16.4217 7.62936 16.1487 7.38917 16.0521C7.14886 15.9554 6.87598 16.0718 6.77929 16.3119L3.72679 23.8976C3.04042 25.4632 3.74942 27.2971 5.31011 27.9886L10.9741 30.4984C10.981 30.5014 10.9881 30.5037 10.9951 30.5064C11.57 31.4046 12.5639 32.0001 13.6922 32.0001H25.2547C27.0333 32.0001 28.5359 30.4974 28.5359 28.7188V25.9688C28.5359 25.7099 28.326 25.5001 28.0672 25.5001C27.8083 25.5001 27.5984 25.7099 27.5984 25.9688V28.7188C27.5984 29.9893 26.5251 31.0626 25.2547 31.0626H13.6922C12.4343 31.0626 11.4109 30.0112 11.4109 28.7188V12.5313C11.4109 12.1289 11.5243 11.7875 11.748 11.5166L15.2244 7.30444C15.548 6.91244 15.9919 6.68756 16.4422 6.68756H22.5047C22.593 6.68756 22.681 6.6965 22.7679 6.71337C22.4745 7.71406 21.7476 8.54906 20.766 8.9675C20.5094 8.53819 20.0401 8.25006 19.5046 8.25006C18.6947 8.25006 18.0359 8.90894 18.0359 9.71881C18.0359 10.5287 18.6947 11.1876 19.5046 11.1876C20.2535 11.1876 20.8729 10.6239 20.962 9.89862C22.2244 9.42112 23.179 8.40937 23.6044 7.17444C23.6452 7.2155 23.6847 7.25869 23.7224 7.30444L27.1989 11.5166C27.4565 11.8287 27.5984 12.1891 27.5984 12.5314V23.7814C27.5984 24.0402 27.8082 24.2501 28.0671 24.2501ZM19.5046 10.2501C19.2117 10.2501 18.9734 10.0117 18.9734 9.71881C18.9734 9.42587 19.2117 9.18756 19.5046 9.18756C19.7975 9.18756 20.0359 9.42587 20.0359 9.71881C20.0359 10.0117 19.7975 10.2501 19.5046 10.2501Z" fill="#00B307"/>
<path d="M15.4424 24.9375C15.5623 24.9375 15.6823 24.8917 15.7738 24.8002L23.7738 16.8002C23.9569 16.6171 23.9569 16.3203 23.7738 16.1373C23.5908 15.9542 23.294 15.9542 23.111 16.1373L15.111 24.1373C14.8121 24.4159 15.0414 24.9517 15.4424 24.9375Z" fill="#00B307"/>
<path d="M16.4414 20C17.5614 20 18.4727 19.0887 18.4727 17.9687C18.4727 16.8487 17.5614 15.9375 16.4414 15.9375H16.3789C15.2589 15.9375 14.3477 16.8487 14.3477 17.9687C14.3477 19.0887 15.2589 20 16.3789 20H16.4414ZM15.2852 17.9687C15.2852 17.3657 15.7758 16.875 16.3789 16.875H16.4414C17.0445 16.875 17.5352 17.3657 17.5352 17.9687C17.5352 18.5718 17.0445 19.0625 16.4414 19.0625H16.3789C15.7758 19.0625 15.2852 18.5718 15.2852 17.9687Z" fill="#00B307"/>
<path d="M22.5039 24.9375H22.5664C23.6864 24.9375 24.5977 24.0262 24.5977 22.9062C24.5977 21.7862 23.6864 20.875 22.5664 20.875H22.5039C21.3839 20.875 20.4727 21.7862 20.4727 22.9062C20.4727 24.0262 21.3839 24.9375 22.5039 24.9375ZM22.5039 21.8125H22.5664C23.1695 21.8125 23.6602 22.3032 23.6602 22.9062C23.6602 23.5093 23.1695 24 22.5664 24H22.5039C21.9008 24 21.4102 23.5093 21.4102 22.9062C21.4102 22.3032 21.9008 21.8125 22.5039 21.8125Z" fill="#00B307"/>
</g>
<defs>
<clipPath id="clip0_460_43081">
<rect width="32" height="32" fill="white"/>
</clipPath>
</defs>
</svg>

            </div>
            <div class="flex flex-col text-left">
              <span class="text-sm font-semibold text-gray-900">64% Discount</span>
              <span class="text-[11px] text-gray-400 mt-0.5">Save your 64% money with us</span>
            </div>
          </div>
          <!--  100% Organic -->
          <div class="flex items-center gap-3 p-4 border border-gray-200/80 rounded-xl bg-white shadow-xs">
            <!-- Icon chiếc lá màu xanh lá cây -->
            <div class="w-12 h-12 rounded-lg bg-[#00B207]/10 text-[#00B207] flex items-center justify-center shrink-0">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_460_43091)">
<path d="M31.9759 0.871204C31.9127 0.678579 31.7368 0.545392 31.5343 0.536954C30.5147 0.494517 27.7279 0.501829 23.8822 1.4852C20.3025 2.40064 16.9433 3.90533 14.1675 5.8367C13.9472 5.99002 13.893 6.29283 14.0462 6.51314C14.1994 6.73345 14.5022 6.78777 14.7226 6.63452C17.4039 4.7687 20.6546 3.31377 24.1229 2.42683C25.4189 2.09545 26.7587 1.84389 28.029 1.68627C27.5082 1.9112 26.95 2.17439 26.369 2.48289C22.4401 4.56858 20.245 7.23552 19.032 9.3792C18.8726 8.66395 18.8289 7.84189 18.8286 7.47552C18.8285 7.2072 18.611 6.98977 18.3427 6.98977C18.0743 6.98977 17.8567 7.20733 17.8567 7.4757C17.8567 7.69077 17.8739 9.48302 18.4167 10.5878C17.6686 12.1852 16.9689 13.7821 16.2918 15.3286C16.0042 15.9855 15.7211 16.632 15.4404 17.2649C15.0026 16.4405 14.4256 14.9479 14.5839 12.9956C14.6055 12.7282 14.4063 12.4937 14.1387 12.472C13.872 12.4508 13.6368 12.6496 13.6151 12.9171C13.3877 15.7219 14.503 17.6801 14.9555 18.348C14.1074 20.2223 13.271 21.9484 12.3902 23.4217C11.9367 22.395 11.2263 20.4387 11.2263 18.2604C11.2263 17.992 11.0087 17.7745 10.7404 17.7745C10.472 17.7745 10.2544 17.992 10.2544 18.2604C10.2544 21.1498 11.372 23.6069 11.7742 24.3975C10.8119 25.8353 9.78436 26.9596 8.62367 27.6438C5.08779 23.8037 4.74292 16.5988 10.9201 9.92739C11.6223 9.16902 12.3929 8.44508 13.2107 7.77577C13.4184 7.60577 13.4489 7.29964 13.2789 7.09195C13.1089 6.88427 12.8027 6.85377 12.5951 7.0237C11.7429 7.72133 10.9394 8.47614 10.207 9.26708C3.69104 16.3043 4.05817 23.9746 7.79436 28.1765C4.54073 30.3661 0.514981 30.5029 0.472856 30.5041C0.204731 30.5113 -0.00683118 30.7344 0.000168815 31.0026C0.00710632 31.2665 0.223231 31.4758 0.485731 31.4758C0.490044 31.4758 0.494419 31.4757 0.498731 31.4756C0.685231 31.4707 4.97954 31.33 8.49723 28.8732C9.56311 29.7429 11.235 30.272 13.2621 30.272C15.557 30.272 18.3072 29.5937 21.148 27.9638C23.7798 26.4538 25.6666 24.1438 26.7561 21.0981C27.6891 18.4901 28.0037 15.3521 27.666 12.0234C27.0639 6.08933 29.3056 3.41164 31.8177 1.40202C31.9759 1.27533 32.0389 1.06383 31.9759 0.871204ZM27.6832 4.84633C26.7273 6.84727 26.4054 9.22702 26.699 12.1214C27.0222 15.3071 26.7255 18.298 25.8409 20.7707C24.8315 23.5926 23.0898 25.729 20.6643 27.1208C17.6035 28.877 15.0344 29.2749 13.418 29.2995C11.7655 29.3254 10.3365 28.9726 9.37767 28.3195C10.1757 27.8018 10.9084 27.1075 11.5969 26.2693C11.6348 26.2696 11.6757 26.2698 11.7214 26.2698C12.1986 26.2698 13.0877 26.2493 14.1367 26.1268C16.2354 25.8815 17.8898 25.3636 19.0541 24.5875C19.2774 24.4386 19.3377 24.1369 19.1889 23.9136C19.04 23.6904 18.7383 23.6301 18.515 23.7789C16.7214 24.9746 13.8324 25.2343 12.3412 25.2856C13.2865 23.9374 14.1572 22.3185 15.0159 20.5255C15.8609 20.5234 18.104 20.3406 20.2367 18.6404C20.4465 18.4731 20.481 18.1673 20.3137 17.9575C20.1464 17.7476 19.8407 17.7132 19.6309 17.8805C18.0646 19.1291 16.407 19.4518 15.4841 19.5291C16.0444 18.3166 16.6045 17.0374 17.182 15.7185C17.48 15.0377 17.7827 14.3468 18.0915 13.6512C18.1248 13.652 18.16 13.6525 18.197 13.6525C18.9295 13.6525 20.3882 13.4738 21.9912 12.2861C22.2068 12.1264 22.2521 11.822 22.0923 11.6064C21.9325 11.3908 21.6282 11.3455 21.4125 11.5053C20.4235 12.238 19.5133 12.5133 18.9238 12.6152C18.7809 12.64 18.6501 12.6556 18.5319 12.6656C18.8151 12.0371 19.1042 11.4065 19.401 10.7768C21.2114 6.93527 24.423 4.62058 26.7985 3.35527C27.8283 2.80677 28.7948 2.40214 29.5879 2.11302C28.8911 2.84727 28.2111 3.74133 27.6832 4.84633Z" fill="#00B307"/>
</g>
<defs>
<clipPath id="clip0_460_43091">
<rect width="32" height="32" fill="white"/>
</clipPath>
</defs>
</svg>

            </div>
            <div class="flex flex-col text-left">
              <span class="text-sm font-semibold text-gray-900">100% Organic</span>
              <span class="text-[11px] text-gray-400 mt-0.5">100% Organic Vegetables</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
   `;
  }