import { money } from "./money.js";

export function cartRow(item) {
  return `
    <div class="grid grid-cols-[minmax(0,1fr)_100px] items-center gap-3 border-t border-neutral-100 px-5 py-3 sm:px-6 lg:grid-cols-[minmax(260px,1fr)_100px_150px_100px_24px] lg:py-[9px] xl:grid-cols-[371px_102px_174px_100px_24px] xl:px-5">
      <div class="flex min-w-0 items-center gap-3">
        <img class="h-[84px] w-[84px] shrink-0 object-contain lg:h-[100px] lg:w-[100px]" src="${item.image}" alt="${item.name}" width="100" height="100" loading="lazy" decoding="async">
        <span class="truncate text-base leading-6 text-neutral-900">${item.name}</span>
      </div>
      <span class="hidden text-base leading-6 text-neutral-900 lg:block">${money(item.price)}</span>
      <div class="flex h-[44px] w-[124px] items-center justify-between rounded-full border border-neutral-100 p-2">
        <button class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-neutral-50 transition-colors hover:bg-primary hover:text-white" data-action="decrease" data-id="${item.id}" aria-label="Decrease ${item.name} quantity">−</button>
        <span class="text-base leading-6">${item.quantity}</span>
        <button class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-neutral-50 transition-colors hover:bg-primary hover:text-white" data-action="increase" data-id="${item.id}" aria-label="Increase ${item.name} quantity">+</button>
      </div>
      <strong class="hidden text-base font-medium leading-6 lg:block">${money(item.price * item.quantity)}</strong>
      <button class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-error hover:text-error" data-action="remove" data-id="${item.id}" aria-label="Remove ${item.name}">×</button>
      <div class="col-span-2 flex justify-between text-base leading-6 lg:hidden">
        <span class="text-neutral-500">${money(item.price)} × ${item.quantity}</span>
        <strong>${money(item.price * item.quantity)}</strong>
      </div>
    </div>`;
}
