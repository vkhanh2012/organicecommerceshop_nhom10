import { renderTestimonialCardComponent }
  from "./testimonialcard.js";

export function renderTestimonialComponent() {

  return /* html */ `
    <section
      class="w-full bg-neutral-50 py-10 sm:py-12 md:py-14"
    >

      <div
        class="mx-auto flex w-full max-w-[1320px]
               flex-col gap-6 px-4 sm:px-6 lg:px-8"
      >

        <!-- Header -->
        <div
          class="flex flex-col gap-4
                 sm:flex-row sm:items-center sm:justify-between"
        >

          <div>

            <p
              class="text-sm font-semibold uppercase tracking-[0.2em]
                     text-primary"
            >
              Testimonial
            </p>

            <h2
              class="mt-2 text-3xl font-semibold text-neutral-900
                     sm:text-4xl md:text-[40px]"
            >
              Client Testimonials
            </h2>

          </div>

          <!-- Navigation buttons -->
          <div class="flex items-center gap-3">

            <button
              class="flex size-[38px] items-center justify-center
                     rounded-full border border-primary bg-white
                     text-primary transition-colors
                     hover:bg-primary hover:text-white
                     sm:size-[42px] md:size-[45px]"
              type="button"
              aria-label="Previous testimonials"
            >

              <svg
                width="17"
                height="14"
                viewBox="0 0 17 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >

                <path
                  d="M15.75 6.7749H0.75"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <path
                  d="M6.80005 0.75L0.750047 6.774L6.80005 12.799"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

              </svg>

            </button>

            <button
              class="flex size-[38px] items-center justify-center
                     rounded-full bg-primary text-white
                     transition-colors hover:bg-primary-dark
                     sm:size-[42px] md:size-[45px]"
              type="button"
              aria-label="Next testimonials"
            >

              <svg
                width="17"
                height="14"
                viewBox="0 0 17 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >

                <path
                  d="M1.25 6.7749H16.25"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <path
                  d="M10.2 0.75L16.25 6.774L10.2 12.799"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

              </svg>

            </button>

          </div>

        </div>

        <!-- Testimonial cards -->
        <div
          class="mx-auto grid w-full max-w-[1320px]
                 grid-cols-1 gap-4
                 sm:grid-cols-2 sm:gap-5
                 lg:grid-cols-3 lg:gap-6"
        >

          ${renderTestimonialCardComponent()}
          ${renderTestimonialCardComponent()}
          ${renderTestimonialCardComponent()}

        </div>

      </div>

    </section>
  `;
}