import {
  iconEye,
  iconCheckboxCheck,
  iconValidationError,
  iconValidationSuccess,
  iconValidationWarning,
} from "../components/icons.js"

function validationIcons() {
  return `
    <span class="signin-state-icon signin-error-icon" aria-hidden="true">${iconValidationError}</span>
    <span class="signin-state-icon signin-warning-icon" aria-hidden="true">${iconValidationWarning}</span>
    <span class="signin-state-icon signin-success-icon" aria-hidden="true">${iconValidationSuccess}</span>
  `;
}
export function renderSignInForm() {
  return /*html*/ `
    <section class="container-custom flex justify-center w-full py-8 md:py-20 items-center bg-white"  aria-labelledby="signin-title">
        <div class="relative w-full max-w-130 bg-white border border-neutral-50 rounded-lg shadow-lg items-center">
            <h1 class="text-neutral-900 font-semibold text-xl sm:text-lg md:text-[32px] text-center items-center pt-3 md:pt-8 md:pb-2">
                Sign In</h1>
            <form action="" class="space-y-4 px-6 py-5" aria-label="Sign In Form" data-signin-form novalidate>
                <!-- email -->
                <div class="signin-field" data-field data-state="normal">
                    <label for="signin-email" class="sr-only">Email Adress</label>
                    <div class="signin-input-control">
                        <input id="signin-email" name="email" type="email" placeholder="Email" autocomplete="email" required
                            class="signin-input" aria-describedby="signin-email-message" />
                        ${validationIcons()}
                    </div>
                    <p id="signin-email-message" class="signin-field-message" data-field-message aria-live="polite"></p>
                </div>
                <!-- password -->
                <div class="signin-field" data-field data-state="normal">
                    <label for="signin-password" class="sr-only">Password</label>
                    <div class="signin-input-control">
                        <input id="signin-password" name="password" type="password" placeholder="Password" autocomplete="current-password"
                            required class="signin-input signin-input-password" aria-describedby="signin-password-message" />
                        <!-- nút ẩn hiện mật khẩu bên phải -->
                        <button id="toggle-password" type="button" aria-label="Show password"
                            class="signin-password-toggle">
                            ${iconEye}
                        </button>
                        ${validationIcons()}
                    </div>
                    <p id="signin-password-message" class="signin-field-message" data-field-message aria-live="polite"></p>
                </div>

                <!-- remember me và forrget password -->
                <div class="flex items-center justify-between text-sm pt-4 pb-5">
                    <label class="flex items-center justify-center gap-1.5 cursor-pointer text-neutral-600 text-sm select-none">
                        <span class="signin-checkbox-control">
                            <input type="checkbox" name="remember" class="signin-checkbox-input" />
                            <span class="signin-checkbox-box" aria-hidden="true">
                                ${iconCheckboxCheck}
                            </span>
                        </span>
                        <span>Remember me</span>
                    </label>
                    <a href="./index.html" class="text-neutral-600 hover:text-primary transition-colors">
                            Forget Password
                        </a>
                </div>

                <!-- nút login -->
                <button type="submit" class="w-full h-[45px] flex items-center justify-center bg-primary text-white rounded-pill font-semibold cursor-pointer hover:bg-primary-dark transition-colors">
                    Login
                </button>

                <!-- register -->
                <p class="text-center text-sm text-neutral-600 pt-6 pb-8 ">
                    Don’t have account?
                    <a href="/signup.html" class=" font-semibold text-neutral-900 text-sm hover:text-primary transition-colors">
                        Register
                    </a>
                </p>
            </form>
        </div>
    </section>
    `
}
