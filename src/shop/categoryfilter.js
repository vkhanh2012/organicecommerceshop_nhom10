export function renderCategoryFilter(products, selectedCategory = "all") {
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
    .map((item) => {
      const checked = selectedCategory === item.value
      return /*html*/ `
      <li class="flex items-center justify-between text-sm text-neutral-600 cursor-pointer group">
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
              group-hover:text-primary
              transition-colors
              font-poppins
            "
          >
            ${item.label}
          </label>
            </div>

            <span class="text-neutral-400 text-xs font-poppins">
              (${item.count})
            </span>
          </li>
    `
    })
    .join("")

  return /*html*/ `
    <div class="border-b border-neutral-100 pb-6 font-poppins">
      <div class="flex items-center justify-between cursor-pointer mb-5">
        <h3 class="text-xl font-medium text-neutral-900">All Categories</h3>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-neutral-900">
          <path d="M2.91634 9.04166L6.99967 4.95833L11.083 9.04166" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <ul class="space-y-4">
        ${listItemsHtml}
      </ul>
    </div>
  `
}
