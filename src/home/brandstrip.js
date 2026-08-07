import companyLogosData
  from "../data/companyLogo.json";

import { attachImageUrls }
  from "../utils/assets.js";

export function renderBrandStrip() {

  const logos = attachImageUrls(
    companyLogosData
  );

  return `
    <section class="container-custom py-8 md:py-12">

      <div
        class="grid grid-cols-3 items-center gap-6
               sm:grid-cols-6"
      >

        ${logos
          .map(
            (logo, index) => `
              <div
                class="flex items-center justify-center
                       opacity-80 transition-opacity
                       hover:opacity-100"
              >

                <img
                  src="${logo.image}"
                  alt="${logo.alt || `Brand ${index + 1}`}"
                  class="h-8 w-auto object-contain md:h-10"
                  loading="lazy"
                />

              </div>
            `
          )
          .join("")}

      </div>

    </section>
  `;
}