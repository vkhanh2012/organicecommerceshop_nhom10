import "../css/style.css";

import {
  renderNavigationComponent,
  bindNavigationEvents
} from "../components/navigation.js";

import { renderBreadCrumb } from "../descriptions/breadcrumb.js";
import { renderDescription } from "../descriptions/descriptions.js";
import {
  defaultProductData,
  PRODUCTS_LIST
} from "../descriptions/productdata.js";

import { bindImageEvents } from "../descriptions/Image.js";

import { renderFooterComponent } from "../components/footer.js";
import { renderNewsletterComponent } from "../components/newsletter.js";

import { initShoppingCartPage } from "./shoppingcardpage.js";

import {
  getCart,
  getCartSummary,
  saveCart
} from "../shopping_cart/cartData.js";

import productList from "../data/products.json";


// =====================================================
// LẤY SẢN PHẨM HIỆN TẠI TỪ URL
// =====================================================

function getActiveProduct() {

  const urlParams =
    new URLSearchParams(window.location.search);

  const productId =
    Number(urlParams.get("id"));

  const productName =
    urlParams.get("name")
      ? decodeURIComponent(
          urlParams.get("name")
        )
      : null;


  // ===================================================
  // 1. TÌM THEO TÊN
  // ===================================================

  if (productName) {

    const foundByName =
      PRODUCTS_LIST.find(
        p =>
          p.name.toLowerCase() ===
          productName.toLowerCase()
      );

    if (foundByName) {
      return foundByName;
    }
  }


  // ===================================================
  // 2. TÌM THEO ID TRONG PRODUCTS.JSON
  // ===================================================

  const foundJson =
    productList.find(
      p => Number(p.id) === productId
    );


  if (foundJson) {

    // Thử tìm sản phẩm tương ứng
    // trong PRODUCTS_LIST

    const foundData =
      PRODUCTS_LIST.find(
        p =>
          p.name.toLowerCase() ===
          foundJson.name.toLowerCase()
      );


    if (foundData) {
      return {
        ...foundData,
        id: foundJson.id
      };
    }


    // Nếu không tìm thấy
    // thì tạo dữ liệu từ products.json

    return {

      ...defaultProductData,

      id:
        foundJson.id,

      name:
        foundJson.name,

      currentPrice:
        foundJson.price,

      originalPrice:
        foundJson.oldPrice,

      rating:
        foundJson.rating,

      mainImage:
        foundJson.image,

      thumbnails: [
        foundJson.image,
        foundJson.image,
        foundJson.image
      ],

      category: {
        name:
          foundJson.category ||
          "Fresh Fruit",

        link: "#"
      }
    };
  }


  // ===================================================
  // 3. KHÔNG TÌM THẤY -> SẢN PHẨM MẶC ĐỊNH
  // ===================================================

  return defaultProductData;
}


// =====================================================
// TOAST
// =====================================================

function showToastNotification(message) {

  let toast =
    document.getElementById(
      "toast-notification"
    );


  if (!toast) {

    toast =
      document.createElement("div");

    toast.id =
      "toast-notification";

    toast.className =
      "fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white text-sm font-medium px-5 py-3 rounded-lg shadow-xl transition-all duration-300 transform translate-y-10 opacity-0 pointer-events-none flex items-center gap-2";

    document.body.appendChild(toast);
  }


  toast.textContent =
    message;


  toast.classList.remove(
    "translate-y-10",
    "opacity-0",
    "pointer-events-none"
  );

  toast.classList.add(
    "translate-y-0",
    "opacity-100"
  );


  setTimeout(() => {

    toast.classList.remove(
      "translate-y-0",
      "opacity-100"
    );

    toast.classList.add(
      "translate-y-10",
      "opacity-0",
      "pointer-events-none"
    );

  }, 3000);
}


// =====================================================
// FOOTER
// =====================================================

function initFooter() {

  const footer =
    document.getElementById(
      "footer-container"
    );

  if (!footer) return;

  footer.innerHTML =
    renderFooterComponent();
}


// =====================================================
// NEWSLETTER
// =====================================================

function initNewsletter() {

  const newsletter =
    document.getElementById(
      "newsletter-container"
    );

  if (!newsletter) return;

  newsletter.innerHTML =
    renderNewsletterComponent();
}


// =====================================================
// NAVIGATION
// =====================================================

function initNavigation() {

  const navigation =
    document.getElementById(
      "navigation-container"
    );

  if (!navigation) return;


  const cart =
    getCart();


  const summary =
    getCartSummary(cart);


  navigation.innerHTML =
    renderNavigationComponent({

      cartCount:
        summary.count,

      cartTotal:
        `$${summary.total.toFixed(2)}`,

      cartItems:
        cart,

      activeHref:
        location.pathname
    });


  bindNavigationEvents(
    navigation,
    cart
  );
}


// =====================================================
// TAB
// =====================================================

