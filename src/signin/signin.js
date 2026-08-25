import { iconEye } from "../components/icons.js"
export function renderSignInForm() {
  return /*html*/ `
    <section class="container-custom flex justify-center w-full py-8 md:py-20 items-center bg-white"  aria-labelledby="signin-title">
        <div class="relative w-full max-w-130 bg-white border border-neutral-50 rounded-lg shadow-lg items-center">
            <h1 class="text-neutral-900 font-semibold text-xl sm:text-lg md:text-[32px] text-center items-center pt-3 md:pt-8 md:pb-2">
                Sign In</h1>
            <form action="" class="space-y-4 px-6 py-5" aria-label="Sign In Form">
                <!-- email -->
                <div>
                    <label for="signin-email" class="sr-only">Email Adress</label>
                    <input name="email" type="email" placeholder="Email" autocomplete="email" required
                        class="w-full px-6 py-5 border border-neutral-50 rounded-md text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:ring-1 focus:ring-primary font-poppins transition-all" />
                </div>
                <!-- password -->
                <div class="relative w-full">
                    <label for="signin-password" class="sr-only">Password</label>
                    <input id="signin-password" name="password" type="password" placeholder="Password" autocomplete="current-password"
                        required
                        class="w-full px-6 py-5 pr-11 border border-neutral-50 rounded-md text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:ring-1 focus:ring-primary font-poppins transition-all" />
                    <!-- nút ẩn hiện mật khẩu bên phải -->
                    <button id="toggle-password" type="button" aria-label="password visibility"
                        class="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-900 hover:text-neutral-800 transition-colors">
                        ${iconEye}
                    </button>
                </div>

                <!-- remember me và forrget password -->
                <div class="flex items-center justify-between text-sm pt-4 pb-5">
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