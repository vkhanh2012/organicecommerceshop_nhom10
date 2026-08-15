import { renderSidebarComponent } from "/src/shop/sidebar.js"
import { renderTopBar } from "/src/shop/topBar.js"
import { initSaleProducts } from "/src/shop/saleProductCards.js"
import { renderBreadcrumbsComponent } from "/src/components/breadcrumbs.js"
import { renderProductGrid } from "/src/shop/productcard.js"
import productsUrl from "/src/data/products.json?url"
import { renderPagination } from "/src/shop/pagination.js"

// lưu trạng thái của trang
const shopState = {
  currentPage: 1,
  productsPerPage: 6,
  sortBy: "latest",
  category: "all",
  minPrice: null,
  maxPrice: null,
  rating: 0,
}

export async function initShopPage() {
  const response = await fetch(productsUrl)
  const PRODUCT_DATA = await response.json()

  const prices = PRODUCT_DATA.map((product) => product.price)

  const minProductPrice = Math.floor(Math.min(...prices))
  const maxProductPrice = Math.ceil(Math.max(...prices))

  shopState.minPrice = minProductPrice
  shopState.maxPrice = maxProductPrice

  const topBar = document.getElementById("top-Bar")

  if (topBar) {
    topBar.innerHTML = renderTopBar({
      totalResults: PRODUCT_DATA.length,
      currentSort: shopState.sortBy,
      buttonName: "Filter",
      sortOptions: [
        { value: "latest", label: "Latest" },
        {
          value: "price-low",
          label: "Price: Low to High",
        },
        {
          value: "price-high",
          label: "Price: High to Low",
        },
        {
          value: "rating",
          label: "Popularity",
        },
      ],
    })
  }

  //side bar
  const sideBarContainer = document.getElementById("sidebar")

  if (sideBarContainer) {
    sideBarContainer.innerHTML = renderSidebarComponent(
      PRODUCT_DATA,
      shopState.category,
      shopState.minPrice,
      shopState.maxPrice,
      shopState.rating,
    )

    const saleProductsContainer = document.getElementById(
      "sale-products-wrapper",
    )

    if (saleProductsContainer) {
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

  const breadcrumbs = document.getElementById("breadcrumbs-container")

  if (breadcrumbs) {
    breadcrumbs.innerHTML = renderBreadcrumbsComponent({
      breadcrumbs: [
        { label: "Shop", url: "./shop.html" },
        { label: "Vegetables", url: "./shop.html" },
      ],
    })
  }

  const productGridContainer = document.getElementById(
    "product-grid-container",
  )

  function getFilterProducts() {
  let products = [...PRODUCT_DATA]

  if (shopState.category !== "all") {
    products = products.filter(
      (product) =>
        product.category == shopState.category,
    )
  }

  products = products.filter(
    (product) =>
      product.price >= shopState.minPrice &&
      product.price <= shopState.maxPrice,
  )

  if (shopState.rating > 0) {
    products = products.filter(
      (product) =>
        product.rating >= shopState.rating,
    )
  }

  return products
}

  function getSortedProducts() {
    const products = getFilterProducts()

    switch (shopState.sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price)
        break

      case "price-high":
        products.sort((a, b) => b.price - a.price)
        break

      case "rating":
        // từ cao tới thấp
        // products.sort((a, b) => b.rating - a.rating)
        //thấp tới cao
        products.sort((a, b) => a.rating - b.rating)
        break

      case "latest":
      default:
        products.sort((a, b) => b.id - a.id)
        break
    }

    return products
  }

  if (productGridContainer) {
    function renderShopProducts() {
      const sortedProducts = getSortedProducts()

      const totalProducts = sortedProducts.length
      
      const resultCount =
      document.getElementById("shop-result-count")

      if (resultCount) {
        resultCount.textContent = totalProducts
      }

      const totalPages = Math.ceil(
        totalProducts / shopState.productsPerPage,
      )

      const startIndex =
        (shopState.currentPage - 1) * shopState.productsPerPage

      const endIndex =
        startIndex + shopState.productsPerPage

      const productsOnCurrentPage = sortedProducts.slice(
        startIndex,
        endIndex,
      )

      productGridContainer.innerHTML = `
        ${renderProductGrid(productsOnCurrentPage)}

        <div id="shop-pagination">
          ${renderPagination({
            currentPage: shopState.currentPage,
            totalPages: totalPages,
          })}
        </div>
      `
    }

    const sortSelect = document.getElementById("sort-select")

    if (sortSelect) {
      sortSelect.addEventListener("change", (event) => {
        shopState.sortBy = event.target.value
        shopState.currentPage = 1
        renderShopProducts()
      })
    }

    if (sideBarContainer) {
  sideBarContainer.addEventListener("change", (event) => {

    if (event.target.name === "category") {
      shopState.category = event.target.value
      shopState.currentPage = 1

      renderShopProducts()
    }

    if (event.target.name === "rating") {

      const ratingInputs =
        sideBarContainer.querySelectorAll(
          'input[name="rating"]',
        )

      ratingInputs.forEach((input) => {
        if (input !== event.target) {
          input.checked = false
        }
      })

      if (event.target.checked) {
        shopState.rating =
          Number(event.target.value)
      } else {
        shopState.rating = 0
      }

      shopState.currentPage = 1

      renderShopProducts()
    }
  })
}

    const minPriceInput = document.getElementById("min-price")
    const maxPriceInput = document.getElementById("max-price")
    const priceValue = document.getElementById("price-value")
    const priceProgress = document.getElementById("price-progress")

    function updatePriceFilter() {
      let minValue = Number(minPriceInput.value)
      let maxValue = Number(maxPriceInput.value)

      // Không cho min vượt qua max
      if (minValue > maxValue) {
        minValue = maxValue
        minPriceInput.value = minValue
      }

      shopState.minPrice = minValue
      shopState.maxPrice = maxValue

      shopState.currentPage = 1

      // Đổi số tiền hiển thị
      priceValue.textContent = `$${minValue} — $${maxValue}`

      // Giá thấp nhất / cao nhất của thanh
      const min = Number(minPriceInput.min)
      const max = Number(minPriceInput.max)

      // Tính vị trí của nút MIN
      const leftPercent =
        ((minValue - min) / (max - min)) * 100

      // Tính vị trí của nút MAX
      const rightPercent =
        ((maxValue - min) / (max - min)) * 100

      // Tô màu primary giữa 2 nút
      priceProgress.style.left = `${leftPercent}%`
      priceProgress.style.width = `${rightPercent - leftPercent}%`

      renderShopProducts()
    }

    if (
      minPriceInput &&
      maxPriceInput &&
      priceValue &&
      priceProgress
    ) {
      minPriceInput.addEventListener(
        "input",
        updatePriceFilter,
      )

      maxPriceInput.addEventListener(
        "input",
        updatePriceFilter,
      )

      // Cập nhật thanh màu xanh lúc mới mở trang
      updatePriceFilter()
    }

    productGridContainer.addEventListener("click", (event) => {
      const pageButton = event.target.closest("[data-page]")

      if (!pageButton) {
        return
      }

      if (pageButton.disabled) {
        return
      }

      shopState.currentPage = Number(
        pageButton.dataset.page,
      )

      renderShopProducts()
    })

    renderShopProducts()
  }
}