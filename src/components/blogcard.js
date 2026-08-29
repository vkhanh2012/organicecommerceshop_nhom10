const LATEST_NEWS_DATA = [
  {
    id: "news-1",
    image: "./src/assets/images/blogcard1.svg",
    category: "Food",
    author: "Admin",
    commentsCount: 65,
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    link: "#",

    date: {
      day: "18",
      month: "NOV",
    },
  },
  {
    id: "news-2",
    image: "./src/assets/images/blogcard2.svg",
    category: "Food",
    author: "Admin",
    commentsCount: 65,
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    link: "#",
    date: {
      day: "18",
      month: "NOV",
    },
  },
  {
    id: "news-3",
    image: "./src/assets/images/blogcard3.svg",
    category: "Food",
    author: "Admin",
    commentsCount: 65,
    title:
      "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.",
    link: "#",
    date: {
      day: "18",
      month: "NOV",
    },
  },
]

// Định nghĩa Blog card của latest news
export function renderBlogCardComponent(blogcardData = LATEST_NEWS_DATA) {
  const cardsHtml = blogcardData
    .map(
      (items) => /*html*/ `
            <div class="flex flex-col w-full h-auto mx-auto drop-shadow-sm bg-white rounded-lg hover:shadow-md transition-all">
                <div class="relative w-full h-auto rounded-t-lg aspect-16/10 sm:aspect-4/3 md:aspect-16/10 lg:aspect-424/324 overflow-hidden">
                  <img src=${items.image} alt=${items.title} class="h-full w-full object-cover" loading="lazy"/>
                </div>
                <!-- Nội dung card -->
                <div class="flex flex-col w-full h-auto p-4 sm:p-5 md:p-6 gap-3 sm:gap-4 lg:gap-5 bg-white rounded-b-lg">
                    <div class="flex flex-row flex-wrap w-auto h-auto gap-3 sm:gap-4 md:gap-4 items-center text-neutral-600 text-sm sm:text-base"> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.1583 11.1748L11.1833 17.1498C11.0285 17.3048 10.8447 17.4277 10.6424 17.5116C10.4401 17.5955 10.2232 17.6386 10.0042 17.6386C9.78513 17.6386 9.56825 17.5955 9.36592 17.5116C9.16359 17.4277 8.97978 17.3048 8.82499 17.1498L1.66666 9.99984V1.6665H9.99999L17.1583 8.82484C17.4687 9.13711 17.643 9.55953 17.643 9.99984C17.643 10.4401 17.4687 10.8626 17.1583 11.1748V11.1748Z" stroke="#B3B3B3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.83331 5.83301H5.84165" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> ${items.category}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.99993 9.16667C11.8409 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.8409 2.5 9.99993 2.5C8.15898 2.5 6.6666 3.99238 6.6666 5.83333C6.6666 7.67428 8.15898 9.16667 9.99993 9.16667Z" stroke="#B3B3B3" stroke-width="1.2"/>
                        <path d="M12.4999 11.6665H7.49995C5.19828 11.6665 3.13745 13.7915 4.65161 15.524C5.68161 16.7023 7.38495 17.4998 9.99995 17.4998C12.6149 17.4998 14.3174 16.7023 15.3474 15.524C16.8624 13.7907 14.8008 11.6665 12.4999 11.6665Z" stroke="#B3B3B3" stroke-width="1.2"/>
                        </svg> ${items.author} 
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.87382 10.9979L7.83207 12.7338C7.78209 12.8171 7.7114 12.886 7.62687 12.9339C7.54234 12.9817 7.44686 13.0069 7.34973 13.0069C7.25259 13.0069 7.15711 12.9817 7.07258 12.9339C6.98805 12.886 6.91736 12.8171 6.86738 12.7338L5.82676 10.9979C5.77672 10.9146 5.70597 10.8457 5.62139 10.7979C5.53681 10.7501 5.44129 10.725 5.34413 10.7251H1.16251C1.01332 10.7251 0.870248 10.6658 0.764759 10.5603C0.659269 10.4549 0.600006 10.3118 0.600006 10.1626V1.1626C0.600006 1.01341 0.659269 0.870339 0.764759 0.76485C0.870248 0.659361 1.01332 0.600098 1.16251 0.600098H13.5375C13.6867 0.600098 13.8298 0.659361 13.9353 0.76485C14.0407 0.870339 14.1 1.01341 14.1 1.1626V10.1626C14.1 10.3118 14.0407 10.4549 13.9353 10.5603C13.8298 10.6658 13.6867 10.7251 13.5375 10.7251H9.35588C9.25882 10.7251 9.16341 10.7502 9.07894 10.7981C8.99447 10.8459 8.9238 10.9147 8.87382 10.9979V10.9979Z" stroke="#B3B3B3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> ${items.commentsCount} Comment </div>
                    <div class="w-full h-auto text-primary-dark text-base sm:text-xl md:text-xl lg :text-2xl items-start">${items.title}</div>
                    <button class="flex flex-row items-center w-auto rounded-[43px] text-primary border-none cursor-pointer hover:text-primary-dark gap-3">Read More <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.75 6.7749H0.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.70001 0.75L15.75 6.774L9.70001 12.799" stroke="#00B307" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
    `,
    )
    .join("")

  return /*html*/ `
     <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        ${cardsHtml}
    </div>
    `
}
