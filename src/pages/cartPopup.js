import { getCartSummary } from "../shopping_cart/cartData.js";

function popupProduct(item) {
  return `
    <div
      class="grid grid-cols-[100px_minmax(0,1fr)_24px]
             items-center gap-3 border-b border-neutral-100 py-3"
    >

      <img
        class="h-[100px] w-[100px] object-contain"
        src="${item.image}"
        alt="${item.name}"
      />

      <div class="min-w-0">

        <p class="truncate text-sm text-neutral-900">
          ${item.name}
        </p>

        <p class="mt-1 text-sm">
          <span class="text-neutral-500">
            ${item.quantity} ×
          </span>

          <strong class="font-semibold">
            $${item.price.toFixed(2)}
          </strong>
        </p>

      </div>

      <button
        class="flex h-6 w-6 cursor-pointer items-center
               justify-center rounded-full border border-neutral-200
               text-neutral-500
               hover:border-error hover:text-error"
        type="button"
        data-popup-remove="${item.id}"
        aria-label="Remove ${item.name}"
      >
        ×
      </button>

    </div>
  `;
}

export function renderCartPopup(cart = []) {

  const { count, total } = getCartSummary(cart);

  return `
    <div
      class="fixed inset-0 z-50 hidden bg-black/40"
      data-cart-overlay
    >

      <aside
        class="ml-auto flex h-full w-full max-w-[420px] flex-col
         bg-white px-5 py-5 shadow-xl sm:px-6"
        data-cart-popup
      >

        <div class="flex items-center justify-between">

          <h2 class="text-xl font-medium text-neutral-900">
            Shopping Cart (${count})
          </h2>

          <button
            class="flex h-8 w-8 cursor-pointer items-center
                   justify-center rounded-full text-neutral-500
                   hover:bg-neutral-100 hover:text-neutral-700"
            type="button"
            data-cart-close
            aria-label="Close cart popup"
          >
            ×
          </button>

        </div>

        <div class="mt-4 flex-1 overflow-y-auto">

          ${
            cart.length
              ? cart.map(popupProduct).join("")
              : `
                <p
                  class="py-10 text-center text-neutral-500"
                >
                  Your cart is empty.
                </p>
              `
          }

        </div>

        <div class="border-t border-neutral-100 pt-5">

          <div
            class="flex items-center justify-between text-sm"
          >

            <span>
              ${count} Product${count === 1 ? "" : "s"}
            </span>

            <strong class="text-base">
              $${total.toFixed(2)}
            </strong>

          </div>

          <a
            class="mt-5 flex cursor-pointer justify-center
                   rounded-full bg-[#edfff0] px-6 py-4 text-sm
                   font-semibold text-primary
                   hover:bg-primary hover:text-white"
            href="./cart.html"
          >
            Checkout
          </a>

          <a
            class="mt-3 flex cursor-pointer justify-center
                   rounded-full bg-[#edfff0] px-6 py-4 text-sm
                   font-semibold text-primary
                   hover:bg-primary hover:text-white"
            href="./cart.html"
          >
            Go To Cart
          </a>

        </div>

      </aside>

    </div>
  `;
}