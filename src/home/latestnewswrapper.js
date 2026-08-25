import { renderBlogCardComponent } from "./blogcard.js";

export function renderLatestNewsWrapper() {
  return /*html*/ `
    <div
      class="container-custom mx-auto flex w-full flex-col pt-0 pb-16 gap-6 lg:-mt-[12px]"
    >
      <h2
        class="w-full text-center text-[32px] font-semibold leading-[50px] text-neutral-900"
      >
        Latest News
      </h2>

      <div class="mx-auto w-full max-w-[1320px]">
        ${renderBlogCardComponent()}
      </div>
    </div>
  `;
}