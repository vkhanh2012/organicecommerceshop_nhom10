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
  selectedMax
) {
  const prices = products.map((product) => product.price)

  const minPrice = Math.floor(Math.min(...prices))
  const maxPrice = Math.ceil(Math.max(...prices))

  return /*html*/ `
    <div class="border-b border-neutral-100 pb-6 font-poppins">

      <div class="flex items-center justify-between cursor-pointer mb-5">
        <h3 class="text-xl font-medium text-neutral-900">
          Price
        </h3>

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


      <!-- Thanh giá -->
      <div class="relative h-5">

        <!-- Thanh nền màu xám -->
        <div
          class="
            absolute
            top-1/2
            left-0
            w-full
            h-1
            -translate-y-1/2
            rounded-full
            bg-neutral-200
          "
        ></div>

        <!-- Phần giá đang được chọn -->
        <div
          id="price-progress"
          class="
            absolute
            top-1/2
            h-1
            -translate-y-1/2
            rounded-full
            bg-primary
          "
        ></div>


        <!-- Nút kéo MIN -->
        <input
          id="min-price"
          type="range"
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
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:pointer-events-auto
          "
        >


        <!-- Nút kéo MAX -->
        <input
          id="max-price"
          type="range"
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
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:pointer-events-auto
          "
        >

      </div>


      <div class="mt-3 text-sm text-neutral-600">
        Price:

        <span
          id="price-value"
          class="font-medium text-neutral-900"
        >
          $${selectedMin} — $${selectedMax}
        </span>
      </div>

    </div>
  `
}