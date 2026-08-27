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
    <option value="">Select Country / Region</option>

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
export function renderStateOptions(countryKey) {
  if (!countryKey) {
    return `<option value="">Select country first</option>`;
  }

  // Tra cứu linh hoạt theo cả mã (VN, US) lẫn tên đầy đủ (Vietnam, United States)
  const countryObj = locations[countryKey] || Object.values(locations).find(c => c.name.toLowerCase() === String(countryKey).toLowerCase());

  if (!countryObj || !countryObj.states) {
    return `<option value="">Select country first</option>`;
  }

  return `
    <option value="">Select State / Province</option>

    ${countryObj.states
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
  const countrySelect = container.querySelector("#country-select") || container.querySelector("#country");
  const stateSelect = container.querySelector("#state-select") || container.querySelector("#state");

  if (!countrySelect || !stateSelect) {
    console.warn("Không tìm thấy #country-select hoặc #state-select");
    return;
  }

  const updateStateOptions = () => {
    const selectedValue = countrySelect.value;
    stateSelect.innerHTML = renderStateOptions(selectedValue);
  };

  // Nếu quốc gia đã được chọn sẵn khi vào trang -> tự động đổ danh sách tỉnh thành ngay lập tức
  if (countrySelect.value) {
    updateStateOptions();
  }

  countrySelect.addEventListener("change", updateStateOptions);
}

export default {
  locations,
  renderCountryOptions,
  renderStateOptions,
  bindLocationEvents
};