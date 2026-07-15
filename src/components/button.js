// src/components/button.js

/**
 * Render component Button (đúng theo Component Set "Button" trong Figma:
 * Size: small | medium | large   —   Type: fill | border | ghost
 *
 * @param {Object} options
 * @param {string} options.label   - chữ trên nút
 * @param {'small'|'medium'|'large'} options.size
 * @param {'fill'|'border'|'ghost'} options.type
 * @param {string|null} options.href - nếu có, render thẻ <a>, không thì render <button>
 * @param {string} options.id - id gắn cho phần tử, để bắt sự kiện click ở main.js
 */
export function renderButtonComponent({
  label = "Button",
  size = "medium",
  type = "fill",
  href = null,
  id = "",
} = {}) {
  const classes = `btn btn-${size} btn-${type}`;
  const idAttr = id ? `id="${id}"` : "";

  if (href) {
    return `<a ${idAttr} href="${href}" class="${classes}">${label}</a>`;
  }
  return `<button ${idAttr} type="button" class="${classes}">${label}</button>`;
}
