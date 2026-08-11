import { money } from "./money.js";

export function cartRow(item) {
  return `
    <div class="grid grid-cols-[minmax(0,1fr)_100px] items-center gap-3 border-t border-neutral-100 px-5 py-3 sm:grid-cols-[minmax(260px,1fr)_100px_150px_100px_24px] sm:px-6">
      <div class="flex min-w-0 items-center gap-3">
        <img class="h-[78px] w-[78px] shrink-0 object-contain" src="${item.image}" alt="${item.name}">
        <span class="truncate text-sm text-neutral-900">${item.name}</span>
      </div>
      <span class="hidden text-sm text-neutral-900 sm:block">${money(item.price)}</span>
      <div class="flex h-[44px] w-[124px] items-center justify-between rounded-full border border-neutral-100 p-2">
        <button class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-neutral-50" data-action="decrease" data-id="${item.id}">−</button>
        <span class="text-sm">${item.quantity}</span>
        <button class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-neutral-50" data-action="increase" data-id="${item.id}">+</button>
      </div>
      <strong class="hidden text-sm font-medium sm:block">${money(item.price * item.quantity)}</strong>
      <button class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-neutral-200" data-action="remove" data-id="${item.id}">×</button>
      <div class="col-span-2 flex justify-between text-sm sm:hidden">
        <span class="text-neutral-500">${money(item.price)} × ${item.quantity}</span>
        <strong>${money(item.price * item.quantity)}</strong>
      </div>
    </div>`;
}
