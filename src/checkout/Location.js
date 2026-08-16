// src/checkout/Location.js

export const locations = {
  US: {
    name: "United States",
    states: [
      "California",
      "Texas",
      "New York",
      "Florida",
      "Washington",
    ],
  },

  VN: {
    name: "Vietnam",
    states: [
      "Hồ Chí Minh",
      "Hà Nội",
      "Đà Nẵng",
      "Hải Phòng",
      "Cần Thơ",
    ],
  },

  JP: {
    name: "Japan",
    states: [
      "Tokyo",
      "Osaka",
      "Kyoto",
      "Hokkaido",
      "Okinawa",
    ],
  },

  KR: {
    name: "South Korea",
    states: [
      "Seoul",
      "Busan",
      "Incheon",
      "Daegu",
      "Daejeon",
    ],
  },

  CA: {
    name: "Canada",
    states: [
      "Ontario",
      "Quebec",
      "British Columbia",
      "Alberta",
      "Manitoba",
    ],
  },
};


// ================================
// COUNTRY OPTIONS
// ================================
export function renderCountryOptions() {
  return `
    <option value="">Select</option>

    ${Object.entries(locations)
      .map(
        ([code, country]) => `
          <option value="${code}">
            ${country.name}
          </option>
        `
      )
      .join("")}
  `;
}


// ================================
// STATE OPTIONS
// ================================
export function renderStateOptions(countryCode) {
  if (!countryCode || !locations[countryCode]) {
    return `<option value="">Select country first</option>`;
  }

  return `
    <option value="">Select</option>

    ${locations[countryCode].states
      .map(
        (state) => `
          <option value="${state}">
            ${state}
          </option>
        `
      )
      .join("")}
  `;
}


// ================================
// COUNTRY → STATE EVENT
// ================================
export function bindLocationEvents(container = document) {
  const countrySelect = container.querySelector("#country-select");
  const stateSelect = container.querySelector("#state-select");

  if (!countrySelect || !stateSelect) {
    console.warn("Không tìm thấy #country-select hoặc #state-select");
    return;
  }

  countrySelect.addEventListener("change", (e) => {
    const selectedCountryCode = e.target.value;

    stateSelect.innerHTML = renderStateOptions(selectedCountryCode);
  });
}