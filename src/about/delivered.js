import aboutData from "../data/about.json"
import { renderDeliveredFeatureComponent } from "../components/deliveredfeature.js"
import { nextArrow } from "../components/icons.js"
export function renderDeliveredFeature() {
  const deliveredFeatureHtml = aboutData.deliveryFeatures
    .map((item) => renderDeliveredFeatureComponent(item))
    .join("")
  return /*html*/ `
  <section class="w-full mx-auto px-4 py-6 md:py-14 bg-white" aria-labelledby="about-delivery-title">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row gap-8 md:gap-8 lg:gap-12 items-center">
          <!-- Cột 1: tiêu đề và nội dung -->
          <!-- tiêu đề -->
          <div class="w-full md:w-1/2 text-left space-y-2 md:space-y-4 lg:space-y-6">
            <h2 class="text-lg sm:text-2xl md:text-4xl lg:text-[56px] text-title font-semibold leading-tight">
              ${aboutData.delivered.title}
            </h2>
            <!-- Nội dung -->
            <p class="text-content-600 text-xs sm:text-sm md:text-base lg:text-[18px] font-normal leading-relaxed">
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
          <div class="w-full md:w-1/2">
            <img src="${aboutData.delivered.image.src}" alt="${aboutData.delivered.image.alt}"
              class="w-full h-auto rounded-lg object-cover">
          </div>
        </div>
      </div>
  </section>
    `
}
