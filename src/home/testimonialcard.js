import { iconStar, quoteIcon } from "../components/icons.js";

export const TESTIMONIALS_DATA = [
  {
    id: "testimonial-1",
    content:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
    author: {
      name: "Robert Fox",
      role: "Customer",
      avatar: "./src/assets/images/client1.jpg",
    },
    rating: 5,
  },
  {
    id: "testimonial-2",
    content:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
    author: {
      name: "Dianne Russell",
      role: "Customer",
      avatar: "./src/assets/images/client2.jpg",
    },
    rating: 5,
  },
  {
    id: "testimonial-3",
    content:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
    author: {
      name: "Eleanor Pena",
      role: "Customer",
      avatar: "./src/assets/images/client3.jpg",
    },
    rating: 5,
  },
];

function renderMiniStars(rating = 5) {
  return Array.from({ length: 5 })
    .map(
      (_, i) => /*html*/ `
        <span
          class="${
            i < rating ? "text-warning" : "text-neutral-200"
          } inline-flex
             [&>svg]:h-[16px]
             [&>svg]:w-[22px]"
        >
          ${iconStar(i < rating)}
        </span>
      `,
    )
    .join("");
}

export function renderTestimonialCardComponent(
  testimonialData = TESTIMONIALS_DATA,
) {
  return testimonialData
    .map(
      (items) => /*html*/ `
        <article
          class="flex w-full flex-col
                 rounded-[8px]
                 border border-neutral-100
                 bg-white
                 p-5
                 shadow-sm
                 sm:p-6
                 lg:h-[250px]
                 lg:p-5"
        >

          <!-- QUOTE -->
          <div
            class="flex h-[32px] w-[32px]
                   shrink-0
                   items-center justify-center"
          >
            ${quoteIcon}
          </div>


          <!-- CONTENT -->
          <p
            class="mt-3
                   text-left
                   font-poppins
                   text-[14px] font-normal
                   leading-[21px]
                   text-neutral-600
                   sm:text-[14px] sm:leading-[21px]
                   lg:text-[14px] lg:leading-[21px]"
          >
            ${items.content}
          </p>


          <!-- AUTHOR + RATING -->
          <div
            class="mt-5
                   flex w-full
                   items-center justify-between
                   lg:mt-auto"
          >

            <!-- AUTHOR -->
            <div
              class="flex min-w-0
                     items-center
                     gap-3"
            >
              <img
                src="${items.author.avatar}"
                alt="${items.author.name}"
                width="60"
                height="60"
                loading="lazy"
                class="h-15 w-15
                       shrink-0
                       rounded-full
                       object-cover"
              >

              <div
                class="min-w-0
                       text-left"
              >
                <p
                  class="truncate
                         text-[16px] font-medium
                         leading-[22px]
                         text-neutral-900"
                >
                  ${items.author.name}
                </p>

                <p
                  class="text-[14px] font-normal
                         leading-[24px]
                         text-neutral-400"
                >
                  ${items.author.role}
                </p>
              </div>
            </div>


            <!-- RATING -->
            <div
              class="ml-3
                     flex shrink-0
                     items-center
                     lg:translate-y-[0px]"
            >
              ${renderMiniStars(items.rating)}
            </div>

          </div>

        </article>
      `,
    )
    .join("");
}
