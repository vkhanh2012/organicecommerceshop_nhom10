// src/components/navigation.js
// Mobile-first: mặc định layout mobile — menu 6 link ẩn sau nút hamburger
// (chỉ hiện trên mobile, dùng md:hidden), desktop hiện thanh ngang luôn (md:flex).
// Toàn bộ style viết trực tiếp bằng Tailwind utility ngay trong file này
// (không qua components.css) vì chỉ Navigation dùng, không component nào khác tái sử dụng.
import {
  iconHeart,
  iconCart,
  iconPhone,
  iconLocation,
  iconMenu,
  iconClose,
} from "./icons.js"

const NAV_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "Shop", href: "/shop" },
  { label: "Pages", href: "/pages" },
  { label: "Blog", href: "/descriptions.html" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
]

const linkClass =
  "block md:inline text-sm font-medium font-poppins text-neutral-400 hover:text-white transition-colors py-2.5 md:py-0 border-b border-white/10 md:border-none"
const linkActiveClass =
  "block md:inline text-sm font-medium font-poppins text-white py-2.5 md:py-0 border-b border-white/10 md:border-none"
const currentPage = NAV_LINKS.find((link) => link.active) || {
  label: "Home",
  href: "/",
}

export function renderNavigationComponent({
  cartCount = 2,
  cartTotal = "$57.00",
  activeHref = "/",
} = {}) {
  const linksHtml = NAV_LINKS.map((link) => {
    const isActive = link.href === activeHref || link.active
    return `<a href="${link.href}" class="${isActive ? linkActiveClass : linkClass}">${link.label}</a>`
  }).join("")

  return `
  <header data-nav-root>
    <!-- Small-one: thanh trên cùng — mobile: chỉ hiện Sign In/Sign Up, ẩn địa chỉ dài -->
    <div class="w-full bg-white border-b border-neutral-100">
      <div class="container-custom flex items-center justify-between py-2 md:py-3 font-poppins text-xs text-neutral-600 gap-3">
        <div class="items-center gap-2 hidden md:flex">
          ${iconLocation}
          <span>Store location: Lincoln - 344, Illinois, Chicago, USA</span>
        </div>
        <div class="flex items-center gap-3 md:gap-4">
          <span class="hidden sm:inline">Eng</span>
          <span class="hidden sm:inline">USD</span>
          <span>Sign In / Sign Up</span>
        </div>
      </div>
    </div>

    <!-- Middle: mobile = [hamburger] [logo] [wishlist/cart]; search xuống hàng riêng full-width -->
    <div class="w-full bg-white">
      <div class="container-custom flex flex-wrap items-center justify-between gap-3 py-3 md:py-5">
        <button type="button" class="flex items-center justify-center w-9 h-9 text-neutral-900 md:hidden" data-nav-toggle aria-label="Mở menu" aria-expanded="false">
          ${iconMenu}
        </button>

        <a href="/" class="flex items-center gap-2 font-poppins font-medium text-2xl md:text-[32px] leading-none text-brand-wordmark tracking-tight">
          <img src="/images/plant.jpg" alt="Logo" class="w-8 h-8 md:w-10 md:h-10 object-contain" /> <span>Ecobazar</span>
        </a>

        <form class="flex items-stretch w-full md:w-auto md:max-w-[400px] border border-neutral-100 rounded-md overflow-hidden order-3 md:order-none" role="search">
          <input class="flex-1 min-w-0 px-4 py-2.5 md:py-3 text-sm md:text-[15px] text-neutral-500 outline-none font-poppins" type="text" placeholder="Search" />
          <button class="px-4 md:px-6 py-2.5 md:py-3 bg-primary text-white text-sm font-semibold font-poppins hover:bg-primary-dark transition-colors whitespace-nowrap" type="submit">Search</button>
        </form>

        <div class="flex items-center gap-4">
          <button class="relative w-8 h-8 items-center justify-center text-neutral-800 hidden sm:flex" aria-label="Wishlist" type="button">
            ${iconHeart}
          </button>
          <button class="relative w-8 h-8 flex items-center justify-center text-neutral-800" aria-label="Giỏ hàng" type="button" id="nav-cart-btn">
            ${iconCart}
            <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-dark text-white text-[10px] flex items-center justify-center border-2 border-white">${cartCount}</span>
          </button>
          <div class="leading-tight hidden sm:block">
            <div class="text-[11px] text-neutral-700 font-poppins">Shopping cart:</div>
            <div class="text-sm font-medium text-neutral-900 font-poppins">${cartTotal}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nav Links: mobile = ẩn mặc định, xổ ra khi bấm hamburger; desktop (md:) = luôn hiện, nút hamburger biến mất -->
    <div class="w-full bg-neutral-800 hidden md:block" data-nav-panel>
      <div class="container-custom flex flex-col md:flex-row gap-2 md:gap-4 py-2 md:py-4 items-stretch md:items-center">
        <nav class="flex flex-col md:flex-row gap-0 md:gap-8 items-stretch md:items-center">${linksHtml}</nav>
        <div class="flex items-center gap-2 text-sm font-medium font-poppins text-white py-2.5 md:py-0">
          ${iconPhone}
          <span>(219) 555-0114</span>
        </div>
      </div>
    </div>
  </header>
  `
}

/**
 * Gắn sự kiện đóng/mở menu mobile (hamburger). Nút hamburger chỉ tồn tại/hiện
 * trên mobile (class md:hidden) — từ md: trở lên menu luôn hiện sẵn, không cần bấm.
 */
export function bindNavigationEvents(rootEl) {
  const root = rootEl.querySelector("[data-nav-root]") || rootEl
  const toggle = root.querySelector("[data-nav-toggle]")
  const panel = root.querySelector("[data-nav-panel]")
  if (!toggle || !panel) return

  toggle.addEventListener("click", () => {
    const isOpen = !panel.classList.contains("hidden")
    panel.classList.toggle("hidden")
    toggle.setAttribute("aria-expanded", String(!isOpen))
    toggle.innerHTML = isOpen ? iconMenu : iconClose
  })
}
