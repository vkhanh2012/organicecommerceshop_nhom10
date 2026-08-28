import { dropDown } from "../components/icons.js"

const TAGS_DATA = [
  { id: "tag-healthy", name: "Healthy" },
  { id: "tag-low-fat", name: "Low fat" },
  { id: "tag-vegetarian", name: "Vegetarian" },
  { id: "tag-meat", name: "Meat" },
  { id: "tag-kid-foods", name: "Kid foods" },
  { id: "tag-vitamins", name: "Vitamins" },
  { id: "tag-snacks", name: "Snacks" },
  { id: "tag-breakfast", name: "Breackfast" },
  { id: "tag-tiffin", name: "Tiffin" },
  { id: "tag-lunch", name: "Launch" },
  { id: "tag-dinner", name: "Dinner" },
  { id: "tag-bread", name: "Bread" },
  { id: "tag-fruit", name: "Fruit" },
]

export function renderPopularTags(
  selectedTag = "all",
  layout = "sidebar"
) {
  const tagsHtml = TAGS_DATA.map((tag) => {
    const active = selectedTag === tag.name

    return /*html*/ `
      <button
        type="button"
        id="${tag.id}"
        data-tag-value="${tag.name}"
        class="
          px-4 py-1.5
          text-sm
          rounded-full
          transition-colors
          cursor-pointer
          ${
            active
              ? "bg-primary text-white font-medium"
              : "bg-neutral-50 text-neutral-900 hover:bg-primary hover:text-white"
          }
        "
      >
        ${tag.name}
      </button>
    `
  }).join("")

  // Shop 2 - dropdown ngang
  if (layout === "horizontal") {
    return /*html*/ `
      <details class="group relative min-w-0 max-w-full">
        <summary
          class="
            flex min-w-0 w-full cursor-pointer
            list-none items-center justify-between
            gap-4 rounded
            border border-neutral-200
            bg-white
            px-3 py-2
            text-sm text-neutral-600
            sm:min-w-32 sm:w-auto
          "
        >
          <span class="min-w-0 truncate">
            ${selectedTag === "all" ? "Select Tag" : selectedTag}
          </span>

          <span class="transition-transform group-open:rotate-180">
            ${dropDown}
          </span>
        </summary>

        <div
          class="
            absolute left-auto right-0 top-full z-40
            mt-2 w-[min(20rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)]
            sm:left-0 sm:right-auto
            rounded-lg
            border border-neutral-100
            bg-white p-4 shadow-lg
          "
        >
          <div class="flex flex-wrap gap-2">
            ${tagsHtml}
          </div>
        </div>
      </details>
    `
  }

  // Shop 1
  return /*html*/ `
    <div>
      <div class="flex items-center justify-between cursor-pointer pb-[26px]">
        <h3 class="section-heading">Popular Tag</h3>

        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          class="text-neutral-900"
        >
          <path
            d="M2.91634 9.04166L6.99967 4.95833L11.083 9.04166"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div class="flex flex-wrap gap-2">
        ${tagsHtml}
      </div>
    </div>
  `
}
