import { renderProductGrid } from "../shop/productcard.js"
import { renderSidebarComponent } from "../shop/sidebar.js"
import { renderCategoryFilter } from "../shop/categoryFilter.js"
import { renderPopularTags } from "../shop/popularTag.js"
import { renderPagination } from "../shop/pagination.js"
import { renderNewsletterComponent } from "../components/newsletter.js"
import { renderTopBar } from "../shop/topBar.js"
import { initSaleProducts } from "../shop/saleProductCards.js"
import {renderBreadcrumbsComponent} from "../components/breadcrumbs.js"


const topBar = document.getElementById("top-Bar")
if (topBar) {
  topBar.innerHTML = renderTopBar()
}


const sideBarContainer = document.getElementById("sidebar")
if (sideBarContainer) {
  sideBarContainer.innerHTML = renderSidebarComponent()
  
  const saleProductsContainer = document.getElementById("sale-products-wrapper")

  if(saleProductsContainer){
    initSaleProducts(saleProductsContainer)
  }
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

const latest = document.getElementById("latest-news")
if (latest) {
  latest.innerHTML = renderLatestNewsWrapper()

  const testimonial = document.getElementById("client-testimonial")
  if (testimonial) {
    testimonial.innerHTML = renderTestimonialComponent()
  }
}

const breadcrumnbs = document.getElementById("breadcrumbs-container"); 
if(breadcrumnbs) {
  breadcrumnbs.innerHTML = renderBreadcrumbsComponent({
    breadcrumbs: [
      { label: "Shop", url: "./shop.html" },
      { label: "Vegetables", url: "./shop.html" },
      { label: "Fresh Organic Tomato", url: "./product-detail.html" } 
    ]
  });
}



