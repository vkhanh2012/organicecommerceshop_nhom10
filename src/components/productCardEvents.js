import { openQuickView } from "../Quickview/quickview.js";
import {
  getCart,
  saveCart
} from "../shopping_cart/cartData.js";


// ======================================================
// PRODUCT CARD EVENTS
// ======================================================

export function bindProductCardEvents(root = document) {

  // ====================================================
  // QUICK VIEW
  // ====================================================

  root.addEventListener("click", (event) => {

    const quickViewButton =
      event.target.closest(
        '[data-action="quick-view"]'
      );

    if (!quickViewButton) return;


    // QUAN TRỌNG:
    // Không cho click lan sang link description

    event.preventDefault();
    event.stopPropagation();


    const productId =
      quickViewButton.dataset.id;


    if (!productId) {
      console.error(
        "Không tìm thấy product ID"
      );
      return;
    }


    console.log(
      "QUICK VIEW ID:",
      productId
    );


    openQuickView(productId);
  });


  // ====================================================
  // ADD TO CART
  // ====================================================

  root.addEventListener("click", (event) => {

    const cartButton =
      event.target.closest(
        '[data-action="add-to-cart"]'
      );

    if (!cartButton) return;


    event.preventDefault();
    event.stopPropagation();


    const id =
      cartButton.dataset.cartId;

    const name =
      cartButton.dataset.cartName;

    const image =
      cartButton.dataset.cartImage;

    const price =
      Number(cartButton.dataset.cartPrice);


    if (!id) return;


    const cart = getCart();


    const existing =
      cart.find(
        item =>
          String(item.id) === String(id)
      );


    if (existing) {

      existing.quantity =
        Number(existing.quantity || 0) + 1;

    } else {

      cart.push({
        id: id,
        name: name,
        image: image,
        price: price,
        quantity: 1
      });

    }


    saveCart(cart);


    console.log(
      "Đã thêm vào cart:",
      name
    );


    showCartToast(name);
  });

}


// ======================================================
// TOAST
// ======================================================

function showCartToast(name) {

  const oldToast =
    document.getElementById(
      "cart-toast"
    );

  if (oldToast) {
    oldToast.remove();
  }


  const toast =
    document.createElement("div");


  toast.id = "cart-toast";


  toast.className =
    "fixed bottom-6 right-6 z-[9999] " +
    "bg-[#1A1A1A] text-white " +
    "px-5 py-3 rounded-lg shadow-xl";


  toast.textContent =
    `${name} đã được thêm vào giỏ hàng`;


  document.body.appendChild(toast);


  setTimeout(() => {
    toast.remove();
  }, 2500);
}