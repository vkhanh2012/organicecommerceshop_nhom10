const BANNER_DATA = {
  discountPercentage: 79,
  description: "on your first order",
  buttonText: "Shop Now",
  link: "./shop.html",
  imageUrl: "./src/assets/images/discountBanner.jpg",
};

export function renderDiscountBanner(data = BANNER_DATA) {
  return /*html*/ `
    <div class="relative overflow-hidden pb-6 pt-10 gap-3 rounded-[10px] bg-neutral-50 text-center">
        <!-- Badge discount -->
        <div class="mb-1 pb-5 gap-0.5 text-3xl font-semibold text-neutral-900">
            <span class="text-[#FF8A00] font-bold">${data.discountPercentage}%</span> Discount
        </div>
        <p class="text-sm text-neutral-700 mb-4">${data.description}</p>
        <!-- Nút Shop now -->
        <a href="${data.link || "./shop.html"}"
            class="inline-flex items-center justify-center gap-3 text-primary hover:text-primary-dark text-sm mb-4 group">
            <span>${data.buttonText || "Shop Now"}</span>
            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 6.77502H0.75" stroke="#00B307" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M9.7002 0.75L15.7502 6.774L9.7002 12.799" stroke="#00B307" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </a>
        <!-- Hình ảnh banner -->
        <div class="flex mt-2 gap-3 justify-center">
            <img src="${data.imageUrl}" alt="${data.title || "Discount Banner"}"
                class="w-full max-w-78 object-cover h-auto">
        </div>
    </div>
    `;
}

// export async function renderDiscountBanner() {
//     try{
//         const response = await fetch()
//     }
// }
