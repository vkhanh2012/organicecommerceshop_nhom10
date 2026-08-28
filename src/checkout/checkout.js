import { renderBreadCrumb } from "../components/breadcrumbs.js";
import {
  iconValidationError,
  iconValidationSuccess,
  iconValidationWarning,
} from "../components/icons.js";
import {
  renderCountryOptions,
  renderStateOptions,
  bindLocationEvents,
} from "./Location.js";
import { getCart, getCartSummary, saveCart } from "../shopping_cart/cartData.js";

// =====================================================
// HELPER VALIDATION ICONS (INLINE SVG CHUẨN CODE 1)
// =====================================================
const svgError = /*html*/ `<svg class="w-4 h-4 text-error" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`;
const svgWarning = /*html*/ `<svg class="w-4 h-4 text-warning" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`;
const svgSuccess = /*html*/ `<svg class="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`;

function validationIcons() {
  return /*html*/ `
    <span class="signin-state-icon signin-error-icon pointer-events-none hidden" aria-hidden="true">
      ${iconValidationError}
    </span>
    <span class="signin-state-icon signin-warning-icon pointer-events-none hidden" aria-hidden="true">
      ${iconValidationWarning}
    </span>
    <span class="signin-state-icon signin-success-icon pointer-events-none hidden" aria-hidden="true">
      ${iconValidationSuccess}
    </span>
  `;
}

// =====================================================
// HELPER TO NORMALIZE CART INPUT (PREVENTS .reduce ERRORS)
// =====================================================
function normalizeCart(input) {
  if (Array.isArray(input)) {
    return input;
  }
  if (input && typeof input === "object") {
    if (Array.isArray(input.cartItems)) return input.cartItems;
    if (Array.isArray(input.cart)) return input.cart;
    if (Array.isArray(input.items)) return input.items;
  }
  return getCart();
}

