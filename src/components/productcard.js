// src/components/productCard.js

import {
  iconHeart,
  iconEye,
  iconBag,
  iconStar
} from "./icons.js";
import { addProductToCart } from "../shopping_cart/cartData.js";
import { isInWishlist, toggleWishlist } from "../wishlist/wishlistData.js";
import { getImageUrl, attachImageUrls } from "../utils/assets.js";
import productsData from "../data/products.json";

const CLASS = {
  // Card phẳng nằm trong khung viền 1px
  cardHome: `
  product-card
  group
  relative
  flex
  h-full
  w-full
  cursor-pointer
  flex-col
  justify-between
  bg-white
  p-3

  transition-shadow
  duration-300

  hover:z-20
  hover:shadow-[0_0_15px_rgba(0,0,0,0.12)]
`,

cardShop: `
  product-card
  group
  relative
  flex
  h-full
  w-full
  cursor-pointer
  flex-col
  justify-between
  overflow-hidden

  rounded-lg
  border
  border-neutral-200
  bg-white
  p-3

  transition-[border-color,box-shadow]
  duration-300

  hover:z-20
  hover:border-primary
  hover:shadow-[0_0_12px_rgba(0,178,7,0.20)]

  xl:h-96
`,

 imageWrap: 
  "relative aspect-square overflow-hidden bg-white flex items-center justify-center mb-2.5 block cursor-pointer shrink-0",

  image:
    "w-full h-full object-cover",

  tags:
    "absolute top-2 left-2 z-10 flex gap-1 pointer-events-none",

  tagSale:
    "bg-error text-white text-[11px] font-semibold font-poppins px-1.5 py-0.5 rounded",

  tagBest:
    "bg-sky-500 text-white text-[11px] font-semibold font-poppins px-1.5 py-0.5 rounded",

  actions:
    "absolute top-2 right-2 z-20 flex flex-col gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity",

  actionBtn:
    "w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-neutral-700 hover:bg-primary hover:text-white transition-colors cursor-pointer",

  body:
    "px-0.5 flex flex-col flex-1 justify-between",

  name:
    "font-poppins text-sm text-neutral-900 mb-1 transition-colors md:group-hover:text-primary block hover:underline cursor-pointer line-clamp-1 h-5 leading-5",

  priceRow:
    "flex items-center justify-between mb-1 mt-auto pt-1.5",

  price:
    "font-poppins text-sm md:text-base font-medium text-neutral-900",

  priceOld:
    "font-poppins text-xs text-neutral-400 line-through ml-1",

  cartBtn:
    "w-9 h-9 md:w-10 md:h-10 rounded-full bg-neutral-50 text-neutral-700 flex items-center justify-center transition-colors md:group-hover:bg-primary md:group-hover:text-white cursor-pointer shrink-0",

  rating:
    "flex items-center gap-0.5",

  // 📌 LƯỚI 5 CỘT DÀNH CHO HOME (lg:grid-cols-5) VÀ NỐI VIỀN DÍNH SÁT NHAU (gap-px)
  gridHome: `
  grid
  w-full
  grid-cols-2
  items-stretch
  gap-px
  overflow-hidden
  rounded-lg
  border
  border-neutral-200
  bg-neutral-200

  sm:grid-cols-3
  md:grid-cols-4
  lg:grid-cols-5
`,

gridShop: `
  grid
  w-full
  grid-cols-2
  items-stretch
  gap-4

  md:grid-cols-2

  xl:grid-cols-3
  xl:gap-6
`,

gridShop2: `
  grid
  w-full
  grid-cols-2
  items-stretch
  gap-4

  md:grid-cols-3

  xl:grid-cols-4
  xl:gap-6
`,
};

