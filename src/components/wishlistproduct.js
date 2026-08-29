import { closeIcon } from "./icons.js"

export function renderWistlistRow(item) {
  if (!item) return ""

  const stockBadgeClass = item.inStock
    ? "text-text-instock bg-instock/20"
    : "text-outstock bg-outstock/10"

  const buttonClass = item.inStock
    ? "bg-primary hover:bg-primary-dark text-white cursor-pointer"
    : "bg-neutral-100 text-neutral-400 cursor-not-allowed"

  return /*html*/ `
    <tr class="h-[124px] hover:bg-neutral-50/50 transition-colors">
      <!-- Cột 1 -->
      <td class="align-middle px-5 py-3 md:px-6">
        <div class="flex items-center gap-3 md:gap-4">
          <div class="flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden bg-white p-1">
            <img src="${item.image}" alt="${item.name}" class="block h-full w-full object-contain" />
          </div>
          <span class="font-normal text-neutral-900 text-sm md:text-base line-clamp-2">
            ${item.name}
          </span>
        </div>
      </td>

      <!-- Cột 2: giá -->
      <td class="align-middle px-5 py-3 md:px-6 whitespace-nowrap">
        <div class="flex items-center gap-2">
          <span class="font-medium text-neutral-900 text-sm md:text-base">
            $${Number(item.price || 0).toFixed(2)}
          </span>
          ${
            item.originalPrice
              ? `<span class="text-neutral-400 line-through text-sm md:text-[16px]">$${Number(item.originalPrice).toFixed(2)}</span>`
              : ""
          }
        </div>
      </td>

      <!-- Cột 3: trạng thái -->
      <td class="align-middle px-5 py-3 md:px-6 whitespace-nowrap">
        <span class="inline-block px-2.5 py-1 rounded text-xs font-medium ${stockBadgeClass}">
          ${item.stockStatusText}
        </span>
      </td>

      <!-- Cột 4: nút bấm -->
      <td class="align-middle px-4 py-3 text-right whitespace-nowrap">
        <div class="flex items-center justify-end gap-3">
          <button type="button" ${!item.inStock ? "disabled" : ""}
            class="min-w-[156px] px-6 py-3 rounded-full text-xs md:text-sm font-semibold transition-colors duration-200 ${buttonClass}"
            data-add-cart
            data-cart-id="${item.id}"
            data-cart-name="${item.name}"
            data-cart-image="${item.image}"
            data-cart-price="${item.price}">
            Add to Cart
          </button>
          
          <button type="button"
            class="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer shrink-0"
            title="Remove item"
            data-remove-wishlist="${item.id}">
            ${closeIcon}
          </button>
        </div>
      </td>
    </tr>
  `
}
