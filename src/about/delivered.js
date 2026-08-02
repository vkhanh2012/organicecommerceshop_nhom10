import aboutData from "../data/about.json"
import { renderDeliveredFeatureComponent } from "../components/deliveredfeature.js"

export function renderDeliveredFeature() {
  const deliveredFeatureHtml = aboutData.deliveryFeatures
    .map((item) => renderDeliveredFeatureComponent(item))
    .join("")
  return /*html*/ `
  <section class="w-full mx-auto px-4 py-6 md:py-14 bg-white">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row gap-8 md:gap-8 lg:gap-12 items-center">
          <!-- Cột 1: tiêu đề và nội dung -->
          <!-- tiêu đề -->
          <div class="w-full md:w-1/2 text-left space-y-2 md:space-y-4 lg:space-y-6">
            <h1 class="text-lg sm:text-2xl md:text-4xl lg:text-[56px] text-title font-semibold leading-tight">
              ${aboutData.delivered.title}
            </h1>
            <!-- Nội dung -->
            <p class="text-content-600 text-xs sm:text-sm md:text-base lg:text-[18px] font-normal leading-relaxed">
            ${aboutData.delivered.description}
            </p>
            <!-- 3 feature -->
            <div class="flex flex-col space-y-3">
              ${deliveredFeatureHtml}
            </div>
            <!-- Button Shop Now -->
             <div class="inline-flex items-center px-8 py-3.5 md:px-10 md:py-4 rounded-pill bg-primary text-white font-semibold text-sm gap-4 hover:bg-primary-dark cursor-pointer">
                Shop Now
                  <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.75 6.77539H0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M9.7002 0.75L15.7502 6.774L9.7002 12.799" stroke="white" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                  </svg>
                <a href="./shop.html"></a>
              </div>
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
