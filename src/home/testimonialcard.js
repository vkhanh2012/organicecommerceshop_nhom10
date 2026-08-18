import { iconStar, quoteIcon } from "../components/icons.js"
export const TESTIMONIALS_DATA = [
  {
    id: "testimonial-1",
    content:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
    author: {
      name: "Jennie Kim",
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
      name: "Ruka Kawai",
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
      name: "Yujin An",
      role: "Customer",
      avatar: "./src/assets/images/client3.jpg",
    },
    rating: 5,
  },
]

//Hàm render stars
function renderMiniStars(rating = 5) {
  return Array.from({ length: 5 })
    .map(
     (_, i) =>
        /*html*/ `<span class="${i < rating ? "text-star" : "text-neutral-200"} inline-block [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
          ${iconStar(i < rating)}
        </span>`,
    )
    .join("")
}

export function renderTestimonialCardComponent(
  testimonialData = TESTIMONIALS_DATA,
) {
  const testimonialHtml = testimonialData
    .map(
      (items) => /*html*/ `
    <div class="flex flex-col justify-between bg-white w-full h-full min-h-[220px] p-4 sm:p-5 md:p-6 shadow-md border border-neutral-100 rounded-lg">
        <!--Dấu nháy kép (icon)-->
        <div>
            <div class="w-[24px] h-[20px] sm:w-[28px] sm:h-[23px] md:w-[32px] md:h-[26px] flex items-center justify-center">
                ${quoteIcon}
            </div>
             <!--Phần bình luận-->
             <p class="font-['Poppins'] text-neutral-700 text-sm md:text-base mt-2 sm:mt-3 md:mt-4 mb-4 sm:mb-5 md:mb-6 text-left">
                ${items.content}
             </p>
             <div class="flex flex-row items-center justify-between w-full pt-2 mt:auto">
              <!--Phần thông tin người bình luận-->
              <div class="flex flex-row items-center gap-2 sm:gap-2 md:gap-3">
                <img src="${items.author.avatar}" alt="${items.author.name}" class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"/>
                  <div class="flex flex-col justify-center items-start w-auto">
                      <p class="font-bold text-neutral-900">${items.author.name}</p>
                      <p class="text-neutral-400 text-xs md:text-sm">${items.author.role}</p>
                  </div>
            </div>
            <!-- Sao của bình luận -->
                 <div class="flex items-center gap-0.5 shrink-0">
                  ${renderMiniStars(items.rating)}
                </div>
              </div>
        </div>
    </div>
    `,
    )
    .join("")
  return testimonialHtml
}
