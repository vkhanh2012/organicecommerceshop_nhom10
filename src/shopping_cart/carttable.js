import { cartRow } from "./cartrow.js";

export function cartTable(cart) {
  if (cart.length === 0) {
    return `
      <div class="rounded-lg border border-neutral-100 p-10 text-center">
        <p class="text-neutral-600">Your shopping cart is empty.</p>
        <a class="mt-5 inline-flex cursor-pointer rounded-full bg-neutral-50 px-8 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200" href="./shop.html">Return to shop</a>
      </div>`;
  }

  return `
    <div class="overflow-hidden rounded-lg border border-neutral-100 bg-white">
      <div class="hidden grid-cols-[minmax(260px,1fr)_100px_150px_100px_24px] gap-3 px-6 py-4 text-xs font-medium uppercase tracking-wide text-neutral-500 sm:grid">
        <span>Product</span><span>Price</span><span>Quantity</span><span>Subtotal</span><span></span>
      </div>
      ${cart.map(cartRow).join("")}
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 px-5 py-4 sm:px-6">
        <a class="cursor-pointer rounded-full bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-800 hover:text-white" href="./shop.html">Return to shop</a>
        <button class="cursor-pointer rounded-full bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-800 hover:text-white" data-action="update">Update Cart</button>
      </div>
    </div>`;
}