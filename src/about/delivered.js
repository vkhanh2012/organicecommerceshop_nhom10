import aboutData from "../data/about.json"
import { renderDeliveredFeatureComponent } from "../components/deliveredfeature.js"
import { nextArrow } from "../components/icons.js"
export function renderDeliveredFeature() {
  const deliveredFeatureHtml = aboutData.deliveryFeatures
    .map((item) => renderDeliveredFeatureComponent(item))
    .join("")
  return /*html*/ `
  <section class="w-full bg-white py-10 md:py-14 lg:min-h-[685px] lg:py-0" aria-labelledby="about-delivery-title">
      <div class="container-custom">
        <div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:min-h-[685px] lg:grid-cols-[536px_minmax(0,1fr)] lg:gap-[68px]">
          <!-- Cột 1: tiêu đề và nội dung -->
          <!-- tiêu đề -->
          <div class="w-full text-left space-y-2 md:space-y-4 lg:space-y-6">
            <h2 id="about-delivery-title" class="text-[32px] sm:text-[40px] lg:text-[48px] text-neutral-900 font-semibold leading-[1.2]">
              ${aboutData.delivered.title}
            </h2>
            <!-- Nội dung -->
            <p class="text-neutral-600 text-sm md:text-base font-normal leading-relaxed">
            ${aboutData.delivered.description}
            </p>
            <!-- 3 feature -->
            <div class="flex flex-col space-y-3">
              ${deliveredFeatureHtml}
            </div>
            <!-- Button Shop Now -->
             <a href="./shop.html" class="inline-flex items-center px-8 py-3.5 md:px-10 md:py-4 rounded-pill bg-primary text-white font-semibold text-sm gap-4 hover:bg-primary-dark cursor-pointer">
               ${aboutData.delivered.buttonText}
                ${nextArrow}
              </a>
            </div>
          <!-- Cột 2: hình ảnh -->
          <div class="flex w-full items-end self-stretch overflow-visible">
            <img src="${aboutData.delivered.image.src}" alt="${aboutData.delivered.image.alt}"
              class="block h-auto w-full object-contain md:max-w-full lg:h-[606px] lg:w-[895px] lg:max-w-none">
          </div>
        </div>
      </div>
  </section>
    `
}
