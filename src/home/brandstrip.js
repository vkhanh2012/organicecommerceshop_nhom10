import companyLogosData from "../data/companyLogo.json";
import { attachImageUrls } from "../utils/assets.js";

export function renderBrandStrip() {
  const logos = attachImageUrls(companyLogosData);
  return `<section class="container-custom py-8 md:py-12">
    <div class="grid grid-cols-3 items-center gap-6 sm:grid-cols-6">
      ${logos.map((logo, index) => `
        <div class="flex h-12 items-center justify-center ${index ? 'border-l border-neutral-100' : ''}">
          <img class="max-h-9 max-w-[120px] object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" src="${logo.image}" alt="${logo.name}">
        </div>`).join('')}
    </div>
  </section>`;
}