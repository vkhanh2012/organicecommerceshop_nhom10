import { renderBlogCardComponent } from "./blogcard"

export function renderLatestNews(){
    return `
        <div class="w-[1320px] h-[564px] ">
            <div class=" flex bg-white text-gray-900 font-semibold text-[32px] h-[38px] w-auto justify-center mb-6">Latest News</div>
                <div class="flex items-center grid grid-cols-3 w-auto gap-6">
                    ${renderBlogCardComponent()}
                    ${renderBlogCardComponent()}
                    ${renderBlogCardComponent()}
                </div>
        </div>



    
    `

}