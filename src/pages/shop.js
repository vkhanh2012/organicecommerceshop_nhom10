import { renderProductGrid } from "../shop/productcard.js"
import { renderSidebarComponent } from "../shop/sidebar.js"
import { renderCategoryFilter } from "../shop/categoryFilter.js"
import { renderPopularTags } from "../shop/popularTag.js"
import { renderPagination } from "../shop/pagination.js"
import { renderNewsletterComponent } from "../components/newsletter.js"
import { renderTopBar } from "../shop/topBar.js"
import { initSaleProducts } from "../shop/saleProductCards.js"
import { renderBreadcrumbsComponent } from "../components/breadcrumbs.js"
import { renderNavigationComponent } from "../components/navigation.js"
import PRODUCT_DATA from "../data/products.json"
import SALE_PRODUCTS_DATA from "../data/saleProducts.json"

export function initShopPage() {
  const breadcrumnbs = document.getElementById("breadcrumbs-container")
  if (breadcrumnbs) {
    breadcrumnbs.innerHTML = renderBreadcrumbsComponent({
      breadcrumbs: [
        { label: "Home", url: "./index.html" },
        { label: "Vegetables", url: "./shop.html" },
        { label: "Fresh Organic Tomato", url: "./product-detail.html" },
      ],
    })
  }
  const topBar = document.getElementById("top-Bar")
  if (topBar) {
    topBar.innerHTML = renderTopBar()
  }

  //side bar
  const sideBarContainer = document.getElementById("sidebar")
  if (sideBarContainer) {
    sideBarContainer.innerHTML = renderSidebarComponent()

    const saleProductsContainer = document.getElementById(
      "sale-products-wrapper",
    )

    if (saleProductsContainer) {
      initSaleProducts(saleProductsContainer)
    }
  }

  const categoryFilter = document.getElementById("category-filter")
  if (categoryFilter) {
    categoryFilter.innerHTML = renderCategoryFilter()
  }

  const productGridContainer = document.getElementById("product-grid-container")
  if (productGridContainer) {
    productGridContainer.innerHTML = renderProductGrid(PRODUCT_DATA)
  } else {
    console.error(
      "Không tìm thấy thẻ có id 'product-grid-container' trong HTML!",
    )
  }

  const openBtn = document.getElementById("open-filter-btn")
  const filterDrawer = document.getElementById("mobile-filter-drawer")
  if (openBtn && filterDrawer) {
    openBtn.addEventListener("click", () => {
      filterDrawer.classList.toggle("hidden")
    })
  }

  const pagination = document.getElementById("pagination")
  if (pagination) {
    pagination.innerHTML = renderPagination()
  }
}
