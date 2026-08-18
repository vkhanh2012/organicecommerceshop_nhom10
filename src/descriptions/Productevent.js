import { addProductToCart } from "../shopping_cart/cartData.js";

export function bindProductDetailEvents(container, product, onNavigate) {
  if (!container) return;

  // 1. TĂNG GIẢM SỐ LƯỢNG (NÚT - VÀ +)
  const qtyVal = container.querySelector("[data-quantity-val]");
  const decBtn = container.querySelector('[data-action="decrease-qty"]');
  const incBtn = container.querySelector('[data-action="increase-qty"]');

  if (decBtn && qtyVal) {
    decBtn.addEventListener("click", () => {
      let current = Number(qtyVal.textContent) || 1;
      if (current > 1) qtyVal.textContent = current - 1;
    });
  }

  if (incBtn && qtyVal) {
    incBtn.addEventListener("click", () => {
      let current = Number(qtyVal.textContent) || 1;
      qtyVal.textContent = current + 1;
    });
  }

  // 2. BẤM ADD TO CART -> LƯU MÓN VÀO SHOPPING CART & CHUYỂN TRANG
  const addBtn = container.querySelector('[data-action="add-to-cart"]');
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const selectedQuantity = qtyVal ? (Number(qtyVal.textContent) || 1) : 1;

      // Lưu món ăn + số lượng vừa chọn vào localStorage
      addProductToCart(product, selectedQuantity);

      // Chuyển hướng sang giỏ hàng Shopping Cart
      if (typeof onNavigate === "function") {
        onNavigate("cart");
      } else {
        window.location.href = "./cart.html";
      }
    });
  }
}