import { filter, dropDown } from "../components/icons.js";

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
};

export function renderTopBar(topBarData = SHOP_TOPBAR_DATA) {
  const {
    totalResults,
    currentSort,
    buttonName,
    sortOptions,
  } = topBarData;

  const optionsHtml = sortOptions
    .map(
      (opt) => /*html*/ `
        <option
          value="${opt.value}"
          ${opt.value === currentSort ? "selected" : ""}
        >
          ${opt.label}
        </option>
      `,
    )
    .join("");

  return /*html*/ `
    <div
      class="grid w-full
             grid-cols-1
             items-center
             gap-4
             md:grid-cols-2 md:gap-5
             lg:grid-cols-4 lg:gap-6"
    >

      <!-- FILTER -->
      <div class="relative w-full lg:col-span-1">
        <button
          id="open-filter-btn"
          type="button"
          aria-controls="mobile-filter-drawer"
          aria-expanded="false"
          class="flex h-[45px]
                 w-[135px]
                 cursor-pointer
                 items-center justify-center
                 gap-3
                 rounded-full
                 bg-primary
                 px-6
                 text-[13px] font-semibold
                 leading-[20px]
                 text-white
                 transition-opacity
                 hover:opacity-90

                 md:w-[145px]
                 lg:w-[130px]"
        >
          <span>${buttonName}</span>
          ${filter}
        </button>
      </div>


      <!-- SORT BY -->
      <div
        class="flex w-full
               items-center
               gap-3"
      >
        <label
          for="sort-select"
          class="shrink-0
                 text-[13px]
                 leading-[20px]
                 text-neutral-600"
        >
          Sort by:
        </label>

        <div
          class="relative
                 w-[145px]
                 md:w-[150px]
                 lg:w-[150px]"
        >
          <select
            id="sort-select"
            class="h-[40px]
                   w-full
                   cursor-pointer
                   appearance-none
                   rounded
                   border border-neutral-200
                   bg-white
                   py-0 pl-3 pr-8
                   font-poppins
                   text-[13px]
                   leading-[20px]
                   text-neutral-700
                   outline-none
                   transition-colors
                   focus:border-primary"
          >
            ${optionsHtml}
          </select>

          <span
            class="pointer-events-none
                   absolute right-3 top-1/2
                   flex -translate-y-1/2
                   items-center
                   text-neutral-500
                   [&>svg]:h-3
                   [&>svg]:w-3"
          >
            ${dropDown}
          </span>
        </div>
      </div>


      <!-- RESULT FOUND -->
      <div
        class="text-left
               text-[13px]
               leading-[20px]
               text-neutral-600

               md:text-right

               lg:col-span-1
               lg:col-start-4"
      >
        <span
          id="shop-result-count"
          class="font-semibold text-neutral-900"
        >
          ${totalResults}
        </span>
        Results Found
      </div>

    </div>
  `;
}
