import { getImageUrl } from "../utils/assets.js";

export function renderNewsletterPopup() {
  const image = getImageUrl(
    "/images/newsletter.png"
  );

  return `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center
             bg-black/50 p-4"
      data-newsletter-overlay
    >

      <section
        class="relative grid max-w-4xl overflow-hidden rounded-2xl
               bg-white shadow-xl md:grid-cols-2"
        data-newsletter-popup
        aria-labelledby="newsletter-popup-title"
      >

        <button
          class="absolute right-3 top-3 flex h-8 w-8 items-center
                 justify-center rounded-full bg-white/90 text-lg
                 text-neutral-600 shadow transition hover:bg-neutral-100"
          data-newsletter-close
          aria-label="Close newsletter popup"
        >
          ×
        </button>

        <div class="h-[180px] p-2 md:h-full md:p-[10px]">

          <img
            src="${image}"
            alt="Fresh organic food newsletter"
            class="h-full w-full rounded object-cover object-center"
          />

        </div>

        <div
          class="flex flex-col justify-center px-6 pb-7 pt-5
                 text-center sm:px-10
                 md:py-10 md:pl-[30px] md:pr-10"
        >

          <h2
            id="newsletter-popup-title"
            class="text-[28px] font-semibold leading-[1.2]
                   text-neutral-900
                   sm:text-[32px]
                   md:text-[40px]"
          >
            Subscribe to Our Newsletter
          </h2>

          <p
            class="mx-auto mt-3 max-w-[410px] text-sm leading-6
                   text-neutral-400 md:text-base"
          >
            Subscribe to our newsletter and Save your
            <span class="font-semibold text-warning">
              20% money
            </span>
            with discount code today.
          </p>

          <form
            class="mt-6 flex w-full flex-col gap-3
                   sm:flex-row sm:gap-0"
            data-newsletter-form
          >

            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email"
              class="h-12 min-w-0 flex-1 rounded-full border
                     border-neutral-100 px-5 text-sm text-neutral-700
                     outline-none focus:border-primary
                     sm:rounded-r-none"
            />

            <button
              type="submit"
              class="h-12 cursor-pointer rounded-full bg-primary
                     px-8 text-sm font-semibold text-white
                     transition-colors hover:bg-primary-dark"
            >
              Subscribe
            </button>

          </form>

          <label
            class="mt-5 flex cursor-pointer items-center
                   justify-center gap-2 text-sm text-neutral-600"
          >

            <input
              type="checkbox"
              class="h-5 w-5 accent-primary"
              data-newsletter-hide
            />

            <span>Do not show this window</span>

          </label>

        </div>

      </section>

    </div>
  `;
}

export function bindNewsletterPopupEvents(
  root,
  onClose
) {
  const overlay = root.querySelector(
    "[data-newsletter-overlay]"
  );

  const popup = root.querySelector(
    "[data-newsletter-popup]"
  );

  const hideCheckbox = root.querySelector(
    "[data-newsletter-hide]"
  );

  function closePopup() {
    onClose(Boolean(hideCheckbox?.checked));
  }

  root
    .querySelector("[data-newsletter-close]")
    ?.addEventListener("click", closePopup);

  overlay?.addEventListener("click", (event) => {

    if (!popup?.contains(event.target)) {
      closePopup();
    }

  });

  root
    .querySelector("[data-newsletter-form]")
    ?.addEventListener("submit", (event) => {

      event.preventDefault();

      closePopup();

    });

  document.addEventListener(
    "keydown",
    function handleEscape(event) {

      if (event.key !== "Escape") {
        return;
      }

      document.removeEventListener(
        "keydown",
        handleEscape
      );

      closePopup();

    }
  );
}

const SESSION_KEY = "shopery-newsletter-shown";
const HIDE_KEY = "shopery-newsletter-hidden";

export function initNewsletterPopupPage() {

  if (
    sessionStorage.getItem(SESSION_KEY) ||
    localStorage.getItem(HIDE_KEY)
  ) {
    return;
  }

  const root = document.createElement("div");

  root.setAttribute(
    "data-newsletter-root",
    ""
  );

  root.innerHTML = renderNewsletterPopup();

  document.body.append(root);

  document.body.classList.add("overflow-hidden");

  sessionStorage.setItem(
    SESSION_KEY,
    "true"
  );

  bindNewsletterPopupEvents(
    root,
    (doNotShowAgain) => {

      if (doNotShowAgain) {
        localStorage.setItem(
          HIDE_KEY,
          "true"
        );
      }

      document.body.classList.remove(
        "overflow-hidden"
      );

      root.remove();

    }
  );
}