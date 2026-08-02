import aboutData from '../data/about.json';

export function renderAboutUsSection() {
  return /*html*/ `
    <section class="w-full mx-auto px-4 py-6 md:py-14 bg-white">
    <div class="container-custom">
      <div class="flex flex-col md:flex-row gap-8 md:gap-8 lg:gap-12 items-center">
        <!-- Cột 1: tiêu đề và nội dung -->
        <!-- tiêu đề -->
        <div class="w-full md:w-1/2 text-left space-y-2 md:space-y-4 lg:space-y-6">
          <h1 class="text-lg sm:text-2xl md:text-4xl lg:text-[56px] text-title font-semibold leading-tight">
            ${aboutData.aboutUs.title}
          </h1>
          <p class="text-content-600 text-xs sm:text-sm md:text-base lg:text-[18px] font-normal leading-relaxed">
            ${aboutData.aboutUs.description}
          </p>
        </div>
        <!-- Cột 2: hình ảnh -->
        <div class="w-full md:w-1/2">
          <img src="${aboutData.aboutUs.image.src}" alt="${aboutData.aboutUs.image.alt}" class="w-full h-auto rounded-lg object-cover">
        </div>
      </div>
    </div>
  </section>
    `
}
