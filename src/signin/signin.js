import { iconEye } from "../components/icons.js"
export function renderSignInForm() {
  return /*html*/ `
    <section class="container-custom flex min-h-[460px] w-full items-center justify-center bg-white py-10 md:min-h-[530px] md:py-12" aria-labelledby="signin-title">
        <div class="relative w-full max-w-[520px] rounded-lg border border-neutral-50 bg-white p-5 shadow-[0_0_56px_rgba(0,38,3,.08)] sm:p-6 md:min-h-[372px]">
            <h1 class="text-center text-[28px] font-semibold leading-[1.2] text-neutral-900 sm:text-[32px]">
                Sign In</h1>
            <form action="" class="mt-5 space-y-3" aria-label="Sign In Form">
                <!-- email -->
                <div>
                    <label for="signin-email" class="sr-only">Email Adress</label>
                    <input name="email" type="email" placeholder="Email" autocomplete="email" required
                        class="h-[49px] w-full rounded-md border border-neutral-100 px-4 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-primary font-poppins transition-colors" />
                </div>
                <!-- password -->
                <div class="relative w-full">
                    <label for="signin-password" class="sr-only">Password</label>
                    <input id="signin-password" name="password" type="password" placeholder="Password" autocomplete="current-password"
                        required
                        class="h-[49px] w-full rounded-md border border-neutral-100 px-4 pr-12 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-primary font-poppins transition-colors" />
                    <!-- nút ẩn hiện mật khẩu bên phải -->
                    <button id="toggle-password" type="button" aria-label="password visibility"
                        class="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-900 hover:text-neutral-800 transition-colors">
                        ${iconEye}
                    </button>
                </div>

                <!-- remember me và forrget password -->
                <div class="flex items-center justify-between pt-1 text-sm">
                    <label class="flex items-center justify-center gap-1.5 cursor-pointer text-neutral-600 text-sm select-none">
                        <input type="checkbox" name="remember"
                            class="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary cursor-pointer" />
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
