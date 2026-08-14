export function renderSignInForm() {
  return /*html*/ `
    <section class="container-custom flex justify-center w-full py-8 md:py-20 items-center bg-white">
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
                        <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.75 6.58333C0.75 6.58333 3.78 0.75 9.08333 0.75C14.3867 0.75 17.4167 6.58333 17.4167 6.58333C17.4167 6.58333 14.3867 12.4167 9.08333 12.4167C3.78 12.4167 0.75 6.58333 0.75 6.58333Z"
                                stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M9.08337 9.08301C9.74642 9.08301 10.3823 8.81962 10.8511 8.35077C11.32 7.88193 11.5834 7.24605 11.5834 6.58301C11.5834 5.91997 11.32 5.28408 10.8511 4.81524C10.3823 4.3464 9.74642 4.08301 9.08337 4.08301C8.42033 4.08301 7.78445 4.3464 7.31561 4.81524C6.84677 5.28408 6.58337 5.91997 6.58337 6.58301C6.58337 7.24605 6.84677 7.88193 7.31561 8.35077C7.78445 8.81962 8.42033 9.08301 9.08337 9.08301V9.08301Z"
                                stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
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
                    <a href="./signup.html" class=" font-semibold text-neutral-900 text-sm hover:text-primary transition-colors">
                        Register
                    </a>
                </p>
            </form>
        </div>
    </section>
    `
}
