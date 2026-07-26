// src/components/icons.js
// Tập hợp icon SVG dùng chung, lấy theo bộ "Main Components" trong Figma
// (kích thước icon 40x40 cho heart/eye/social, 20x20 cho checkbox/radio)

export const iconHeart = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
  <path d="M12 21s-7.5-4.9-10-9.6C.4 7.7 2.3 3.8 6 3.2c2.2-.4 4.3.7 6 2.8 1.7-2.1 3.8-3.2 6-2.8 3.7.6 5.6 4.5 4 8.2C19.5 16.1 12 21 12 21z"/>
</svg>`

export const iconEye = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
  <circle cx="12" cy="12" r="3"/>
</svg>`

export const iconCart = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
  <path d="M3 6h2l2.5 12h11L21 9H6"/>
  <circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
</svg>`

export const iconClose = `
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M6 6l12 12M18 6L6 18"/>
</svg>`

export const iconMenu = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M3 6h18M3 12h18M3 18h18"/>
</svg>`

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
</svg>`

export const iconInstagram = `
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none"/>
</svg>`

export const iconStar = (filled = true) => `
<svg width="12" height="12" viewBox="0 0 24 24" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.5">
  <path d="M12 2l3.1 6.3 7 1-5 4.9 1.2 6.9L12 17.8l-6.3 3.3L7 14.2l-5-4.9 7-1L12 2z"/>
</svg>`

export const iconPhone = `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/>
</svg>`

export const iconLocation = `
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>
</svg>`

// Social — component "Social Media" trong Figma: Normal (viền, icon xám) / Hover (nền xanh, icon trắng)
export const SOCIAL_ICONS = {
  facebook: `<svg width="9" height="18" viewBox="0 0 9 18" fill="currentColor"><path d="M8.5 0H6.2C4 0 2.5 1.5 2.5 3.9V6H.5v2.8h2v9.2h3V8.8h2.3L8.2 6H5.5V4.2c0-.7.3-1.2 1.3-1.2h1.7V0z"/></svg>`,
  twitter: `<svg width="16" height="13" viewBox="0 0 16 13" fill="currentColor"><path d="M16 1.5a6.7 6.7 0 0 1-1.9.5A3.3 3.3 0 0 0 15.5.2a6.6 6.6 0 0 1-2.1.8A3.3 3.3 0 0 0 7.7 4a9.3 9.3 0 0 1-6.8-3.4A3.3 3.3 0 0 0 2 4.9 3.3 3.3 0 0 1 .5 4.5v.1a3.3 3.3 0 0 0 2.6 3.2 3.3 3.3 0 0 1-1.5.1 3.3 3.3 0 0 0 3.1 2.3A6.6 6.6 0 0 1 0 11.6 9.3 9.3 0 0 0 5 13c6 0 9.3-5 9.3-9.3v-.4A6.7 6.7 0 0 0 16 1.5z"/></svg>`,
  pinterest: `<svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor"><path d="M7 0a7 7 0 0 0-2.5 13.5c0-.6-.1-1.5 0-2.1l1-4.4s-.3-.5-.3-1.3c0-1.2.7-2.1 1.6-2.1.7 0 1.1.6 1.1 1.3 0 .8-.5 1.9-.7 3-.2.9.5 1.6 1.4 1.6 1.6 0 2.8-1.7 2.8-4.2 0-2.2-1.6-3.7-3.9-3.7-2.6 0-4.2 2-4.2 4 0 .8.3 1.6.7 2.1.1.1.1.2 0 .3l-.3 1c0 .2-.2.2-.3.1-1.1-.5-1.8-2.1-1.8-3.4C2.6 3 5 0.7 8.4.7c2.8 0 5 2 5 4.6 0 2.7-1.7 4.9-4.1 4.9-.8 0-1.6-.4-1.8-.9l-.5 1.9c-.2.7-.7 1.6-1 2.1A7 7 0 1 0 7 0z"/></svg>`,
  instagram: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none"/></svg>`,
  link: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.6 1.6"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.6-1.6"/></svg>`,
}

/**
 * Render 1 icon social — 2 trạng thái Normal (viền xám, icon xám) / Hover (nền xanh, icon trắng)
 * đúng theo component "Social Media" trong Main Components.
 */
export function renderSocialIcon(name, href = "#") {
  const svg = SOCIAL_ICONS[name] || ""
  return `
  <a href="${href}" aria-label="${name}" class="social-icon">
    ${svg}
  </a>`
}

//mũi tên back
export const backArrow = `
<svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.75 6.7749H15.75" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.80005 0.75L0.750049 6.774L6.80005 12.799" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`

export const nextArrow = `
 <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.75 6.7749H0.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.69995 0.75L15.75 6.774L9.69995 12.799" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`

export const quoteIcon = `
<svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M23.8222 0C20.4357 0 17.6851 2.65696 17.6851 5.9336C17.6851 9.20821 20.4357 11.8672 23.8222 11.8672C29.6404 11.8672 26.2689 22.171 18.931 23.2443C18.5848 23.2936 18.2688 23.4578 18.0403 23.7071C17.8117 23.9563 17.6857 24.2742 17.6851 24.6032C17.6851 25.4456 18.487 26.1119 19.3751 25.9843C32.7122 24.0847 37.4546 0.00202497 23.8222 0.00202497V0ZM6.13933 0C2.74847 0 0 2.65493 0 5.9336C0 9.20619 2.74847 11.8631 6.13933 11.8631C11.9553 11.8631 8.58385 22.171 1.24597 23.2443C0.900119 23.2936 0.584431 23.4575 0.355931 23.7063C0.127431 23.9551 0.00118682 24.2725 0 24.6011C0 25.4436 0.801907 26.1098 1.68788 25.9823C15.0293 24.0827 19.7717 0 6.13933 0Z" fill="#00B307"/>
                </svg>
`

export const filter = `
<svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.75 4.75H8.75" stroke="white" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M12.75 13.75H3.75" stroke="white" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
              <circle cx="4.75" cy="4.75" r="4" stroke="white" stroke-width="1.5" />
              <circle cx="16.75" cy="13.75" r="4" stroke="white" stroke-width="1.5" />
            </svg>
`
export const dropDown = `
<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.91634 4.95834L6.99967 9.04168L11.083 4.95834" stroke="#4D4D4D" stroke-width="1.5"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
`