// =====================================================
// HIỂN THỊ THÔNG BÁO (TOAST) GÓC PHẢI DƯỚI
// =====================================================
function showToast(message) {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "fixed bottom-5 right-5 bg-neutral-900 text-white px-5 py-3 rounded-lg shadow-lg font-poppins text-sm font-semibold z-50 transition-all duration-300 opacity-0 translate-y-2 pointer-events-none";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.remove("opacity-0", "translate-y-2", "pointer-events-none");
  toast.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-2", "pointer-events-none");
  }, 2500);
}

// =====================================================
// XỬ LÝ ẢNH CHUẨN
// =====================================================
function resolveImage(p = {}) {
  let imgPath = p.image || p.mainImage || (Array.isArray(p.thumbnails) && p.thumbnails[0]) || "";
  if (typeof getImageUrl === "function" && (imgPath.startsWith("/images/") || imgPath.startsWith("images/"))) {
    return getImageUrl(imgPath);
  }
  return imgPath;
}

// =====================================================
// HÀM TẢI DANH SÁCH SẢN PHẨM (CHO HOMEPAGE)
// =====================================================
export async function getProducts() {
  if (typeof attachImageUrls === "function") {
    return attachImageUrls(productsData);
  }
  return productsData;
}

// =====================================================
// RENDER PRODUCT CARD
// =====================================================
export function renderProductCard(  p = {},
  page = "home") {
  const {
    id = 1,
    name = "Tên sản phẩm",
    price = 0,
    oldPrice = null,
    rating = 4,
    saleTag = null,
    bestTag = null
  } = p;

const isShop =
  page === "shop" ||
  page === "shop2";

const cardClass =
  isShop
    ? CLASS.cardShop
    : CLASS.cardHome;

  const image = resolveImage(p);
  const detailUrl = `./descriptions.html?id=${id}`;

  const productDataStr = encodeURIComponent(
    JSON.stringify({ ...p, id, name, price, oldPrice, image })
  );
  const wishlistActive = isInWishlist(id);
  const wishlistButtonClass = wishlistActive
    ? `${CLASS.actionBtn} !bg-white !text-primary hover:!bg-white hover:!text-primary-dark`
    : `${CLASS.actionBtn} border border-transparent hover:border-primary`;
  const wishlistIcon = wishlistActive
    ? iconHeart.replace('fill="none"', 'fill="currentColor"')
    : iconHeart;

  const starsHtml = Array.from({ length: 5 })
    .map((_, i) => `
      <span class="${i < rating ? "text-warning" : "text-neutral-200"}">
        ${iconStar(i < rating)}
      </span>
    `).join("");

  const tagsHtml = (saleTag || bestTag) ? `
    <div class="${CLASS.tags}">
      ${saleTag ? `<span class="${CLASS.tagSale}">${saleTag}</span>` : ""}
      ${bestTag ? `<span class="${CLASS.tagBest}">${bestTag}</span>` : ""}
    </div>
  ` : "";

  return `
    <article class="${cardClass}" data-id="${id}">
      <a href="${detailUrl}" class="${CLASS.imageWrap}" aria-label="Xem chi tiết ${name}">
        ${tagsHtml}
        <img src="${image}" alt="${name}" class="${CLASS.image}" loading="lazy" />
      </a>

      <div class="${CLASS.actions}">
        <button type="button" data-action="wishlist" data-id="${id}" data-product="${productDataStr}" class="${wishlistButtonClass}" aria-pressed="${wishlistActive}" aria-label="${wishlistActive ? "Remove" : "Add"} ${name} ${wishlistActive ? "from" : "to"} wishlist">
          ${wishlistIcon}
        </button>
        <button type="button" data-action="quick-view" data-id="${id}" data-product="${productDataStr}" class="${CLASS.actionBtn}" aria-label="Quick view">
          ${iconEye}
        </button>
      </div>

      <div class="${CLASS.body}">
        <a href="${detailUrl}" class="${CLASS.name}" title="${name}">${name}</a>

        <div>
          <div class="${CLASS.priceRow}">
            <div>
              <span class="${CLASS.price}">$${Number(price).toFixed(2)}</span>
              ${oldPrice ? `<span class="${CLASS.priceOld}">$${Number(oldPrice).toFixed(2)}</span>` : ""}
            </div>

            <button
              type="button"
              data-action="add-to-cart"
              data-id="${id}"
              data-product="${productDataStr}"
              class="${CLASS.cartBtn}"
              aria-label="Thêm ${name} vào giỏ hàng"
            >
              ${iconBag}
            </button>
          </div>

          <div class="${CLASS.rating}">${starsHtml}</div>
        </div>
      </div>
    </article>
  `;
}

