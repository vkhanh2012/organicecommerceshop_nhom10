import "../css/form.css";
import { renderSignInForm } from "../signin/signin.js";
import { renderBreadcrumbsComponent } from "../components/breadcrumbs.js";

const FIELD_STATES = {
  normal: "normal",
  typing: "typing",
  filled: "filled",
  error: "error",
  success: "success",
  warning: "warning",
};

function getFieldError(input) {
  const value = input.value.trim();

  if (!value) {
    return input.name === "email"
      ? "Email is required."
      : "Password is required.";
  }

  if (input.name === "email" && !input.validity.valid) {
    return "Please enter a valid email address.";
  }

  return "";
}

function updateFieldState(input, state, message = "") {
  const field = input.closest("[data-field]");
  const messageElement = field?.querySelector("[data-field-message]");
  if (!field || !messageElement) return;

  field.dataset.state = state;
  if (state === FIELD_STATES.error) field.dataset.wasInvalid = "true";
  if (state === FIELD_STATES.success) delete field.dataset.wasInvalid;
  messageElement.textContent = message;
  input.setAttribute("aria-invalid", String(state === FIELD_STATES.error));
}

function validateField(input, { showSuccess = false } = {}) {
  const error = getFieldError(input);
  if (error) {
    updateFieldState(input, FIELD_STATES.error, error);
    return false;
  }

  const warning = input.dataset.warningMessage?.trim();
  if (warning) {
    updateFieldState(input, FIELD_STATES.warning, warning);
    return true;
  }

  updateFieldState(
    input,
    showSuccess || input.closest("[data-field]")?.dataset.wasInvalid
      ? FIELD_STATES.success
      : FIELD_STATES.filled,
  );
  return true;
}

function bindSignInValidation(root) {
  const form = root.querySelector("[data-signin-form]");
  if (!form) return;

  const inputs = Array.from(form.querySelectorAll("[data-field] input"));

  inputs.forEach((input) => {
    if (input.value.trim()) {
      updateFieldState(input, FIELD_STATES.filled);
    }

    input.addEventListener("focus", () => {
      updateFieldState(input, FIELD_STATES.typing);
    });

    input.addEventListener("input", () => {
      updateFieldState(input, FIELD_STATES.typing);
    });

    input.addEventListener("blur", () => {
      if (!input.value.trim() && !input.dataset.warningMessage) {
        validateField(input);
        return;
      }

      validateField(input);
    });
  });

  form.addEventListener("submit", (event) => {
    let firstInvalidInput = null;
    inputs.forEach((input) => {
      const isValid = validateField(input, { showSuccess: true });
      if (!isValid && !firstInvalidInput) firstInvalidInput = input;
    });

    if (firstInvalidInput) {
      event.preventDefault();
      firstInvalidInput.focus();
      updateFieldState(
        firstInvalidInput,
        FIELD_STATES.error,
        getFieldError(firstInvalidInput),
      );
    }
  });
}

function bindTogglePasswordEvent() {
  const passwordInput = document.getElementById("signin-password");
  const toggleBtn = document.getElementById("toggle-password");

  if (!passwordInput || !toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.getAttribute("type") === "password";
    passwordInput.setAttribute("type", isPassword ? "text" : "password");
    toggleBtn.classList.toggle("opacity-40", !isPassword);
    toggleBtn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
  });
}

export function initSignInPage() {
  const container = document.getElementById("signin-container");
  if (!container) return;
  
  container.innerHTML = renderSignInForm();

  const breadcrumbs = document.getElementById("breadcrumbs-container");
  if (breadcrumbs) {
    const breadcrumbsData = {
      breadcrumbs: [
        { label: "Account", url: "#" },
        { label: "Sign In", url: "./signin.html" }
      ]
    };

    breadcrumbs.innerHTML = renderBreadcrumbsComponent(breadcrumbsData);
  }
  bindTogglePasswordEvent();
  bindSignInValidation(container);
}
