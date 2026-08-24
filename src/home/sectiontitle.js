export function sectionTitle(title, id = '') {
  return `<div class="mb-6 flex items-center justify-between gap-4 md:mb-8">
    <h2 ${id ? `id="${id}"` : ''} 
      class="text-2xl font-semibold text-neutral-900 md:text-[32px]">${title}
    </h2>
    <a href="#" class="text-base font-medium leading-6 text-primary">View All →</a></div>`;
}