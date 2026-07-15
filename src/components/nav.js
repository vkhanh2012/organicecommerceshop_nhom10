
export function renderNavigationComponent() {
    return /*html*/ `
    <body class="bg-gray-50 min-h-screen flex flex-col justify-between font-sans text-gray-800">
  <!--Small one-->
  <header class="w-full bg-white border-b border-gray-100 shadow-xs">
    <div class="w-full border-b border-gray-100 bg-white">
      <div class="max-w-[1920px] mx-auto px-4 md:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        <!-- Vị trí cửa hàng (Store Location) -->
        <div class="flex items-center gap-1.5">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>Store Location: Trường đại học mở TPHCM, Nhà Bè, TP. Hồ Chí Minh</span>
        </div>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="relative cursor-pointer flex items-center gap-1 hover:text-gray-800">
            <span>Eng</span>
            <i class="fa-solid fa-chevron-down text-[8px] mt-0.5"></i>
          </div>
          <div class="relative cursor-pointer flex items-center gap-1 hover:text-gray-800">
            <span>USD</span>
            <i class="fa-solid fa-chevron-down text-[8px] mt-0.5"></i>
          </div>
          <div class="w-[1px] h-3 bg-gray-300"></div>
          <a href="#" class="hover:text-gray-800 hover:underline transition-all">Sign in / Sign up</a>
        </div>
      </div>
    </div>
    <!--  THANH LOGO, TÌM KIẾM & GIỎ HÀNG (MIDDLE BAR) -->
    <div class="w-full bg-white">
  <div class="max-w-[1920px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
    
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 shrink-0">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31.2749 4.3428C27.4022 4.3428 21.9311 4.66683 19.1352 7.46126C17.9247 8.67176 17.3202 10.6451 17.4771 12.8787C17.4975 13.1737 17.6937 13.425 17.9756 13.5181C18.256 13.6096 18.5641 13.5239 18.7559 13.2987C20.3108 11.4691 22.2435 10.0029 24.5046 8.94062C24.6964 8.84907 24.9231 8.84178 25.1295 8.91446C25.3111 8.97985 25.4535 9.10335 25.5276 9.26179C25.6816 9.58732 25.6322 10.016 25.1207 10.2572C25.0917 10.2717 25.0655 10.2906 25.0365 10.3037C25.0263 10.3081 25.0147 10.3066 25.006 10.311C19.4346 12.9296 16.6954 17.4983 15.4514 22.1964C14.5446 16.314 12.6294 12.8511 10.8202 10.7251C9.51095 9.02787 8.22341 8.12832 7.47943 7.61976C7.34136 7.52528 6.92435 7.24049 6.7514 7.06754C6.46803 6.78417 6.46803 6.3235 6.7514 6.04013C7.03477 5.7582 7.49687 5.7582 7.81218 6.07208C7.88923 6.1404 8.01272 6.22759 8.16966 6.33222L8.29902 6.41941C9.35108 7.14015 11.31 8.47851 13.0479 11.3601C13.2034 11.6173 13.5042 11.7554 13.7963 11.7002C14.0928 11.6479 14.3252 11.4197 14.3834 11.1247C14.7627 9.18768 14.5927 6.31328 12.8649 4.5855C10.069 1.7925 4.59789 1.46847 0.726671 1.46847C0.32553 1.4684 0 1.79393 0 2.195C0 6.06765 0.324032 11.5388 3.11846 14.3347C4.28387 15.5001 6.08147 16.0233 7.86736 16.0233C9.32486 16.0233 10.7533 15.6585 11.8476 15.0264C13.3399 18.1187 14.5316 22.7383 14.5316 29.805C14.5316 30.2061 14.8571 30.5316 15.2582 30.5316C15.6592 30.5316 15.9848 30.2061 15.9848 29.805C15.9848 25.8626 16.6605 21.1311 19.173 17.2366C20.18 18.2205 21.9137 18.8439 23.8347 18.902C23.9306 18.9049 24.0251 18.9063 24.1195 18.9063C26.0711 18.9063 27.796 18.2946 28.8815 17.2076C31.6773 14.4117 31.9999 8.94055 31.9999 5.06783C32.0015 4.66683 31.6774 4.3428 31.2749 4.3428Z" fill="#00B307"/>
      </svg>
      <span class="text-gray-900 text-3xl font-semibold tracking-tight">Ecobazar</span>
    </a>

    <!-- Search -->
    <form class="flex items-center w-full max-w-[500px] border border-gray-200 rounded-md overflow-hidden focus-within:border-[#00B207] focus-within:ring-2 focus-within:ring-[#00B207]/10 transition-all">
      <div class="flex items-center pl-4 text-gray-400">
        <i class="fa-solid fa-magnifying-glass text-sm"></i>
      </div>
      <input 
        type="text" 
        placeholder="Search" 
        class="w-full py-2.5 px-3 text-sm text-gray-800 placeholder-gray-400 outline-none"
        required
      />
      <button type="submit" class="bg-[#00B207] hover:bg-[#009e06] text-white text-sm font-semibold py-3 px-6 transition-colors cursor-pointer shrink-0">
        Search
      </button>
    </form>

    <!-- Trái tim & Giỏ hàng -->
    <div class="flex items-center gap-4 shrink-0">
      <!-- Heart -->
<svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.587 24.5498C-12.0791 9.81093 6.58751 -6.18907 14.587 3.92834C22.5875 -6.18907 41.2542 9.81093 14.587 24.5498Z" stroke="#1A1A1A" stroke-width="1.5"/>
      </svg>

      <div class="w-[1px] h-6 bg-gray-200"></div>

      <!-- Shopping Cart (đã sửa) -->
      <a href="#" class="flex items-center gap-3 group">
        <div class="relative text-gray-800 group-hover:text-[#00B207] transition-colors">
          <svg class="w-7 h-7" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.83333 10.6667H3.58333L0.75 26.25H26.25L23.4167 10.6667H19.1667M7.83333 10.6667V6.41667C7.83333 3.28705 10.3704 0.75 13.5 0.75C16.6296 0.75 19.1667 3.28705 19.1667 6.41667V10.6667M7.83333 10.6667H19.1667M7.83333 10.6667V14.9167M19.1667 10.6667V14.9167" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!-- Badge số lượng -->
          <span class="absolute -top-1.5 -right-1.5 bg-[#00B207] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">0</span>
        </div>
        <!-- Text giỏ hàng -->
        <div class="flex flex-col text-left leading-none">
          <span class="text-[10px] text-gray-400 uppercase tracking-wider font-light">Shopping cart:</span>
          <span class="text-sm font-semibold text-gray-900 mt-0.5">0.00</span>
        </div>
      </a>
    </div>

  </div>
</div>

    <!--  NAVIGATION LINK -->
    <nav class="w-full bg-[#1A1A1A] text-gray-300">
      <div class="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
       <div class="flex items-center gap-6 text-sm font-medium tracking-wide flex-wrap">

  <div class="flex items-center">
    <a href="#" class="flex items-center gap-1 text-white hover:text-white transition-colors">
      <span>Home</span>
      <i class="fa-solid fa-chevron-down text-[8px] mt-0.5 opacity-80"></i>
    </a>
  </div>

  <div class="flex items-center">
    <a href="#" class="flex items-center gap-1 hover:text-white transition-colors">
      <span>Shop</span>
      <i class="fa-solid fa-chevron-down text-[8px] mt-0.5 opacity-80"></i>
    </a>
  </div>

  <div class="flex items-center">
    <a href="#" class="flex items-center gap-1 hover:text-white transition-colors">
      <span>Pages</span>
      <i class="fa-solid fa-chevron-down text-[8px] mt-0.5 opacity-80"></i>
    </a>
  </div>

  <div class="flex items-center">
    <a href="#" class="flex items-center gap-1 hover:text-white transition-colors">
      <span>Blog</span>
      <i class="fa-solid fa-chevron-down text-[8px] mt-0.5 opacity-80"></i>
    </a>
  </div>

  <div class="flex items-center">
    <a href="#" class="hover:text-white transition-colors">
      About Us
    </a>
  </div>

  <div class="flex items-center">
    <a href="#" class="hover:text-white transition-colors">
      Contact Us
    </a>
  </div>

</div>
        <div class="flex items-center gap-2 text-white font-medium text-sm hover:text-[#00B207] transition-colors shrink-0">
          <i class="fa-solid fa-phone-volume text-sm opacity-90"></i>
          <a href="tel:123456789" class="tracking-wider">(+84) 123456789</a>
        </div>
      </div>
    </nav>
</header>
    `;
}
