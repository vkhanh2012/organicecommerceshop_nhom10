import { renderSidebarComponent } from "/src/shop/sidebar.js"
import { renderCategoryFilter } from "/src/shop/categoryfilter.js"
import { renderPriceFilter } from "/src/shop/priceFilter.js"
import { renderRatingFilter } from "/src/shop/ratingFilter.js"
import { renderPopularTags } from "/src/shop/popularTag.js"
import { renderTopBar } from "/src/shop/topBar.js"
import { initSaleProducts } from "/src/shop/saleProductCards.js"
import { renderBreadcrumbsComponent } from "/src/components/breadcrumbs.js"
import { renderProductGrid } from "/src/components/productcard.js"
import productsUrl from "/src/data/products.json?url"
import { renderPagination } from "/src/shop/pagination.js"
import { renderQuickViewModal } from "/src/Quickview/quickview.js"

const images = import.meta.glob("../assets/images/**/*", {
  eager: true,
  query: "?url",
  import: "default",
})

export function getImageUrl(path = "") {
  return images[`../assets${path}`] || path
}

export function attachImageUrls(items = []) {
  return items.map((item) => ({ ...item, image: getImageUrl(item.image) }))
}

const shopState = {
  currentPage: 1,
  productsPerPage: 6,
  sortBy: "latest",
  category: "all",
  minPrice: null,
  maxPrice: null,
  rating: 0,
  tag: "all",
}

function setTagButtonState(
  container,
  selectedTag
) {
  if (!container) return

  const buttons =
    container.querySelectorAll(
      "[data-tag-value]"
    )

  buttons.forEach((button) => {
    const active =
      button.dataset.tagValue ===
      selectedTag

    button.classList.toggle(
      "bg-primary",
      active
    )

    button.classList.toggle(
      "text-white",
      active
    )

    button.classList.toggle(
      "bg-neutral-50",
      !active
    )

    button.classList.toggle(
      "text-neutral-900",
      !active
    )
  })
}

