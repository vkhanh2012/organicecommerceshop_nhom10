import { getCartSummary } from "./cartData.js";
import { money } from "./money.js";

export function cartTotal(cart) {
  const { total } = getCartSummary(cart);
  return `
    <aside class="h-fit rounded-lg border border-neutral-100 bg-white p-6">
      <h2 class="text-xl font-medium text-neutral-900">Cart Total</h2>
      <div class="mt-2 divide-y divide-neutral-100">
        <div class="flex justify-between py-3 text-sm"><span class="text-neutral-700">Subtotal:</span><span class="font-medium">${money(total)}</span></div>
        <div class="flex justify-between py-3 text-sm"><span class="text-neutral-700">Shipping:</span><span class="font-medium">Free</span></div>
        <div class="flex justify-between py-3"><span class="text-neutral-700">Total:</span><strong class="font-semibold">${money(total)}</strong></div>
      </div>

      <!-- 📌 Đã thêm data-action="checkout" -->
      <button data-action="checkout" class="mt-2 w-full cursor-pointer rounded-full bg-[#edfff0] px-6 py-4 text-sm font-semibold text-primary hover:bg-primary hover:text-white" ${cart.length ? "" : "disabled"}>Proceed to checkout</button>
    </aside>`;
}