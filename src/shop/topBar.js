import { filter, dropDown } from "../components/icons"

export const SHOP_TOPBAR_DATA = {
  totalResults: 20,
  currentSort: "latest",
  buttonName: "Filter",
  sortOptions: [
    { value: "latest", label: "Latest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Popularity" },
  ],
}

export function renderTopBar(topBarData = SHOP_TOPBAR_DATA) {
  const { totalResults, currentSort, buttonName, sortOptions } = topBarData
  // Map các option thành chuỗi HTML
  const optionsHtml = sortOptions
    .map(
      (opt) => /*html*/ `
      <option value="${opt.value}" ${opt.value === currentSort ? "selected" : ""}>
        ${opt.label}
      </option>
    `,
    )
    .join("")
  const topBarHtml = /*html*/ `
<!-- Chia topbar thành 1 dòng 4 cột (cột 1 chứa nút filter và các 3 cột còn lại là sort và result) -->

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center w-full mb-6">
        <!-- Nút filter -->
      <div class="relative w-full lg:col-span-1 space-y-6">
            <button id="open-filter-btn"
              type="button"
              class="bg-[#00B307] text-white max-w-32.75 px-6 py-3.5 rounded-full text-[14px] font-semibold flex items-center gap-3 hover:opacity-90 cursor-pointer w-full sm:w-auto justify-center mb-4">
              <span>${buttonName}</span>
              ${filter}
            </button>
        </div>
        <!-- Sortby và result -->
        <div class="flex items-center gap-4 pb-4 w-full">
              <!-- Cụm sort by -->
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500">Sort by:</span>
                <div class="relative min-w-41.5">
                  <select 
                    id="sort-select"
                    class ="w-full px-3 py-2 border border-gray-200 rounded text-gray-700 bg-white cursor-pointer focus:outline-none focus:border-primary text-sm font-poppins"
                    >
                      ${optionsHtml}
                  </select>
                </div>
              </div>
        </div>  
        <!-- Result found  -->
              <div class="text-sm lg:col-span-1 lg:col-start-4 text-right text-neutral-500">
                <span class="font-semibold text-neutral-900">${totalResults}</span> Results Found
              </div>
    </div>
    `

  return topBarHtml
}
