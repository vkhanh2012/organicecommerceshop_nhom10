
import {
  iconHeart,
  iconEye,
  iconBag,
  iconStar
} from "./icons.js";
import { addProductToCart } from "../shopping_cart/cartData.js";
import { getImageUrl, attachImageUrls } from "../utils/assets.js";
import productsData from "../data/products.json";

const CLASS = {
 cardHome:
  `
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
    transition-all
    duration-300
    hover:z-20
    hover:shadow-[0_0_15px_rgba(0,0,0,0.12)]
  `,

cardShop:
  `
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

    transition-all
    duration-300

    hover:z-20
    hover:border-primary
    hover:shadow-[0_0_15px_rgba(0,0,0,0.12)]

    xl:h-96
  `,

  imageWrap:
    "relative aspect-square rounded-md overflow-hidden bg-white flex items-center justify-center mb-2.5 block cursor-pointer shrink-0",

  image:
    "w-full h-full object-cover",

  tags:
    "absolute top-2 left-2 z-10 flex gap-1 pointer-events-none",

  tagSale:
    "bg-error text-white text-[11px] font-semibold font-poppins px-1.5 py-0.5 rounded",

  tagBest:
    "bg-sky-500 text-white text-[11px] font-semibold font-poppins px-1.5 py-0.5 rounded",

  actions: 
  "absolute top-2 right-2 md:top-5 md:right-5 z-20 flex flex-col gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity",

  actionBtn: 
  "w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow md:shadow-none md:border md:border-neutral-50 flex items-center justify-center text-neutral-700 md:text-neutral-900 hover:bg-primary hover:text-white transition-colors cursor-pointer",

  body:
    "px-0.5 flex flex-col flex-1 justify-between",

  name: 
  "font-poppins text-sm text-neutral-900 mb-1 transition-colors md:group-hover:text-primary block cursor-pointer line-clamp-1 h-5 leading-5",

  priceRow:
    "flex items-center justify-between mb-1 mt-auto pt-1.5",

  price:
    "font-poppins text-sm md:text-base font-medium text-neutral-900",

  priceOld:
    "font-poppins text-xs text-neutral-400 line-through ml-1",

  cartBtn: 
  "w-9 h-9 md:w-10 md:h-10 rounded-full bg-neutral-50 text-neutral-700 flex items-center justify-center transition-colors hover:bg-primary hover:text-white cursor-pointer shrink-0",

  rating:
    "flex items-center gap-0.5",

  // CLASS DÀNH CHO HOME: 5 CỘT TRÊN MH LỚN (lg:grid-cols-5)
  gridHome:
    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-stretch w-full",

  // CLASS DÀNH CHO SHOP: 3 CỘT TRÊN MH LỚN (lg:grid-cols-3)
  gridShop: 
  "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full lg:[&_.product-card-cart]:mr-2",
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
export function renderProductCard(p = {}) {
  const {
    id = 1,
    name = "Tên sản phẩm",
    price = 0,
    oldPrice = null,
    rating = 4,
    saleTag = null,
    bestTag = null
  } = p;

  const image = resolveImage(p);
  const detailUrl = `./descriptions.html?id=${id}`;

  const productDataStr = encodeURIComponent(
    JSON.stringify({ ...p, id, name, price, oldPrice, image })
  );

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
    <article class="${CLASS.card}" data-id="${id}">
      <a href="${detailUrl}" class="${CLASS.imageWrap}" aria-label="Xem chi tiết ${name}">
        ${tagsHtml}
        <img src="${image}" alt="${name}" class="${CLASS.image}" loading="lazy" />
      </a>

      <div class="${CLASS.actions}">
        <button type="button" data-action="wishlist" data-id="${id}" class="${CLASS.actionBtn}" aria-label="Wishlist">
          ${iconHeart}
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
// RENDER PRODUCT GRID (TỰ ĐỘNG THEO TRANG HOME / SHOP)
// =====================================================
export function renderProductGrid(products = [], page = "home") {
  const itemsHtml = products.map(renderProductCard).join("");
  
  // Kiểm tra tham số page để trả về 5 cột (Home) hoặc 3 cột (Shop)
  const gridClass = page === "shop" ? CLASS.gridShop : CLASS.gridHome;

  return `
    <div class="w-full">
      <div class="${gridClass}">${itemsHtml}</div>
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
