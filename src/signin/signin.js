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
    <section class="container-custom flex min-h-[460px] w-full items-center justify-center bg-white py-10 md:min-h-[530px] md:py-12" aria-labelledby="signin-title">
        <div class="relative w-full max-w-[520px] rounded-lg border border-neutral-50 bg-white p-5 shadow-[0_0_56px_rgba(0,38,3,.08)] sm:p-6 md:min-h-[372px]">
            <h1 class="text-center text-[28px] font-semibold leading-[1.2] text-neutral-900 sm:text-[32px]">
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
                <div class="flex items-center justify-between pt-1 text-sm">
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
                <p class="pt-3 text-center text-sm text-neutral-600">
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
