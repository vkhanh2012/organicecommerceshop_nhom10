// src/components/instagram.js
// Section "Follow us on Instagram"
// Figma: 1320x270px, 6 ảnh 1 hàng ngang.
// Mobile-first:
// 2 cột trên mobile → 3 cột (sm) → 6 cột (lg).

import { iconInstagram }
  from "../components/icons.js";

import instagramData
  from "../data/instagram.json";

import { getImageUrl }
  from "../utils/assets.js";

const CLASS = {

  section:
    "w-full bg-white py-10 md:py-14",

  inner:
    "container-custom",

  title:
    "font-poppins font-semibold text-xl md:text-2xl " +
    "text-neutral-900 text-center mb-6 md:mb-8",

  grid:
    "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 " +
    "gap-2 md:gap-4",

  item:
    "relative block aspect-square overflow-hidden " +
    "rounded-md group",

  img:
    "w-full h-full object-cover transition-transform " +
    "duration-300 md:group-hover:scale-105",

  overlay:
    "absolute inset-0 flex items-center justify-center " +
    "bg-black/0 text-white opacity-0 transition-all " +
    "md:group-hover:bg-black/30 " +
    "md:group-hover:opacity-100",

};

export async function getInstagramImages() {
  return instagramData.map(getImageUrl);
}

export function renderInstagramComponent(
  {
    images = [],
    handle = "@ecobazar",
  } = {}
) {

  const itemsHtml = images
    .map(
      (src, i) => `
        <a
          href="#"
          class="${CLASS.item}"
          aria-label="Xem ảnh Instagram ${i + 1}"
        >

          <img
            src="${src}"
            alt="Instagram ${i + 1}"
            class="${CLASS.img}"
            loading="lazy"
          />

          <span class="${CLASS.overlay}">
            ${iconInstagram}
          </span>

        </a>
      `
    )
    .join("");

  return `
    <section class="${CLASS.section}">

      <div class="${CLASS.inner}">

        <h2 class="${CLASS.title}">
          Follow us on Instagram
        </h2>

        <p class="mb-6 text-center text-sm text-neutral-500">
          ${handle}
        </p>

        <div class="${CLASS.grid}">
          ${itemsHtml}
        </div>

      </div>

    </section>
  `;
}