// src/Quickview/quickview.js

import {
  renderImage,
  bindImageEvents
} from "../descriptions/Image.js";

import {
  renderProductInfo
} from "../descriptions/ProductInfo.js";

import defaultProductData from "../data/productdata.json";

import {
  getCart,
  saveCart
} from "../shopping_cart/cartData.js";

import productListJson from "../data/products.json";

import {
  attachImageUrls
} from "../utils/assets.js";


// =====================================================
// PRODUCT DATA
// =====================================================

const PRODUCTS = attachImageUrls(productListJson);


// =====================================================
// TÌM PRODUCT THEO ID
// =====================================================

function findProductById(id) {

  if (id === undefined || id === null) {
    return null;
  }

  return PRODUCTS.find(
    product =>
      String(product.id) === String(id)
  ) || null;
}


// =====================================================
// CHUẨN HÓA PRODUCT CHO QUICK VIEW
// =====================================================

function normalizeProduct(product) {

  if (!product) {
    return normalizeProduct(defaultProductData);
  }

  const image =
    product.image ||
    product.mainImage ||
    defaultProductData.mainImage ||
    "";

  const thumbnails =
    Array.isArray(product.thumbnails) &&
    product.thumbnails.length > 0

      ? product.thumbnails

      : [
          image,
          image,
          image,
          image
        ];


  // -----------------------------------------------
  // TAGS
  // -----------------------------------------------

  const tags =
    Array.isArray(product.tags)

      ? product.tags

      : (
          Array.isArray(defaultProductData.tags)
            ? defaultProductData.tags
            : []
        );


  // -----------------------------------------------
  // FEEDBACKS
  // -----------------------------------------------

  const feedbacks =
    Array.isArray(product.feedbacks)

      ? product.feedbacks

      : (
          Array.isArray(defaultProductData.feedbacks)
            ? defaultProductData.feedbacks
            : []
        );


  // -----------------------------------------------
  // ADDITIONAL INFO
  // -----------------------------------------------

  const defaultAdditionalInfo =
    defaultProductData.additionalInfo || {};


  const additionalInfo = {

    ...defaultAdditionalInfo,

    ...(product.additionalInfo || {}),

    tags:
      Array.isArray(product.additionalInfo?.tags)

        ? product.additionalInfo.tags

        : (
            Array.isArray(defaultAdditionalInfo.tags)
              ? defaultAdditionalInfo.tags
              : []
          )
  };


  // -----------------------------------------------
  // CATEGORY
  // -----------------------------------------------

  let category;

  if (
    typeof product.category === "object" &&
    product.category !== null
  ) {

    category = {
      name:
        product.category.name ||
        "Vegetables",

      link:
        product.category.link ||
        "#"
    };

  } else {

    category = {
      name:
        product.category ||
        "Vegetables",

      link: "#"
    };
  }


  // -----------------------------------------------
  // PRICE
  // -----------------------------------------------

  const currentPrice =
    Number(
      product.currentPrice ??
      product.price ??
      defaultProductData.currentPrice ??
      0
    );


  const originalPrice =
    product.originalPrice ??
    product.oldPrice ??
    defaultProductData.originalPrice ??
    null;


  // -----------------------------------------------
  // RETURN PRODUCT
  // -----------------------------------------------

  return {

    ...defaultProductData,

    ...product,

    id:
      product.id ??
      defaultProductData.id ??
      Date.now(),

    name:
      product.name ||
      defaultProductData.name ||
      "Product",

    currentPrice,

    originalPrice,

    price: currentPrice,

    oldPrice: originalPrice,

    mainImage: image,

    image,

    thumbnails,

    tags,

    feedbacks,

    additionalInfo,

    category,

    rating:
      Number(
        product.rating ??
        defaultProductData.rating ??
        4
      ),

    reviewsCount:
      Number(
        product.reviewsCount ??
        defaultProductData.reviewsCount ??
        0
      ),

    description:
      product.description ??
      defaultProductData.description ??
      ""
  };
}


// =====================================================
// RENDER QUICK VIEW MODAL
// =====================================================

export function renderQuickViewModal(product) {

  const safeProduct =
    normalizeProduct(product);


  return /*html*/ `

    <div
      id="quick-view-modal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
    >

      <div
        class="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
      >

        <!-- CLOSE BUTTON -->

        <button
          id="close-quick-view"
          type="button"
          class="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-all cursor-pointer z-50"
        >
          ✕
        </button>


        <!-- CONTENT -->

        <div
          id="quick-view-content"
          class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >

          ${renderImage(safeProduct)}

          ${renderProductInfo(safeProduct)}

        </div>

      </div>

    </div>

  `;
}


// =====================================================
// OPEN QUICK VIEW
// =====================================================

