import { renderSignInForm } from "../../signin/signin.js";
import { renderBreadcrumbsComponent } from "../components/breadcrumbs.js";
import { renderSignInForm } from "../signin/signin.js";
import { renderBreadcrumbsComponent } from "../components/breadcrumbs.js";
import { renderSignInForm } from "../signin/signin.js";

function bindTogglePasswordEvent() {
  const passwordInput = document.getElementById("signin-password");
  const toggleBtn = document.getElementById("toggle-password");

  if (!passwordInput || !toggleBtn) return;
  if (!passwordInput || !toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.getAttribute("type") === "password";
    passwordInput.setAttribute("type", isPassword ? "text" : "password");
    toggleBtn.classList.toggle("opacity-40", !isPassword);
  });
}

export function initSigninPage() {
  const breadcrumbContainer = document.getElementById("breadcrumbs-container");
  const container = document.getElementById("signin-form-container");

  if (breadcrumbContainer) {
    breadcrumbContainer.innerHTML = renderBreadcrumbsComponent({
      breadcrumbs: [{ label: "Sign In", url: "./signin.html" }],
    });
  }

  if (container) {
    container.innerHTML = renderSignInForm();
export function initSigninPage() {
  const breadcrumbContainer = document.getElementById("breadcrumbs-container");
  const container = document.getElementById("signin-form-container");

  if (breadcrumbContainer) {
    breadcrumbContainer.innerHTML = renderBreadcrumbsComponent({
      breadcrumbs: [{ label: "Sign In", url: "./signin.html" }],
    });
  }

  if (container) {
    container.innerHTML = renderSignInForm();
 export function initSignInPage() {
  const container = document.getElementById("signin-container");
  if (!container) return;

  container.innerHTML = renderSignInForm();

    const passwordInput = document.getElementById("signin-password");
    const toggleBtn = document.getElementById("toggle-password");

    togglePassword(passwordInput, toggleBtn);
  }
    togglePassword(passwordInput, toggleBtn);
  }
  bindTogglePasswordEvent();
}