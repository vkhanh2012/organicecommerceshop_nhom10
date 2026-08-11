import { iconEye } from "../components/icons.js";
import { getImageUrl } from "../utils/assets.js";

function passwordField({ name, placeholder }) {
  return `
    <div class="relative">
      <input
        type="password"
        name="${name}"
        required
        minlength="6"
        placeholder="${placeholder}"
        class="h-[49px] w-full rounded-md border border-neutral-100 px-4 pr-12 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-primary"
      >
      <button
        type="button"
        class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center text-neutral-600 transition-colors hover:text-primary"
        data-password-toggle="${name}"
        aria-label="Show or hide ${placeholder.toLowerCase()}"
      >
        ${iconEye}
      </button>
    </div>`;
}

export function renderSignupPage() {
  const breadcrumbImage = getImageUrl("/images/plant.jpg");

  return `
    <section class="relative flex h-24 items-center bg-cover bg-center sm:h-[120px]" style="background-image: url('${breadcrumbImage}')">
      <div class="absolute inset-0 bg-neutral-900/65"></div>
      <nav class="container-custom relative z-10 flex items-center gap-3 text-sm sm:text-base" aria-label="Breadcrumb">
        <a href="./index.html" class="text-neutral-300 transition-colors hover:text-white" aria-label="Home">⌂</a>
        <span class="text-neutral-400">›</span>
        <span class="text-neutral-300">Account</span>
        <span class="text-neutral-400">›</span>
        <span class="text-primary">Create Account</span>
      </nav>
    </section>

    <section class="container-custom flex min-h-[500px] items-center justify-center py-10 sm:min-h-[590px] sm:py-16">
      <div class="w-full max-w-[520px] rounded-lg border border-neutral-50 bg-white p-5 shadow-[0_0_56px_rgba(0,38,3,.08)] sm:p-6">
        <h1 class="text-center text-[28px] font-semibold leading-[1.2] text-neutral-900 sm:text-[32px]">Create Account</h1>

        <form class="mt-5 space-y-3" data-signup-form novalidate>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            class="h-[49px] w-full rounded-md border border-neutral-100 px-4 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-primary"
          >

          ${passwordField({ name: "password", placeholder: "Password" })}
          ${passwordField({ name: "confirmPassword", placeholder: "Confirm Password" })}

          <label class="flex cursor-pointer items-start gap-2 text-sm leading-5 text-neutral-600">
            <input type="checkbox" name="terms" class="mt-0.5 h-5 w-5 shrink-0 accent-primary">
            <span>Accept all terms &amp; Conditions</span>
          </label>

          <p class="hidden text-sm" data-signup-message></p>

          <button
            type="submit"
            class="h-[45px] w-full cursor-pointer rounded-full bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Create Account
          </button>
        </form>

        <p class="mt-4 text-center text-sm text-neutral-600">
          Already have account
          <a href="#" class="font-medium text-neutral-900 transition-colors hover:text-primary">Login</a>
        </p>
      </div>
    </section>`;
}

export function bindSignupEvents(root) {
  root.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = root.querySelector(`[name="${button.dataset.passwordToggle}"]`);
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
    });
  });

  root.querySelector("[data-signup-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const message = form.querySelector("[data-signup-message]");
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;
    const acceptedTerms = form.elements.terms.checked;

    let text = "";
    let success = false;

    if (!email || !form.elements.email.validity.valid) text = "Please enter a valid email address.";
    else if (password.length < 6) text = "Password must contain at least 6 characters.";
    else if (password !== confirmPassword) text = "Confirm password does not match.";
    else if (!acceptedTerms) text = "Please accept the terms and conditions.";
    else {
      text = "Account created successfully (demo).";
      success = true;
      form.reset();
    }

    message.textContent = text;
    message.className = `text-sm ${success ? "text-primary" : "text-error"}`;
  });
}

export function initSignupPage() {
  const root = document.getElementById("signup-container");
  if (!root) return;
  root.innerHTML = renderSignupPage();
  bindSignupEvents(root);
}
