import { renderSignInForm } from "../../signin/signin.js";

function togglePassword (passwordInput, toggleBtn){
    if(!passwordInput || !toggleBtn) return;


    toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.getAttribute("type") === "password";

    passwordInput.setAttribute("type", isPassword ? "text" : "password");

    });

   

}

 document.addEventListener("DOMContentLoaded", () => {
        const container = document.getElementById("signin-form-container");

        if(container) {
            container.innerHTML = renderSignInForm();

            const passwordInput = document.getElementById("signin-password");
            const toggleBtn = document.getElementById("toggle-password");

            handleTogglePassword(passwordInput, toggleBtn);
        }
});

