// src/components/navigation.js
import { iconHeart, iconCart, iconPhone, iconLocation, iconMenu, iconClose } from "./icons.js";

const NAV_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "Shop", href: "/shop.html" },
  { label: "Pages", href: "/pages" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const LINK_BASE_CLASS = "block md:inline text-sm font-medium font-poppins py-2.5 md:py-0 border-b border-white/10 md:border-none";
const LINK_NORMAL_CLASS = `${LINK_BASE_CLASS} text-neutral-400 hover:text-white transition-colors`;
const LINK_ACTIVE_CLASS = `${LINK_BASE_CLASS} text-white`;

function checkIsActive(linkHref, currentHref) {
  let currentPath = currentHref;
  if (currentHref === "/index.html" || currentHref === "/Homepage_01.html") {
    currentPath = "/";
  }
  return linkHref === currentPath;
}

export function renderNavigationComponent({
  cartCount = 0,
  cartTotal = "$0.00",
  activeHref = "/",
} = {}) {
  
  const linksHtml = NAV_LINKS.map((link) => {
    const isActive = checkIsActive(link.href, activeHref);
    
    if (isActive) {
      return `<a href="${link.href}" class="${LINK_ACTIVE_CLASS}">${link.label}</a>`;
    } else {
      return `<a href="${link.href}" class="${LINK_NORMAL_CLASS}">${link.label}</a>`;
    }
  }).join("");

  return `
  <header data-nav-root>
    <div class="w-full bg-white border-b border-neutral-100">
      <div class="container-custom flex items-center justify-between py-2 md:py-3 font-poppins text-xs text-neutral-600 gap-3">
        <div class="items-center gap-2 hidden md:flex">
          ${iconLocation}
          <span>Store location: Lincoln - 344, Illinois, Chicago, USA</span>
        </div>
        <div class="flex items-center gap-3 md:gap-4">
          <span class="hidden sm:inline">Eng</span>
          <span class="hidden sm:inline">USD</span>
          <div class="flex items-center gap-1">
            <a href="#" class="hover:text-primary transition-colors">Sign In</a>
            <span class="text-neutral-300">/</span>
            <a href="#" class="hover:text-primary transition-colors">Sign Up</a>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full bg-white">
      <div class="container-custom flex flex-wrap items-center justify-between gap-3 py-3 md:grid md:grid-cols-[auto_minmax(320px,498px)_auto] md:gap-x-8 md:py-5">
        
        <button type="button" class="flex items-center justify-center w-9 h-9 text-neutral-900 md:hidden" data-nav-toggle aria-label="Mở menu" aria-expanded="false">
          ${iconMenu}
        </button>

        <a href="/Homepage_01.html" class="flex items-center gap-2 font-poppins font-medium text-2xl md:text-[32px] leading-none text-brand-wordmark tracking-tight md:justify-self-start">
          <img src="/images/plant.jpg" alt="Logo" class="w-8 h-8 md:w-10 md:h-10 object-contain" /> <span>Ecobazar</span>
        </a>

        <form class="flex items-stretch w-full border border-neutral-100 rounded-md overflow-hidden order-3 md:order-none md:w-full md:max-w-[498px] md:justify-self-center" role="search">
          <input class="flex-1 min-w-0 h-[45px] px-4 text-sm md:text-[15px] text-neutral-500 outline-none font-poppins" type="text" placeholder="Search" />
          <button class="h-[45px] px-4 md:px-6 bg-primary text-white text-sm font-semibold font-poppins hover:bg-primary-dark transition-colors whitespace-nowrap" type="submit">Search</button>
        </form>

        <div class="flex items-center gap-4 md:justify-self-end">
          <button class="relative w-8 h-8 items-center justify-center text-neutral-800 hidden sm:flex" aria-label="Wishlist" type="button">
            ${iconHeart}
          </button>
          
          <a
  href="./cart.html"
  class="relative w-8 h-8 flex items-center justify-center text-neutral-800"
  aria-label="Giỏ hàng"
  id="nav-cart-btn"
>
  ${iconCart}
  <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-dark text-white text-[10px] flex items-center justify-center border-2 border-white">
    ${cartCount}
  </span>
</a>
          
          <div class="leading-tight hidden sm:block">
            <div class="text-[11px] text-neutral-700 font-poppins">Shopping cart:</div>
            <div class="text-sm font-medium text-neutral-900 font-poppins">${cartTotal}</div>
          </div>
        </div>

      </div>
    </div>

    <div class="w-full bg-neutral-800 hidden md:block" data-nav-panel>
      <div class="container-custom flex flex-col md:flex-row gap-2 md:gap-4 py-2 md:py-4 items-stretch md:items-center">
        <nav class="flex flex-col md:flex-row gap-0 md:gap-8 items-stretch md:items-center">
          ${linksHtml}
        </nav>
        <div class="flex items-center gap-2 text-sm font-medium font-poppins text-white py-2.5 md:ml-auto md:py-0">
          ${iconPhone}
          <span>(219) 555-0114</span>
        </div>
      </div>
    </div>
  </header>
  `;
}

export function bindNavigationEvents(rootEl) {
  const root = rootEl.querySelector("[data-nav-root]") || rootEl;
  
  const toggleBtn = root.querySelector("[data-nav-toggle]");
  const navPanel = root.querySelector("[data-nav-panel]");
  
  if (!toggleBtn || !navPanel) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = !navPanel.classList.contains("hidden");
    
    navPanel.classList.toggle("hidden");
    toggleBtn.setAttribute("aria-expanded", String(!isOpen));
    
    if (isOpen) {
      toggleBtn.innerHTML = iconMenu;
    } else {
      toggleBtn.innerHTML = iconClose;
    }
  });
}
