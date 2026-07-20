const TAGS_DATA = [
  { id: "tag-healthy", name: "Healthy", active: false },
  { id: "tag-low-fat", name: "Low fat", active: true },
  { id: "tag-vegetarian", name: "Vegetarian", active: false },
  { id: "tag-kid-foods", name: "Kid foods", active: false },
  { id: "tag-vitamins", name: "Vitamins", active: false },
  { id: "tag-bread", name: "Bread", active: false },
  { id: "tag-meat", name: "Meat", active: false },
  { id: "tag-snacks", name: "Snacks", active: false },
  { id: "tag-tiffin", name: "Tiffin", active: false },
  { id: "tag-launch", name: "Launch", active: false },
  { id: "tag-dinner", name: "Dinner", active: false },
  { id: "tag-breakfast", name: "Breackfast", active: false },
  { id: "tag-fruit", name: "Fruit", active: false },
];

export function renderPopularTags() {
  const tagsHtml = TAGS_DATA.map((tag) => {
    return /*html*/ `
         <button id="${tag.id}" class="px-4 py-1.5 text-sm rounded-full transition-colors cursor-pointer ${
           tag.active
             ? " bg-primary text-white font-medium"
             : "bg-gray-50 text-gray-900 hover:bg-gray-200"
         }">
        ${tag.name}
    </button>
    `;
  }).join("");

  return /*html*/ `
   <div class="border-b border-neutral-100 pb-6.5">
        <div class="flex items-center justify-between cursor-pointer mb-5">
            <h3 class="text-xl font-medium text-neutral-900">Popular Tag</h3>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-neutral-900">
                <path d="M2.91634 9.04166L6.99967 4.95833L11.083 9.04166" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="flex flex-wrap gap-2">
            ${tagsHtml}
        </div>
    </div>
  `;
}
