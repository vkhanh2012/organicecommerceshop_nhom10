// src/components/icons.js
// Tập hợp icon SVG dùng chung, lấy theo bộ "Main Components" trong Figma.
// 40x40 cho heart / eye / social, 20x20 cho checkbox / radio.

export const iconHeart = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
  <path d="M12 21s-7.5-4.9-10-9.6C.4 7.7 2.3 3.8 6 3.2c2.2-.4 4.3.7 6 2.8 1.7-2.1 3.8-3.2 6-2.8 3.7.6 5.6 4.5 4 8.2C19.5 16.1 12 21 12 21z"/>
</svg>`

export const iconEye = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
  <circle cx="12" cy="12" r="3"/>
</svg>`

export const iconValidationError = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.57465 3.21667L1.51632 15C1.37079 15.252 1.29379 15.5378 1.29298 15.8288C1.29216 16.1198 1.36756 16.4059 1.51167 16.6588C1.65579 16.9116 1.86359 17.1223 2.11441 17.2699C2.36523 17.4175 2.65032 17.4968 2.94132 17.5H17.058C17.349 17.4968 17.6341 17.4175 17.8849 17.2699C18.1357 17.1223 18.3435 16.9116 18.4876 16.6588C18.6317 16.4059 18.7071 16.1198 18.7063 15.8288C18.7055 15.5378 18.6285 15.252 18.483 15L11.4247 3.21667C11.2761 2.97176 11.0669 2.76927 10.8173 2.62874C10.5677 2.48821 10.2861 2.41438 9.99965 2.41438C9.71321 2.41438 9.43159 2.48821 9.18199 2.62874C8.93238 2.76927 8.72321 2.97176 8.57465 3.21667Z" stroke="#EA4B48" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 7.5V10.8333" stroke="#EA4B48" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 14.1667H10.0083" stroke="#EA4B48" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

export const iconValidationWarning = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6024 18.3337 10C18.3337 5.39763 14.6027 1.66667 10.0003 1.66667C5.39795 1.66667 1.66699 5.39763 1.66699 10C1.66699 14.6024 5.39795 18.3333 10.0003 18.3333Z" stroke="#FF8A00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 6.66667V10" stroke="#FF8A00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 13.3333H10.0083" stroke="#FF8A00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

export const iconValidationSuccess = `
<svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.0833 0.75L4.91667 9.91667L0.75 5.75" stroke="#00B307" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

export const iconCheckboxCheck = `
<svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.6667 1L4.33333 8.33333L1 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

export const iconCart = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
  <path d="M3 6h2l2.5 12h11L21 9H6"/>
  <circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
</svg>`

// Header actions use the 32px variants from the Navigation component in Figma.
// Product cards keep the compact 20px icons above.
export const iconHeaderHeart = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M16 27.2S4.8 20.7 4.8 11.8A6.9 6.9 0 0 1 16 6.5a6.9 6.9 0 0 1 11.2 5.3C27.2 20.7 16 27.2 16 27.2Z"/>
</svg>`

export const iconHeaderCart = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M6.66667 8.33333H4.16667L2.5 17.5H17.5L15.8333 8.33333H13.3333M6.66667 8.33333V5.83334C6.66667 3.99239 8.15905 2.5 10 2.5C11.8409 2.5 13.3333 3.99238 13.3333 5.83333V8.33333M6.66667 8.33333H13.3333M6.66667 8.33333V10.8333M13.3333 8.33333V10.8333" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.66667 8.33333H4.16667L2.5 17.5H17.5L15.8333 8.33333H13.3333M6.66667 8.33333V5.83334C6.66667 3.99239 8.15905 2.5 10 2.5C11.8409 2.5 13.3333 3.99238 13.3333 5.83333V8.33333M6.66667 8.33333H13.3333M6.66667 8.33333V10.8333M13.3333 8.33333V10.8333" stroke="currentColor" stroke-opacity="0.2" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
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
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M6.66667 8.33333H4.16667L2.5 17.5H17.5L15.8333 8.33333H13.3333M6.66667 8.33333V5.83334C6.66667 3.99239 8.15905 2.5 10 2.5C11.8409 2.5 13.3333 3.99238 13.3333 5.83333V8.33333M6.66667 8.33333H13.3333M6.66667 8.33333V10.8333M13.3333 8.33333V10.8333" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.66667 8.33333H4.16667L2.5 17.5H17.5L15.8333 8.33333H13.3333M6.66667 8.33333V5.83334C6.66667 3.99239 8.15905 2.5 10 2.5C11.8409 2.5 13.3333 3.99238 13.3333 5.83333V8.33333M6.66667 8.33333H13.3333M6.66667 8.33333V10.8333M13.3333 8.33333V10.8333" stroke="currentColor" stroke-opacity="0.2" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
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