export function openQuickView(productDataOrId) {

  let targetProduct = null;


  // ===================================================
  // TRƯỜNG HỢP 1: TRUYỀN OBJECT
  // ===================================================

  if (
    typeof productDataOrId === "object" &&
    productDataOrId !== null
  ) {

    // Nếu object có ID thì ưu tiên lấy
    // dữ liệu đầy đủ từ products.json

    if (productDataOrId.id !== undefined) {

      targetProduct =
        findProductById(
          productDataOrId.id
        );

    }


    // Nếu không tìm thấy thì dùng object truyền vào

    if (!targetProduct) {

      targetProduct =
        productDataOrId;

    }
  }


  // ===================================================
  // TRƯỜNG HỢP 2: TRUYỀN ID
  // ===================================================

  else if (
    typeof productDataOrId === "number" ||
    typeof productDataOrId === "string"
  ) {

    targetProduct =
      findProductById(
        productDataOrId
      );
  }


  // ===================================================
  // NẾU KHÔNG TÌM THẤY
  // ===================================================

  if (!targetProduct) {

    console.warn(
      "Không tìm thấy sản phẩm. Dùng defaultProductData."
    );

    targetProduct =
      defaultProductData;
  }


  // ===================================================
  // CHUẨN HÓA
  // ===================================================

  const product =
    normalizeProduct(
      targetProduct
    );


  console.log(
    "QUICK VIEW PRODUCT FINAL:",
    product
  );


  // ===================================================
  // MODAL ROOT
  // ===================================================

  let modalContainer =
    document.getElementById(
      "modal-root"
    );


  if (!modalContainer) {

    modalContainer =
      document.createElement("div");

    modalContainer.id =
      "modal-root";

    document.body.appendChild(
      modalContainer
    );
  }


  // ===================================================
  // RENDER MODAL
  // ===================================================

  modalContainer.innerHTML =
    renderQuickViewModal(product);


  // ===================================================
  // ELEMENTS
  // ===================================================

  const modal =
    modalContainer.querySelector(
      "#quick-view-modal"
    );

  const closeBtn =
    modalContainer.querySelector(
      "#close-quick-view"
    );


  // ===================================================
  // CLOSE MODAL
  // ===================================================

  const closeModal = () => {

    modalContainer.innerHTML = "";

  };


  closeBtn?.addEventListener(
    "click",
    closeModal
  );


  // Click nền đen để đóng

  modal?.addEventListener(
    "click",
    (event) => {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );


  // ===================================================
  // ESC ĐỂ ĐÓNG
  // ===================================================

  const handleEscape = (event) => {

    if (
      event.key === "Escape"
    ) {

      closeModal();

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    }

  };


  document.addEventListener(
    "keydown",
    handleEscape
  );


  // ===================================================
  // IMAGE EVENTS
  // ===================================================

  try {

    bindImageEvents(
      modalContainer
    );

  } catch (error) {

    console.warn(
      "Không thể bind Image Events:",
      error
    );

  }


  // ===================================================
  // QUANTITY
  // ===================================================

  const qtyInput =
    modalContainer.querySelector(
      ".quantity-stepper-input"
    ) ||
    modalContainer.querySelector(
      "[data-quantity-val]"
    );


  const decBtn =
    modalContainer.querySelector(
      '[data-action="decrement"]'
    ) ||
    modalContainer.querySelector(
      '[data-action="decrease-qty"]'
    );


  const incBtn =
    modalContainer.querySelector(
      '[data-action="increment"]'
    ) ||
    modalContainer.querySelector(
      '[data-action="increase-qty"]'
    );


  // ===================================================
  // DECREASE
  // ===================================================

  if (
    decBtn &&
    qtyInput
  ) {

    decBtn.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

        let current =
          Number(
            qtyInput.value ||
            qtyInput.textContent
          ) || 1;


        if (
          current > 1
        ) {

          current--;

          if (
            "value" in qtyInput
          ) {

            qtyInput.value =
              current;

          } else {

            qtyInput.textContent =
              current;

          }

        }

      }
    );
  }


  // ===================================================
  // INCREASE
  // ===================================================

  if (
    incBtn &&
    qtyInput
  ) {

    incBtn.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

        let current =
          Number(
            qtyInput.value ||
            qtyInput.textContent
          ) || 1;


        current++;


        if (
          "value" in qtyInput
        ) {

          qtyInput.value =
            current;

        } else {

          qtyInput.textContent =
            current;

        }

      }
    );
  }


  // ===================================================
  // ADD TO CART
  // ===================================================

  const addBtn =
    modalContainer.querySelector(
      '[data-action="add-to-cart"]'
    );


  if (addBtn) {

    addBtn.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();


        // ---------------------------------------------
        // QUANTITY
        // ---------------------------------------------

        const count =
          qtyInput

            ? Number(
                qtyInput.value ||
                qtyInput.textContent
              ) || 1

            : 1;


        // ---------------------------------------------
        // CART
        // ---------------------------------------------

        const cart =
          getCart();


        // ---------------------------------------------
        // TÌM PRODUCT TRONG CART
        // ---------------------------------------------

        const existing =
          cart.find(
            item =>
              String(item.id) ===
              String(product.id)
          );


        // ---------------------------------------------
        // ĐÃ CÓ
        // ---------------------------------------------

        if (existing) {

          existing.quantity =
            Number(
              existing.quantity || 0
            ) + count;

        }


        // ---------------------------------------------
        // CHƯA CÓ
        // ---------------------------------------------

        else {

          cart.push({

            id:
              product.id,

            name:
              product.name,

            image:
              product.mainImage,

            price:
              Number(
                product.currentPrice
              ),

            quantity:
              count

          });

        }


        // ---------------------------------------------
        // SAVE
        // ---------------------------------------------

        saveCart(cart);


        console.log(
          "CART AFTER QUICK VIEW:",
          getCart()
        );


        // ---------------------------------------------
        // CLOSE
        // ---------------------------------------------

        closeModal();


        // ---------------------------------------------
        // TOAST
        // ---------------------------------------------

        showToast(
          `${product.name} added to cart.`
        );

      }
    );
  }
}


