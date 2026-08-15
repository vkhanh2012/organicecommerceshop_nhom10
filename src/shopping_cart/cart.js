import { changeQuantity, getCart, removeProduct, saveCart } from "./cartData.js";
import { cartTable } from "./carttable.js";
import { cartTotal } from "./carttotal.js";
import { getImageUrl } from "../utils/assets.js";

export function renderCartPage(cart = getCart()) {
  return `
    <section class="relative flex h-[120px] items-center bg-cover bg-center" style="background-image: url('${getImageUrl('/images/plant.jpg')}')">
      <div class="absolute inset-0 bg-neutral-900/80"></div>
      <nav class="container-custom relative z-10 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
        <a class="text-neutral-300 hover:text-white" href="./index.html" aria-label="Home">⌂</a>
        <span class="text-neutral-400">›</span>
        <span class="text-primary-light">Shopping Cart</span>
      </nav>
    </section>

    <section class="container-custom py-10 md:py-14">
      <h1 class="mb-8 text-center text-[32px] font-semibold">My Shopping Cart</h1>
      <div class="grid gap-6 lg:grid-cols-[minmax(0,872px)_minmax(300px,424px)]">
        <div>
          <div data-cart-table>${cartTable(cart)}</div>
          <div class="mt-6 rounded-lg border border-neutral-100 p-5 sm:flex sm:items-center sm:gap-6 sm:p-6">
            <h2 class="mb-3 shrink-0 text-xl font-medium sm:mb-0">Coupon Code</h2>
            <form class="flex min-w-0 flex-1" data-coupon-form>
              <input class="min-w-0 flex-1 rounded-l-full border border-r-0 border-neutral-100 px-5 py-3 text-sm outline-none focus:border-primary" name="coupon" placeholder="Enter code">
              <button class="cursor-pointer rounded-full bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-800 hover:text-white">Apply Coupon</button>
            </form>
          </div>
          <p class="mt-2 hidden text-sm text-primary" data-cart-message></p>
        </div>
        <div data-cart-total>${cartTotal(cart)}</div>
      </div>
    </section>`;
}

export function bindCartEvents(root, onCartChange, onNavigate) {
  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const action = button.dataset.action;

    // 📌 Khi bấm nút Proceed to checkout -> Chuyển sang trang Checkout
    if (action === "checkout") {
      if (typeof onNavigate === "function") {
        onNavigate("checkout");
      } else {
        window.location.href = "./checkout.html";
      }
      return;
    }

    const id = Number(button.dataset.id);
    const cart = getCart();
    let updatedCart = cart;

    if (action === "increase") updatedCart = changeQuantity(cart, id, 1);
    if (action === "decrease") updatedCart = changeQuantity(cart, id, -1);
    if (action === "remove") updatedCart = removeProduct(cart, id);

    saveCart(updatedCart);
    onCartChange(updatedCart, action === "update" ? "Cart updated successfully." : "");
  });

  root.querySelector("[data-coupon-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = root.querySelector("[data-cart-message]");
    message.textContent = "Coupon code has been received.";
    message.classList.remove("hidden");
  });
}