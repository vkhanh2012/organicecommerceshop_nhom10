import { renderBlogCardComponent } from "./blogcard"

export function renderLatestNewsWrapper() {
  return /*html*/ `
        <div class="container-custom flex flex-col mx-auto w-full py-15 gap-9 px-4 justify-between">
            <span class="bg-white text-gray-900 font-semibold w-full max-w-[1320px] mx-auto text-[32px] h-[38px] w-full text-center">Latest News</span>
            <div class="w-full max-w-[1320px] mx-auto">
                ${renderBlogCardComponent()}
            </div>
        </div>
    `
}