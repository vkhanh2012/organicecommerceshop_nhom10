import breadcrumbsSvg from '../assets/images/breadcrumbs.svg';

const BREADCRUMB_DATA = [
  {
    id: "bc-1",
    title: "Thanh điều hướng",
    backgroundImage: breadcrumbsSvg, 
    active: true,
  }
];


export function renderBreadCrumb(breadcrumbsData = BREADCRUMB_DATA) {
  // Duyệt qua mảng dữ liệu bằng .map() để sinh mã HTML động
  const breadcrumbsHtml = breadcrumbsData
    .map(
      (items) => /*html*/ `
        <!-- Sử dụng biến ảnh tĩnh đã import để chèn tự động vào thuộc tính src -->
        <img src="${items.backgroundImage}" alt="${items.title}" class="w-full h-full object-cover" />
      `
    )
    .join("");
    return /*html*/ `
<div class="relative flex h-24 w-full items-center justify-between bg-zinc-900 px-8 text-sm font-medium text-zinc-400 select-none">
   <div class="absolute inset-y-0 right-0 h-full w-auto pointer-events-none opacity-80 mix-blend-lighten">
     ${breadcrumbsHtml}
</div>
  
  <!-- Lớp phủ mờ  -->
  <div class="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-transparent"></div>

  <!-- Thanh điều hướng Breadcrumb -->
  <div class="container-custom py-4">
    <nav class="relative z-10 flex items-center gap-2">
    
    <a href="#" class="hover:text-white transition">
      <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 7.75L8.75 0.75L16.75 7.75V17.75H11.75V13.75C11.75 12.9544 11.4339 12.1913 10.8713 11.6287C10.3087 11.0661 9.54565 10.75 8.75 10.75C7.95435 10.75 7.19129 11.0661 6.62868 11.6287C6.06607 12.1913 5.75 12.9544 5.75 13.75V17.75H0.75V7.75Z" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    </a>
    
    <span class="text-zinc-600">></span>
    
    <a href="#" class="hover:text-white transition">Category</a>
    
    <span class="text-zinc-600">></span>
    
    <a href="#" class="hover:text-white transition">Vegetables</a>
    
    <span class="text-zinc-600">></span>
    
 
    <span class="text-emerald-500 font-semibold">Chinese Cabbage</span>
  </nav>
  </div>
</div>
    `;
  }
