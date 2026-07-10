// src/components/navigation.js
// Mobile-first: mặc định layout mobile — menu 6 link ẩn sau nút hamburger
// (chỉ hiện trên mobile, dùng md:hidden), desktop hiện thanh ngang luôn (md:flex).
import { iconHeart, iconCart, iconPhone, iconLocation, iconMenu, iconClose } from "./icons.js";

const NAV_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "Shop", href: "/shop" },
  { label: "Pages", href: "/pages" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function renderNavigationComponent({
  cartCount = 0,
  cartTotal = "$0.00",
  activeHref = "/",
} = {}) {
  const linksHtml = NAV_LINKS.map((link) => {
    const isActive = link.href === activeHref || link.active;
    return `<a href="${link.href}" class="${isActive ? "nav-link-active" : "nav-link"}">${link.label}</a>`;
  }).join("");

  return `
  <header data-nav-root>
    <!-- Small-one: thanh trên cùng — mobile: chỉ hiện Sign In/Sign Up, ẩn địa chỉ dài -->
    <div class="nav-small-one-bar">
      <div class="nav-small-one-inner">
        <div class="nav-small-one-left hidden md:flex">
          ${iconLocation}
          <span>Store location: Lincoln - 344, Illinois, Chicago, USA</span>
        </div>
        <div class="nav-small-one-right">
          <span class="hidden sm:inline">Eng</span>
          <span class="hidden sm:inline">USD</span>
          <span>Sign In / Sign Up</span>
        </div>
      </div>
    </div>

    <!-- Middle: mobile = [hamburger] [logo] [wishlist/cart]; search xuống hàng riêng full-width -->
    <div class="nav-middle-bar">
      <div class="nav-middle-inner">
        <button type="button" class="nav-menu-toggle md:hidden" data-nav-toggle aria-label="Mở menu" aria-expanded="false">
          ${iconMenu}
        </button>

        <a href="/" class="flex items-center gap-2">
          <img
             src="/images/plant.jpg"
             alt="Ecobazar Logo"
             class="w-8 h-8 object-contain"
           />
         <span class="nav-logo-text">Ecobazar</span>
        </a>

        <form class="nav-search-form order-3 md:order-none" role="search">
          <input class="nav-search-input" type="text" placeholder="Search" />
          <button class="nav-search-button" type="submit">Search</button>
        </form>

        <div class="flex items-center gap-4">
          <button class="nav-icon-btn hidden sm:flex" aria-label="Wishlist" type="button">
            ${iconHeart}
          </button>
          <button class="nav-icon-btn" aria-label="Giỏ hàng" type="button" id="nav-cart-btn">
            ${iconCart}
            <span class="nav-cart-badge">${cartCount}</span>
          </button>
          <div class="leading-tight hidden sm:block">
            <div class="nav-cart-label">Shopping cart:</div>
            <div class="nav-cart-value">${cartTotal}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nav Links: mobile = ẩn mặc định, xổ ra khi bấm hamburger; desktop (md:) = luôn hiện, nút hamburger biến mất -->
    <div class="nav-links-bar hidden md:block" data-nav-panel>
      <div class="nav-links-inner flex-col md:flex-row items-stretch md:items-center">
        <nav class="nav-links-list flex-col md:flex-row items-stretch md:items-center">${linksHtml}</nav>
        <div class="nav-phone">
          ${iconPhone}
          <span>(219) 555-0114</span>
        </div>
      </div>
    </div>
  </header>
  `;
}

/**
 * Gắn sự kiện đóng/mở menu mobile (hamburger). Nút hamburger chỉ tồn tại/hiện
 * trên mobile (class md:hidden) — từ md: trở lên menu luôn hiện sẵn, không cần bấm.
 */
export function bindNavigationEvents(rootEl) {
  const root = rootEl.querySelector("[data-nav-root]") || rootEl;
  const toggle = root.querySelector("[data-nav-toggle]");
  const panel = root.querySelector("[data-nav-panel]");
  if (!toggle || !panel) return;

  toggle.addEventListener("click", () => {
    const isOpen = !panel.classList.contains("hidden");
    panel.classList.toggle("hidden");
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.innerHTML = isOpen ? iconMenu : iconClose;
  });
}