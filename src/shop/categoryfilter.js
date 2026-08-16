// Mảng dữ liệu mẫu
const CATEGORIES_DATA = [
  { id: "cat-fruit", label: "Fresh Fruit", count: 134, checked: false },
  { id: "cat-veg", label: "Vegetables", count: 150, checked: true }, // Mặc định chọn Vegetables
  { id: "cat-cooking", label: "Cooking", count: 54, checked: false },
  { id: "cat-snacks", label: "Snacks", count: 47, checked: false },
  { id: "cat-beverages", label: "Beverages", count: 43, checked: false },
  { id: "cat-health", label: "Beauty & Health", count: 38, checked: false },
  { id: "cat-bread", label: "Bread & Bakery", count: 15, checked: false },
]

export function renderCategoryFilter() {
  const listItemsHtml = CATEGORIES_DATA.map((item) => {
    return /*html*/ `
      <li class="flex items-center justify-between text-sm text-neutral-600 hover:text-green-600 cursor-pointer group">
        <div class="flex items-center gap-2">
          <input 
            type="radio" 
            name="category" 
            id="${item.id}" 
            ${item.checked ? "checked" : ""} 
            class="w-5 h-5 accent-green-600 cursor-pointer"
          >
          <label 
            for="${item.id}" 
            class="cursor-pointer ${item.checked ? "text-neutral-900 font-medium" : "text-neutral-600"} group-hover:text-green-600 transition-colors font-poppins"
          >
            ${item.label}
          </label>
        </div>
        <!-- Số lượng sản phẩm -->
        <span class="text-neutral-400 text-xs font-poppins">(${item.count})</span>
      </li>
    `
  }).join("")

  return /*html*/ `
    <div class="border-b border-neutral-100 pb-6 font-poppins">
      <div class="flex items-center justify-between cursor-pointer mb-5">
        <h3 class="section-heading">All Categories</h3>
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
