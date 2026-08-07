import { renderBlogCardComponent }
  from "./blogcard.js";

export function renderLatestNewsWrapper() {

  return /* html */ `
    <section class="container-custom py-15">

      <div
        class="mx-auto flex w-full max-w-[1320px]
               flex-col gap-9 px-4"
      >

        <h2
          class="w-full text-center text-[32px]
                 font-semibold text-gray-900"
        >
          Latest News
        </h2>

        <div class="mx-auto w-full max-w-[1320px]">

          ${renderBlogCardComponent()}

        </div>

      </div>

    </section>
  `;
}