import {
  iconEye,
  iconValidationError,
  iconValidationSuccess,
  iconValidationWarning,
} from "../components/icons.js";
import { renderBreadcrumbsComponent } from "../components/breadcrumbs.js";

function passwordField({ name, placeholder }) {
  return `
    <div data-field="${name}">
      <div class="relative">
        <input
          type="password"
          name="${name}"
          required
          minlength="6"
          placeholder="${placeholder}"
          class="h-[49px] w-full rounded-md border border-neutral-100 px-4 pr-20 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400"
        >
        <span class="absolute inset-y-0 right-11 hidden items-center" data-field-icon></span>
        <button
          type="button"
          class="absolute inset-y-0 right-3 my-auto flex h-8 w-8 cursor-pointer items-center justify-center text-neutral-600 transition-colors hover:text-primary"
          data-password-toggle="${name}"
          aria-label="Show or hide ${placeholder.toLowerCase()}"
        >
          ${iconEye}
        </button>
      </div>
      <p class="mt-1 hidden text-xs leading-[18px]" data-field-message></p>
    </div>`;
}

function emailField() {
  return `
    <div data-field="email">
      <div class="relative">
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          class="h-[49px] w-full rounded-md border border-neutral-100 px-4 pr-11 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400"
        >
        <span class="absolute inset-y-0 right-4 hidden items-center" data-field-icon></span>
      </div>
      <p class="mt-1 hidden text-xs leading-[18px]" data-field-message></p>
    </div>`;
}

export function renderSignupPage() {

  return `
    <section class="container-custom flex min-h-[520px] items-center justify-center py-10 sm:min-h-[590px] sm:py-16">
      <div class="w-full max-w-[520px] rounded-lg border border-neutral-50 bg-white p-5 shadow-[0_0_56px_rgba(0,38,3,.08)] sm:min-h-[430px] sm:p-6">
        <h1 class="text-center text-[28px] font-semibold leading-[1.2] text-neutral-900 sm:text-[32px]">Create Account</h1>

        <form class="mt-5 space-y-3" data-signup-form novalidate>
          ${emailField()}

          ${passwordField({ name: "password", placeholder: "Password" })}
          ${passwordField({ name: "confirmPassword", placeholder: "Confirm Password" })}

          <div data-field="terms">
            <label class="flex cursor-pointer items-start gap-2 text-sm leading-5 text-neutral-600">
              <input type="checkbox" name="terms" class="mt-0.5 h-5 w-5 shrink-0 accent-primary">
              <span>Accept all terms &amp; Conditions</span>
            </label>
            <p class="mt-1 hidden text-xs leading-[18px]" data-field-message></p>
          </div>

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
        <a href="./signin.html" class="font-medium text-neutral-900 transition-colors hover:text-primary">Login</a>
        </p>
      </div>
    </section>`;
}

export function bindSignupEvents(root) {
  const form = root.querySelector("[data-signup-form]");
  if (!form) return;

  const stateClasses = {
    default: ["border-neutral-100"],
    typing: ["border-primary"],
    filled: ["border-neutral-200"],
    warning: ["border-warning", "bg-warning/5"],
    error: ["border-error", "bg-error/5"],
    success: ["border-primary", "bg-primary/5"],
  };
  const removableClasses = Object.values(stateClasses).flat();
  const stateIcons = {
    warning: iconValidationWarning,
    error: iconValidationError,
    success: iconValidationSuccess,
  };
  const stateTextClasses = {
    warning: "text-warning",
    error: "text-error",
    success: "text-primary",
  };

  function setFieldState(name, state = "default", message = "") {
    const field = form.querySelector(`[data-field="${name}"]`);
    const input = form.elements[name];
    const messageElement = field?.querySelector("[data-field-message]");
    const iconElement = field?.querySelector("[data-field-icon]");
    if (!field || !input) return;

    if (input.matches("input:not([type='checkbox'])")) {
      input.classList.remove(...removableClasses);
      input.classList.add(...stateClasses[state]);
      input.setAttribute("aria-invalid", String(state === "error"));
    }

    if (messageElement) {
      messageElement.textContent = message;
      messageElement.className = `mt-1 text-xs leading-[18px] ${
        message ? stateTextClasses[state] || "text-neutral-500" : "hidden"
      }`;
    }

    if (iconElement) {
      iconElement.innerHTML = stateIcons[state] || "";
      iconElement.className = `absolute inset-y-0 items-center ${
        name === "email" ? "right-4" : "right-11"
      } ${stateTextClasses[state] || "text-neutral-500"} ${
        stateIcons[state] ? "flex" : "hidden"
      }`;
    }
  }

  function validateField(name, submitted = false) {
    const input = form.elements[name];
    let message = "";

    if (name === "email") {
      if (!input.value.trim()) message = "Email is required.";
      else if (!input.validity.valid) message = "Please enter a valid email address.";
    }

    if (name === "password") {
      if (!input.value) message = "Password is required.";
      else if (input.value.length < 6) message = "Password must contain at least 6 characters.";
    }

    if (name === "confirmPassword") {
      if (!input.value) message = "Please confirm your password.";
      else if (input.value !== form.elements.password.value) message = "Confirm password does not match.";
    }

    if (name === "terms" && !input.checked) {
      message = "Please accept the terms and conditions.";
    }

    setFieldState(name, message ? (submitted ? "error" : "warning") : "success", message);
    return !message;
  }

  ["email", "password", "confirmPassword"].forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("focus", () => {
      setFieldState(name, input.value ? "filled" : "typing");
    });
    input.addEventListener("input", () => {
      setFieldState(name, input.value ? "typing" : "default");
      if (name === "password" && form.elements.confirmPassword.value) {
        setFieldState("confirmPassword", "filled");
      }
    });
    input.addEventListener("blur", () => {
      if (!input.value) setFieldState(name, "default");
      else validateField(name);
    });
  });

  form.elements.terms.addEventListener("change", () => {
    validateField("terms");
  });

  root.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = root.querySelector(`[name="${button.dataset.passwordToggle}"]`);
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = form.querySelector("[data-signup-message]");
    const fieldNames = ["email", "password", "confirmPassword", "terms"];
    const isValid = fieldNames.map((name) => validateField(name, true)).every(Boolean);

    message.textContent = isValid ? "Account created successfully (demo)." : "";
    message.className = isValid ? "text-sm text-primary" : "hidden text-sm";
  });
}
export function initSignupPage() {
  const breadcrumbContainer = document.getElementById(
    "breadcrumbs-container"
  );

  const signupContainer = document.getElementById(
    "signup-container"
  );

  if (breadcrumbContainer) {
    breadcrumbContainer.innerHTML = renderBreadcrumbsComponent({
      breadcrumbs: [
        {
          label: "Account",
          url: "./signin.html",
        },
        {
          label: "Create Account",
          url: "./signup.html",
        },
      ],
    });
  }

  if (!signupContainer) return;

  signupContainer.innerHTML = renderSignupPage();
  bindSignupEvents(signupContainer);
}
