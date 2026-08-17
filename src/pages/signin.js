import { renderSignInForm } from "../signin/signin.js";
import { renderBreadcrumbsComponent } from "../components/breadcrumbs.js";

function bindTogglePasswordEvent() {
  const passwordInput = document.getElementById("signin-password");
  const toggleBtn = document.getElementById("toggle-password");

  if (!passwordInput || !toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.getAttribute("type") === "password";
    passwordInput.setAttribute("type", isPassword ? "text" : "password");
    toggleBtn.classList.toggle("opacity-40", !isPassword);
  });
}

 export function initSignInPage() {
  const container = document.getElementById("signin-container");
  const breadcrumbContainer = document.getElementById("breadcrumbs-container");
    if(container) {
      container.innerHTML = renderSignInForm();
        const passwordInput = document.getElementById("signin-password");
        const toggleBtn = document.getElementById("toggle-password");
        handleTogglePassword(passwordInput, toggleBtn);
        }

  if (breadcrumbContainer) {
    breadcrumbContainer.innerHTML = renderBreadcrumbsComponent({
      breadcrumbs: [{ label: "Sign In", url: "./signin.html" }],
    });
  }

  container.innerHTML = renderSignInForm();

  bindTogglePasswordEvent();
}

