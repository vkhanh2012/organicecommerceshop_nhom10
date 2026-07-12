
export function renderTestimonialCardComponent() {
    return /*html*/ `
    <div class="flex flex-col justify-between bg-white w-full h-auto sm:h-[240px] md:h-[254px] p-4 sm:p-5 md:p-6 shadow-md border border-gray-100 rounded-lg">
        <!--Dấu nháy kép-->
        <div>
            <div class="w-[24px] h-[20px] sm:w-[28px] sm:h-[23px] md:w-[32px] md:h-[26px] flex items-center justify-center">
                <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M23.8222 0C20.4357 0 17.6851 2.65696 17.6851 5.9336C17.6851 9.20821 20.4357 11.8672 23.8222 11.8672C29.6404 11.8672 26.2689 22.171 18.931 23.2443C18.5848 23.2936 18.2688 23.4578 18.0403 23.7071C17.8117 23.9563 17.6857 24.2742 17.6851 24.6032C17.6851 25.4456 18.487 26.1119 19.3751 25.9843C32.7122 24.0847 37.4546 0.00202497 23.8222 0.00202497V0ZM6.13933 0C2.74847 0 0 2.65493 0 5.9336C0 9.20619 2.74847 11.8631 6.13933 11.8631C11.9553 11.8631 8.58385 22.171 1.24597 23.2443C0.900119 23.2936 0.584431 23.4575 0.355931 23.7063C0.127431 23.9551 0.00118682 24.2725 0 24.6011C0 25.4436 0.801907 26.1098 1.68788 25.9823C15.0293 24.0827 19.7717 0 6.13933 0Z" fill="#00B307"/>
                </svg>
            </div>
             <!--Phần bình luận-->
             <p class="font-['Poppins'] text-gray-700 text-sm md:text-base mt-2 sm:mt-3 md:mt-4 mb-4 sm:mb-5 md:mb-6 text-left">
                Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget
             </p>
             <!--Phần thông tin người bình luận-->
            <div class="flex flex-row items-center gap-2 sm:gap-2 md:gap-3">
                <img class="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] rounded-full object-cover" src="https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2026/1/29/9eab9419a970272e7e61-1769692346581810375237.jpg" alt="Client Avatar">
                <div class="flex flex-col justify-center items-start w-auto">
                    <p class="font-bold text-gray-900">Jennie</p>
                    <p class="text-gray-400 text-xs md:text-sm">Customer</p>
                </div>
            </div>
        </div>
    </div>
    `
}



