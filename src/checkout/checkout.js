import { renderBreadcrumbsComponent } from "../components/breadcrumbs.js";
import { renderCountryOptions, renderStateOptions } from "./Location.js";
import { getCart, getCartSummary } from "../shopping_cart/cartData.js";

export function renderCheckout(cart = getCart()) {
  const { total } = getCartSummary(cart);
  const shipping = 0.00;
  const grandTotal = total + shipping;

const safeCart = Array.isArray(cart) ? cart : [];

const cartItemsHtml = safeCart.length > 0 
  ? safeCart.map(item => `
    <div class="w-full flex justify-between items-center py-1.5">
      <div class="flex items-center gap-3">
        <img class="w-[60px] h-[60px] object-cover rounded shrink-0" src="${item.image}" alt="${item.name}" />
        <span class="text-zinc-900 text-sm font-normal leading-5">${item.name} <span class="text-zinc-900">x${item.quantity}</span></span>
      </div>
      <div class="text-zinc-900 text-sm font-medium leading-5">$${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join("")
  : `<p class="text-sm text-neutral-400 py-2">Your cart is empty.</p>`;

  return /*html*/ `
    <div class="w-full bg-white font-['Poppins']">
      <!-- BREADCRUMB BANNER -->
      ${renderBreadcrumbsComponent([
        { label: "Shopping Cart", link: "./cart.html" },
        { label: "Checkout", link: "#", active: true }
      ])}

      <!-- MAIN CONTAINER (1320px chuẩn Figma) -->
      <div class="w-[1320px] mx-auto py-12">
        <form id="checkout-form" class="flex gap-6 items-start">
          
          <!-- CỘT TRÁI: BILLING INFORMATION (872px) -->
          <div class="w-[872px] shrink-0 flex flex-col gap-8">
            <div class="flex flex-col gap-6">
              <h2 class="text-zinc-900 text-2xl font-medium leading-9">Billing Information</h2>
              
              <div class="flex flex-col gap-4">
                <!-- Hàng 1: First name / Last name / Company Name -->
                <div class="grid grid-cols-3 gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-zinc-900 text-sm font-normal leading-5">First name</label>
                    <input type="text" placeholder="Your first name" class="w-full h-12 px-4 bg-white rounded-md border border-neutral-200 focus:outline-green-600 text-base text-zinc-900 placeholder:text-neutral-400" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-zinc-900 text-sm font-normal leading-5">Last name</label>
                    <input type="text" placeholder="Your last name" class="w-full h-12 px-4 bg-white rounded-md border border-neutral-200 focus:outline-green-600 text-base text-zinc-900 placeholder:text-neutral-400" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-zinc-900 text-sm font-normal leading-5">Company Name <span class="text-zinc-500">(optional)</span></label>
                    <input type="text" placeholder="Company name" class="w-full h-12 px-4 bg-white rounded-md border border-neutral-200 focus:outline-green-600 text-base text-zinc-900 placeholder:text-neutral-400" />
                  </div>
                </div>

                <!-- Hàng 2: Street Address -->
                <div class="flex flex-col gap-2">
                  <label class="text-zinc-900 text-sm font-normal leading-5">Street Address</label>
                  <input type="text" placeholder="Email" class="w-full h-12 px-4 bg-white rounded-md border border-neutral-200 focus:outline-green-600 text-base text-zinc-900 placeholder:text-neutral-400" />
                </div>

                <!-- Hàng 3: Country / States / Zip Code -->
                <div class="grid grid-cols-3 gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-zinc-900 text-sm font-normal leading-5">Country / Region</label>
                    <select id="country-select" class="w-full h-12 px-4 bg-white rounded-md border border-neutral-200 focus:outline-green-600 text-neutral-400 text-base cursor-pointer">
                      ${renderCountryOptions()}
                    </select>
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-zinc-900 text-sm font-normal leading-5">States</label>
                    <select id="state-select" class="w-full h-12 px-4 bg-white rounded-md border border-neutral-200 focus:outline-green-600 text-neutral-400 text-base cursor-pointer">
                      ${renderStateOptions()}
                    </select>
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-zinc-900 text-sm font-normal leading-5">Zip Code</label>
                    <input type="text" placeholder="Zip Code" class="w-full h-12 px-4 bg-white rounded-md border border-neutral-200 focus:outline-green-600 text-base text-zinc-900 placeholder:text-neutral-400" />
                  </div>
                </div>

                <!-- Hàng 4: Email / Phone -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-zinc-900 text-sm font-normal leading-5">Email</label>
                    <input type="email" placeholder="Email Address" class="w-full h-12 px-4 bg-white rounded-md border border-neutral-200 focus:outline-green-600 text-base text-zinc-900 placeholder:text-neutral-400" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-zinc-900 text-sm font-normal leading-5">Phone</label>
                    <input type="tel" placeholder="Phone number" class="w-full h-12 px-4 bg-white rounded-md border border-neutral-200 focus:outline-green-600 text-base text-zinc-900 placeholder:text-neutral-400" />
                  </div>
                </div>

                <!-- Checkbox -->
                <div class="inline-flex items-center gap-1.5 pt-1">
                  <input type="checkbox" id="ship-different" class="w-5 h-5 rounded border-stone-300 accent-green-600 cursor-pointer" />
                  <label for="ship-different" class="text-neutral-600 text-sm font-normal leading-5 cursor-pointer select-none">Ship to a different address</label>
                </div>
              </div>
            </div>

            <!-- Đường kẻ ngang -->
            <div class="w-full h-px bg-neutral-200"></div>

            <!-- ADDITIONAL INFO -->
            <div class="flex flex-col gap-5">
              <h3 class="text-zinc-900 text-2xl font-medium leading-9">Additional Info</h3>
              <div class="flex flex-col gap-2">
                <label class="text-zinc-900 text-sm font-normal leading-5">Order Notes (Optional)</label>
                <textarea rows="3" placeholder="Notes about your order, e.g. special notes for delivery" class="w-full h-24 p-4 bg-white rounded-md border border-neutral-200 focus:outline-green-600 text-base text-zinc-900 placeholder:text-neutral-400 resize-none"></textarea>
              </div>
            </div>
          </div>

          <!-- CỘT PHẢI: ORDER SUMMERY (424px) -->
          <div class="w-[424px] shrink-0">
            <div class="p-6 bg-white rounded-lg border border-neutral-200 flex flex-col gap-6">
              
              <div class="flex flex-col gap-3">
                <h3 class="text-zinc-900 text-xl font-medium leading-8">Order Summery</h3>
                
                <!-- Danh sách sản phẩm từ giỏ hàng -->
                <div class="flex flex-col">
                  ${cartItemsHtml}
                </div>

                <!-- Bảng giá tính toán động -->
                <div class="flex flex-col pt-1">
                  <div class="py-3 flex justify-between items-center">
                    <span class="text-neutral-600 text-sm font-normal leading-5">Subtotal:</span>
                    <span class="text-zinc-900 text-sm font-medium leading-5">$${total.toFixed(2)}</span>
                  </div>
                  <div class="w-full h-px bg-neutral-200"></div>
                  
                  <div class="py-3 flex justify-between items-center">
                    <span class="text-neutral-600 text-sm font-normal leading-5">Shipping:</span>
                    <span class="text-zinc-900 text-sm font-medium leading-5">${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
                  </div>
                  <div class="w-full h-px bg-neutral-200"></div>
                  
                  <div class="pt-3 flex justify-between items-center">
                    <span class="text-neutral-600 text-base font-normal leading-6">Total:</span>
                    <span class="text-zinc-900 text-lg font-semibold leading-5">$${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <!-- Payment Method -->
              <div class="flex flex-col gap-2.5">
                <h4 class="text-zinc-900 text-xl font-medium leading-8">Payment Method</h4>
                <div class="flex flex-col gap-2.5">
                  <label class="inline-flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="payment" value="cod" checked class="w-5 h-5 accent-green-600 cursor-pointer" />
                    <span class="text-neutral-600 text-sm font-normal leading-5">Cash on Delivery</span>
                  </label>
                  <label class="inline-flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="payment" value="paypal" class="w-5 h-5 accent-green-600 cursor-pointer" />
                    <span class="text-neutral-600 text-sm font-normal leading-5">Paypal</span>
                  </label>
                  <label class="inline-flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="payment" value="amazon" class="w-5 h-5 accent-green-600 cursor-pointer" />
                    <span class="text-zinc-900 text-sm font-normal leading-5">Amazon Pay</span>
                  </label>
                </div>
              </div>

              <!-- Nút Place Order -->
              <button type="submit" class="w-full h-12 bg-[#00b207] hover:bg-green-700 transition-colors rounded-[43px] flex justify-center items-center text-white text-base font-semibold leading-5 cursor-pointer">
                Place Order
              </button>

            </div>
          </div>

        </form>
      </div>
    </div>
  `;
}