let currentTab =
  "descriptions";


// =====================================================
// QUANTITY + ADD TO CART
// =====================================================

function bindProductDetailActions(
  container,
  currentProduct
) {

  const qtyInput =
    container.querySelector(
      ".quantity-stepper-input"
    ) ||
    container.querySelector(
      "[data-quantity-val]"
    );


  const decBtn =
    container.querySelector(
      '[data-action="decrement"]'
    ) ||
    container.querySelector(
      '[data-action="decrease-qty"]'
    );


  const incBtn =
    container.querySelector(
      '[data-action="increment"]'
    ) ||
    container.querySelector(
      '[data-action="increase-qty"]'
    );


  // ===================================================
  // GIẢM SỐ LƯỢNG
  // ===================================================

  if (decBtn && qtyInput) {

    decBtn.addEventListener(
      "click",
      e => {

        e.preventDefault();

        let current =
          Number(
            qtyInput.value ||
            qtyInput.textContent
          ) || 1;


        if (current > 1) {

          if ("value" in qtyInput) {

            qtyInput.value =
              current - 1;

          } else {

            qtyInput.textContent =
              current - 1;
          }
        }
      }
    );
  }


  // ===================================================
  // TĂNG SỐ LƯỢNG
  // ===================================================

  if (incBtn && qtyInput) {

    incBtn.addEventListener(
      "click",
      e => {

        e.preventDefault();

        let current =
          Number(
            qtyInput.value ||
            qtyInput.textContent
          ) || 1;


        if ("value" in qtyInput) {

          qtyInput.value =
            current + 1;

        } else {

          qtyInput.textContent =
            current + 1;
        }
      }
    );
  }


  // ===================================================
  // ADD TO CART
  // ===================================================

  const addBtn =
    container.querySelector(
      '[data-action="add-to-cart"]'
    );


  if (addBtn) {

    addBtn.addEventListener(
      "click",
      e => {

        e.preventDefault();


        const count =
          qtyInput
            ? (
                Number(
                  qtyInput.value ||
                  qtyInput.textContent
                ) || 1
              )
            : 1;


        const cart =
          getCart();


        const productImage =
          currentProduct.mainImage ||
          currentProduct.image ||
          (
            currentProduct.thumbnails &&
            currentProduct.thumbnails[0]
          ) ||
          "";


        const existing =
          cart.find(
            item =>
              item.name ===
              currentProduct.name
          );


        if (existing) {

          existing.quantity +=
            count;


          if (!existing.image) {

            existing.image =
              productImage;
          }

        } else {

          cart.push({

            id:
              currentProduct.id ||
              Date.now(),

            name:
              currentProduct.name,

            image:
              productImage,

            price:
              currentProduct.currentPrice,

            quantity:
              count
          });
        }


        saveCart(cart);


        initNavigation();


        showToastNotification(
          `${currentProduct.name} added to cart.`
        );
      }
    );
  }
}


// =====================================================
// RENDER DESCRIPTION
// =====================================================

function renderDescriptionSection(
  container
) {

  const currentProduct =
    getActiveProduct();


  container.innerHTML =
    renderDescription(
      currentProduct,
      currentTab
    );


  // ẢNH
  bindImageEvents(
    container
  );


  // QUANTITY + CART
  bindProductDetailActions(
    container,
    currentProduct
  );


  // ===================================================
  // TAB
  // ===================================================

  const tabLinks =
    container.querySelectorAll(
      ".tab-link"
    );


  tabLinks.forEach(
    link => {

      link.addEventListener(
        "click",
        e => {

          e.preventDefault();


          const selectedTab =
            link.getAttribute(
              "data-tab"
            );


          if (
            selectedTab &&
            selectedTab !== currentTab
          ) {

            currentTab =
              selectedTab;


            renderDescriptionSection(
              container
            );
          }
        }
      );
    }
  );
}


// =====================================================
// INIT
// =====================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {


    // =================================================
    // NAVIGATION
    // =================================================

    initNavigation();


    // =================================================
    // CART
    // =================================================

    if (
      document.getElementById(
        "cart-container"
      )
    ) {

      initShoppingCartPage();
    }


    // =================================================
    // DESCRIPTION PAGE
    // =================================================

    const descriptionContainer =
      document.getElementById(
        "description-container"
      );


    if (!descriptionContainer) {
      return;
    }


    // =================================================
    // BREADCRUMB
    // =================================================

    const breadcrumbContainer =
      document.getElementById(
        "breadcrumb-container"
      );


    if (breadcrumbContainer) {

      breadcrumbContainer.innerHTML =
        renderBreadCrumb();
    }


    // =================================================
    // DESCRIPTION
    // =================================================

    renderDescriptionSection(
      descriptionContainer
    );


    // =================================================
    // NEWSLETTER
    // =================================================

    initNewsletter();


    // =================================================
    // FOOTER
    // =================================================

    initFooter();

  }
);