// src/components/navigation.js
import {
  iconHeart,
  iconCart,
  iconPhone,
  iconLocation,
  iconMenu,
  iconClose,
} from "./icons.js";
import { renderCartPopup } from "../pages/cartPopup.js";
import { getImageUrl } from "../utils/assets.js";
import { removeProduct, saveCart } from "../shopping_cart/cartData.js";

const NAV_LINKS = [
  { label: "Home", href: "./index.html", active: true },
  { label: "Shop", href: "./shop.html" },
  { label: "Pages", href: "/pages" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const LINK_BASE_CLASS = [
  "block",
  "md:inline",
  "text-sm",
  "font-medium",
  "font-poppins",
  "py-2.5",
  "md:py-0",
  "border-b",
  "border-white/10",
  "md:border-none",
].join(" ");

const LINK_NORMAL_CLASS = [
  LINK_BASE_CLASS,
  "text-neutral-400",
  "hover:text-white",
  "transition-colors",
].join(" ");

const LINK_ACTIVE_CLASS = `${LINK_BASE_CLASS} text-white`;

function checkIsActive(linkHref, currentHref) {
  const currentPage = currentHref.split("/").pop() || "index.html";
  return linkHref.replace("./", "") === currentPage;
}

export function renderNavigationComponent({
  cartCount = 0,
  cartTotal = "$0.00",
  cartItems = [],
  activeHref = "/",
} = {}) {
  const linksHtml = NAV_LINKS.map((link) => {
    const isActive = checkIsActive(link.href, activeHref);

    if (isActive) {
      return `
        <a 
          href="${link.href}" 
          class="${LINK_ACTIVE_CLASS}"
        >
          ${link.label}
        </a>
      `;
    }

    return `
      <a 
        href="${link.href}" 
        class="${LINK_NORMAL_CLASS}"
      >
        ${link.label}
      </a>
    `;
  }).join("");

  return `
    <header data-nav-root>
      <!-- Topbar -->
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

      <!-- Main Header -->
      <div class="w-full bg-white">
        <div class="container-custom flex flex-wrap items-center justify-between gap-3 py-3 md:grid md:grid-cols-[auto_minmax(320px,498px)_auto] md:gap-x-8 md:py-5">
          
          <!-- Mobile Menu Toggle -->
          <button 
            type="button" 
            class="flex items-center justify-center w-9 h-9 text-neutral-900 md:hidden" 
            data-nav-toggle 
            aria-label="Mở menu" 
            aria-expanded="false"
          >
            ${iconMenu}
          </button>

          <!-- Logo -->
          <a 
            href="./index.html" 
            class="flex items-center gap-2 font-poppins font-medium text-2xl md:text-[32px] leading-none text-brand-wordmark tracking-tight md:justify-self-start"
          >
            <img 
              src="${getImageUrl("/images/plant.jpg")}" 
              alt="Logo" 
              class="w-8 h-8 md:w-10 md:h-10 object-contain" 
            /> 
            <span>Ecobazar</span>
          </a>

          <!-- Search Bar -->
          <form 
            class="flex items-stretch w-full border border-neutral-100 rounded-md overflow-hidden order-3 md:order-none md:w-full md:max-w-[498px] md:justify-self-center" 
            role="search"
          >
            <input 
              type="text" 
              placeholder="Search" 
              class="flex-1 min-w-0 h-[45px] px-4 text-sm md:text-[15px] text-neutral-500 outline-none font-poppins" 
            />
            <button 
              type="submit"
              class="h-[45px] px-4 md:px-6 bg-primary text-white text-sm font-semibold font-poppins hover:bg-primary-dark transition-colors whitespace-nowrap" 
            >
              Search
            </button>
          </form>

          <!-- Action Icons (Wishlist, Cart) -->
          <div class="flex items-center gap-4 md:justify-self-end">
            <button 
              type="button"
              class="relative w-8 h-8 items-center justify-center text-neutral-800 hidden sm:flex" 
              aria-label="Wishlist" 
            >
              ${iconHeart}
            </button>
            
            <button 
              type="button"
              class="relative flex h-8 w-8 cursor-pointer items-center justify-center text-neutral-800" 
              aria-label="Mở giỏ hàng" 
              data-cart-open
            >
              ${iconCart}
              <span class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-primary-dark text-[10px] text-white">
                ${cartCount}
              </span>
            </button>
            
            <div class="leading-tight hidden sm:block">
              <div class="text-[11px] text-neutral-700 font-poppins">Shopping cart:</div>
              <div class="text-sm font-medium text-neutral-900 font-poppins">${cartTotal}</div>
            </div>
          </div>

        </div>
      </div>

      <!-- Navigation Panel -->
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
      
      ${renderCartPopup(cartItems)}
    </header>
  `;
}

export function bindNavigationEvents(rootEl, cartItems = []) {
  const root = rootEl.querySelector("[data-nav-root]") || rootEl;
  const toggleBtn = root.querySelector("[data-nav-toggle]");
  const navPanel = root.querySelector("[data-nav-panel]");

  if (toggleBtn && navPanel) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = !navPanel.classList.contains("hidden");

      navPanel.classList.toggle("hidden");
      toggleBtn.setAttribute("aria-expanded", String(!isOpen));

      toggleBtn.innerHTML = isOpen ? iconMenu : iconClose;
    });
  }

  const overlay = root.querySelector("[data-cart-overlay]");
  const popup = root.querySelector("[data-cart-popup]");

  root.querySelector("[data-cart-open]")?.addEventListener("click", () => {
    overlay?.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  });

  const closePopup = () => {
    overlay?.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  };

  root.querySelector("[data-cart-close]")?.addEventListener("click", closePopup);
  
  overlay?.addEventListener("click", (event) => {
    if (!popup?.contains(event.target)) {
      closePopup();
    }
  });

  root.querySelectorAll("[data-popup-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.popupRemove);
      const updatedCart = removeProduct(cartItems, productId);
      
      saveCart(updatedCart);
      location.reload();
    });
  });
}
