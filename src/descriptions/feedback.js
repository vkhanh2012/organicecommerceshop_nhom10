import { iconStar } from "../components/icons.js";
import { getImageUrl } from "../utils/assets.js";

export function renderCustomerFeedbackTab(product) {
  const feedbacksHtml = (product.feedbacks || [])
    .map((item) => {
      const feedbackStars = Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < item.rating;
        const starClass = isFilled ? "text-star" : "text-greystar";

        return `
          <span
            class="inline-flex w-4 h-4 items-center justify-center ${starClass}"
          >
            ${iconStar(isFilled)}
          </span>
        `;
      }).join("");

      const avatarHtml = item.avatar
        ? `
          <img 
            src="${getImageUrl(item.avatar)}" 
            alt="${item.name}" 
            class="w-10 h-10 rounded-full object-cover shrink-0" 
          />
        `
        : `
          <div 
            class="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center shrink-0"
          >
            <i class="fa-solid fa-user text-neutral-400 text-sm"></i>
            <i class="fa-solid fa-user text-neutral-400 text-sm"></i>
          </div>
        `;

      return `
        <div class="flex w-full max-w-[760px] flex-col gap-3 border-b border-neutral-200 py-4">

          <!-- User --> 
          <div class="flex items-start gap-3">

            ${avatarHtml}

            <div class="ml-3 w-28 pb-0.5 flex flex-col gap-0.5">
              <div class="text-neutral-900 text-sm font-medium font-['Poppins'] leading-5">
                ${item.name}
              </div>

              <div class="flex items-center">
                ${feedbackStars}
              </div>
            </div>

            <!-- Time --> 
            <div class="shrink-0 text-right text-neutral-400 text-xs sm:text-sm font-normal font-['Poppins'] leading-5">
              ${item.time}
            </div>

          </div>

          <!-- Comment -->
          <div class="w-full text-neutral-500 text-sm font-normal font-['Poppins'] leading-5">
            ${item.comment}
          </div>

        </div>
      `;
    })
    .join("");

  return /*html*/ `
    <div class="w-full flex flex-col items-start">

      <!-- Feedback content -->
      <div class="flex w-full max-w-[760px] flex-col items-start gap-0">

        ${feedbacksHtml}

        <!-- Load More --> 
        <div class="pt-5">
          <button 
            class="
              px-8 py-3.5
              bg-primary/10
              hover:bg-primary/20
              rounded-pill
              inline-flex
              justify-center
              items-center
              gap-3
              text-primary
              text-sm
              font-semibold
              font-['Poppins']
              leading-4
              transition
            "
          >
            Load More
          </button>
        </div>

      </div>

    </div>
  `;
}

