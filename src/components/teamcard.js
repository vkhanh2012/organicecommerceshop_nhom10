import aboutData from "../data/about.json"
import { iconInstagram, SOCIAL_ICONS } from "./icons.js"
export function renderTeamCard(item){
    return /*html*/`
    <!-- Teawm card 1 -->
       <div class="group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <!-- Hình ảnh -->
            <div class="relative w-full overflow-hidden rounded-t-lg">
                <img src="${getImageUrl(item.image.src)}" alt="${item.image.alt}" width="312" height="280" loading="lazy" decoding="async" class="block aspect-[312/280] w-full object-cover">
                <div class="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 text-white opacity-0 transition-all duration-300 md:group-hover:bg-black/30 md:group-hover:opacity-100">
                 <a 
                    href="${item.socials.facebook}" class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary text-white transition-colors gap-1">
                        ${SOCIAL_ICONS.facebook}
                </a>
                 <a 
                    href="${item.socials.twitter}" class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary text-white transition-colors gap-1">
                        ${SOCIAL_ICONS.twitter}
                </a>

                 <a 
                    href="${item.socials.pinterest}" class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary text-white transition-colors gap-1">
                        ${SOCIAL_ICONS.pinterest}
                </a>

                 <a 
                    href="${item.socials.instagram}" class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary text-white transition-colors gap-1">
                        ${SOCIAL_ICONS.instagram}
                </a>

            </div>
            </div>
                <!-- Mô tả -->
            <div class="gap-1 p-5">
                <h2 class="text-title-900 text-[18px] font-medium">
                    ${item.name}
                </h2>
                <p class="text-content-500 text-[14px] font-normal">
                    ${item.role}
                </p>
            </div>
            
           
       </div>
    `
}
import { getImageUrl } from "../utils/assets.js"
