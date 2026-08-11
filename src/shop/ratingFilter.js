//Dữ liệu demo
const RATING_DATA = [
  { stars: 5, label: "5.0", checked: false },
  { stars: 4, label: "4.0 & up", checked: true },
  { stars: 3, label: "3.0 & up", checked: false },
  { stars: 2, label: "2.0 & up", checked: false },
  { stars: 1, label: "1.0 & up", checked: false },
];

// tạo 1 ngôi sao
function makeStar(filled) {
  const color = filled ? "#FF8A00" : "#CCCCCC";
  return `
   <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.62258 11.7231L11.1691 13.9698C11.6225 14.2566 12.185 13.8297 12.0506 13.3004L11.0263 9.27006C10.9973 9.1578 11.0007 9.03965 11.0359 8.9292C11.0711 8.81874 11.1368 8.72047 11.2254 8.64569L14.4058 5.99913C14.8231 5.6515 14.6083 4.95794 14.0711 4.92306L9.91815 4.65306C9.80633 4.64513 9.69907 4.6056 9.60885 4.53908C9.51863 4.47256 9.44916 4.38178 9.40852 4.27731L7.8594 0.376939C7.81721 0.266092 7.74234 0.170685 7.64469 0.103367C7.54705 0.0360489 7.43125 0 7.31265 0C7.19405 0 7.07824 0.0360489 6.9806 0.103367C6.88296 0.170685 6.80808 0.266092 6.7659 0.376939L5.21677 4.27731C5.17622 4.38189 5.10679 4.47278 5.01656 4.53941C4.92633 4.60604 4.81902 4.64565 4.70715 4.65363L0.554209 4.92363C0.0175843 4.95794 -0.198416 5.6515 0.219522 5.99913L3.3999 8.64625C3.48838 8.72099 3.554 8.81916 3.58922 8.9295C3.62445 9.03984 3.62784 9.15788 3.59902 9.27006L2.64952 13.0079C2.48808 13.6429 3.16365 14.1554 3.70702 13.8106L7.00327 11.7231C7.09592 11.6642 7.20343 11.6329 7.31321 11.6329C7.42299 11.6329 7.5305 11.6642 7.62315 11.7231H7.62258Z" fill="${color}"/>
    </svg>
    `;
}
//Tạo chuỗi 5 ngôi sao đựa theo ngôi sao cần tô
function makeStarHtml(starCount) {
  return Array.from({ length: 5 }, (_, i) => makeStar(i < starCount)).join("");
}

//tạo cho 1 dòng rating (1 li)
function renderRating(item) {
  return /*html*/ `
    <li class = "flex items-center gap-2 cursor-pointer group">
        <input
        type = "checkbox"
        name= "rating"
        id="rating-${item.stars}"
        ${item.checked ? "checked" : ""}
        class = "w-5 h-5 accent-primary rounded border-neutral-300 cursor-pointer"
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
export function renderRatingFilter() {
  const listItemsHtml = RATING_DATA.map(renderRating).join("");

  return `
    <div class="border-b border-neutral-100 pb-6.5 font-poppins">
      <div class="flex items-center justify-between cursor-pointer mb-5">
        <h3 class="text-xl font-medium text-neutral-900">Rating</h3>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-neutral-900">
          <path d="M2.91634 9.04166L6.99967 4.95833L11.083 9.04166" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <ul class="space-y-3">
        ${listItemsHtml}
      </ul>
    </div>`;
}
