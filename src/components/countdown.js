const TIME_PARTS = [
  ["days", "Days"],
  ["hours", "Hours"],
  ["minutes", "Mins"],
  ["seconds", "Secs"],
];

function getRemainingTime(endTime) {
  const distance = Math.max(0, endTime - Date.now());

  return {
    ended: distance === 0,
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

function updateCountdown(element) {
  const endTime = Date.parse(element.dataset.countdownEnd || "");

  if (Number.isNaN(endTime)) {
    element.textContent = "Đã kết thúc";
    return true;
  }

  const remaining = getRemainingTime(endTime);
  if (remaining.ended) {
    element.innerHTML = '<span class="text-sm font-medium text-error">Đã kết thúc</span>';
    return true;
  }

  TIME_PARTS.forEach(([part]) => {
    const output = element.querySelector(`[data-countdown-part="${part}"]`);
    if (output) output.textContent = String(remaining[part]).padStart(2, "0");
  });

  return false;
}

export function renderCountdown(endTime) {
  if (!endTime) {
    return '<span class="text-sm font-medium text-error">Đã kết thúc</span>';
  }

  return `
    <div class="mt-[14px] flex items-start justify-center" data-countdown-end="${endTime}" role="timer" aria-live="polite">
      ${TIME_PARTS.map(([part, label], index) => `
        ${index ? '<span class="pt-[1px] text-[14px] leading-[24px] text-neutral-300">:</span>' : ""}
        <div class="w-[60px] text-center">
          <strong class="block text-[18px] font-normal leading-[30px] text-neutral-900" data-countdown-part="${part}">00</strong>
          <span class="mt-[1px] block text-[10px] font-normal uppercase leading-[15px] text-neutral-400">${label}</span>
        </div>
      `).join("")}
    </div>
  `;
}

export function bindCountdowns(root = document) {
  root.querySelectorAll("[data-countdown-end]").forEach((element) => {
    if (element.dataset.countdownBound === "true") return;
    element.dataset.countdownBound = "true";

    if (updateCountdown(element)) return;

    const timer = window.setInterval(() => {
      if (!element.isConnected || updateCountdown(element)) {
        window.clearInterval(timer);
      }
    }, 1000);
  });
}
