import { getProducts, renderProductGrid } from "../components/productcard.js"
import { renderSidebarComponent } from "../shop/sidebar.js"
import { renderTopBar } from "../shop/topBar.js"
import { initSaleProducts } from "../shop/saleProductCards.js"
import { renderBreadcrumbsComponent } from "../components/breadcrumbs.js"
import { renderPagination } from "../shop/pagination.js"


export async function initShopPage() {
const productGrid = document.getElementById("product-grid-container")
if (productGrid) {
  const products = await getProducts()
  const productsPerPage = 6
  const totalPages = Math.ceil(products.length / productsPerPage)
  let currentPage = 1

  function renderShopProducts() {
    const start = (currentPage - 1) * productsPerPage
    const visibleProducts = products.slice(start, start + productsPerPage)

    productGrid.innerHTML = `
      ${renderProductGrid(visibleProducts, "shop")}
      <div data-shop-pagination>
        ${renderPagination({ currentPage, totalPages })}
      </div>
    `
  }

  productGrid.addEventListener("click", (event) => {
    const pageButton = event.target.closest("[data-page]")
    if (!pageButton || pageButton.disabled) return

    currentPage = Number(pageButton.dataset.page)
    renderShopProducts()
    productGrid.scrollIntoView({ behavior: "smooth", block: "start" })
  })

  renderShopProducts()
}
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

const breadcrumnbs = document.getElementById("breadcrumbs-container"); 
if(breadcrumnbs) {
  breadcrumnbs.innerHTML = renderBreadcrumbsComponent({
    breadcrumbs: [
      { label: "Shop", url: "./shop.html" },
      { label: "Vegetables", url: "./shop.html" },
    ]
  });
}

}



