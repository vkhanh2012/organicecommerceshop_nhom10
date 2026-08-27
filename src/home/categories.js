import categoriesData from "../data/categories.json";
import { attachImageUrls } from "../utils/assets.js";
import { sectionTitle } from "./sectiontitle.js";

export async function getCategories() {
  return attachImageUrls(categoriesData);
}

export function renderCategories(categories = []) {
  return `
    <section class="container-custom pt-14 pb-16">
      ${sectionTitle("Popular Categories")}

      <div
        class="grid grid-cols-2 gap-3
               sm:grid-cols-3
               md:grid-cols-4
               lg:grid-cols-6 lg:gap-6"
      >
        ${categories.map(category => `
          <a
            href="#"
            class="group overflow-hidden rounded-md
                   border border-neutral-200 bg-white
                   text-center
                   transition-all duration-300
                   hover:border-primary
                   hover:shadow-[0_0_12px_rgba(0,178,7,.20)]
                   lg:h-[213px]"
          >
            <div
              class="aspect-[1.3/1] overflow-hidden p-3
                     lg:h-[156px] lg:aspect-auto lg:p-[5px]"
            >
              <img
                src="${category.image}"
                alt="${category.name}"
                width="190"
                height="146"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-contain
                       transition duration-300
                       group-hover:scale-105"
              >
            </div>

            <p
              class="px-2 py-3
                     text-base font-medium leading-6
                     text-neutral-900
                     group-hover:text-primary
                     lg:flex lg:h-[56px]
                     lg:translate-y-[-7px]
                     lg:items-center lg:justify-center
                     lg:py-0
                     lg:text-[18px] lg:leading-[27px]"
            >
              ${category.name}
            </p>
          </a>
        `).join("")}
      </div>
    </section>
  `;
}
