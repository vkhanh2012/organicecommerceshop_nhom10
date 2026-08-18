import { renderTestimonialCardComponent } from "./testimonialcard.js"
import { backArrow, nextArrow } from "../components/icons.js"

export function renderTestimonialComponent() {
  return /*html*/ `
    <!-- Khung ngoài của testimonial -->
        <div class="w-full h-auto bg-neutral-50 py-8 sm:py-10 md:py-12 lg:py-16 flex flex-col gap-5 sm:gap-6 md:gap-8 lg:gap-9 mx-auto">
            <!-- Tiêu đề và nút -->
              <section class="flex flex-col sm:flex-row w-full max-w-[1320px] px-4 sm:px-6 lg:px-8 text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-neutral-900 justify-between pb-6 sm:pb-7 md:pb-8 mx-auto" aria-labelledby="testimonial-title">
                <h2 class="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-neutral-900">Client Testimonials</h2>
                 <!-- Nút back và nút next -->
                <div class="flex flex-row gap-2 sm:gap-3">
                    <button class="flex size-[38px] sm:size-[42px] md:size-[45px] rounded-full bg-white text-black hover:bg-neutral-200 justify-center items-center cursor-pointer">
                        ${backArrow}
                    </button>
                    <button class="flex size-[38px] sm:size-[42px] md:size-[45px] rounded-full bg-primary text-black hover:bg-primary-dark justify-center items-center cursor-pointer">
                       ${nextArrow}
                    </button>
                    <!-- Xong -->
                </div>  
            </section>
            <!-- Testimonial cards -->
            <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 w-full max-w-[1320px] px-4 sm:px-6 lg:px-8 gap-4 sm:gap-5 md:gap-6 mx-auto">
                ${renderTestimonialCardComponent()}
            </div>
        </div>
    `
}
