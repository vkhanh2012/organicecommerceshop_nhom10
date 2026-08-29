//Dữ liệu mẫu
// const PRICE_DATA = {
//   min: 0,
//   max: 2000,
//   currentMin: 50,
//   currentMax: 1500,
// }

export function renderPriceFilter(
  products,
  selectedMin,
  selectedMax,
  layout = "sidebar"
) {
  const prices = products.map((product) => product.price)

  const minPrice = Math.floor(Math.min(...prices))
  const maxPrice = Math.ceil(Math.max(...prices))


  // Shop2
  if (layout === "horizontal") {
  return /*html*/ `
    <details class="group relative">

      <summary
        class="
          flex min-w-36 cursor-pointer
          list-none items-center justify-between
          gap-4 rounded
          border border-neutral-200
          bg-white
          px-3 py-2
          text-sm text-neutral-600
        "
      >
        <span>Select Price</span>
        <span class="transition-transform group-open:rotate-180">
          ⌄
        </span>
      </summary>

      <div
        class="
          absolute left-0 top-full z-40
          mt-2 w-80
          rounded-lg
          border border-neutral-100
          bg-white p-5 shadow-lg
        "
      >

        <!-- đặt nguyên slider Price hiện tại của bạn ở đây -->

      </div>

    </details>
  `
}

  return /*html*/ `
    <div class="flex w-full max-w-80 flex-col items-start gap-4 border-b border-neutral-100 pb-6 font-poppins">

      <div class="flex w-full items-center justify-between">
        <h2 class="text-xl font-medium leading-8 text-neutral-900">
          Price
        </h2>

        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.91634 9.04166L6.99967 4.95833L11.083 9.04166"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>


      <div class="relative h-4 w-full">
        <div class="absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 rounded-2xl bg-neutral-200"></div>

        <div
          id="price-progress"
          class="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-2xl bg-primary"
        ></div>


        <!-- Nút kéo MIN -->
        <input
          id="min-price"
          type="range"
          aria-label="Minimum price"
          aria-valuetext="$${selectedMin}"
          min="${minPrice}"
          max="${maxPrice}"
          value="${selectedMin}"
          step="1"
          class="
            absolute
            top-1/2
            left-0
            w-full
            -translate-y-1/2
            appearance-none
            bg-transparent
            pointer-events-none
            z-20

            [&::-webkit-slider-runnable-track]:bg-transparent

            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-primary
            [&::-webkit-slider-thumb]:shadow
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:pointer-events-auto
          "
        >


        <!-- Nút kéo MAX -->
        <input
          id="max-price"
          type="range"
          aria-label="Maximum price"
          aria-valuetext="$${selectedMax}"
          min="${minPrice}"
          max="${maxPrice}"
          value="${selectedMax}"
          step="1"
          class="
            absolute
            top-1/2
            left-0
            w-full
            -translate-y-1/2
            appearance-none
            bg-transparent
            pointer-events-none
            z-30

            [&::-webkit-slider-runnable-track]:bg-transparent

            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-primary
            [&::-webkit-slider-thumb]:shadow
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:pointer-events-auto
          "
        >

      </div>


      <div class="text-sm leading-5 text-neutral-600">
        <span>Price:</span>

        <span
          id="price-value"
          aria-live="polite"
          class="font-medium leading-5 text-neutral-900"
        >
          $${selectedMin} — $${selectedMax}
        </span>
      </div>

    </div>
  `
}
