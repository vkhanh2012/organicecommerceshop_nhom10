import aboutData from "../data/about.json"

export function renderAboutUsSection() {
  return /*html*/ `
    <section
  class="w-full border-b border-neutral-100 bg-white py-10 md:py-14 lg:py-[80px]" aria-labelledby="about-trusted-title">
    <div class="container-custom">
      <div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:w-[1364px] lg:grid-cols-[600px_716px] lg:items-start lg:gap-12">
        <!-- Cột 1: tiêu đề và nội dung -->
        <!-- tiêu đề -->
        <div class="w-full text-left space-y-2 md:space-y-4 lg:space-y-6 lg:pt-[90px]">
        <h2 id="about-trusted-title" class="text-[32px] sm:text-[40px] lg:text-[56px] text-neutral-900 font-semibold leading-[1.3]">
          ${aboutData.aboutUs.title}
        </h2>
          <p class="text-neutral-600 text-sm font-normal leading-relaxed md:text-base lg:max-w-[590px] lg:text-[18px] lg:leading-[27px]">
            ${aboutData.aboutUs.description}
          </p>
        </div>
        <!-- Cột 2: hình ảnh -->
        <div class="w-full">
          <img src="${aboutData.aboutUs.image.src}" alt="${aboutData.aboutUs.image.alt}" class="block aspect-[716/492] w-full rounded-lg object-cover">
        </div>
      </div>
    </div>
  </section>
    `
}