// =====================================================
// RENDER CHECKOUT PAGE
// =====================================================
export function renderCheckout(rawCart = getCart()) {
  const safeCart = normalizeCart(rawCart);
  const { total } = getCartSummary(safeCart);
  const shipping = 0.00;
  const grandTotal = total + shipping;

  const cartItemsHtml = safeCart.length > 0 
    ? safeCart.map(item => `
      <div class="w-full flex justify-between items-center py-2.5 border-b border-neutral-100 last:border-none">
        <div class="flex items-center gap-3">
          <img class="w-[60px] h-[60px] object-cover rounded-md shrink-0 border border-neutral-200" src="${item.image || '/src/assets/images/cabbage1.svg'}" alt="${item.name}" />
          <span class="text-neutral-900 text-sm font-normal leading-5">${item.name} <span class="text-neutral-900 font-semibold">x${item.quantity}</span></span>
        </div>
        <div class="text-neutral-900 text-sm font-medium leading-5">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join("")
    : `<p class="text-sm text-neutral-400 py-4">Your cart is empty.</p>`;

  return /*html*/ `
    <div class="w-full bg-white font-['Poppins']">
      <!-- BREADCRUMB BANNER -->
      ${renderBreadCrumb([
        { label: "Shopping Cart", href: "./cart.html" },
        { label: "Checkout", active: true }
      ])}

      <!-- MAIN CONTAINER (1320px chuẩn Figma) -->
      <div class="container-custom pb-10 pt-8">
        <form id="checkout-form" class="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] lg:gap-6 min-[1400px]:grid-cols-[872px_424px] [&_h2]:text-neutral-900 [&_h3]:text-neutral-900 [&_h4]:text-neutral-900 [&_label]:text-neutral-900 [&_.signin-input]:text-neutral-900 [&_.signin-input]:focus:border-primary [&_.signin-field-message]:text-error" novalidate>
          
          <!-- CỘT TRÁI: BILLING INFORMATION -->
          <div class="flex w-full min-w-0 flex-col gap-8">
            <div class="flex flex-col gap-6">
              <h2 class="text-neutral-900 text-2xl font-medium leading-9">Billing Information</h2>
              
              <div class="flex flex-col gap-5">
                <!-- Hàng 1: First name / Last name / Company Name -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <!-- First Name -->
                  <div class="signin-field flex flex-col gap-1.5" data-field data-state="normal">
                    <label for="firstName" class="text-neutral-900 text-sm font-normal leading-5">First name <span class="text-error">*</span></label>
                    <div class="signin-input-control relative flex items-center">
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        required 
                        aria-invalid="false"
                        aria-describedby="firstName-message"
                        placeholder="Your first name" 
                        class="signin-input w-full h-12 px-4 pr-10 bg-white rounded-md border border-neutral-200 focus:border-primary focus:outline-none text-base text-neutral-900 placeholder:text-neutral-400 transition-colors" 
                      />
                      <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        ${validationIcons()}
                      </div>
                    </div>
                    <p id="firstName-message" class="signin-field-message text-error text-xs font-normal mt-0.5 hidden" data-field-message aria-live="polite"></p>
                  </div>

                  <!-- Last Name -->
                  <div class="signin-field flex flex-col gap-1.5" data-field data-state="normal">
                    <label for="lastName" class="text-neutral-900 text-sm font-normal leading-5">Last name <span class="text-error">*</span></label>
                    <div class="signin-input-control relative flex items-center">
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        required 
                        aria-invalid="false"
                        aria-describedby="lastName-message"
                        placeholder="Your last name" 
                        class="signin-input w-full h-12 px-4 pr-10 bg-white rounded-md border border-neutral-200 focus:border-primary focus:outline-none text-base text-neutral-900 placeholder:text-neutral-400 transition-colors" 
                      />
                      <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        ${validationIcons()}
                      </div>
                    </div>
                    <p id="lastName-message" class="signin-field-message text-error text-xs font-normal mt-0.5 hidden" data-field-message aria-live="polite"></p>
                  </div>

                  <!-- Company Name (Optional) -->
                  <div class="signin-field flex flex-col gap-1.5" data-field data-state="normal">
                    <label for="companyName" class="text-neutral-900 text-sm font-normal leading-5">Company Name <span class="text-neutral-400 font-normal">(optional)</span></label>
                    <div class="signin-input-control relative flex items-center">
                      <input 
                        type="text" 
                        id="companyName" 
                        name="companyName" 
                        aria-invalid="false"
                        placeholder="Company name" 
                        class="signin-input w-full h-12 px-4 pr-10 bg-white rounded-md border border-neutral-200 focus:border-primary focus:outline-none text-base text-neutral-900 placeholder:text-neutral-400 transition-colors" 
                      />
                      <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        ${validationIcons()}
                      </div>
                    </div>
                    <p id="companyName-message" class="signin-field-message text-error text-xs font-normal mt-0.5 hidden" data-field-message aria-live="polite"></p>
                  </div>
                </div>

                <!-- Hàng 2: Street Address -->
                <div class="signin-field flex flex-col gap-1.5" data-field data-state="normal">
                  <label for="streetAddress" class="text-neutral-900 text-sm font-normal leading-5">Street Address <span class="text-error">*</span></label>
                  <div class="signin-input-control relative flex items-center">
                    <input 
                      type="text" 
                      id="streetAddress" 
                      name="streetAddress" 
                      required 
                      aria-invalid="false"
                      aria-describedby="streetAddress-message"
                      placeholder="House number and street name" 
                      class="signin-input w-full h-12 px-4 pr-10 bg-white rounded-md border border-neutral-200 focus:border-primary focus:outline-none text-base text-neutral-900 placeholder:text-neutral-400 transition-colors" 
                    />
                    <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                      ${validationIcons()}
                    </div>
                  </div>
                  <p id="streetAddress-message" class="signin-field-message text-error text-xs font-normal mt-0.5 hidden" data-field-message aria-live="polite"></p>
                </div>

                <!-- Hàng 3: Country / States / Zip Code -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <!-- Country / Region -->
                  <div class="signin-field flex flex-col gap-1.5" data-field data-state="normal">
                    <label for="country-select" class="text-neutral-900 text-sm font-normal leading-5">Country / Region <span class="text-error">*</span></label>
                    <div class="signin-input-control relative flex items-center">
                      <select 
                        id="country-select" 
                        name="country" 
                        required 
                        aria-invalid="false"
                        aria-describedby="country-message"
                        class="signin-input w-full h-12 px-4 pr-10 bg-white rounded-md border border-neutral-200 focus:border-primary focus:outline-none text-neutral-600 text-base cursor-pointer transition-colors"
                      >
                        ${renderCountryOptions()}
                      </select>
                      <div class="absolute right-8 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                        ${validationIcons()}
                      </div>
                    </div>
                    <p id="country-message" class="signin-field-message text-error text-xs font-normal mt-0.5 hidden" data-field-message aria-live="polite"></p>
                  </div>

                  <!-- States -->
                  <div class="signin-field flex flex-col gap-1.5" data-field data-state="normal">
                    <label for="state-select" class="text-neutral-900 text-sm font-normal leading-5">States <span class="text-error">*</span></label>
                    <div class="signin-input-control relative flex items-center">
                      <select 
                        id="state-select" 
                        name="state" 
                        required 
                        aria-invalid="false"
                        aria-describedby="state-message"
                        class="signin-input w-full h-12 px-4 pr-10 bg-white rounded-md border border-neutral-200 focus:border-primary focus:outline-none text-neutral-600 text-base cursor-pointer transition-colors"
                      >
                        ${renderStateOptions()}
                      </select>
                      <div class="absolute right-8 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                        ${validationIcons()}
                      </div>
                    </div>
                    <p id="state-message" class="signin-field-message text-error text-xs font-normal mt-0.5 hidden" data-field-message aria-live="polite"></p>
                  </div>

                  <!-- Zip Code -->
                  <div class="signin-field flex flex-col gap-1.5" data-field data-state="normal">
                    <label for="zipCode" class="text-neutral-900 text-sm font-normal leading-5">Zip Code <span class="text-error">*</span></label>
                    <div class="signin-input-control relative flex items-center">
                      <input 
                        type="text" 
                        id="zipCode" 
                        name="zipCode" 
                        required 
                        aria-invalid="false"
                        aria-describedby="zipCode-message"
                        placeholder="Zip Code" 
                        class="signin-input w-full h-12 px-4 pr-10 bg-white rounded-md border border-neutral-200 focus:border-primary focus:outline-none text-base text-neutral-900 placeholder:text-neutral-400 transition-colors" 
                      />
                      <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        ${validationIcons()}
                      </div>
                    </div>
                    <p id="zipCode-message" class="signin-field-message text-error text-xs font-normal mt-0.5 hidden" data-field-message aria-live="polite"></p>
                  </div>
                </div>

                <!-- Hàng 4: Email / Phone -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Email -->
                  <div class="signin-field flex flex-col gap-1.5" data-field data-state="normal">
                    <label for="email" class="text-neutral-900 text-sm font-normal leading-5">Email <span class="text-error">*</span></label>
                    <div class="signin-input-control relative flex items-center">
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        aria-invalid="false"
                        aria-describedby="email-message"
                        placeholder="Email Address" 
                        class="signin-input w-full h-12 px-4 pr-10 bg-white rounded-md border border-neutral-200 focus:border-primary focus:outline-none text-base text-neutral-900 placeholder:text-neutral-400 transition-colors" 
                      />
                      <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        ${validationIcons()}
                      </div>
                    </div>
                    <p id="email-message" class="signin-field-message text-error text-xs font-normal mt-0.5 hidden" data-field-message aria-live="polite"></p>
                  </div>

                  <!-- Phone -->
                  <div class="signin-field flex flex-col gap-1.5" data-field data-state="normal">
                    <label for="phone" class="text-neutral-900 text-sm font-normal leading-5">Phone <span class="text-error">*</span></label>
                    <div class="signin-input-control relative flex items-center">
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        aria-invalid="false"
                        aria-describedby="phone-message"
                        placeholder="Phone number" 
                        class="signin-input w-full h-12 px-4 pr-10 bg-white rounded-md border border-neutral-200 focus:border-primary focus:outline-none text-base text-neutral-900 placeholder:text-neutral-400 transition-colors" 
                      />
                      <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        ${validationIcons()}
                      </div>
                    </div>
                    <p id="phone-message" class="signin-field-message text-error text-xs font-normal mt-0.5 hidden" data-field-message aria-live="polite"></p>
                  </div>
                </div>

                <!-- Checkbox Ship Different -->
                <div class="inline-flex items-center gap-2 pt-1">
                  <input type="checkbox" id="ship-different" name="shipDifferent" class="w-5 h-5 rounded border-neutral-300 accent-primary cursor-pointer" />
                  <label for="ship-different" class="text-neutral-600 text-sm font-normal leading-5 cursor-pointer select-none">Ship to a different address</label>
                </div>
              </div>
            </div>

            <!-- Đường kẻ ngang -->
            <div class="w-full h-px bg-neutral-200"></div>

            <!-- ADDITIONAL INFO -->
            <div class="flex flex-col gap-5">
              <h3 class="text-neutral-900 text-2xl font-medium leading-9">Additional Info</h3>
              <div class="signin-field flex flex-col gap-1.5" data-field data-state="normal">
                <label for="orderNotes" class="text-neutral-900 text-sm font-normal leading-5">Order Notes (Optional)</label>
                <div class="signin-input-control relative flex items-start">
                  <textarea 
                    id="orderNotes" 
                    name="orderNotes" 
                    aria-invalid="false"
                    rows="3" 
                    placeholder="Notes about your order, e.g. special notes for delivery" 
                    class="signin-input w-full h-24 p-4 bg-white rounded-md border border-neutral-200 focus:border-primary focus:outline-none text-base text-neutral-900 placeholder:text-neutral-400 resize-none transition-colors"
                  ></textarea>
                  ${validationIcons()}
                </div>
              </div>
            </div>
          </div>

          <!-- CỘT PHẢI: ORDER SUMMARY -->
          <div class="w-full min-w-0 lg:-mt-2">
            <div class="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
              
              <div class="flex flex-col gap-4">
                <h3 class="text-neutral-900 text-xl font-medium leading-8">Order Summery</h3>
                <h3 class="text-neutral-900 text-xl font-medium leading-8">Order Summery</h3>
                
                <!-- Danh sách sản phẩm từ giỏ hàng -->
                <div class="flex max-h-[260px] flex-col overflow-y-auto">
                  ${cartItemsHtml}
                </div>

                <!-- Bảng giá tính toán động -->
                <div class="flex flex-col pt-2">
                  <div class="py-3 flex justify-between items-center text-sm">
                    <span class="text-neutral-600 font-normal leading-5">Subtotal:</span>
                    <span class="text-neutral-900 font-medium leading-5">$${total.toFixed(2)}</span>
                  </div>
                  <div class="w-full h-px bg-neutral-200"></div>
                  
                  <div class="py-3 flex justify-between items-center text-sm">
                    <span class="text-neutral-600 font-normal leading-5">Shipping:</span>
                    <span class="text-neutral-900 font-medium leading-5">${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
                  </div>
                  <div class="w-full h-px bg-neutral-200"></div>
                  
                  <div class="pt-3 flex justify-between items-center text-base">
                    <span class="text-neutral-600 font-normal leading-6">Total:</span>
                    <span class="text-neutral-900 text-lg font-semibold leading-5">$${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <!-- Payment Method -->
              <div class="flex flex-col gap-3 pt-2 border-t border-neutral-200">
                <h4 class="text-neutral-900 text-lg font-medium leading-7">Payment Method</h4>
                <div class="flex flex-col gap-2.5">
                  <label class="inline-flex items-center gap-2.5 cursor-pointer">
                    <input type="radio" name="paymentMethod" value="cod" checked class="w-5 h-5 accent-primary cursor-pointer" />
                    <span class="text-neutral-600 text-sm font-normal leading-5">Cash on Delivery</span>
                  </label>
                  <label class="inline-flex items-center gap-2.5 cursor-pointer">
                    <input type="radio" name="paymentMethod" value="paypal" class="w-5 h-5 accent-primary cursor-pointer" />
                    <span class="text-neutral-600 text-sm font-normal leading-5">Paypal</span>
                  </label>
                  <label class="inline-flex items-center gap-2.5 cursor-pointer">
                    <input type="radio" name="paymentMethod" value="amazon" class="w-5 h-5 accent-primary cursor-pointer" />
                    <span class="text-neutral-900 text-sm font-normal leading-5">Amazon Pay</span>
                  </label>
                </div>
              </div>

              <!-- Nút Place Order -->
              <button 
                type="submit" 
                class="w-full h-12 bg-primary hover:bg-primary-dark transition-colors rounded-pill flex justify-center items-center text-white text-base font-semibold leading-5 cursor-pointer shadow-sm select-none mt-2"
              >
                Place Order
              </button>

            </div>
          </div>

        </form>
      </div>
    </div>
  `;
}

// =====================================================
// BIND CHECKOUT FORM VALIDATION & EVENTS (ĐỒNG BỘ CODE 1)
// =====================================================
export function bindCheckoutEvents(container = document) {
  const form = container.querySelector("#checkout-form") || container;
  if (!form) return;

  // LẮNG NGHE SỰ KIỆN CHỌN QUỐC GIA -> CẬP NHẬT TỈNH THÀNH ĐỘNG
  bindLocationEvents(form);

  const updateFieldState = (input, state, message = "") => {
    const field = input.closest("[data-field]");
    const messageElement = field?.querySelector("[data-field-message]");
    if (!field || !messageElement) return;

    field.dataset.state = state;
    if (state === "error") field.dataset.wasInvalid = "true";
    if (state === "success") delete field.dataset.wasInvalid;
    messageElement.textContent = message;
    input.setAttribute("aria-invalid", String(state === "error"));
  };

  const getFieldError = (input) => {
    const value = input.value.trim();
    const field = input.closest("[data-field]");

    if (input.required && !value) {
      const label = field?.querySelector("label")?.textContent
        ?.replace("*", "")
        ?.trim() || input.name;
      return `Please enter ${label}`;
    }

    if (value && input.type === "email" && !input.validity.valid) {
      return "Please enter a valid email address";
    }

    if (value && input.type === "tel" && !/^[0-9+\s-]{9,15}$/.test(value)) {
      return "Please enter a valid phone number (at least 9 digits)";
    }

    return "";
  };

  const validateField = (input, { showSuccess = false } = {}) => {
    if (!input?.name) return true;

    const error = getFieldError(input);
    if (error) {
      updateFieldState(input, "error", error);
      return false;
    }

    const warning = input.dataset.warningMessage?.trim();
    if (warning) {
      updateFieldState(input, "warning", warning);
      return true;
    }

    updateFieldState(
      input,
      showSuccess || input.closest("[data-field]")?.dataset.wasInvalid
        ? "success"
        : input.value.trim() ? "filled" : "normal",
    );
    return true;
  };

  const inputs = form.querySelectorAll("input[required], select[required], textarea[name=\"orderNotes\"]");
  inputs.forEach(input => {
    input.addEventListener("focus", () => updateFieldState(input, "typing"));
    input.addEventListener("input", () => updateFieldState(input, "typing"));
    input.addEventListener("blur", () => validateField(input));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isFormValid = true;
    let firstInvalidInput = null;

    inputs.forEach(input => {
      const valid = validateField(input, { showSuccess: true });
      if (!valid) {
        isFormValid = false;
        if (!firstInvalidInput) firstInvalidInput = input;
      }
    });

    if (!isFormValid) {
      firstInvalidInput?.focus();
      return;
    }

    saveCart([]);
    alert("Thank you! Your order has been placed successfully.");
    window.location.href = "./index.html";
  });
}