// Social icons
export const SOCIAL_ICONS = {
  facebook: `<svg width="9" height="18" viewBox="0 0 9 18" fill="currentColor"><path d="M8.5 0H6.2C4 0 2.5 1.5 2.5 3.9V6H.5v2.8h2v9.2h3V8.8h2.3L8.2 6H5.5V4.2c0-.7.3-1.2 1.3-1.2h1.7V0z"/></svg>`,
  twitter: `<svg width="16" height="13" viewBox="0 0 16 13" fill="currentColor"><path d="M16 1.5a6.7 6.7 0 0 1-1.9.5A3.3 3.3 0 0 0 15.5.2a6.6 6.6 0 0 1-2.1.8A3.3 3.3 0 0 0 7.7 4a9.3 9.3 0 0 1-6.8-3.4A3.3 3.3 0 0 0 2 4.9 3.3 3.3 0 0 1 .5 4.5v.1a3.3 3.3 0 0 0 2.6 3.2 3.3 3.3 0 0 1-1.5.1 3.3 3.3 0 0 0 3.1 2.3A6.6 6.6 0 0 1 0 11.6 9.3 9.3 0 0 0 5 13c6 0 9.3-5 9.3-9.3v-.4A6.7 6.7 0 0 0 16 1.5z"/></svg>`,
  pinterest: `<svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.55696 0C2.62362 0 0 3.16139 0 6.60855C0 8.20724 0.89329 10.2008 2.32323 10.8331C2.54036 10.931 2.65849 10.8894 2.70687 10.688C2.74962 10.535 2.93751 9.79807 3.02864 9.45042C3.05676 9.33904 3.04214 9.24229 2.95213 9.13766C2.47736 8.58864 2.10047 7.58847 2.10047 6.65017C2.10047 4.24594 4.01193 1.91146 7.26445 1.91146C10.0771 1.91146 12.0448 3.73854 12.0448 6.35204C12.0448 9.30529 10.4821 11.3484 8.45138 11.3484C7.32745 11.3484 6.49042 10.4663 6.75593 9.37505C7.07657 8.07561 7.70547 6.6783 7.70547 5.74113C7.70547 4.90072 7.2307 4.20544 6.26091 4.20544C5.11673 4.20544 4.18856 5.33837 4.18856 6.85943C4.18856 7.82585 4.53058 8.47838 4.53058 8.47838C4.53058 8.47838 3.39878 13.0506 3.18839 13.9045C2.83288 15.3502 3.23677 17.6914 3.27165 17.8928C3.29302 18.0042 3.4179 18.0391 3.48766 17.9479C3.59904 17.8017 4.9671 15.8497 5.35074 14.4389C5.49025 13.9248 6.0629 11.84 6.0629 11.84C6.43979 12.5207 7.52771 13.0911 8.68651 13.0911C12.1337 13.0911 14.6245 10.0613 14.6245 6.30141C14.6122 2.69675 11.5273 0 7.55696 0Z" fill="white"/>
</svg>

`,
  instagram: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none"/></svg>`,
  link: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.6 1.6"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.6-1.6"/></svg>`,
}

/**
 * Render 1 icon social — Normal / Hover
 */
export function renderSocialIcon(name, href = "#") {
  const svg = SOCIAL_ICONS[name] || ""
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
  `
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
                    <path d="M2.91634 4.95834L6.99967 9.04168L11.083 4.95834" stroke="currentColor" stroke-width="1.5"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
`
export const tickIcon = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_460_40930)">
<rect opacity="0.1" width="20" height="20" rx="10" fill="#00B307"/>
<path d="M14.4168 7.125L8.68766 12.8542L6.0835 10.25" stroke="#2C742F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_460_40930">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

`

export const closeIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_6384_7256)">
<path d="M12 23C18.0748 23 23 18.0748 23 12C23 5.92525 18.0748 1 12 1C5.92525 1 1 5.92525 1 12C1 18.0748 5.92525 23 12 23Z" stroke="#CCCCCC" stroke-miterlimit="10"/>
<path d="M16 8L8 16" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 16L8 8" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_6384_7256">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>

`
export function ratingStar(color = "#CCCCCC") {
  return `
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.62258 11.7231L11.1691 13.9698C11.6225 14.2566 12.185 13.8297 12.0506 13.3004L11.0263 9.27006C10.9973 9.1578 11.0007 9.03965 11.0359 8.9292C11.0711 8.81874 11.1368 8.72047 11.2254 8.64569L14.4058 5.99913C14.8231 5.6515 14.6083 4.95794 14.0711 4.92306L9.91815 4.65306C9.80633 4.64513 9.69907 4.6056 9.60885 4.53908C9.51863 4.47256 9.44916 4.38178 9.40852 4.27731L7.8594 0.376939C7.81721 0.266092 7.74234 0.170685 7.64469 0.103367C7.54705 0.0360489 7.43125 0 7.31265 0C7.19405 0 7.07824 0.0360489 6.9806 0.103367C6.88296 0.170685 6.80808 0.266092 6.7659 0.376939L5.21677 4.27731C5.17622 4.38189 5.10679 4.47278 5.01656 4.53941C4.92633 4.60604 4.81902 4.64565 4.70715 4.65363L0.554209 4.92363C0.0175843 4.95794 -0.198416 5.6515 0.219522 5.99913L3.3999 8.64625C3.48838 8.72099 3.554 8.81916 3.58922 8.9295C3.62445 9.03984 3.62784 9.15788 3.59902 9.27006L2.64952 13.0079C2.48808 13.6429 3.16365 14.1554 3.70702 13.8106L7.00327 11.7231C7.09592 11.6642 7.20343 11.6329 7.31321 11.6329C7.42299 11.6329 7.5305 11.6642 7.62315 11.7231H7.62258Z" fill="${color}"/>
    </svg>
  `;
}

