import companyLogosData from "../data/companyLogo.json";
import { attachImageUrls } from "../utils/assets.js";

export function renderBrandStrip() {
  const logos = attachImageUrls(companyLogosData);

  // Kích thước thật của 6 file logo đã kiểm tra
  const logoWidths = [82, 67, 60, 83, 132, 96];

  return `
    <section
      class="container-custom pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-[45px] lg:pb-[58px]"
    >
      <div
        class="grid grid-cols-3 items-center sm:grid-cols-6"
      >
        ${logos
          .map(
            (logo, index) => `
              <div
                class="brand-logo-item flex h-12 items-center
                      ${
                        index === 0
                          ? "justify-start"
                          : index === logos.length - 1
                            ? "justify-end"
                            : "justify-center"
                        }
                      sm:h-14 lg:h-[50px] lg:pl-[0px]
                      ${index !== 0 ? "border-l border-neutral-100" : ""}"
                      
              >
                <span
                  class="brand-logo-mask block"
                  style="
                    --logo-width: ${logoWidths[index]}px;
                    --logo-image: url('${logo.image}');
                  "
                  aria-hidden="true"
                ></span>

                <span class="sr-only">
                  ${logo.name}
                </span>
              </div>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}