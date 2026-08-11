import { getImageUrl } from "../utils/assets.js";

export function renderFeatures() {
  const items = [
    [
      getImageUrl("/images/itemsFeatures/Vector.png"),
      "Free Shipping",
      "Free shipping on all your order"
    ],
    [
      getImageUrl("/images/itemsFeatures/headphones.png"),
      "Customer Support 24/7",
      "Instant access to Support"
    ],
    [
      getImageUrl("/images/itemsFeatures/shopping-bag.png"),
      "100% Secure Payment",
      "We ensure your money is safe"
    ],
    [
      getImageUrl("/images/itemsFeatures/package.png"),
      "Money-Back Guarantee",
      "30 Days Money-Back Guarantee"
    ]
  ];

  return `
    <section class="container-custom relative z-10 mt-5 md:mt-6">
      <div class="grid grid-cols-1 overflow-hidden rounded-md bg-white shadow-[0_8px_40px_rgba(0,0,0,.05)] sm:grid-cols-2 lg:grid-cols-4">


        ${items.map(([icon, title, description]) => `
          <div class="flex items-center gap-4 p-5 md:p-6">

            <img
              src="${icon}"
              alt="${title}"
              class="h-10 w-10 shrink-0 object-contain"
            >

            <div>
              <h3 class="text-sm font-semibold text-neutral-900">
                ${title}
              </h3>

              <p class="mt-1 text-xs text-neutral-400">
                ${description}
              </p>
            </div>
          </div>
        `).join("")}

      </div>
    </section>
  `;
}