import { addProductToCart } from "./cartData.js";

export function bindProductDetailEvents(container, product, onNavigate) {
  if (!container) return;

  // 📸 1. SỬA LỖI BẤM ẢNH NHỎ ĐỔI ẢNH LỚN
  const mainImg = container.querySelector("#main-product-image");
  const thumbs = container.querySelectorAll('[data-action="select-thumb"]');

  thumbs.forEach(thumb => {
    thumb.addEventListener("click", (e) => {
      e.preventDefault();
      const newSrc = thumb.getAttribute("data-src");
      if (newSrc && mainImg) {
        mainImg.src = newSrc;

        // Đổi màu viền xanh lá đại diện ảnh active
        thumbs.forEach(t => {
          t.classList.remove("border-[#00B207]");
          t.classList.add("border-gray-200");
        });
        thumb.classList.remove("border-gray-200");
        thumb.classList.add("border-[#00B207]");
      }
    });
  });

  // 🔢 2. SỬA NÚT TĂNG GIẢM SỐ LƯỢNG ( - 1 + )
  const qtyVal = container.querySelector("[data-quantity-val]");
  const decBtn = container.querySelector('[data-action="decrease-qty"]');
  const incBtn = container.querySelector('[data-action="increase-qty"]');

  if (decBtn && qtyVal) {
    decBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let current = Number(qtyVal.textContent) || 1;
      if (current > 1) {
        qtyVal.textContent = current - 1;
      }
    });
  }

  if (incBtn && qtyVal) {
    incBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let current = Number(qtyVal.textContent) || 1;
      qtyVal.textContent = current + 1;
    });
  }

  // 🛒 3. LƯU SẢN PHẨM VÀO GIỎ HÀNG KHI BẤM ADD TO CART
  const addBtn = container.querySelector('[data-action="add-to-cart"]');
  if (addBtn) {
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const count = qtyVal ? (Number(qtyVal.textContent) || 1) : 1;

      // Lưu món ăn + số lượng chọn vào giỏ hàng
      addProductToCart(product, count);

      // Chuyển hướng ngay sang trang Shopping Cart
      if (typeof onNavigate === "function") {
        onNavigate("cart");
      } else {
        window.location.href = "./cart.html";
      }
    });
  }
}