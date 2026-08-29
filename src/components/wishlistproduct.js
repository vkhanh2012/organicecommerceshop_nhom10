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
    <tr class="h-[124px] transition-colors hover:bg-neutral-50/50">
      <!-- Cột 1 -->
      <td class="align-middle px-6 py-3">
        <div class="flex items-center gap-5">
          <div class="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden bg-white">
            <img src="${item.image}" alt="${item.name}" class="block h-full w-full object-contain" />
          </div>
          <span class="line-clamp-2 text-base font-normal leading-6 text-neutral-900">
            ${item.name}
          </span>
        </div>
      </td>

      <!-- Cột 2: giá -->
      <td class="whitespace-nowrap px-6 py-3 align-middle">
        <div class="flex items-center gap-0.5">
          <span class="text-base font-medium leading-6 text-neutral-900">
            $${Number(item.price || 0).toFixed(2)}
          </span>
          ${
            item.originalPrice
              ? `<span class="text-base font-normal leading-6 text-neutral-400 line-through">$${Number(item.originalPrice).toFixed(2)}</span>`
              : ""
          }
        </div>
      </td>

      <!-- Cột 3: trạng thái -->
      <td class="whitespace-nowrap px-6 py-3 align-middle">
        <span class="inline-block rounded-sm px-2 py-1 text-sm font-normal leading-5 ${stockBadgeClass}">
          ${item.stockStatusText}
        </span>
      </td>

      <!-- Cột 4: nút bấm -->
      <td class="whitespace-nowrap px-6 py-3 text-right align-middle">
        <div class="flex items-center justify-end gap-6">
          <button type="button" ${!item.inStock ? "disabled" : ""}
            class="rounded-[43px] px-8 py-3.5 text-sm font-semibold leading-4 transition-colors duration-200 ${buttonClass}"
            data-add-cart
            data-cart-id="${item.id}"
            data-cart-name="${item.name}"
            data-cart-image="${item.image}"
            data-cart-price="${item.price}">
            Add to Cart
          </button>
          
          <button type="button"
            class="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full text-neutral-400 transition-colors hover:text-neutral-900"
            title="Remove item"
            data-remove-wishlist="${item.id}">
            ${closeIcon}
          </button>
        </div>
      </td>
    </tr>
  `
}
