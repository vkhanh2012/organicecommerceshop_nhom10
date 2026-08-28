import { renderSidebarComponent } from "/src/shop/sidebar.js"
import { renderCategoryFilter } from "/src/shop/categoryfilter.js"
import { renderPriceFilter } from "/src/shop/priceFilter.js"
import { renderRatingFilter } from "/src/shop/ratingFilter.js"
import { renderPopularTags } from "/src/shop/popularTag.js"
import { renderTopBar } from "/src/shop/topBar.js"
import { initSaleProducts } from "/src/shop/saleProductCards.js"
import { renderBreadcrumbsComponent } from "/src/components/breadcrumbs.js"
import { renderProductGrid, bindCardEvents } from "/src/components/productcard.js"
import productsUrl from "/src/data/products.json?url"
import { renderPagination } from "/src/shop/pagination.js"
import { renderQuickViewModal } from "/src/Quickview/quickview.js"
import { dropDown } from "/src/components/icons.js"

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
  let PRODUCT_DATA

  try {
    const response = await fetch(productsUrl)

    if (!response.ok) {
      throw new Error(`Không thể tải dữ liệu sản phẩm: ${response.status}`)
    }

    PRODUCT_DATA = await response.json()
  } catch (error) {
    console.error("Lỗi tải dữ liệu sản phẩm:", error)

    const productGridContainer = document.getElementById("product-grid-container")
    if (productGridContainer) {
      productGridContainer.innerHTML = `
        <p class="col-span-full py-10 text-center text-neutral-500">
          Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.
        </p>
      `
    }

    return
  }

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
          min-w-0
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

        <details class="group relative">
          <summary class="flex min-w-44 cursor-pointer list-none items-center justify-between gap-4 rounded border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-600">
            <span>Select Price</span>
            <span class="transition-transform group-open:rotate-180">${dropDown}</span>
          </summary>
          <div class="absolute left-auto right-0 top-full z-40 mt-2 w-[min(18rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] rounded-lg border border-neutral-100 bg-white p-5 shadow-lg sm:left-0 sm:right-auto">
            ${renderPriceFilter(
      PRODUCT_DATA,
      shopState.minPrice,
      shopState.maxPrice
    )}
          </div>
        </details>

        ${renderRatingFilter(
      shopState.rating,
      "horizontal"
    )}

      </div>

      <!-- RIGHT: SORT + SHOW -->
      <div
        class="
          flex
          min-w-0
          flex-wrap
          items-center
          gap-3

          xl:shrink-0
        "
      >
        <!-- SORT -->
        <label
          class="
            flex
            relative
            items-center
            gap-2
            text-sm
            text-neutral-500
          "
        >
          <select
            id="sort-select"
            class="
              w-full
              min-w-0
              cursor-pointer
              rounded
              border
              border-neutral-200
              bg-white
              px-3
              py-3
              text-sm
              text-neutral-700
              appearance-none
              pr-10
              outline-none
              focus:border-primary
              sm:w-40
            "
          >
            <option value="latest">
              Sort by: Latest
            </option>

            <option value="price-low">
              Sort by: Price Low
            </option>

            <option value="price-high">
              Sort by: Price High
            </option>

            <option value="rating">
              Sort by: Popularity
            </option>
          </select>
          <span class="pointer-events-none absolute right-3 flex items-center" aria-hidden="true">
            ${dropDown}
          </span>
        </label>

        <!-- SHOW -->
        <label
          class="
            flex
            relative
            items-center
            gap-2
            text-sm
            text-neutral-500
          "
        >
          <select
            id="products-per-page"
            class="
              w-full
              min-w-0
              cursor-pointer
              rounded
              border
              border-neutral-200
              bg-white
              px-3
              py-3
              text-sm
              text-neutral-700
              appearance-none
              pr-10
              outline-none
              focus:border-primary
              sm:w-40
            "
          >
            <option value="8">
              Show: 8
            </option>

            <option
              value="16"
              selected
            >
              Show: 16
            </option>

            <option value="24">
              Show: 24
            </option>
          </select>
          <span class="pointer-events-none absolute right-3 flex items-center" aria-hidden="true">
            ${dropDown}
          </span>
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
        saleProductsContainer,
        PRODUCT_DATA
      )
    }
  }

  const activeFilterContainer = document.getElementById(
    "active-filter-container",
  )

  function renderActiveFilters(totalResults) {
    if (!activeFilterContainer) return

    const chips = []

    if (shopState.category !== "all") {
      chips.push({ type: "category", label: shopState.category })
    }

    if (
      shopState.minPrice !== minProductPrice ||
      shopState.maxPrice !== maxProductPrice
    ) {
      chips.push({
        type: "price",
        label: `Min $${shopState.minPrice} — Max $${shopState.maxPrice}`,
      })
    }

    if (shopState.rating > 0) {
      chips.push({
        type: "rating",
        label: `${shopState.rating} Stars & Up`,
      })
    }

    if (shopState.tag !== "all") {
      chips.push({
        type: "tag",
        label: shopState.tag,
      })
    }

    activeFilterContainer.innerHTML = `
      <div class="flex flex-wrap items-center gap-2 text-sm">
        <span class="text-neutral-500">Active Filters:</span>
        ${chips
        .map(
          (chip) => `
              <span class="inline-flex items-center gap-1.5 font-medium text-neutral-900">
                ${chip.label}
                <button
                  type="button"
                  data-remove-filter="${chip.type}"
                  class="cursor-pointer text-neutral-400 transition-colors hover:text-error"
                  aria-label="Remove ${chip.type} filter"
                >×</button>
              </span>
            `,
        )
        .join("")}
      </div>
      <p class="shrink-0 text-sm text-neutral-600">
        <span class="font-semibold text-neutral-900">${totalResults}</span> Results found.
      </p>
    `
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
    breadcrumbs.innerHTML = isShop2
      ? `
        <div class="container-custom flex h-[72px] items-center">
          <nav class="flex items-center gap-3 text-base" aria-label="Breadcrumb">
            <a href="./index.html" class="text-neutral-400 transition-colors hover:text-primary" aria-label="Home">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 10L12 3L20 10V20H15V16C15 14.34 13.66 13 12 13C10.34 13 9 14.34 9 16V20H4V10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <span class="text-neutral-300">›</span>
            <a href="./shop.html" class="text-neutral-500 transition-colors hover:text-primary">Categories</a>
            <span class="text-neutral-300">›</span>
            <span class="font-medium text-primary" aria-current="page">Vegetables</span>
          </nav>
        </div>
      `
      : renderBreadcrumbsComponent({
        breadcrumbs: [
          { label: "Categories", url: "./shop.html" },
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
        if (!isShop2) {
          products.sort((a, b) => b.id - a.id)
        } else if (shopState.rating > 0) {
          products.sort((a, b) => a.rating - b.rating)
        }
        break
    }

    return products
  }

  if (productGridContainer) {
    function renderShopProducts() {
      const sortedProducts = getSortedProducts()
      const totalProducts = sortedProducts.length

      renderActiveFilters(totalProducts)

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

    if (isShop2) {
      bindCardEvents(productGridContainer)
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

    if (filterContainer) {
      filterContainer.addEventListener("change", (event) => {
        if (event.target.name === "category") {
          shopState.category = event.target.value
          shopState.currentPage = 1
          renderShopProducts()

          if (isShop2) {
            event.target.closest("details")?.removeAttribute("open")
          }
        }

        if (event.target.name === "rating") {
          const ratingInputs = filterContainer.querySelectorAll(
            'input[name="rating"]',
          )
          ratingInputs.forEach((input) => {
            if (input !== event.target) input.checked = false
          })

          shopState.rating = event.target.checked
            ? Number(event.target.value)
            : 0
          shopState.currentPage = 1
          renderShopProducts()

          if (isShop2) {
            event.target.closest("details")?.removeAttribute("open")
          }
        }
      })
    }

    const minPriceInput = document.getElementById("min-price")
    const maxPriceInput = document.getElementById("max-price")
    const priceValue = document.getElementById("price-value")
    const priceProgress = document.getElementById("price-progress")

    filterContainer
      ?.querySelectorAll('input[name="rating"]')
      .forEach((input) => {
        const ratingItem = input.closest("li")
        if (ratingItem) ratingItem.classList.add("relative")

        input.classList.add(
          "peer",
          "absolute",
          "left-0",
          "top-1/2",
          "z-10",
          "-translate-y-1/2",
          "opacity-0",
        )

        input.insertAdjacentHTML(
          "afterend",
          `
            <span
              class="pointer-events-none flex h-5 w-5 shrink-0 items-center justify-center rounded border bg-white transition-colors ${
                isShop2
                  ? "border-neutral-200 group-hover/rating:border-primary peer-hover:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20 peer-checked:border-primary peer-checked:bg-primary"
                  : "border-neutral-300 shadow-[0_1px_3px_rgba(0,0,0,0.18)] group-hover:border-primary peer-checked:border-primary peer-checked:bg-primary"
              }"
              aria-hidden="true"
            >
              <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6667 1L4.33333 8.33333L1 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          `,
        )
      })

      ;[minPriceInput, maxPriceInput].forEach((input) => {
        if (!input) return

        input.classList.remove(
          "[&::-webkit-slider-thumb]:bg-primary",
          "[&::-webkit-slider-thumb]:border-white",
        )
        input.classList.add(
          "[&::-webkit-slider-thumb]:bg-white",
          "[&::-webkit-slider-thumb]:border-2",
          "[&::-webkit-slider-thumb]:border-primary",
          "[&::-moz-range-thumb]:bg-white",
          "[&::-moz-range-thumb]:border-2",
          "[&::-moz-range-thumb]:border-primary",
        )
      })

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

      if (priceValue) {
        priceValue.textContent = isShop2
          ? `$${minValue} — $${maxValue}`
          : `${minValue} — ${maxValue}`
      }

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

    if (activeFilterContainer) {
      activeFilterContainer.addEventListener("click", (event) => {
        const removeButton = event.target.closest("[data-remove-filter]")
        if (!removeButton) return

        const filterType = removeButton.dataset.removeFilter

        if (filterType === "category") {
          shopState.category = "all"
          const allCategories = filterContainer.querySelector(
            'input[name="category"][value="all"]',
          )
          if (allCategories) allCategories.checked = true
        }

        if (filterType === "price") {
          shopState.minPrice = minProductPrice
          shopState.maxPrice = maxProductPrice
          minPriceInput.value = minProductPrice
          maxPriceInput.value = maxProductPrice
          updatePriceFilter()
          return
        }

        if (filterType === "rating") {
          shopState.rating = 0
          filterContainer
            .querySelectorAll('input[name="rating"]')
            .forEach((input) => {
              input.checked = false
            })
        }

        if (filterType === "tag") {
          shopState.tag = "all"
          setTagButtonState(filterContainer, shopState.tag)
        }

        shopState.currentPage = 1
        renderShopProducts()
      })
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
