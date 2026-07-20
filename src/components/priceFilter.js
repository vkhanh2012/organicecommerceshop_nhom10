//Dữ liệu mẫu
const PRICE_DATA = {
    min: 0,
    max: 2000,
    currentMin: 50,
    currentMax: 1500,
}


export function renderPriceFilter(){
    return /*html*/`
    <div class="border-b border-neutral-100 pb-6 font-poppins">
      <div class="flex items-center justify-between cursor-pointer mb-5">
        <h3 class="text-xl font-medium text-neutral-900">Price</h3>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-neutral-900">
          <path d="M2.91634 9.04166L6.99967 4.95833L11.083 9.04166" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- Range Slider UI -->
      <div class="relative w-full mb-4">
        <div class="h-1.5 bg-neutral-200 rounded-full w-full"></div>
        <div class="absolute top-0 h-1.5 bg-green-600 rounded-full left-[10%] right-[30%]"></div>
        <div class="absolute top-1/2 -translate-y-1/2 left-[10%] w-4 h-4 bg-white border-2 border-green-600 rounded-full cursor-pointer shadow"></div>
        <div class="absolute top-1/2 -translate-y-1/2 right-[30%] w-4 h-4 bg-white border-2 border-green-600 rounded-full cursor-pointer shadow"></div>
      </div>

      <div class="text-sm text-neutral-700 font-poppins">
        Price: <span class="font-semibold text-neutral-900">${PRICE_DATA.currentMin} — ${PRICE_DATA.currentMax}</span>
      </div>
    </div>
  `;
}