// =====================================================
// RENDER PRODUCT GRID (5 CỘT CHO HOME, 3 CỘT CHO SHOP)
// =====================================================
export function renderProductGrid(
  products = [],
  page = "home"
) {
  let gridClass = CLASS.gridHome;

  if (page === "shop") {
    gridClass = CLASS.gridShop;
  }

  if (page === "shop2") {
    gridClass = CLASS.gridShop2;
  }

  const itemsHtml = products
    .map((product) =>
      renderProductCard(product, page)
    )
    .join("");

  return `
    <div class="w-full">
      <div class="${gridClass}">
        ${itemsHtml}
      </div>
    </div>
  `;
}

// =====================================================
// LẮNG NGHE SỰ KIỆN CLICK (THÊM GIỎ HÀNG & THÔNG BÁO)
// =====================================================
export function bindCardEvents(container = document) {
  container.addEventListener("click", (e) => {
    const btn = e.target.closest('[data-action="add-to-cart"]');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const rawData = btn.getAttribute("data-product");
    if (!rawData) return;

    try {
      const product = JSON.parse(decodeURIComponent(rawData));
      
      if (typeof addProductToCart === "function") {
        addProductToCart(product, 1);
      }

      showToast(`${product.name} added to cart.`);
    } catch (err) {
      console.error("Lỗi thêm giỏ hàng:", err);
    }
  });
}

function updateWishlistButtons(productId, active) {
  document.querySelectorAll('[data-action="wishlist"]').forEach((button) => {
    if (String(button.dataset.id) !== String(productId)) return;

    button.setAttribute("aria-pressed", String(active));
    const rawData = button.getAttribute("data-product");
    let productName = "product";

    try {
      productName = JSON.parse(decodeURIComponent(rawData)).name || productName;
    } catch {
      // Keep the fallback label when old card data is invalid.
    }

    button.setAttribute(
      "aria-label",
      `${active ? "Remove" : "Add"} ${productName} ${active ? "from" : "to"} wishlist`,
    );
    button.classList.toggle("!bg-white", active);
    button.classList.toggle("!text-primary", active);
    button.classList.toggle("hover:!bg-white", active);
    button.classList.toggle("hover:!text-primary-dark", active);
    button.classList.toggle("border-transparent", !active);
    button.classList.toggle("hover:border-primary", !active);

    const heartIcon = button.querySelector("svg");
    if (heartIcon) heartIcon.setAttribute("fill", active ? "currentColor" : "none");
  });
}

document.addEventListener("click", (event) => {
  const wishlistButton = event.target.closest('[data-action="wishlist"]');
  if (!wishlistButton) return;

  event.preventDefault();
  event.stopPropagation();

  const rawData = wishlistButton.getAttribute("data-product");
  if (!rawData) return;

  try {
    const product = JSON.parse(decodeURIComponent(rawData));
    const { added } = toggleWishlist(product);
    updateWishlistButtons(product.id, added);
  } catch (error) {
    console.error("Unable to update wishlist:", error);
  }
});

document.addEventListener("wishlist:updated", (event) => {
  const wishlist = Array.isArray(event.detail?.wishlist)
    ? event.detail.wishlist
    : [];

  document.querySelectorAll('[data-action="wishlist"]').forEach((button) => {
    const active = wishlist.some(
      (item) => String(item.id) === String(button.dataset.id),
    );
    updateWishlistButtons(button.dataset.id, active);
  });
});
