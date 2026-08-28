import { dropDown } from "../components/icons.js"

export function renderCategoryFilter(products, selectedCategory = "all",layout = "sidebar") {
  const categoryCounts = {}
  //đếm số lượng sản phẩm
  products.forEach((product) => {
    const category = product.category

    if (categoryCounts[category]) {
      categoryCounts[category]++
    } else {
      categoryCounts[category] = 1
    }
  })

  //tạo mảng cate từ dữ liệu của sản phẩm
  const categories = [
    {
      id: "all-categories",
      label: "All Categories",
      value: "all",
      count: products.length,
    },

    ...Object.entries(categoryCounts).map(([category, count]) => ({
      id: category.toLowerCase().replaceAll(" ", "-"),

      label: category,
      value: category,
      count: count,
    })),
  ]

  const listItemsHtml = categories
    .map((item, index) => {
      const checked = selectedCategory === item.value
      const rowSpacing = layout === "horizontal"
        ? ""
        : index === 0
          ? "pb-2.5"
          : index === categories.length - 1
            ? "pt-2.5 pb-6"
            : "py-2.5"
      return /*html*/ `
      <li class="${rowSpacing} flex items-center ${layout === "horizontal" ? "justify-between group/category" : "group"} text-[14px] text-neutral-600 cursor-pointer">
        <div class="flex items-center gap-2">
          <input 
            type="radio" 
            name="category" 
            id="${item.id}"
            value="${item.value}"
            ${checked ? "checked" : ""}
            class="
              peer
              appearance-none
              w-5 h-5
              rounded-full
              border-2 border-neutral-300
              bg-white
              cursor-pointer
              ${layout === "horizontal" ? "group-hover/category:border-primary" : ""}

              checked:border-primary
              checked:bg-primary
              checked:shadow-[inset_0_0_0_3px_white]
            "
          >

          <label 
            for="${item.id}" 
            class="
              cursor-pointer
              text-neutral-600
              peer-checked:text-primary-dark
              peer-checked:font-medium
              ${layout === "horizontal" ? "group-hover/category:text-primary" : "group-hover:text-primary"}
              transition-colors
              font-poppins
            "
          >
            ${item.label}
          </label>
          ${layout === "horizontal" ? "" : `
            <span class="text-neutral-400 text-xs font-poppins">
              (${item.count})
            </span>
          `}
            </div>

            ${layout === "horizontal" ? `
              <span class="text-neutral-400 text-xs font-poppins">
                (${item.count})
              </span>
            ` : ""}
          </li>
    `
    })
    .join("")

// shop2

    if (layout === "horizontal") {
  return /*html*/ `
    <details class="group relative">

      <summary
        class="
          flex min-w-44 cursor-pointer
          list-none items-center justify-between
          gap-4 rounded
          border border-neutral-200
          bg-white
          px-4 py-3
          text-sm text-neutral-600
        "
      >
        <span>Select Category</span>

        <span
          class="
            transition-transform
            group-open:rotate-180
          "
        >
          ${dropDown}
        </span>
      </summary>

      <div
        class="
          absolute left-0 top-full z-40
          mt-2 w-[min(18rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)]
          rounded-lg
          border border-neutral-100
          bg-white p-4 shadow-lg
        "
      >
        <ul class="space-y-3">
          ${listItemsHtml}
        </ul>
      </div>

    </details>
  `
}

  return /*html*/ `
    <div class="border-b border-neutral-100 font-poppins">
      <div class="shop-filter-header">
        <h3 class="section-heading">All Categories</h3>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-neutral-900">
          <path d="M2.91634 9.04166L6.99967 4.95833L11.083 9.04166" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <ul>
        ${listItemsHtml}
      </ul>
    </div>
  `
}
