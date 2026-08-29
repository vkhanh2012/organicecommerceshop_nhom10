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
    <section class="container-custom flex min-h-[460px] w-full items-center justify-center bg-white py-8 sm:py-10 md:min-h-[530px] md:py-12" aria-labelledby="signin-title">
        <div class="relative flex w-full max-w-[520px] flex-col items-center gap-5 rounded-lg border border-neutral-100 bg-white px-4 pb-6 pt-5 shadow-[0_0_56px_rgba(0,38,3,.08)] sm:px-6 sm:pb-8 sm:pt-6">
            <h1 class="text-center text-3xl font-semibold leading-10 text-neutral-900">
                Sign In</h1>
            <form action="" class="flex w-full flex-col gap-5" aria-label="Sign In Form" data-signin-form novalidate>
              <div class="flex w-full flex-col gap-4">
                <div class="flex w-full flex-col gap-3">
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
                </div>

                <!-- remember me và forrget password -->
                <div class="flex w-full items-start justify-between gap-2 text-sm">
                    <label class="flex cursor-pointer select-none items-start gap-1.5 text-sm leading-5 text-neutral-600">
                        <span class="signin-checkbox-control">
                            <input type="checkbox" name="remember" class="signin-checkbox-input" />
                            <span class="signin-checkbox-box" aria-hidden="true">
                                ${iconCheckboxCheck}
                            </span>
                        </span>
                        <span>Remember me</span>
                    </label>
                    <a href="./index.html" class="shrink-0 leading-5 text-neutral-600 transition-colors hover:text-primary">
                            Forget Password
                        </a>
                </div>
              </div>

                <!-- nút login -->
                <button type="submit" class="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-[43px] bg-primary px-8 py-3.5 text-sm font-semibold leading-4 text-white transition-colors hover:bg-primary-dark">
                    Login
                </button>

                <!-- register -->
                <p class="pt-1 text-center text-sm font-normal leading-5 text-neutral-600">
                    Don’t have account?
                    <a href="/signup.html" class="text-sm font-medium text-neutral-900 transition-colors hover:text-primary">
                        Register
                    </a>
                </p>
            </form>
        </div>
    </section>
    `
}
