import "../css/style.css";

import {
  renderNavigationComponent,
  bindNavigationEvents
} from "../components/navigation.js";

import { renderBreadcrumbsComponent } from "../components/breadcrumbs.js";

import { renderDescription } from "../descriptions/descriptions.js";

import productData from "../data/productdata.json";

import { bindImageEvents } from "../descriptions/Image.js";

import { renderFooterComponent } from "../components/footer.js";

import { renderNewsletterComponent } from "../components/newsletter.js";

import {
  getCart,
  getCartSummary,
  saveCart
} from "../shopping_cart/cartData.js";

import productList from "../data/products.json";


// =====================================================
// LẤY DATA TỪ JSON
// =====================================================

const {
  defaultProductData,
  mangoProductData,
  tomatoProductData,
  redcapsiumProductData
} = productData;


// =====================================================
// DANH SÁCH SẢN PHẨM CHI TIẾT
// =====================================================

const PRODUCTS_LIST = [
  defaultProductData,
  mangoProductData,
  tomatoProductData,
  redcapsiumProductData
];


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
// LẤY SẢN PHẨM HIỆN TẠI TỪ URL
// =====================================================

function getActiveProduct() {

  const params =
    new URLSearchParams(
      window.location.search
    );


  const id =
    params.get("id");


  const name =
    params.get("name")
      ? decodeURIComponent(
          params.get("name")
        )
      : null;


  // ===================================================
  // 1. TÌM THEO NAME
  // ===================================================

  if (name) {

    const foundByName =
      PRODUCTS_LIST.find(
        product =>
          product?.name?.toLowerCase() ===
          name.toLowerCase()
      );


    if (foundByName) {

      return foundByName;

    }
  }


  // ===================================================
  // 2. TÌM THEO ID TRONG products.json
  // ===================================================

  if (id) {

    const foundProduct =
      productList.find(
        product =>
          String(product.id) ===
          String(id)
      );


    if (foundProduct) {

      const foundDetail =
        PRODUCTS_LIST.find(
          product =>
            product?.name?.toLowerCase() ===
            foundProduct?.name?.toLowerCase()
        );


      if (foundDetail) {

        return {
          ...foundDetail,
          id: foundProduct.id
        };

      }


      return {

        ...defaultProductData,

        id:
          foundProduct.id,

        name:
          foundProduct.name,

        currentPrice:
          foundProduct.price,

        originalPrice:
          foundProduct.oldPrice,

        rating:
          foundProduct.rating,

        mainImage:
          foundProduct.image,

        thumbnails: [
          foundProduct.image,
          foundProduct.image,
          foundProduct.image
        ],

        category: {
          name:
            foundProduct.category ||
            "Fresh Fruit",

          link: "#"
        }

      };

    }
  }


  // ===================================================
  // 3. KHÔNG CÓ ID / NAME
  // ===================================================

  return defaultProductData;
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
        window.location.pathname

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
// QUANTITY + CART
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
  // GIẢM
  // ===================================================

  if (
    decBtn &&
    qtyInput
  ) {

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
  // TĂNG
  // ===================================================

  if (
    incBtn &&
    qtyInput
  ) {

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


  if (!addBtn) return;


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


      const image =
        currentProduct.mainImage ||
        currentProduct.image ||
        currentProduct.thumbnails?.[0] ||
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

      } else {

        cart.push({

          id:
            currentProduct.id ||
            Date.now(),

          name:
            currentProduct.name,

          image,

          price:
            currentProduct.currentPrice ||
            currentProduct.price ||
            0,

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


  // ===================================================
  // IMAGE EVENTS
  // ===================================================

  bindImageEvents(
    container
  );


  // ===================================================
  // QUANTITY + CART
  // ===================================================

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


          if (!selectedTab) return;


          currentTab =
            selectedTab;


          renderDescriptionSection(
            container
          );

        }
      );

    }
  );
}


// =====================================================
// RELATED PRODUCTS CART
// =====================================================

document.addEventListener(
  "click",
  e => {

    const cartBtn =
      e.target.closest(
        '[data-action="add-to-cart"]'
      );


    if (!cartBtn) return;


    const card =
      cartBtn.closest(
        ".product-card"
      );


    if (!card) return;


    /*
      Nếu nút này nằm trong phần
      product detail chính thì
      bindProductDetailActions xử lý.
    */

    if (
      cartBtn.closest(
        "#description-container"
      ) &&
      !cartBtn.closest(
        ".product-card"
      )
    ) {

      return;

    }


    e.preventDefault();


    const productId =
      cartBtn.dataset.id;


    const product =
      productList.find(
        item =>
          String(item.id) ===
          String(productId)
      );


    if (!product) return;


    const cart =
      getCart();


    const existing =
      cart.find(
        item =>
          item.name ===
          product.name
      );


    if (existing) {

      existing.quantity += 1;

    } else {

      cart.push({

        id:
          product.id,

        name:
          product.name,

        image:
          product.image || "",

        price:
          product.price || 0,

        quantity:
          1

      });

    }


    saveCart(cart);


    initNavigation();


    showToastNotification(
      `${product.name} added to cart.`
    );

  }
);


// =====================================================
// INIT DETAILS PAGE
// =====================================================

export function initDetailsPage() {

  console.log(
    "DETAILS JS OK"
  );


  initNavigation();


  const descriptionContainer =
    document.getElementById(
      "description-container"
    );


  if (!descriptionContainer) {

    console.error(
      "Không tìm thấy #description-container"
    );

    return;

  }


  // ===================================================
  // BREADCRUMB
  // ===================================================

  const breadcrumbContainer =
    document.getElementById(
      "breadcrumb-container"
    );


  if (breadcrumbContainer) {

    breadcrumbContainer.innerHTML =
      renderBreadcrumbsComponent();

  }


  // ===================================================
  // DESCRIPTION
  // ===================================================

  renderDescriptionSection(
    descriptionContainer
  );


  // ===================================================
  // NEWSLETTER
  // ===================================================

  initNewsletter();


  // ===================================================
  // FOOTER
  // ===================================================

  initFooter();

}