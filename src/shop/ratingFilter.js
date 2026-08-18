import { ratingStar } from "../components/icons";
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
  const color = filled ? "#FF8A00" : "#CCCCCC";
  return ratingStar(color);
}

//Tạo chuỗi 5 ngôi sao đựa theo ngôi sao cần tô
function makeStarHtml(starCount) {
  return Array.from({ length: 5 }, (_, i) => makeStar(i < starCount)).join("");
}

//tạo cho 1 dòng rating (1 li)
function renderRating(item, selectedRating) {
  return /*html*/ `
    <li class = "flex items-center gap-2 cursor-pointer group">
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
export function renderRatingFilter(selectedRating =0) {
  const listItemsHtml = RATING_DATA
    .map((item) =>
      renderRating(item, selectedRating)
    )
    .join("")

  return `
    <div class="border-b border-neutral-100 pb-6.5 font-poppins">
      <div class="shop-filter-header">
        <h3 class="section-heading">Rating</h3>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-neutral-900">
          <path d="M2.91634 9.04166L6.99967 4.95833L11.083 9.04166" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <ul class="space-y-3">
        ${listItemsHtml}
      </ul>
    </div>`;
}
