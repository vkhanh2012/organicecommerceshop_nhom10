import { renderTestimonialCardComponent } from './testimonialcard.js';


export function renderTestimonialComponent(){
    return /*html*/`
    <!-- Khung ngoài của testimonial -->
        <div class="w-full h-auto bg-gray-100 py-8 sm:py-10 md:py-12 lg:py-16 flex flex-col gap-5 sm:gap-6 md:gap-8 lg:gap-9 mx-auto">
            <!-- Tiêu đề và nút -->
              <div class="flex flex-col sm:flex-row w-full max-w-[1320px] px-4 sm:px-6 lg:px-8 text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-gray-900 justify-between pb-6 sm:pb-7 md:pb-8 mx-auto">
                <h1 class="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-gray-900">Client Testimonials</h1>
                 <!-- Nút back và nút next -->
                <div class="flex flex-row gap-2 sm:gap-3">
                    <button class="flex size-[38px] sm:size-[42px] md:size-[45px] rounded-full bg-white text-black hover:bg-gray-200 justify-center items-center">
                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 6.7749H15.75" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.80005 0.75L0.750049 6.774L6.80005 12.799" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <button class="flex size-[38px] sm:size-[42px] md:size-[45px] rounded-full bg-primary text-black hover:bg-primary-dark justify-center items-center">
                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.75 6.7749H0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.69995 0.75L15.75 6.774L9.69995 12.799" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </button>
                    <!-- Xong -->
                </div>  
            </div>
            <!-- Testimonial cards -->
            <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 w-full max-w-[1320px] px-4 sm:px-6 lg:px-8 gap-4 sm:gap-5 md:gap-6 mx-auto">
                ${renderTestimonialCardComponent()}
                ${renderTestimonialCardComponent()}
                ${renderTestimonialCardComponent()}
            </div>
        </div>
    `
}