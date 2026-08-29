export function renderFeatureCard(feature) {
    return /*html*/ `
    <div class="w-full flex justify-start items-center">
        <div class="flex justify-center rounded-lg bg-white gap-1 md:gap-2 lg:gap-4 items-center py-0.5 md:py-1 lg:items-start lg:py-2">
            <!-- Icon bên trái -->
            <div class="shrink-0 w-12 md:w-14 md:h-14 lg:h-16 lg:w-16">
                <img src="${getImageUrl(feature.icon)}" alt="" width="64" height="64" loading="lazy" decoding="async" class="w-6 h-6 md:w-8 md:h-8 lg:h-16 lg:w-16">
            </div>
            <!-- Nội dung bên phải (tiêu đề và nội dung) -->
            <div class="md:gap-2 space-y-1">
                <h3 class="text-title-900 lg:text-[18px] font-medium leading-tight">
                ${feature.title}
                </h3>
                <p class="text-content-500 text-sm lg:text-[14px] text-left font-normal leading-relaxed">
                ${feature.description}
                </p>
            </div>
        </div>
  </div>

    `
}
import { getImageUrl } from "../utils/assets.js"