export async function initShopPage() {
  const response = await fetch(productsUrl)
  let PRODUCT_DATA = await response.json()

  PRODUCT_DATA = attachImageUrls(PRODUCT_DATA)

  const prices = PRODUCT_DATA.map((product) => product.price)

  const minProductPrice = Math.floor(Math.min(...prices))
  const maxProductPrice = Math.ceil(Math.max(...prices))

  shopState.minPrice = minProductPrice
  shopState.maxPrice = maxProductPrice

  

  //shop1
  const sideBarContainer = document.getElementById("sidebar")
  //shop2
  const horizontalFilterContainer = document.getElementById(
    "horizontal-filter-container",
  )

  const isShop2 = horizontalFilterContainer !== null

  const topBar =
  document.getElementById("top-Bar")

if (topBar && !isShop2) {
  topBar.innerHTML = renderTopBar({
    totalResults: PRODUCT_DATA.length,
    currentSort: shopState.sortBy,
    buttonName: "Filter",
    sortOptions: [
      {
        value: "latest",
        label: "Latest",
      },
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

  if (isShop2) {
    shopState.productsPerPage = 16
  }

  const filterContainer = horizontalFilterContainer || sideBarContainer

  // SHOP 2 - dùng lại chính các module filter của Shop 1
  if (horizontalFilterContainer) {
  horizontalFilterContainer.innerHTML = `
    <div
      class="
        flex
        w-full
        flex-col
        gap-4

        xl:flex-row
        xl:items-center
        xl:justify-between
      "
    >
      <!-- LEFT: FILTER -->
      <div
        class="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        ${renderCategoryFilter(
          PRODUCT_DATA,
          shopState.category,
          "horizontal"
        )}

        ${renderPriceFilter(
          PRODUCT_DATA,
          shopState.minPrice,
          shopState.maxPrice,
          "horizontal"
        )}

        ${renderRatingFilter(
          shopState.rating,
          "horizontal"
        )}

        ${renderPopularTags(
          shopState.tag,
          "horizontal"
        )}
      </div>

      <!-- RIGHT: SORT + SHOW -->
      <div
        class="
          flex
          flex-wrap
          items-center
          gap-4

          xl:shrink-0
        "
      >
        <!-- SORT -->
        <label
          class="
            flex
            items-center
            gap-2
            text-sm
            text-neutral-500
          "
        >
          <span>Sort by:</span>

          <select
            id="sort-select"
            class="
              min-w-40
              cursor-pointer
              rounded
              border
              border-neutral-200
              bg-white
              px-3
              py-2
              text-sm
              text-neutral-700
              outline-none
              focus:border-primary
            "
          >
            <option value="latest">
              Latest
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="rating">
              Popularity
            </option>
          </select>
        </label>

        <!-- SHOW -->
        <label
          class="
            flex
            items-center
            gap-2
            text-sm
            text-neutral-500
          "
        >
          <span>Show:</span>

          <select
            id="products-per-page"
            class="
              cursor-pointer
              rounded
              border
              border-neutral-200
              bg-white
              px-3
              py-2
              text-sm
              text-neutral-700
              outline-none
              focus:border-primary
            "
          >
            <option value="8">
              8
            </option>

            <option
              value="16"
              selected
            >
              16
            </option>

            <option value="24">
              24
            </option>
          </select>
        </label>
      </div>
    </div>
  `
}

  // SHOP 1 - sidebar cũ
  else if (sideBarContainer) {
    sideBarContainer.innerHTML = renderSidebarComponent(
      PRODUCT_DATA,
      shopState.category,
      shopState.minPrice,
      shopState.maxPrice,
      shopState.rating,
      shopState.tag,
    )

    const saleProductsContainer =
      document.getElementById(
        "sale-products-wrapper"
      )

    if (saleProductsContainer) {
      initSaleProducts(
        saleProductsContainer
      )
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

  const productGridContainer = document.getElementById("product-grid-container")

  function getFilterProducts() {
    let products = [...PRODUCT_DATA]

    if (shopState.category !== "all") {
      products = products.filter(
        (product) => product.category == shopState.category,
      )
    }

    //tag filter
    if (shopState.tag !== "all") {
      products = products.filter(
        (product) =>
          Array.isArray(product.tags) && product.tags.includes(shopState.tag),
      )
    }



    products = products.filter(
      (product) =>
        product.price >= shopState.minPrice &&
        product.price <= shopState.maxPrice,
    )

    if (shopState.rating > 0) {
      products = products.filter(
        (product) => product.rating >= shopState.rating,
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
        products.sort((a, b) => b.rating - a.rating)
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

      const resultCount = document.getElementById("shop-result-count")
      if (resultCount) {
        resultCount.textContent = totalProducts
      }

      const totalPages = Math.ceil(totalProducts / shopState.productsPerPage)

      const startIndex = (shopState.currentPage - 1) * shopState.productsPerPage

      const endIndex = startIndex + shopState.productsPerPage

      const productsOnCurrentPage = sortedProducts.slice(startIndex, endIndex)

      productGridContainer.innerHTML = `
        ${renderProductGrid(productsOnCurrentPage, isShop2 ? "shop2" : "shop")}
        <div id="shop-pagination">
          ${renderPagination({
        currentPage: shopState.currentPage,
        totalPages: totalPages,
      })}
        </div>
      `
    }

    if (filterContainer) {
  filterContainer.addEventListener(
    "click",
    (event) => {
      const tagButton =
        event.target.closest(
          "[data-tag-value]"
        )

      if (!tagButton) return

      const selectedTag =
        tagButton.dataset.tagValue

      // Click lại tag đang chọn -> bỏ lọc
      shopState.tag =
        shopState.tag === selectedTag
          ? "all"
          : selectedTag

      shopState.currentPage = 1

      setTagButtonState(
        filterContainer,
        shopState.tag
      )

      renderShopProducts()

      // Shop2: chọn xong đóng dropdown
      if (isShop2) {
        tagButton
          .closest("details")
          ?.removeAttribute("open")
      }
    }
  )
}

    const sortSelect = document.getElementById("sort-select")
    if (sortSelect) {
      sortSelect.addEventListener("change", (event) => {
        shopState.sortBy = event.target.value
        shopState.currentPage = 1
        renderShopProducts()
      })
    }

    const productsPerPageSelect =
  document.getElementById(
    "products-per-page"
  )

if (productsPerPageSelect) {
  productsPerPageSelect.addEventListener(
    "change",
    (event) => {
      shopState.productsPerPage =
        Number(event.target.value)

      shopState.currentPage = 1

      renderShopProducts()
    }
  )
}

    // if (filterContainer) {
    //   filterContainer.addEventListener("change", (event) => {
    //     if (event.target.name === "category") {
    //       shopState.category = event.target.value
    //       shopState.currentPage = 1
    //       renderShopProducts()
    //     }

    //     if (event.target.name === "rating") {
    //       const ratingInputs = filterContainer.querySelectorAll(
    //         'input[name="rating"]',
    //       )
    //       ratingInputs.forEach((input) => {
    //         if (input !== event.target) {
    //           input.checked = false
    //         }
    //       })

    //       if (event.target.checked) {
    //         shopState.rating = Number(event.target.value)
    //       } else {
    //         shopState.rating = 0
    //       }

    //       shopState.currentPage = 1
    //       renderShopProducts()
    //     }
    //   })
    // }

    const minPriceInput = document.getElementById("min-price")
    const maxPriceInput = document.getElementById("max-price")
    const priceValue = document.getElementById("price-value")
    const priceProgress = document.getElementById("price-progress")

    function updatePriceFilter() {
      let minValue = Number(minPriceInput.value)
      let maxValue = Number(maxPriceInput.value)

      if (minValue > maxValue) {
        minValue = maxValue
        minPriceInput.value = minValue
      }

      shopState.minPrice = minValue
      shopState.maxPrice = maxValue
      shopState.currentPage = 1

      if (priceValue) priceValue.textContent = `$${minValue} — $${maxValue}`

      const min = Number(minPriceInput.min)
      const max = Number(minPriceInput.max)
      const leftPercent = ((minValue - min) / (max - min)) * 100
      const rightPercent = ((maxValue - min) / (max - min)) * 100

      if (priceProgress) {
        priceProgress.style.left = `${leftPercent}%`
        priceProgress.style.width = `${rightPercent - leftPercent}%`
      }

      renderShopProducts()
    }

    if (minPriceInput && maxPriceInput) {
      minPriceInput.addEventListener("input", updatePriceFilter)
      maxPriceInput.addEventListener("input", updatePriceFilter)
      updatePriceFilter()
      if (isShop2) {
        minPriceInput.addEventListener("change", (event) => {
          event.target
            .closest("details")
            ?.removeAttribute("open")
        })

        maxPriceInput.addEventListener("change", (event) => {
          event.target
            .closest("details")
            ?.removeAttribute("open")
        })
      }
    }

    productGridContainer.addEventListener("click", (event) => {
      const pageButton = event.target.closest("[data-page]")
      if (!pageButton || pageButton.disabled) return

      shopState.currentPage = Number(pageButton.dataset.page)
      renderShopProducts()
    })
    renderShopProducts()
  }
}
