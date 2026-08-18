import { closeIcon } from "./icons.js"

export function renderWistlistRow(item) {
  if (!item) return ""

  const stockBadgeClass = item.inStock
    ? "text-[#2C742F] bg-[#20B526]/10"
    : "text-[#EA4335] bg-[#EA4335]/10"

  const buttonClass = item.inStock
    ? "bg-[#00B307] hover:bg-[#009A06] text-white cursor-pointer"
    : "bg-gray-100 text-gray-400 cursor-not-allowed"

  return /*html*/ `
    <tr class="hover:bg-gray-50/50 transition-colors">
      <!-- Cột 1 -->
      <td class="py-4 px-4 md:px-6">
        <div class="flex items-center gap-3 md:gap-4">
          <div class="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-gray-100 p-1 flex items-center justify-center bg-white">
            <img src="${item.image}" alt="${item.name}" class="image-contain" />
          </div>
          <span class="font-normal text-gray-900 text-sm md:text-base line-clamp-2">
            ${item.name}
          </span>
        </div>
      </td>

      <!-- Cột 2: giá -->
      <td class="py-4 px-4 md:px-6 whitespace-nowrap">
        <div class="flex items-center gap-2">
          <span class="font-medium text-gray-900 text-sm md:text-base">
            $${item.price.toFixed(2)}
          </span>
          ${
            item.originalPrice
              ? `<span class="text-gray-400 line-through text-sm md:text-[16px]">$${item.originalPrice.toFixed(2)}</span>`
              : ""
          }
        </div>
      </td>

      <!-- Cột 3: trạng thái -->
      <td class="py-4 px-4 md:px-6 whitespace-nowrap">
        <span class="inline-block px-2.5 py-1 rounded text-xs font-medium ${stockBadgeClass}">
          ${item.stockStatusText}
        </span>
      </td>

      <!-- Cột 4: nút bấm -->
      <td class="py-4 px-4 md:px-6 text-right whitespace-nowrap">
        <div class="flex items-center justify-end gap-3 md:gap-4">
          <button type="button" ${!item.inStock ? "disabled" : ""}
            class="px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-colors duration-200 ${buttonClass}"
            data-add-cart
            data-cart-id="${item.id}"
            data-cart-name="${item.name}"
            data-cart-image="${item.image}"
            data-cart-price="${item.price}">
            Add to Cart
          </button>
          
          <button type="button"
            class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-400 transition-colors cursor-pointer shrink-0"
            title="Remove item"
            data-remove-wishlist="${item.id}">
            ${closeIcon}
          </button>
        </div>
      </td>
    </tr>
  `
}
