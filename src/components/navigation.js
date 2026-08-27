import {
  iconHeaderHeart,
  iconHeaderCart,
  iconPhone,
  iconLocation,
  iconMenu,
  iconClose,
  dropDown,
} from "./icons.js";
import { renderCartPopup } from "../pages/cartPopup.js";
import { getImageUrl } from "../utils/assets.js";
import { removeProduct, saveCart } from "../shopping_cart/cartData.js";

const NAV_LINKS = [
  { label: "Home", href: "./index.html", dropdown: true },
  { label: "Shop", href: "./shop.html", dropdown: true },
  { label: "Pages", href: "./descriptions.html", dropdown: true },
  { label: "Blog", href: "#", dropdown: true },
  { label: "About Us", href: "./about.html" },
  { label: "Contact Us", href: "#" },
  { label: "Shop 2", href: "./shop2.html" },
];

const LINK_BASE_CLASS = [
  "flex",
  "items-center",
  "justify-between",
  "gap-1.5",
  "py-2.5",
  "font-poppins",
  "text-sm",
  "font-medium",
  "transition-colors",
  "lg:inline-flex",
  "lg:justify-start",
  "lg:border-none",
  "lg:py-0",
].join(" ");

function getPageName(href = "") {
  const cleanHref = String(href).split(/[?#]/)[0];
  const pageName = cleanHref.split("/").pop();
  return pageName || "index.html";
}

function checkIsActive(linkHref, currentHref) {
  if (!linkHref || linkHref === "#") return false;
  return getPageName(linkHref) === getPageName(currentHref);
}

export function renderNavigationComponent({
  cartCount = 0,
  cartTotal = "$0.00",
  cartItems = [],
  activeHref = "/",
  variant,
} = {}) {
  const isHome = variant
    ? variant === "home"
    : getPageName(activeHref) === "index.html";
  const hasDarkMenu = isHome || getPageName(activeHref) === "shop2.html";

  const topbarClass = hasDarkMenu
    ? "border-b border-neutral-100 bg-white text-neutral-600"
    : "border-b border-neutral-700 bg-neutral-800 text-neutral-300";

  const navPanelClass = hasDarkMenu
    ? "bg-neutral-800"
    : "border-b border-neutral-100 bg-white";

  const normalLinkClass = hasDarkMenu
    ? "border-b border-white/10 text-neutral-400 hover:text-white"
    : "border-b border-neutral-100 text-neutral-600 hover:text-primary";

  const activeLinkClass = hasDarkMenu
    ? "border-b border-white/10 text-white"
    : "border-b border-neutral-100 text-primary";

  const phoneClass = hasDarkMenu
    ? "text-white"
    : "text-neutral-900";

  const linksHtml = NAV_LINKS.map((link) => {
    const isActive = checkIsActive(link.href, activeHref);
    const stateClass = isActive ? activeLinkClass : normalLinkClass;

    return `
      <a
        href="${link.href}"
        class="${LINK_BASE_CLASS} ${stateClass}"
        ${isActive ? 'aria-current="page"' : ""}
      >
        <span>${link.label}</span>
        ${link.dropdown ? `<span class="shrink-0">${dropDown}</span>` : ""}
      </a>
    `;
  }).join("");

  return `
    <header class="font-poppins" data-nav-root>
      <!-- Topbar: Home trắng, các trang trong màu tối theo Figma -->
      <div class="w-full ${topbarClass}">
        <div class="container-custom flex h-[42px] items-center justify-between gap-3 font-poppins text-xs">
          <div class="hidden items-center gap-2 md:flex">
            ${iconLocation}
            <span>Store location: Lincoln - 344, Illinois, Chicago, USA</span>
          </div>

          <div class="flex items-center gap-4 md:gap-5">
            <button type="button" class="hidden cursor-pointer items-center gap-1 transition-colors hover:text-primary sm:flex" aria-label="Choose language">
              <span>Eng</span>
              <span class="flex [&>svg]:h-3 [&>svg]:w-3">${dropDown}</span>
            </button>
            <button type="button" class="hidden cursor-pointer items-center gap-1 transition-colors hover:text-primary sm:flex" aria-label="Choose currency">
              <span>USD</span>
              <span class="flex [&>svg]:h-3 [&>svg]:w-3">${dropDown}</span>
            </button>
            <span class="hidden h-[15px] w-px bg-current opacity-25 sm:block" aria-hidden="true"></span>
            <div class="flex items-center gap-1">
              <a href="./signin.html" class="transition-colors hover:text-primary">Sign In</a>
              <span class="opacity-50">/</span>
              <a href="./signup.html" class="transition-colors hover:text-primary">Sign Up</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Header -->
      <div class="w-full border-b border-neutral-100 bg-white">
        <div class="container-custom flex flex-wrap items-center justify-between gap-3 py-3 lg:grid lg:h-[92px] lg:grid-cols-[minmax(0,1fr)_minmax(320px,498px)_minmax(0,1fr)] lg:gap-x-8 lg:py-0">

          <!-- Mobile Menu Toggle -->
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center text-neutral-900 lg:hidden"
            data-nav-toggle
            aria-label="Mở menu"
            aria-expanded="false"
          >
            ${iconMenu}
          </button>

          <!-- Logo -->
          <a
            href="./index.html"
            class="flex items-center gap-2 font-poppins text-2xl font-medium leading-none tracking-tight text-brand-wordmark lg:justify-self-start lg:text-[32px]"
          >
            <img
              src="${getImageUrl("/images/plant-small.webp")}"
              alt="Logo"
              width="40"
              height="40"
              decoding="async"
              class="h-8 w-8 object-contain"
            >
            <span>Ecobazar</span>
          </a>

          <!-- Search Bar -->
          <form
            class="order-3 flex w-full items-stretch overflow-hidden rounded-md border border-neutral-100 lg:order-none lg:w-full lg:max-w-[498px] lg:justify-self-center"
            role="search"
          >
            <input
              type="text"
              placeholder="Search"
              class="h-[45px] min-w-0 flex-1 px-4 font-poppins text-sm text-neutral-500 outline-none lg:text-[15px]"
            >
            <button
              type="submit"
              class="h-[45px] whitespace-nowrap bg-primary px-4 font-poppins text-sm font-semibold text-white transition-colors hover:bg-primary-dark lg:px-6"
            >
              Search
            </button>
          </form>

          <!-- Action Icons -->
          <div class="flex items-center gap-4 lg:justify-self-end">
            <a
              href="./wishlist.html"
              class="relative hidden h-10 w-10 items-center justify-center text-neutral-800 transition-colors hover:text-primary sm:flex"
              aria-label="Wishlist"
            >
              ${iconHeaderHeart}
            </a>

            <button
              type="button"
              class="relative flex h-10 w-10 cursor-pointer items-center justify-center text-neutral-800 transition-colors hover:text-primary"
              aria-label="Mở giỏ hàng"
              data-cart-open
            >
              ${iconHeaderCart}
              <span class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-primary-dark text-[10px] text-white">
                ${cartCount}
              </span>
            </button>

            <div class="hidden font-poppins leading-tight sm:block">
              <div class="text-sm text-neutral-700">Shopping cart:</div>
              <div class="text-base font-medium text-neutral-900">${cartTotal}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Panel: Home tối, trang trong trắng -->
      <div class="hidden w-full lg:block ${navPanelClass}" data-nav-panel>
        <div class="container-custom flex flex-col items-stretch gap-2 py-2 lg:h-[62px] lg:flex-row lg:items-center lg:gap-4 lg:py-0">
          <nav class="flex flex-col items-stretch gap-0 lg:flex-row lg:items-center lg:gap-8">
            ${linksHtml}
          </nav>

          <div class="flex items-center gap-2 py-2.5 font-poppins text-sm font-medium lg:ml-auto lg:py-0 ${phoneClass}">
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
      const productId = button.dataset.popupRemove;
      const updatedCart = removeProduct(cartItems, productId);

      saveCart(updatedCart);
      document.dispatchEvent(new CustomEvent("cart:updated", {
        detail: { cart: updatedCart, openPopup: true },
      }));
    });
  });
}
