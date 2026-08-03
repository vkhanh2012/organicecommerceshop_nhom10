import { renderTeamCard } from "../components/teamcard"
import aboutData from "../data/about.json"

export function renderTeamSection(){
    const teamCardHtml = aboutData.teamSection.members
    .map((item) => renderTeamCard(item))
    .join("");
    return /*html*/`
        <section class="container-custom flex flex-col sm:flex-cols-2 items-center w-full bg-white ">
            <!-- Tiêu đề và mô tả -->
            <div class="flex flex-col max-w-160 text-center space-y-3">
                <h1 class="text-title-900 font-semibold text-2xl sm:text-[28px] md:text-4xl lg:text-[48px]">
                    ${aboutData.teamSection.title}
                </h1>
                <p class="text-content-600 text-center font-medium text-xs md:text-[16px]">
                   ${aboutData.teamSection.description}
                </p>
            </div>
            <!-- 4 teamcard -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                ${teamCardHtml}
            </div>
        </section>
    
    
    `;

}