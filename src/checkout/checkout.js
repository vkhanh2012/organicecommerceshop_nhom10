import {  renderBreadcrumbsComponent } from "../components/breadcrumbs.js";
import { renderCountryOptions, renderStateOptions } from "./Location.js";
import { getCart, getCartSummary } from "../shopping_cart/cartData.js";

//AI làm
export function renderCheckout(cart = getCart()) {
  const { total } = getCartSummary(cart);
  const shipping = 0.00;
  const grandTotal = total + shipping;

  // Render động danh sách sản phẩm từ giỏ hàng thật
  const cartItemsHtml = cart.map(item => `
    <div class="flex items-center justify-between py-2.5">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center p-1 overflow-hidden shrink-0">
          <img src="${item.image}" alt="${item.name}" class="image-contain" />
        </div>
        <span class="text-sm text-gray-700 font-medium">${item.name} <span class="text-gray-400 text-xs font-normal">x${item.quantity}</span></span>
      </div>
      <span class="text-sm font-semibold text-gray-900">$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join("");

  return /*html*/ `
    <div class="w-full bg-white">
      <!-- 1. BREADCRUMB BANNER -->
      ${renderBreadcrumbsComponent([
        { label: "Shopping Cart", link: "./cart.html" },
        { label: "Checkout", link: "#", active: true }
      ])}

      <!-- 2. FORM BILLING & ORDER SUMMARY -->
      <div class="container-custom mx-auto px-4 md:px-8 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <!-- CỘT TRÁI: BILLING INFORMATION -->
          <div class="lg:col-span-7 space-y-8">
            <div>
              <h2 class="text-2xl font-semibold text-gray-900 mb-6">Billing Information</h2>
              <form class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label class="form-label">First name</label>
                    <input type="text" placeholder="Your first name" class="form-input" />
                  </div>
                  <div>
                    <label class="form-label">Last name</label>
                    <input type="text" placeholder="Your last name" class="form-input" />
                  </div>
                  <div>
                    <label class="form-label">Company Name <span class="text-gray-400 font-normal">(optional)</span></label>
                    <input type="text" placeholder="Company name" class="form-input" />
                  </div>
                </div>

                <div>
                  <label class="form-label">Street Address</label>
                  <input type="text" placeholder="Email or address" class="form-input" />
                </div>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <div>
    <label class="block text-xs font-medium text-gray-700 mb-1.5">Country / Region</label>
    <select id="country-select" class="w-full h-11 px-4 border border-gray-200 rounded-lg text-sm text-gray-500 bg-white focus:outline-none focus:border-[#00B207] cursor-pointer">
      ${renderCountryOptions()}
    </select>
  </div>

  <div>
    <label class="block text-xs font-medium text-gray-700 mb-1.5">States</label>
    <select id="state-select" class="w-full h-11 px-4 border border-gray-200 rounded-lg text-sm text-gray-500 bg-white focus:outline-none focus:border-[#00B207] cursor-pointer">
      ${renderStateOptions()}
    </select>
  </div>

  <div>
    <label class="block text-xs font-medium text-gray-700 mb-1.5">Zip Code</label>
    <input type="text" placeholder="Zip Code" class="w-full h-11 px-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00B207]" />
  </div>
</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="form-label">Email</label>
                    <input type="email" placeholder="Email Address" class="form-input" />
                  </div>
                  <div>
                    <label class="form-label">Phone</label>
                    <input type="tel" placeholder="Phone number" class="form-input" />
                  </div>
                </div>

                <div class="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="ship-different" class="w-4 h-4 text-[#00B207] rounded border-gray-300 accent-[#00B207] cursor-pointer" />
                  <label for="ship-different" class="text-xs text-gray-600 cursor-pointer select-none">Ship to a different address</label>
                </div>
              </form>
            </div>

            <div class="pt-4 border-t border-gray-100">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Additional Info</h3>
              <div>
                <label class="form-label">Order Notes <span class="text-gray-400 font-normal">(Optional)</span></label>
                <textarea rows="4" placeholder="Notes about your order, e.g. special notes for delivery" class="w-full p-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00B207] resize-none"></textarea>
              </div>
            </div>
          </div>

          <!-- CỘT PHẢI: ORDER SUMMARY (CÁC MÓN THANH TOÁN TỪ GIỎ HÀNG THỰC TẾ) -->
          <div class="lg:col-span-5">
            <div class="p-6 md:p-8 rounded-2xl border border-gray-200 bg-white shadow-xs space-y-6">
              <h3 class="text-lg font-semibold text-gray-900">Order Summary</h3>

              <!-- Danh sách món ăn trong giỏ hàng -->
              <div class="divide-y divide-gray-100">
                ${cartItemsHtml}
              </div>

              <div class="space-y-3 pt-4 border-t border-gray-100 text-sm">
                <div class="flex items-center justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span class="font-semibold text-gray-900">$${total.toFixed(2)}</span>
                </div>
                <div class="flex items-center justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span class="font-semibold text-gray-900">${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
                </div>
                <div class="flex items-center justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total:</span>
                  <span class="text-lg font-bold text-gray-900">$${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div class="pt-4 border-t border-gray-100 space-y-3">
                <h4 class="text-sm font-semibold text-gray-900">Payment Method</h4>
                <div class="space-y-2.5">
                  <label class="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                    <input type="radio" name="payment" value="cod" checked class="w-4 h-4 text-[#00B207] accent-[#00B207] cursor-pointer" />
                    <span>Cash on Delivery</span>
                  </label>
                  <label class="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                    <input type="radio" name="payment" value="paypal" class="w-4 h-4 text-[#00B207] accent-[#00B207] cursor-pointer" />
                    <span>Paypal</span>
                  </label>
                  <label class="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                    <input type="radio" name="payment" value="amazon" class="w-4 h-4 text-[#00B207] accent-[#00B207] cursor-pointer" />
                    <span>Amazon Pay</span>
                  </label>
                </div>
              </div>

              <button class="w-full h-12 bg-[#00B207] hover:bg-[#009e06] text-white font-semibold rounded-full shadow-md transition-all duration-200 cursor-pointer select-none text-sm tracking-wide">
                Place Order
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}
