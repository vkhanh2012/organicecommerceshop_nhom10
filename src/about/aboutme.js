import aboutData from "../data/about.json"
import { renderFeatureCard } from "../components/featurecard.js"

export function renderAboutMeSection() {
  const featuresListHtml = aboutData.features
    .map((item) => renderFeatureCard(item))
    .join("");

  return `
    <section
      class="w-full bg-white"
      aria-labelledby="about-features-title"
    >
      <div
        class="grid grid-cols-1
               md:grid-cols-2
               lg:min-h-[685px]"
      >

        <!-- IMAGE -->
        <div class="w-full overflow-hidden md:min-h-[520px] lg:min-h-[685px]">
          <img
            src="${aboutData.aboutMe.image.src}"
            alt="${aboutData.aboutMe.image.alt}"
            class="block h-[320px] w-full object-cover object-center
                   md:h-full md:min-h-[520px]
                   lg:min-h-[685px] lg:object-left"
          >
        </div>

        <!-- CONTENT -->
        <div
          class="flex flex-col justify-center
                 px-5 py-10
                 md:px-8 md:py-12
                 lg:py-[70px]
                 lg:pl-4
                 lg:pr-[calc((100vw-1320px)/2)]"
        >
          <h2
            id="about-features-title"
            class="max-w-[570px]
                   text-[32px] font-semibold
                   leading-[38px]
                   text-title
                   md:text-[40px] md:leading-[48px]
                   lg:text-[56px] lg:leading-[67px]"
          >
            ${aboutData.aboutMe.title}
          </h2>

          <p
            class="mt-5 max-w-[570px]
                   text-[14px] leading-[21px]
                   text-content-500
                   md:text-[16px] md:leading-[24px]"
          >
            ${aboutData.aboutMe.description}
          </p>

          <div
            class="mt-8 grid grid-cols-1
                   gap-x-8 gap-y-6
                   lg:grid-cols-2"
          >
            ${featuresListHtml}
          </div>
        </div>

      </div>
    </section>
  `;
}
