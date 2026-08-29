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
    <div class="flex w-full items-start rounded-md border border-neutral-200 bg-white transition-all cursor-pointer group ${
      items.active
      ? "border-primary shadow-sm ring-1 ring-primary/20"
      : "hover:border-primary/50 hover:shadow-sm"
    }">
      <div class="flex size-24 shrink-0 items-start p-[5px]">
        <img src="${items.image}" alt="${items.name}" class="size-24 object-contain transition-colors"/>
        </div>

      <div class="flex min-w-0 flex-1 flex-col items-start justify-center gap-1.5 px-3 py-6">
        <div class="flex w-full flex-col items-start">
        <h3 class="w-full truncate text-sm leading-5 text-neutral-600 transition-colors group-hover:text-primary">
                ${items.name}
            </h3>
        <div class="flex items-start gap-0.5">
          <span class="text-base font-medium leading-6 text-neutral-900">$${Number(items.price).toFixed(2)}</span>
                ${items.oldPrice !== null && items.oldPrice !== undefined
                  ? `<span class="text-base leading-6 text-neutral-600 line-through">$${Number(items.oldPrice).toFixed(2)}</span>`
                  : ""}
            </div>
        </div>
        <div class="inline-flex items-start">
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
        <h2 class="pb-3 text-[20px] font-medium text-neutral-900">Sale Products</h2>
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
