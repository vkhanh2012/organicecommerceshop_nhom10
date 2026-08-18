// src/components/productEvents.js

import { openQuickView } from "../Quickview/quickview.js";
import {
  getCart,
  saveCart
} from "../shopping_cart/cartData.js";

import productsData from "../data/products.json";
import { attachImageUrls } from "../utils/assets.js";


// =====================================================
// LẤY DANH SÁCH PRODUCT
// =====================================================

let productsCache = null;

async function getAllProducts() {
  if (productsCache) {
    return productsCache;
  }

  productsCache = attachImageUrls(productsData);

  return productsCache;
}


// =====================================================
// TÌM PRODUCT THEO ID
// =====================================================

async function findProductById(id) {
  const products = await getAllProducts();

  return products.find(
    product => String(product.id) === String(id)
  );
}


// =====================================================
// ADD TO CART
// =====================================================

async function handleAddToCart(button) {

  const id = button.dataset.id;

  if (!id) {
    console.error("Không có product id");
    return;
  }

  const product = await findProductById(id);

  if (!product) {
    console.error("Không tìm thấy product:", id);
    return;
  }

  const cart = getCart();

  const existingProduct = cart.find(
    item => String(item.id) === String(product.id)
  );

  if (existingProduct) {

    existingProduct.quantity =
      Number(existingProduct.quantity || 0) + 1;

  } else {

    cart.push({
      id: product.id,
      name: product.name,
      image: product.image,
      price: Number(product.price) || 0,
      quantity: 1
    });

  }

  saveCart(cart);

  console.log("Đã thêm vào cart:", product);

  showCartToast(product.name);
}


// =====================================================
// TOAST
// =====================================================

function showCartToast(productName) {

  const oldToast =
    document.getElementById("cart-toast");

  if (oldToast) {
    oldToast.remove();
  }

  const toast =
    document.createElement("div");

  toast.id = "cart-toast";

  toast.className = `
    fixed
    bottom-6
    right-6
    z-[9999]
    bg-[#1A1A1A]
    text-white
    px-5
    py-3
    rounded-lg
    shadow-xl
    text-sm
    font-medium
  `;

  toast.textContent =
    `${productName} đã được thêm vào giỏ hàng`;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}


// =====================================================
// QUICK VIEW
// =====================================================

async function handleQuickView(button) {

  const id = button.dataset.id;

  if (!id) {
    console.error("Quick View không có product id");
    return;
  }

  const product = await findProductById(id);

  if (!product) {
    console.error(
      "Quick View không tìm thấy product:",
      id
    );

    return;
  }

  console.log(
    "QUICK VIEW PRODUCT:",
    product
  );

  openQuickView(product);
}


// =====================================================
// BIND PRODUCT EVENTS
// =====================================================

export function bindProductEvents(container = document) {

  // ===================================================
  // XÓA EVENT CŨ TRƯỚC KHI GẮN
  // ===================================================

  if (container.__productEventsBound) {
    return;
  }

  container.__productEventsBound = true;


  // ===================================================
  // CLICK
  // ===================================================

  container.addEventListener(
    "click",
    async (event) => {

      // ===============================================
      // QUICK VIEW
      // ===============================================

      const quickViewButton =
        event.target.closest(
          '[data-action="quick-view"]'
        );

      if (quickViewButton) {

        event.preventDefault();
        event.stopPropagation();

        await handleQuickView(
          quickViewButton
        );

        return;
      }


      // ===============================================
      // ADD TO CART
      // ===============================================

      const addCartButton =
        event.target.closest(
          '[data-action="add-to-cart"]'
        );

      if (addCartButton) {

        event.preventDefault();
        event.stopPropagation();

        await handleAddToCart(
          addCartButton
        );

        return;
      }


      // ===============================================
      // WISHLIST
      // ===============================================

      const wishlistButton =
        event.target.closest(
          '[data-action="wishlist"]'
        );

      if (wishlistButton) {

        event.preventDefault();
        event.stopPropagation();

        wishlistButton.classList.toggle(
          "text-red-500"
        );

        return;
      }

    }
  );
}