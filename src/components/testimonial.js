import { renderTestimonialCardComponent } from './testimonialcard.js';
import { renderArrowButtonComponent } from './arrowbutton.js'; 

// export function renderTestimonialComponent() {
// return /*html*/`
//     <div class="flex flex-col gap-9 w-full max-w-[1920px] mx-auto h-[489px] p-[60px] bg-gray-100">
//         <div class="flex flex-row w-full justify-between items-center"> 
//             <span class="text-3xl font-bold text-gray-900">Client Testimonials
//             </span>
//             <div class="flex items-center gap-3">
//                     <button class="w-[45px] h-[45px] flex items-center justify-center bg-white text-black rounded-full shadow-sm cursor-pointer hover:bg-gray-200"> 
//                         <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M0.75 6.7749H15.75" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                             <path d="M6.80005 0.75L0.750049 6.774L6.80005 12.799" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                         </svg>
//                     </button>
//                     <button class="w-[45px] h-[45px] flex items-center justify-center bg-primary text-white rounded-full shadow-sm cursor-pointer hover:bg-primary-dark">
//                         <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M15.75 6.7749H0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                             <path d="M9.69995 0.75L15.75 6.774L9.69995 12.799" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                         </svg>
//                     </button>
//             </div>
//         </div> 
//         <div class="grid grid-cols-3 w-full h-auto gap-6">
//             ${renderTestimonialCardComponent()}
//             ${renderTestimonialCardComponent()}
//             ${renderTestimonialCardComponent()}
//         </div>
//     </div>
// `
// }

export function renderTestimonialComponent(){
    return /*html*/`
    <!-- Khung ngoài của testimonial -->
        <div class="h-auto bg-gray-100 py-15 gap-9 mx-auto px-15 ">
            <!-- Tiêu đề và nút -->
            <div class="flex flex-row text-[32px] font-semibold text-gray-900 justify-between pb-8">
                <span class="text-[32px] font-semibold text-gray-900">Client Testimonials</span>
                 <!-- Nút back và nút next -->
                <div class="flex flex-row gap-3">
                    <button class="flex size-[45px] rounded-full bg-white text-black hover:bg-gray-200 justify-center items-center">
                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 6.7749H15.75" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.80005 0.75L0.750049 6.774L6.80005 12.799" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <button class="flex size-[45px] rounded-full bg-primary text-black hover:bg-primary-dark justify-center items-center">
                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.75 6.7749H0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.69995 0.75L15.75 6.774L9.69995 12.799" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </button>
                    <!-- Xong -->
                </div>  
            </div>
            <!-- Testimonial cards -->
            <div class="grid grid-cols-3 w-full w-max[1320px] gap-6">
                ${renderTestimonialCardComponent()}
                ${renderTestimonialCardComponent()}
                ${renderTestimonialCardComponent()}
            </div>
        </div>
    `
}




        


