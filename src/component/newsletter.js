export function renderNewsletterComponent() {
  return /*html*/`
    <div class="bg-gray-100 min-h-screen flex flex-col justify-end font-sans">
  <!-- Main Container to showcase the footer similar to the image -->
  <div class="w-full bg-white shadow-lg">
    
    <!-- NEWSLETTER SECTION -->
    <div class="bg-gray-50 border-b border-gray-100">
      <div class="max-w-[1920px] mx-auto px-4 md:px-8 py-9 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        <!--  Heading & Paragraph -->
        <div class="max-w-[448px]">
          <h2 class="text-2xl font-semibold text-gray-900 leading-tight tracking-tight">Subcribe our Newsletter</h2>
          <p class="text-sm text-gray-400 mt-2 leading-relaxed font-light">
            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna.
          </p>
        </div>
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
            <!-- Facebook (Green background, white icon) -->
            <a href="#" class="w-10 h-10 rounded-full bg-[#00B207] hover:bg-[#009e06] text-white flex items-center justify-center transition-all duration-200 shadow-sm" aria-label="Facebook">
              <i class="fa-brands fa-facebook-f text-sm"></i>
            </a>
            <!-- Twitter -->
            <a href="#" class="w-10 h-10 text-gray-700 hover:text-[#00B207] hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200" aria-label="Twitter">
              <i class="fa-brands fa-twitter text-sm"></i>
            </a>
            <!-- Pinterest -->
            <a href="#" class="w-10 h-10 text-gray-700 hover:text-[#00B207] hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200" aria-label="Pinterest">
              <i class="fa-brands fa-pinterest-p text-sm"></i>
            </a>
            <!-- Instagram -->
            <a href="#" class="w-10 h-10 text-gray-700 hover:text-[#00B207] hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200" aria-label="Instagram">
              <i class="fa-brands fa-instagram text-sm"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      `;
}