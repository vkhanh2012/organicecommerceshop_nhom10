import { SOCIAL_ICONS } from "./icons.js";

export function renderNewsletterComponent() {
  return `
    <section class="w-full border-b border-gray-100 bg-gray-50">
      <div class="container-custom flex flex-col items-start justify-between gap-6 py-9 lg:flex-row lg:items-center">
        <div class="max-w-[448px]">
          <h2 class="text-2xl font-semibold leading-tight text-gray-900">Subscribe our Newsletter</h2>
          <p class="mt-2 text-sm leading-relaxed text-gray-400">Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna.</p>
        </div>
        <!--  Form & Social Links -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full lg:w-auto">
          <!-- Subscription Form
          <div class="relative flex items-center bg-white border border-gray-200 rounded-full p-1 pl-6 shadow-sm focus-within:border-[#00B207] focus-within:ring-2 focus-within:ring-[#00B207]/10 transition-all duration-300 w-full sm:w-[450px]">
            <input 
              type="email" 
              placeholder="Your email address" 
              class="w-full bg-transparent py-3 text-sm text-gray-800 placeholder-gray-400 outline-none pr-4"
            />
            <button class="bg-[#00B207] hover:bg-[#009e06] text-white text-sm font-semibold py-3 px-8 rounded-full transition-all duration-200 cursor-pointer shrink-0">
              Subscribe
            </button>
          </div> -->
          <!--  Form & Social Links -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full lg:w-auto">
            <!-- Subscription Form -->
            <div class="relative flex items-center bg-white border border-gray-200 rounded-full p-1 pl-6 shadow-sm focus-within:border-[#00B207] focus-within:ring-2 focus-within:ring-[#00B207]/10 transition-all duration-300 w-full sm:w-[450px]">
              <input 
                type="email" 
                placeholder="Your email address" 
                class="w-full bg-transparent py-3 text-sm text-gray-800 placeholder-gray-400 outline-none pr-4"
              />
              <button class="bg-[#00B207] hover:bg-[#009e06] text-white text-sm font-semibold py-3 px-8 rounded-full transition-all duration-200 cursor-pointer shrink-0">
                Subscribe
              </button>
            </div>
            <!-- Social Icons -->
            <div class="flex items-center gap-2.5 self-center">
              <!-- Facebook -->
              <a href="#" class="w-10 h-10 rounded-full bg-[#00B207] hover:bg-[#009e06] text-white flex items-center justify-center transition-all duration-200 shadow-sm" aria-label="Facebook">
                ${SOCIAL_ICONS.facebook}
              </a>
              <!-- Twitter -->
              <a href="#" class="w-10 h-10 text-gray-700 hover:text-[#00B207] hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200" aria-label="Twitter">
                ${SOCIAL_ICONS.twitter}
              </a>
              <!-- Pinterest -->
              <a href="#" class="w-10 h-10 text-gray-700 hover:text-[#00B207] hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200" aria-label="Pinterest">
                ${SOCIAL_ICONS.pinterest}
              </a>
              <!-- Instagram -->
              <a href="#" class="w-10 h-10 text-gray-700 hover:text-[#00B207] hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200" aria-label="Instagram">
                ${SOCIAL_ICONS.instagram}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}
