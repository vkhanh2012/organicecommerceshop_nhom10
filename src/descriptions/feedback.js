import { iconStar } from "../components/icons.js";

export function renderCustomerFeedbackTab(product) {
  const feedbacksHtml = (product.feedbacks || [])
    .map((item) => {
      const feedbackStars = Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < item.rating;
        const starColor = isFilled
          ? "var(--color-star)"
          : "var(--color-greystar)";

        return `
          <span 
            class="inline-flex w-4 h-4 items-center justify-center"
            style="color: ${starColor};"
          >
            ${iconStar(isFilled)}
          </span>
        `;
      }).join("");

      const avatarHtml = item.avatar
        ? `
          <img 
            src="${item.avatar}" 
            alt="${item.name}" 
            class="w-10 h-10 rounded-full object-cover shrink-0" 
          />
        `
        : `
          <div 
            class="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center shrink-0"
          >
            <i class="fa-solid fa-user text-neutral-400 text-sm"></i>
          </div>
        `;

      return `
        <div class="w-full py-4 border-b border-neutral-200 flex flex-col gap-3">

          <!-- User --> 
          <div class="flex items-start gap-3">

            ${avatarHtml}

            <div class="min-w-0 flex-1 pb-0.5 flex flex-col gap-0.5">
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
          <div class="w-full text-neutral-500 text-sm font-normal font-['Poppins'] leading-5 break-words">
            ${item.comment}
          </div>

        </div>
      `;
    })
    .join("");

  return /*html*/ `
    <div class="w-full flex flex-col items-start">

      <!-- Feedback content --> 
      <div class="w-full max-w-[760px] flex flex-col items-start gap-0">

        ${feedbacksHtml}

        <!-- Load More --> 
        <div class="pt-5">
          <button 
            class="
              px-8 py-3.5
              bg-green-500/10
              hover:bg-green-500/20
              rounded-[43px]
              inline-flex
              justify-center
              items-center
              gap-3
              text-green-600
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
