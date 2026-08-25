import { renderTestimonialCardComponent } from "./testimonialcard.js";
import { backArrow, nextArrow } from "../components/icons.js";

export function renderTestimonialComponent(variant = "default") {
  const isAboutPage = variant === "about";

  return /*html*/ `
    <section
      class="w-full bg-neutral-50 font-poppins
             py-10
             sm:py-12
             ${isAboutPage ? "lg:pt-[78px] lg:pb-[110px]" : "lg:py-[60px]"}"
    >
      <div class="container-custom mx-auto">

        <!-- TITLE + ARROWS -->
        <div
          class="mb-6
                 flex items-center justify-between
                 sm:mb-7
                 ${isAboutPage ? "lg:mb-16" : "lg:mb-8"}"
        >
          <h2
            class="text-[24px] font-semibold
                   leading-[29px]
                   text-gray-900
                   sm:text-[28px] sm:leading-[34px]
                   lg:text-[32px] lg:leading-[38px]"
          >
            ${isAboutPage ? "Client Testimonial" : "Client Testimonials"}
          </h2>

          <!-- ARROWS -->
          <div class="flex shrink-0 items-center gap-3">

            <button
              type="button"
              aria-label="Previous testimonial"
              class="flex h-10 w-10
                     cursor-pointer
                     items-center justify-center
                     rounded-full
                     bg-white
                     text-gray-900
                     transition-colors
                     hover:bg-gray-200
                     sm:h-[42px] sm:w-[42px]
                     lg:h-[45px] lg:w-[45px]"
            >
              ${backArrow}
            </button>

            <button
              type="button"
              aria-label="Next testimonial"
              class="flex h-10 w-10
                     cursor-pointer
                     items-center justify-center
                     rounded-full
                     bg-primary
                     text-white
                     transition-colors
                     hover:bg-primary-dark
                     sm:h-[42px] sm:w-[42px]
                     lg:h-[45px] lg:w-[45px]"
            >
              ${nextArrow}
            </button>

          </div>
        </div>


        <!-- TESTIMONIAL CARDS -->
        <div
          class="grid grid-cols-1
                 gap-4
                 sm:gap-5
                 md:grid-cols-2
                 lg:grid-cols-3
                 lg:gap-6"
        >
          ${renderTestimonialCardComponent()}
        </div>

      </div>
    </section>
  `;
}
