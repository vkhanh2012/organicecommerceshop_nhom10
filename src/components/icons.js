// src/components/icons.js
// Tập hợp icon SVG dùng chung, lấy theo bộ "Main Components" trong Figma.
// 40x40 cho heart / eye / social, 20x20 cho checkbox / radio.

export const iconHeart = `
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
  >
    <path
      d="M12 21s-7.5-4.9-10-9.6C.4 7.7 2.3 3.8 6 3.2
         c2.2-.4 4.3.7 6 2.8 1.7-2.1 3.8-3.2 6-2.8
         3.7.6 5.6 4.5 4 8.2C19.5 16.1 12 21 12 21z"
    />
  </svg>
`;

export const iconEye = `
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
  >
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
`;

export const iconCart = `
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
  >
    <path d="M3 6h2l2.5 12h11L21 9H6"/>
    <circle cx="9" cy="20" r="1"/>
    <circle cx="17" cy="20" r="1"/>
  </svg>
`;

export const iconClose = `
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <path d="M6 6l12 12M18 6L6 18"/>
  </svg>
`;

export const iconMenu = `
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <path d="M3 6h18M3 12h18M3 18h18"/>
  </svg>
`;

export const iconBag = `
  <svg width="24" height="24" viewBox="0 0 20 20" fill="none">

    <path
      d="M4 7H16L15.2 16C15.1 16.6 14.6 17 14 17H6C5.4 17 4.9 16.6 4.8 16L4 7Z"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <path
      d="M7 7V5.5C7 3.84 8.34 2.5 10 2.5C11.66 2.5 13 3.84 13 5.5V7"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

  </svg>
`;

export const iconInstagram = `
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
  >
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4.2"/>
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none"/>
  </svg>
`;

export const iconStar = (filled = true) => `
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="${filled ? "currentColor" : "none"}"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <path
      d="M12 2l3.1 6.3 7 1-5 4.9 1.2 6.9L12 17.8l-6.3 3.3L7 14.2l-5-4.9 7-1L12 2z"
    />
  </svg>
`;

export const iconPhone = `
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1
         19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1
         4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4
         2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4
         c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"
    />
  </svg>
`;

export const iconLocation = `
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"/>
    <circle cx="12" cy="10" r="2.5"/>
  </svg>
`;

// Social icons
export const SOCIAL_ICONS = {

  facebook: `
    <svg width="9" height="18" viewBox="0 0 9 18" fill="currentColor">
      <path d="M8.5 0H6.2C4 0 2.5 1.5 2.5 3.9V6H.5v2.8h2v9.2h3V8.8h2.3L8.2 6H5.5V4.2c0-.7.3-1.2 1.3-1.2h1.7V0z"/>
    </svg>
  `,

  twitter: `
    <svg width="16" height="13" viewBox="0 0 16 13" fill="currentColor">
      <path d="M16 1.5a6.7 6.7 0 0 1-1.9.5A3.3 3.3 0 0 0 15.5.2a6.6 6.6 0 0 1-2.1.8A3.3 3.3 0 0 0 7.7 4a9.3 9.3 0 0 1-6.8-3.4A3.3 3.3 0 0 0 2 4.9 3.3 3.3 0 0 1 .5 4.5v.1a3.3 3.3 0 0 0 2.6 3.2 3.3 3.3 0 0 1-1.5.1 3.3 3.3 0 0 0 3.1 2.3A6.6 6.6 0 0 1 0 11.6 9.3 9.3 0 0 0 5 13c6 0 9.3-5 9.3-9.3v-.4A6.7 6.7 0 0 0 16 1.5z"/>
    </svg>
  `,

  pinterest: `
    <svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor">
      <path d="M7 0a7 7 0 0 0-2.5 13.5c0-.6-.1-1.5 0-2.1l1-4.4s-.3-.5-.3-1.3c0-1.2.7-2.1 1.6-2.1.7 0 1.1.6 1.1 1.3 0 .8-.5 1.9-.7 3-.2.9.5 1.6 1.4 1.6 1.6 0 2.8-1.7 2.8-4.2 0-2.2-1.6-3.7-3.9-3.7-2.6 0-4.2 2-4.2 4 0 .8.3 1.6.7 2.1.1.1.1.2 0 .3l-.3 1c0 .2-.2.2-.3.1-1.1-.5-1.8-2.1-1.8-3.4C2.6 3 5 0.7 8.4.7c2.8 0 5 2 5 4.6 0 2.7-1.7 4.9-4.1 4.9-.8 0-1.6-.4-1.8-.9l-.5 1.9c-.2.7-.7 1.6-1 2.1A7 7 0 1 0 7 0z"/>
    </svg>
  `,

  instagram: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4.2"/>
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none"/>
    </svg>
  `,

  link: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.6 1.6"/>
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.6-1.6"/>
    </svg>
  `,

};

/**
 * Render 1 icon social — Normal / Hover
 */
export function renderSocialIcon(
  name,
  href = "#"
) {

  const svg = SOCIAL_ICONS[name] || "";

  return `
    <a
      href="${href}"
      class="flex h-10 w-10 items-center justify-center rounded-full
             border border-neutral-200 text-neutral-500 transition-colors
             hover:border-primary hover:bg-primary hover:text-white"
      aria-label="${name}"
    >
      ${svg}
    </a>
  `;
}