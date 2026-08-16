import { SOCIAL_ICONS } from "./icons.js";

export function renderNewsletterComponent() {
  return `
    <section class="w-full border-b border-gray-100 bg-gray-50">
      <div class="container-custom flex flex-col items-start justify-between gap-6 py-9 lg:flex-row lg:items-center">
        <div class="max-w-[448px]">
          <h2 class="text-2xl font-semibold leading-tight text-gray-900">Subscribe our Newsletter</h2>
          <p class="mt-2 text-sm leading-relaxed text-gray-400">Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna.</p>
        </div>
        <div class="flex w-full flex-col items-stretch gap-6 sm:flex-row sm:items-center lg:w-auto">
          <form class="relative flex w-full items-center rounded-full border border-gray-200 bg-white p-1 pl-6 shadow-sm sm:w-[450px]">
            <input type="email" placeholder="Your email address" class="w-full bg-transparent py-3 pr-4 text-sm outline-none">
            <button type="button" class="shrink-0 cursor-pointer rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark">Subscribe</button>
          </form>
          <div class="flex items-center justify-center gap-2.5">
            <a href="#" class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white" aria-label="Facebook">${SOCIAL_ICONS.facebook}</a>
            <a href="#" class="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-primary hover:text-white" aria-label="Twitter">${SOCIAL_ICONS.twitter}</a>
            <a href="#" class="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-primary hover:text-white" aria-label="Pinterest">${SOCIAL_ICONS.pinterest}</a>
            <a href="#" class="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-primary hover:text-white" aria-label="Instagram">${SOCIAL_ICONS.instagram}</a>
          </div>
        </div>
      </div>
    </section>`;
}
