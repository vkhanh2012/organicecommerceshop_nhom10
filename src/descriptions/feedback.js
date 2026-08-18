import { iconStar } from "../components/icons.js";

export function renderCustomerFeedbackTab(product) {

  const feedbacksHtml = (product.feedbacks || [])
    .map((item) => {

      const feedbackStars = Array.from({ length: 5 }, (_, i) => {
  // Nếu vị trí i nhỏ hơn số rating của khách thì là sao vàng, ngược lại là sao xám/trống
  const isFilled = i < item.rating;
  const starColor = isFilled ? "#FFB800" : "#E4E7E9"; 
  
  return `<span style="color: ${starColor}; display: inline-flex;">${iconStar(isFilled)}</span>`;
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
          <div class="w-10 h-10 rounded-full bg-neutral-200 text-neutral-400 flex items-center justify-center shrink-0">
            <i class="fa-solid fa-user text-sm"></i>
          </div>
        `;

      return `
        <div class="py-1 border-b border-neutral-100 last:border-b-0 space-y-2">

          <div class="flex items-center justify-between">

            <div class="flex items-center gap-3">
              ${avatarHtml}

              <div>
                <h4 class="text-sm font-semibold text-neutral-900">
                  ${item.name}
                </h4>

                <div class="flex items-center gap-1 mt-1">
                  ${feedbackStars}
                </div>
              </div>
            </div>

            <span class="text-xs text-neutral-400">
              ${item.time}
            </span>

          </div>

          <p class="text-sm text-neutral-500 leading-relaxed">
            ${item.comment}
          </p>

        </div>
      `;
    })
    .join("");

  return /*html*/ `
    <div class="container-custom">

      <div
        id="customer-feedback"
        class="max-w-4xl pt-8 mt-8 border-t border-neutral-100 space-y-6"
      >

        <h3 class="text-xl font-semibold text-neutral-900">
          Customer Feedback
        </h3>

        <div class="divide-y divide-neutral-100">
          ${feedbacksHtml}
        </div>

        <div class="pt-2">
          <button
            class="bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-sm py-2.5 px-8 rounded-full transition-all duration-200 cursor-pointer"
          >
            Load More
          </button>
        </div>

      </div>

    </div>
  `;
}