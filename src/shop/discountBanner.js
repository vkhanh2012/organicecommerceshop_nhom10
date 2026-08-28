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
    <div class="relative overflow-hidden rounded-[8px] bg-neutral-50 text-center">
        <div class="flex min-h-[104px] flex-col items-center justify-center px-4 py-4">
            <div class="text-[28px] font-medium leading-8 text-neutral-900">
                <span class="font-bold text-text-discount">${data.discountPercentage}%</span> Discount
            </div>
            <p class="mt-1 text-sm leading-5 text-neutral-700">${data.description}</p>
            <a href="${data.link || "./shop.html"}"
                class="group mt-2 inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark">
                <span>${data.buttonText || "Shop Now"}</span>
                <span class="transition-transform group-hover:translate-x-1 [&_path]:stroke-current">
                    ${nextArrow}
                </span>
            </a>
        </div>
        <img src="${data.imageUrl}" alt="${data.title || "Discount Banner"}"
            class="block h-[164px] w-full object-cover object-center">
    </div>
    `;
}

// export async function renderDiscountBanner() {
//     try{
//         const response = await fetch()
//     }
// }
