import aboutData from "../data/about.json"
import { tickIcon } from "./icons.js"
export function renderDeliveredFeatureComponent(item) {
  return /*html*/ `
    <div class="flex flex-row gap-2 md:gap-4 items-center">
        <!-- icon -->
         <div>
            ${tickIcon}
        </div>
            <p class="text-content-500 text-xs md:text-xl lg:text-[14px]">
             ${item.text}
            </p>
        </div>
    `
}
