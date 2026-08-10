import breadcrumbsSvg from '../assets/images/breadcrumbs.svg';

// Dữ liệu đường dẫn mặc định
const DEFAULT_LINKS = [
  { label: "Category", href: "#" },
  { label: "Vegetables", href: "#" },
  { label: "Chinese Cabbage", active: true }
];

export function renderBreadCrumb(items = DEFAULT_LINKS) {
  // Duyệt qua mảng items để tạo các cấp điều hướng linh hoạt
  const linksHtml = items.map((item, index) => {
    const isLast = index === items.length - 1 || item.active;

    if (isLast) {
      return `<span class="text-emerald-500 font-semibold">${item.label}</span>`;
    }

    return `
      <a href="${item.href || '#'}" class="hover:text-white transition">${item.label}</a>
      <span class="text-zinc-600">></span>
    `;
  }).join("");

  return /*html*/ `
<div class="relative flex h-24 w-full items-center justify-between bg-zinc-900 px-8 text-sm font-medium text-zinc-400 select-none overflow-hidden">
   <!-- Ảnh nền SVG của bạn -->
   <div class="absolute inset-y-0 right-0 h-full w-auto pointer-events-none opacity-80 mix-blend-lighten">
     <img src="${breadcrumbsSvg}" alt="Thanh điều hướng" class="w-full h-full object-cover" />
   </div>
  
  <!-- Lớp phủ mờ -->
  <div class="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-transparent"></div>

  <!-- Thanh điều hướng Breadcrumb -->
  <div class="container-custom py-4">
    <nav class="relative z-10 flex items-center gap-2">
      <!-- Icon Trang chủ -->
      <a href="/" class="hover:text-white transition flex items-center">
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.75 7.75L8.75 0.75L16.75 7.75V17.75H11.75V13.75C11.75 12.9544 11.4339 12.1913 10.8713 11.6287C10.3087 11.0661 9.54565 10.75 8.75 10.75C7.95435 10.75 7.19129 11.0661 6.62868 11.6287C6.06607 12.1913 5.75 12.9544 5.75 13.75V17.75H0.75V7.75Z" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      
      <span class="text-zinc-600">></span>
      
      <!-- Render đường dẫn động tại đây -->
      ${linksHtml}
    </nav>
  </div>
</div>
  `;
}