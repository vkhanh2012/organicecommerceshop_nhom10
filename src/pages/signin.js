import { renderSignInForm } from "../signin/signin.js";

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
  if (!container) return;

  container.innerHTML = renderSignInForm();

  bindTogglePasswordEvent();
}

