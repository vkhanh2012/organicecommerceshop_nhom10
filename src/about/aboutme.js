import aboutData from "../data/about.json"
import { renderFeatureCard } from "../components/featurecard.js"

export function renderAboutMeSection() {
  //Lấy ra mảng feature từ file json
  const featuresListHtml = aboutData.features
    .map((item) => renderFeatureCard(item))
    .join("")

  return /*html*/ `
    <section class="w-full bg-white pb-[70px]">
    <!-- thẻ chưa ảnh và nội dung (2 cột) -->
        <div class="w-full flex flex-col md:flex-row ">
      <!-- cột 1: hỉnh ảnh -->
        <div class="w-full md:w-1/2 shrink-0 relative min-h-[350px] md:min-h-full">
            <img src="${aboutData.aboutMe.image.src}" alt="${aboutData.aboutMe.image.alt}" class="absolute inset-0 w-full h-full object-cover block">
        </div>

      <!-- Cột 2: nội dung -->
        <div class="w-full md:w-1/2 h-full px-6 md:pl-10 lg:pl-12 md:pr-[calc((100vw-1320px)/2+2rem)] py-8 lg:py-0 flex flex-col justify-center space-y-6">
        <!-- Tiêu đề -->
            <div class="space-y-3">
            <h1 class="text-left text-lg sm:text-2xl md:text-4xl lg:text-[56px] text-title font-semibold leading-tight">
                ${aboutData.aboutMe.title}
            </h1>
            <!-- Nội dung -->
            <p
                class="text-left text-content-500 text-xs sm:text-sm md:text-base lg:text-[16px] font-normal leading-relaxed">
                    ${aboutData.aboutMe.description}
            </p>
            </div>
            <!-- Thẻ -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                ${featuresListHtml}
            </div>
        </div>

    </div>
  </section>
    `
}
