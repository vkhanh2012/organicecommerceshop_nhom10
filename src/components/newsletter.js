// src/components/newsletter.js

import { SOCIAL_ICONS } from "./icons.js";

export function renderNewsletterComponent() {
  return `
    <section
      class="w-full border-b border-neutral-100 bg-neutral-50"
    >
      <div
        class="container-custom flex flex-col gap-8 py-10 sm:py-12 lg:min-h-[164px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-[0px]"
      >

        <!-- TEXT -->
        <div
          class="w-full lg:max-w-[448px]">
          <h2
            class="font-poppins text-[20px] font-semibold leading-[30px] text-neutral-900 sm:text-[24px] sm:leading-[35px]"
          >
            Subcribe our Newsletter
          </h2>

          <p
            class="mt-1 max-w-[448px] text-[14px] font-normal leading-[21px] text-neutral-400"
          >
            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
            Phasellus imperdiet elit eu magna.
          </p>
        </div>


        <!-- FORM + SOCIAL -->
        <div
          class="flex w-full flex-col gap-6 sm:flex-row sm:items-center lg:w-auto lg:gap-10"
        >

          <!-- SUBSCRIPTION FORM -->
          <div
            class="relative flex h-[52px] w-full items-center rounded-full border border-neutral-200 bg-white pl-6 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 sm:w-[480px] lg:w-[535px]"
          >
            <input
              type="email"
              placeholder="Your email address"
              class="min-w-0 flex-1 bg-transparent pr-8 text-[16px] leading-[21px] text-neutral-700 outline-none placeholder:text-neutral-400"
            >

            <button
              type="button"
              class="flex h-[52px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary px-10 text-[16px] leading-[21px] text-white transition-colors hover:bg-primary-dark"
              >
              Subscribe
            </button>
          </div>


          <!-- SOCIAL ICONS -->
          <div
            class="flex shrink-0 items-center gap-2"
          >

            <a
              href="#"
              aria-label="Facebook"
              class="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary"
            >
              ${SOCIAL_ICONS.facebook}
            </a>

            <a
              href="#"
              aria-label="Twitter"
              class="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary"
            >
              ${SOCIAL_ICONS.twitter}
            </a>

            <a
              href="#"
              aria-label="Pinterest"
              class="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary"
            >
              ${SOCIAL_ICONS.pinterest}
            </a>

            <a
              href="#"
              aria-label="Instagram"
              class="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary"
            >
              ${SOCIAL_ICONS.instagram}
            </a>

          </div>


        </div>

      </div>
    </section>
  `;
    </section>
  `;
}