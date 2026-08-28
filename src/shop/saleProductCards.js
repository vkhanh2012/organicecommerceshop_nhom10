import { iconStar } from "../components/icons.js"

//Hàm render stars
function renderMiniStars(rating = 5) {
  return Array.from({ length: 5 })
    .map(
      (_, i) =>
        /*html*/ `<span class="${i < rating ? "text-text-discount" : "text-neutral-200"}">${iconStar(i < rating)}</span>`,
    )
    .join("")
}

export function renderSaleProducts(productsData = []) {
  const productsHtml = productsData
    .map(
      (items) => /*html*/ `
    <!-- Khung của sale products -->
    <div class="flex items-center rounded-md bg-white border pt-5 transition-all cursor-pointer group ${
      items.active
        ? " border-primary shadow-sm ring-1 ring-primary/20"
        : "border-neutral-100 hover:border-primary/50 hover:shadow-sm"
    }">
        <!-- Khung hình nền -->
        <div class="w-28 h-28 p-1.25 flex items-center justify-center bg-white rounded-sm ">
            <img src="${items.image}" alt="${items.name}" class="w-full h-full object-contain transition-colors"/>
        </div>

        <!--Khung Thông tin -->
        <div class="flex-1 min-w-0">
            <!-- Tên -->
            <h4 class="text-sm text-neutral-700 truncate group-hover:text-primary transition-colors">
                ${items.name}
            </h4>
            <!-- Giá -->
            <div class="flex items-center gap-0.5 mt-0.5">
                <span class="text-[16px] font-medium text-neutral-900">$${Number(items.price).toFixed(2)}</span>
                ${items.oldPrice !== null && items.oldPrice !== undefined
                  ? `<span class="text-sm text-neutral-400 line-through">$${Number(items.oldPrice).toFixed(2)}</span>`
                  : ""}
            </div>
            <!-- Sao -->
            <div class="flex items-center gap-0.5 mt-1">
                ${renderMiniStars(items.rating)}
            </div>
        </div>
    </div>         
    `,
    )
    .join("")

  // Khung của tất cả sản phẩm
  return /*html*/ `
    <div class="gap-3">
        <h3 class="text-[20px] font-medium text-neutral-900 mb-4">Sale Products</h3>
        <div class="space-y-3">
            ${productsHtml}
        </div>
    </div>
  `
}

// Lấy Sale Products trực tiếp từ catalog products.json đã được trang Shop tải.
export function initSaleProducts(containerEl, productsData = []) {
  if (!containerEl) return

  const saleProducts = productsData.filter((product) => Boolean(product.saleTag))
  containerEl.innerHTML = renderSaleProducts(saleProducts)
}
