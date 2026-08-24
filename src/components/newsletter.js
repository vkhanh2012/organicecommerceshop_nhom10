// src/components/newsletter.js

import { SOCIAL_ICONS } from "./icons.js";

export function renderNewsletterComponent() {
  return /*html*/ `
    <section class="w-full border-b border-gray-100 bg-neutral-100 font-['Poppins']">
      <div class="max-w-[1320px] mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        <!-- CỘT TRÁI: TIÊU ĐỀ & MÔ TẢ FIGMA -->
        <div class="max-w-[448px] flex flex-col gap-1">
          <h2 class="text-2xl font-semibold leading-9 text-zinc-900">
            Subscribe our Newsletter
          </h2>
          <p class="text-sm font-normal leading-5 text-neutral-400">
            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna.
          </p>
        </div>

        <!-- CỘT PHẢI: FORM ĐĂNG KÝ EMAIL & NÚT MẠNG XÃ HỘI FIGMA -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full lg:w-auto">
          
          <!-- FORM ĐĂNG KÝ EMAIL -->
          <form id="newsletter-form" class="relative flex items-center bg-white border border-neutral-200 rounded-[46px] p-1 pl-6 shadow-xs focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/10 transition-all duration-300 w-full sm:w-[600px] translate-x-12">
            <input 
              type="email" 
              placeholder="Your email address" 
              class="w-full bg-transparent py-3.5 text-sm md:text-base text-zinc-500 placeholder-zinc-500 outline-none pr-4 font-normal"
              required
            />
            <button 
              type="submit" 
              class="bg-green-600 hover:bg-green-700 text-white text-base font-semibold py-3.5 px-10 rounded-[43px] transition-all duration-200 cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </form>

          <!-- BIỂU TƯỢNG MẠNG XÃ HỘI FIGMA -->
          <div class="flex items-center gap-2 self-center translate-x-16">
            <!-- Facebook (Active Green Circle) -->
            <a href="#" class="w-10 h-10 rounded-full text-neutral-600 hover:bg-green-500 flex items-center justify-center transition-colors" aria-label="Facebook">
                 ${SOCIAL_ICONS.facebook}
             </a>
             <a href="#" class="w-10 h-10 rounded-full text-neutral-600 hover:bg-green-500 flex items-center justify-center transition-colors" aria-label="Twitter">
                  ${SOCIAL_ICONS.twitter}
              </a>
              <a href="#" class="w-10 h-10 rounded-full text-neutral-600 hover:bg-green-500 flex items-center justify-center transition-colors" aria-label="Pinterest">
                   ${SOCIAL_ICONS.pinterest}
             </a>
            <a href="#" class="w-10 h-10 rounded-full text-neutral-600 hover:bg-green-100 flex items-center justify-center transition-colors" aria-label="Instagram">
                ${SOCIAL_ICONS.instagram}
           </a>
          </div>

        </div>

      </div>
    </section>
  `;
}