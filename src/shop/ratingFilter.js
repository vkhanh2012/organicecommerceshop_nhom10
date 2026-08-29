import { dropDown, ratingStar } from "../components/icons.js";
const star = 'var(--color-warning)';
const greystar = 'var(--color-greystar)';
//Dữ liệu demo
const RATING_DATA = [
  { stars: 5, label: "5.0" },
  { stars: 4, label: "4.0 & up" },
  { stars: 3, label: "3.0 & up" },
  { stars: 2, label: "2.0 & up" },
  { stars: 1, label: "1.0 & up" },
]
// tạo 1 ngôi sao
function makeStar(filled) {
  const color = filled ? star : greystar;
  return ratingStar(color);
}

//Tạo chuỗi 5 ngôi sao đựa theo ngôi sao cần tô
function makeStarHtml(starCount) {
  return Array.from({ length: 5 }, (_, i) => makeStar(i < starCount)).join("");
}

//tạo cho 1 dòng rating (1 li)
function renderRating(item, selectedRating, layout = "sidebar", rowSpacing = "") {
  return /*html*/ `
    <li class="${rowSpacing} flex items-center gap-2 cursor-pointer ${layout === "horizontal" ? "group/rating" : "group"}">
       <input
          type="checkbox"
          name="rating"
          id="rating-${item.stars}"
          value="${item.stars}"
          ${selectedRating === item.stars ? "checked" : ""}
          class="
            w-5 h-5
            accent-primary
            rounded
            border-neutral-300
            cursor-pointer
            py-[10px]
          "
        >
        <label for = "rating-${item.stars}" class="flex items-center gap-1 cursor-pointer">
            <div class="flex items-center gap-0.5">
                ${makeStarHtml(item.stars)}
            </div>
            <span class="text-sm text-neutral-900 ml-1">${item.label}</span>
        </label>       
    </li>`;
}
//hàm để render ra tất cả
export function renderRatingFilter(selectedRating =0,  layout = "sidebar") {
  const listItemsHtml = RATING_DATA
    .map((item, index) => {
      const rowSpacing = layout === "horizontal"
        ? ""
        : index === RATING_DATA.length - 1
          ? "pt-2.5 pb-[26px]"
          : "py-2.5"

      return renderRating(item, selectedRating, layout, rowSpacing)
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
        <span>Select Rating</span>
        <span class="transition-transform group-open:rotate-180">
          ${dropDown}
        </span>
      </summary>

      <div
        class="
          absolute left-0 top-full z-40
          mt-2 w-[min(16rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)]
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

  return `
    <div class="border-b border-neutral-100 font-poppins">
      <div class="shop-filter-header">
        <h3 class="section-heading pt-[20px]">Rating</h3>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-neutral-900">
          <path d="M2.91634 9.04166L6.99967 4.95833L11.083 9.04166" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <ul>
        ${listItemsHtml}
      </ul>
    </div>`;
}
