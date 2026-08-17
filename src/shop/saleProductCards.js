import { iconStar } from "../components/icons.js"

//Hàm render stars
function renderMiniStars(rating = 5) {
  return Array.from({ length: 5 })
    .map(
      (_, i) =>
        /*html*/ `<span class="${i < rating ? "text-[#FF8A00]" : "text-neutral-200"}">${iconStar(i < rating)}</span>`,
    )
    .join("")
}

export function renderSaleProducts(productsData = []) {
  const productsHtml = productsData
    .map(
      (items) => /*html*/ `
    <!-- Khung của sale products -->
    <div class="flex items-center rounded-md bg-white border transition-all cursor-pointer group ${
      items.active
        ? " border-primary shadow-sm ring-1 ring-primary/20"
        : "border-gray-100 hover:border-primary/50 hover:shadow-sm"
    }">
        <!-- Khung hình nền -->
        <div class="w-28 h-28 p-1.25 flex items-center justify-center bg-white rounded-sm ">
            <img src="${items.image}" alt="${items.name}" class="w-full h-full object-contain transition-colors"/>
        </div>

        <!--Khung Thông tin -->
        <div class="flex-1 min-w-0">
            <!-- Tên -->
            <h4 class="text-sm text-gray-700 truncate group-hover:text-primary transition-colors">
                ${items.name}
            </h4>
            <!-- Giá -->
            <div class="flex items-center gap-0.5 mt-0.5">
                <span class="text-[16px] font-medium text-gray-900">$${items.price.toFixed(2)}</span>
                <span class="text-sm text-gray-400 line-through">$${items.originalPrice.toFixed(2)}</span>
            </div>
            <!-- Sao -->
            <div class="flex items-center gap-0.5 mt-1">
                ${renderMiniStars(items.stars)}
            </div>
        </div>
    </div>         
    `,
    )
    .join("")

  // Khung của tất cả sản phẩm
  return /*html*/ `
    <div class="pt-5 gap-3">
        <h3 class="text-[20px] font-medium text-gray-900 mb-4">Sale Products</h3>
        <div class="space-y-3">
            ${productsHtml}
        </div>
    </div>
  `
}

// Hàm fetch dữ liệu từ file saleProducts.json
export async function initSaleProducts(containerEl) {
  try {
    const response = await fetch("/src/data/saleProducts.json");
    if(!response.ok) throw new Error("Lỗi đọc file JSON")

      const productsData = await response.json()

      if(containerEl){
        containerEl.innerHTML = renderSaleProducts(productsData)
      }
  } catch (error){
      console.error("Lỗi tải Sale Products: ", error)
  }
}
