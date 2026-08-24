// src/components/instagram.js
// Section "Follow us on Instagram" — Figma: 1320x270px, 6 ảnh 1 hàng ngang.
// Mobile-first: 2 cột trên mobile -> 3 cột (sm) -> 6 cột (lg), khớp layout gốc.

import { iconInstagram } from "../components/icons.js";
import instagramData from "../data/instagram.json";
import { getImageUrl } from "../utils/assets.js";
 
const CLASS = {
  section: "w-full bg-white pt-8 pb-10 sm:pt-9 sm:pb-12 md:pt-10 md:pb-14 lg:pt-[0px] lg:pb-[59px]",
  inner: "container-custom",
  title: "mb-6 text-center font-poppins text-[24px] font-semibold leading-[29px] text-neutral-900 sm:text-[28px] sm:leading-[34px] md:mb-8 lg:text-[32px] lg:leading-[38px]",
  grid: "grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-[repeat(6,200px)] lg:justify-center lg:gap-6",
  item: "relative block aspect-square overflow-hidden rounded-md group",
  img: "w-full h-full object-cover transition-transform duration-300 md:group-hover:scale-105",
  overlay: "absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all md:group-hover:bg-black/30 md:group-hover:opacity-100",
};

export async function getInstagramImages() {
  return instagramData.map(getImageUrl);
}

export function renderInstagramComponent({ images = [], handle = "@ecobazar" } = {}) {
  const itemsHtml = images
    .map(
      (src, i) => `
    <a href="#" class="${CLASS.item}" aria-label="Xem ảnh Instagram ${i + 1}">
      <img src="${src}" alt="Instagram ${i + 1}" width="200" height="200" class="${CLASS.img}" loading="lazy" decoding="async">
      <span class="${CLASS.overlay}">${iconInstagram}</span>
    </a>`
    )
    .join("");

  return `
  <section class="${CLASS.section}">
    <div class="${CLASS.inner}">
      <h2 class="${CLASS.title}">Follow us on Instagram <span class="text-primary">${handle}</span></h2>
      <div class="${CLASS.grid}">${itemsHtml}</div>
    </div>
  </section>
  `;
}
