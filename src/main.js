// src/main.js
import "./css/style.css"
import {
  renderNavigationComponent,
  bindNavigationEvents,
} from "./components/navigation.js"
import { renderFooterComponent } from "./components/footer.js"
import { renderButtonComponent } from "./components/button.js"
import { renderProductGrid } from "./components/productCard.js"
import { renderInstagramComponent } from "./components/instagram.js"
import { renderSidebarComponent } from "./components/sidebar.js"
import { renderCategoryFilter } from "./components/categoryFilter.js"
import { renderPopularTags } from "./components/popularTag.js"
import { renderPagination } from "./components/pagination.js"
import { renderNewsletterComponent } from "./components/newsletter.js"
import { renderLatestNewsWrapper } from "./components/latestnewswrapper.js"

// 1. Navigation
try {
  const navContainer = document.getElementById("navigation-container")
  if (navContainer) {
    navContainer.innerHTML = renderNavigationComponent({
      cartCount: 0,
      cartTotal: "$0.00",
    })
    bindNavigationEvents(navContainer)
  }
} catch (e) {
  console.error("Lỗi nav: ", e)
}

// 2. Button — demo đủ 3 size x 3 type
const buttonContainer = document.getElementById("button-container")
if (buttonContainer) {
  const variants = [
    { size: "small", type: "fill", label: "Small Fill" },
    { size: "medium", type: "fill", label: "Medium Fill" },
    { size: "large", type: "fill", label: "Large Fill" },
    { size: "medium", type: "border", label: "Border" },
    { size: "medium", type: "ghost", label: "Ghost" },
  ]
  buttonContainer.innerHTML = variants
    .map((v) => renderButtonComponent(v))
    .join("")
}

// 4. Footer
const footerContainer = document.getElementById("footer-container")
if (footerContainer) {
  footerContainer.innerHTML = renderFooterComponent()
}

// 5. Product Card — demo với dữ liệu thật lấy từ bản demo Vercel
const productGridContainer = document.getElementById("product-grid-container")
if (productGridContainer) {
  const products = [
    {
      name: "Green Apple",
      price: 14.99,
      oldPrice: 20.0,
      rating: 4,
      saleTag: "Sale 50%",
      image: "https://picsum.photos/seed/apple/400",
    },
    {
      name: "Fresh Indian Malta",
      price: 20.0,
      rating: 4,
      image: "https://picsum.photos/seed/malta/400",
    },
    {
      name: "Chinese Cabbage",
      price: 12.0,
      rating: 5,
      image: "https://picsum.photos/seed/cabbage/400",
    },
    {
      name: "Green Lettuce",
      price: 9.0,
      rating: 4,
      image: "https://picsum.photos/seed/lettuce/400",
    },
    {
      name: "Eggplant",
      price: 34.0,
      rating: 4,
      image: "https://picsum.photos/seed/eggplant/400",
    },
  ]
  productGridContainer.innerHTML = renderProductGrid(products)
}

// 6. Follow us on Instagram
const instagramContainer = document.getElementById("instagram-container")
if (instagramContainer) {
  const images = Array.from(
    { length: 6 },
    (_, i) => `https://picsum.photos/seed/insta${i}/400`,
  )
  instagramContainer.innerHTML = renderInstagramComponent({ images })
}

const sideBarContainer = document.getElementById("sidebar")
if (sideBarContainer) {
  sideBarContainer.innerHTML = renderSidebarComponent()
}

const openBtn = document.getElementById("open-filter-btn")
const filterDrawer = document.getElementById("mobile-filter-drawer")
if (openBtn && filterDrawer) {
  openBtn.addEventListener("click", () => {
    filterDrawer.classList.toggle("hidden")
  })
}

const newSletter = document.getElementById("newSletter")
if (newSletter) {
  newSletter.innerHTML = renderNewsletterComponent()
}

const latestnews = document.getElementById("latest-news")
if (latestnews) {
  latestnews.innerHTML = renderLatestNewsWrapper()
}