// =====================================================
// TOAST
// =====================================================

function showToast(message) {

  const oldToast =
    document.getElementById(
      "quick-view-toast"
    );


  if (oldToast) {

    oldToast.remove();

  }


  const toast =
    document.createElement(
      "div"
    );


  toast.id =
    "quick-view-toast";


  toast.className = `
    fixed
    bottom-6
    right-6
    z-[99999]
    bg-[#1A1A1A]
    text-white
    text-sm
    font-medium
    px-5
    py-3
    rounded-lg
    shadow-xl
  `;


  toast.textContent =
    message;


  document.body.appendChild(
    toast
  );


  setTimeout(
    () => {

      toast.remove();

    },
    3000
  );
}


// =====================================================
// QUICK VIEW EVENT - HOME + SHOP
// =====================================================

document.addEventListener("click", (event) => {

  const eyeBtn = event.target.closest(
    '[data-action="quick-view"]'
  );

  if (!eyeBtn) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();


  // ===================================================
  // TÌM CARD
  // ===================================================

  const card = eyeBtn.closest(".product-card");

  if (!card) {

    console.error(
      "Quick View: Không tìm thấy product-card.",
      eyeBtn
    );

    return;
  }


  // ===================================================
  // LẤY ID
  // ===================================================

  const id =
    eyeBtn.getAttribute("data-id") ||
    card.getAttribute("data-product-id") ||
    card.getAttribute("data-id");


  console.log(
    "================================="
  );

  console.log(
    "QUICK VIEW CLICK"
  );

  console.log(
    "BUTTON ID:",
    eyeBtn.getAttribute("data-id")
  );

  console.log(
    "CARD PRODUCT ID:",
    card.getAttribute("data-product-id")
  );

  console.log(
    "CARD ID:",
    card.getAttribute("data-id")
  );

  console.log(
    "FINAL ID:",
    id
  );


  // ===================================================
  // KHÔNG CÓ ID
  // ===================================================

  if (!id) {

    console.error(
      "Quick View: Card không có product ID.",
      card
    );

    return;
  }


  // ===================================================
  // TÌM PRODUCT TRONG PRODUCTS.JSON
  // ===================================================

  const product =
    findProductById(id);


  console.log(
    "PRODUCT FOUND:",
    product
  );


  // ===================================================
  // TÌM THẤY PRODUCT
  // ===================================================

  if (product) {

    openQuickView(product);

    return;
  }


  // ===================================================
  // FALLBACK - LẤY DỮ LIỆU TỪ CARD
  // ===================================================

  const nameElement =
    card.querySelector(
      "a[href*='descriptions']"
    ) ||
    card.querySelector("a");


  const imageElement =
    card.querySelector("img");


  const priceElement =
    card.querySelector(".price");


  const name =
    nameElement?.textContent?.trim() ||
    "Product";


  const image =
    imageElement?.src ||
    "";


  const priceText =
    priceElement?.textContent
      ?.replace(/[^0-9.]/g, "") ||
    "0";


  const price =
    Number(priceText) || 0;


  console.log(
    "FALLBACK PRODUCT:",
    {
      id,
      name,
      image,
      price
    }
  );


  openQuickView({

    id,

    name,

    price,

    currentPrice: price,

    image,

    mainImage: image,

    thumbnails: [
      image,
      image,
      image,
      image
    ]

  });

});