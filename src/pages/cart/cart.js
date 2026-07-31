import { getCart, getCartSummary, saveCart } from "./cartData.js";

function money(value) {
  return `$${value.toFixed(2)}`;
}

function cartRow(item) {
  return `
    <div class="grid grid-cols-[minmax(0,1fr)_100px] items-center gap-3 border-t border-neutral-100 px-5 py-3 sm:grid-cols-[minmax(260px,1fr)_100px_150px_100px_24px] sm:px-6">
      <div class="flex min-w-0 items-center gap-3">
        <img class="h-[78px] w-[78px] shrink-0 object-contain" src="${item.image}" alt="${item.name}" />
        <span class="truncate text-sm text-neutral-900">${item.name}</span>
      </div>

      <span class="hidden text-sm text-neutral-900 sm:block">${money(item.price)}</span>

      <div class="flex h-[44px] w-[124px] items-center justify-between rounded-full border border-neutral-100 p-2" aria-label="Quantity">
        <button class="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-50 text-lg text-neutral-900" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
        <span class="text-sm text-neutral-900">${item.quantity}</span>
        <button class="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-50 text-lg text-neutral-900" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
      </div>

      <strong class="hidden text-sm font-medium text-neutral-900 sm:block">${money(item.price * item.quantity)}</strong>

      <button class="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:border-error hover:text-error" data-action="remove" data-id="${item.id}" aria-label="Remove ${item.name}">×</button>

      <div class="col-span-2 flex justify-between text-sm sm:hidden">
        <span class="text-neutral-500">${money(item.price)} × ${item.quantity}</span>
        <strong class="font-medium">${money(item.price * item.quantity)}</strong>
      </div>
    </div>`;
}

function cartTable(cart) {
  if (cart.length === 0) {
    return `
      <div class="rounded-lg border border-neutral-100 p-10 text-center">
        <p class="text-neutral-600">Your shopping cart is empty.</p>
        <a class="mt-5 inline-flex rounded-full bg-neutral-50 px-8 py-3 text-sm font-semibold text-neutral-700" href="./shop.html">Return to shop</a>
      </div>`;
  }

  return `
    <div class="overflow-hidden rounded-lg border border-neutral-100 bg-white">
      <div class="hidden grid-cols-[minmax(260px,1fr)_100px_150px_100px_24px] gap-3 px-6 py-4 text-xs font-medium uppercase tracking-wide text-neutral-500 sm:grid">
        <span>Product</span><span>Price</span><span>Quantity</span><span>Subtotal</span><span></span>
      </div>
      ${cart.map(cartRow).join("")}
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 px-5 py-4 sm:px-6">
        <a class="rounded-full bg-neutral-50 px-7 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100" href="./shop.html">Return to shop</a>
        <button class="rounded-full bg-neutral-50 px-7 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100" data-action="update">Update Cart</button>
      </div>
    </div>`;
}

function cartTotal(cart) {
  const { total } = getCartSummary(cart);
  return `
    <aside class="h-fit rounded-lg border border-neutral-100 bg-white p-6">
      <h2 class="text-xl font-medium text-neutral-900">Cart Total</h2>
      <div class="mt-2 divide-y divide-neutral-100">
        <div class="flex justify-between py-3 text-sm"><span class="text-neutral-700">Subtotal:</span><span class="font-medium">${money(total)}</span></div>
        <div class="flex justify-between py-3 text-sm"><span class="text-neutral-700">Shipping:</span><span class="font-medium">Free</span></div>
        <div class="flex justify-between py-3"><span class="text-neutral-700">Total:</span><strong class="font-semibold">${money(total)}</strong></div>
      </div>
      <button class="mt-2 w-full rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-neutral-300" ${cart.length ? "" : "disabled"}>Proceed to checkout</button>
    </aside>`;
}

export function renderCartPage(cart = getCart()) {
  return `
    <section class="relative flex h-[120px] items-center bg-[url('/images/plant.jpg')] bg-cover bg-center">
      <div class="absolute inset-0 bg-neutral-900/80"></div>
      <nav class="container-custom relative z-10 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
        <a class="text-neutral-300 hover:text-white" href="./index.html" aria-label="Home">⌂</a>
        <span class="text-neutral-400">›</span>
        <span class="text-primary-light">Shopping Cart</span>
      </nav>
    </section>

    <section class="container-custom py-10 md:py-14">
      <h1 class="mb-8 text-center text-[32px] font-semibold leading-tight text-neutral-900">My Shopping Cart</h1>
      <div class="grid gap-6 lg:grid-cols-[minmax(0,872px)_minmax(300px,424px)]">
        <div>
          <div data-cart-table>${cartTable(cart)}</div>
          <div class="mt-6 rounded-lg border border-neutral-100 p-5 sm:flex sm:items-center sm:gap-6 sm:p-6">
            <h2 class="mb-3 shrink-0 text-xl font-medium text-neutral-900 sm:mb-0">Coupon Code</h2>
            <form class="flex min-w-0 flex-1" data-coupon-form>
              <input class="min-w-0 flex-1 rounded-l-full border border-r-0 border-neutral-100 px-5 py-3 text-sm outline-none focus:border-primary" name="coupon" placeholder="Enter code" />
              <button class="shrink-0 rounded-full bg-neutral-800 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-900">Apply Coupon</button>
            </form>
          </div>
          <p class="mt-2 hidden text-sm text-primary" data-cart-message></p>
        </div>
        <div data-cart-total>${cartTotal(cart)}</div>
      </div>
    </section>`;
}

export function bindCartEvents(root, onCartChange) {
  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const action = button.dataset.action;
    const id = Number(button.dataset.id);
    const cart = getCart();

    if (action === "increase" || action === "decrease") {
      const item = cart.find((product) => product.id === id);
      if (item) item.quantity = Math.max(1, item.quantity + (action === "increase" ? 1 : -1));
    }

    if (action === "remove") {
      const itemIndex = cart.findIndex((product) => product.id === id);
      if (itemIndex !== -1) cart.splice(itemIndex, 1);
    }

    saveCart(cart);
    onCartChange(cart, action === "update" ? "Cart updated successfully." : "");
  });

  root.querySelector("[data-coupon-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = root.querySelector("[data-cart-message]");
    message.textContent = "Coupon code has been received.";
    message.classList.remove("hidden");
  });
}
