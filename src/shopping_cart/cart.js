import { changeQuantity, getCart, removeProduct, saveCart } from "./cartData.js";
import { cartTable } from "./carttable.js";
import { cartTotal } from "./carttotal.js";
import { renderBreadcrumbsComponent } from "../components/breadcrumbs.js";

export function renderCartPage(cart = getCart()) {
  return `
    ${renderBreadcrumbsComponent({
      breadcrumbs: [{ label: "Shopping Cart", url: "./cart.html" }],
    })}

    <section class="container-custom py-10 md:py-14 lg:pb-20 lg:pt-9">
      <h1 class="mb-8 text-center text-[32px] font-semibold lg:mb-6">My Shopping Cart</h1>
      <div class="grid gap-6 lg:grid-cols-[minmax(0,872px)_minmax(300px,424px)]">
        <div>
          <div data-cart-table>${cartTable(cart)}</div>
          <div class="mt-6 rounded-lg border border-neutral-100 p-5 sm:flex sm:items-center sm:gap-6 sm:p-6 xl:px-5">
            <h2 class="mb-3 shrink-0 text-xl font-medium sm:mb-0">Coupon Code</h2>
            <form class="flex min-w-0 flex-1" data-coupon-form>
              <input class="h-[52px] min-w-0 flex-1 rounded-l-full border border-r-0 border-neutral-100 px-5 text-base leading-6 outline-none focus:border-primary" name="coupon" placeholder="Enter code">
              <button class="h-[52px] shrink-0 cursor-pointer rounded-full bg-neutral-800 px-8 text-base font-semibold text-white transition-colors hover:bg-neutral-700 sm:w-[196px]">Apply Coupon</button>
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

    // Khi bấm Proceed to checkout
    if (action === "checkout") {
      if (typeof onNavigate === "function") {
        onNavigate("checkout");
      } else {
        window.location.href = "./checkout.html";
      }
      return;
    }

    if (action === "update") {
      onCartChange(getCart(), "Cart updated successfully.");
      return;
    }

    // Lấy id sản phẩm
    const id = Number(button.dataset.id);

    const cart = getCart();
    let updatedCart = cart;

    if (action === "increase") {
      updatedCart = changeQuantity(cart, id, 1);
    }

    if (action === "decrease") {
      updatedCart = changeQuantity(cart, id, -1);
    }

    if (action === "remove") {
      updatedCart = removeProduct(cart, id);
    }

    saveCart(updatedCart);
    onCartChange(updatedCart);
  });

  root.addEventListener("submit", (event) => {
    if (!event.target.matches("[data-coupon-form]")) return;

    event.preventDefault();

    const message = root.querySelector("[data-cart-message]");
    const couponCode = event.target.elements.coupon.value.trim();

    message.textContent = couponCode
      ? "Coupon code has been received."
      : "Please enter a coupon code.";
    message.classList.toggle("text-primary", Boolean(couponCode));
    message.classList.toggle("text-error", !couponCode);
    message.classList.remove("hidden");
  });
}
