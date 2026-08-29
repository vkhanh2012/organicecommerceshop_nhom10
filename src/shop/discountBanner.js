import { nextArrow } from "../components/icons.js";

const BANNER_DATA = {
  discountPercentage: 79,
  description: "on your first order",
  buttonText: "Shop Now",
  link: "./shop.html",
  imageUrl: "./src/assets/images/discountBanner.jpg",
};

export function renderDiscountBanner(data = BANNER_DATA) {
  return /*html*/ `
    <div class="relative flex flex-col items-center gap-3 overflow-hidden rounded-[10px] bg-neutral-50 pb-0 text-center">
        <div class="flex flex-col items-center justify-center gap-0.5 px-4 pt-5">
            <div class="w-full text-center text-2xl font-normal leading-9 text-neutral-900">
                <span class="text-3xl font-semibold leading-10 text-text-discount">${data.discountPercentage}%</span> Discount
            </div>
            <p class="w-full text-center text-base font-normal leading-6 text-neutral-600">${data.description}</p>
        </div>
        <a href="${data.link || "./shop.html"}"
            class="group inline-flex items-center justify-center gap-3 rounded-[43px] text-base font-semibold leading-5 text-primary hover:text-primary-dark">
            <span>${data.buttonText || "Shop Now"}</span>
            <span class="transition-transform group-hover:translate-x-1 [&_path]:stroke-current">
                ${nextArrow}
            </span>
        </a>
        <img src="${data.imageUrl}" alt="${data.title || "Discount Banner"}"
            class="block h-[180px] w-full object-cover object-center">
    </div>
    `;
}

// export async function renderDiscountBanner() {
//     try{
//         const response = await fetch()
//     }
// }
