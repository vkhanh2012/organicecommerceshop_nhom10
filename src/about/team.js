import { renderTeamCard } from "../components/teamcard"
import aboutData from "../data/about.json"

export function renderTeamSection(){
    const teamCardHtml = aboutData.teamSection.members
    .map((item) => renderTeamCard(item))
    .join("");
    return /*html*/`
        <section
  class="w-full bg-neutral-50/30
         py-12
         md:py-16
         lg:pt-[80px]
         lg:pb-[79px]"
>
  <div class="container-custom">

    <div class="mx-auto max-w-[720px] text-center">
      <h2
        class="text-[32px] font-semibold
               leading-[38px]
               text-neutral-900
               md:text-[40px] md:leading-[48px]
               lg:text-[48px] lg:leading-[55px]"
      >
        ${aboutData.teamSection.title}
      </h2>

      <p
        class="mt-3
               text-[14px] leading-[21px]
               text-neutral-500
               md:text-[16px] md:leading-[24px]"
      >
        ${aboutData.teamSection.description}
      </p>
    </div>

    <div
      class="mt-16 grid grid-cols-1
             gap-6
             sm:grid-cols-2
             lg:mt-[54px]
             lg:grid-cols-4"
    >
      ${teamCardHtml}
    </div>

  </div>
</section>
    
    
    `;

}
