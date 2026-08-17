import { SOCIAL_ICONS, iconStar } from "../components/icons.js";

import cabbage1Svg from "../assets/images/cabbage1.svg";
import cabbage2Svg from "../assets/images/cabbage2.svg";
import cabbage3Svg from "../assets/images/cabbage3.svg";
import cabbage4Svg from "../assets/images/cabbage4.svg";
import largecabageSvg from "../assets/images/largecabage.svg";
import videoSvg from "../assets/images/video.svg";
import avatarSvg from "../assets/images/avatar.svg";
import brandLogoSvg from "../assets/images/brand.svg";

import mangoSvg from "../assets/images/ProductImage/mango.png";
import mango1Svg from "../assets/images/ProductImage/mango1.png";
import mango2Svg from "../assets/images/ProductImage/mango2.svg";
import mango3Svg from "../assets/images/ProductImage/mango3.svg";

import tomatoSvg from "../assets/images/ProductImage/tomato.png";
import tomato1Svg from "../assets/images/ProductImage/tomato1.svg";
import tomato2Svg from "../assets/images/ProductImage/tomato2.png";
import tomato3Svg from "../assets/images/ProductImage/tomato3.png";

import redcapsicumSvg from "../assets/images/ProductImage/redcapsicum.png";
import redcapsicum1Svg from "../assets/images/ProductImage/redcapsicum1.png";
import redcapsicum2Png from "../assets/images/ProductImage/redcapsicum2.png";
import redcapsicum3Png from "../assets/images/ProductImage/redcapsicum3.png";

// 1. DATA ĐỘNG MẶC ĐỊNH CHO SẢN PHẨM
export const defaultProductData = {
  name: "Chinese Cabbage",
  inStock: true,
  sku: "2,51,594",
  rating: 4,
  reviewsCount: 4,
  originalPrice: 48.00,
  currentPrice: 17.28,
  discountLabel: "64% Off",
  brand: "FarmFresh", 
  brandLogo: brandLogoSvg,
  description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
  category: { name: "Vegetables", link: "#" },
  tags: [
    { name: "Vegetables", link: "#" },
    { name: "Healthy", link: "#" },
    { name: "Chinese", link: "#" },
    { name: "Cabbage", link: "#" },
    { name: "Green Cabbage", link: "#" }
  ],
  additionalInfo: {
    weight: "0.3",
    color: "Green",
    type: "Organic",
    category: "Vegetables",
    stockStatus: "Available (5,413)",
    tags: ["Vegetables", "Healthy", "Chinese", "Cabbage", "Green Cabbage"],
    discount: "64% Discount",
    discountSub: "Save your 64% money with us",
    organic: "100% Organic",
    organicSub: "100% Organic Vegetables"
  },
  
  feedbacks: [
    {
      id: 1,
      name: "Kristin Watson",
      avatar: avatarSvg,
      rating: 5,
      time: "2 min ago",
      comment: "Duis at ullamcorper nulla, eu dictum eros."
    },
    {
      id: 2,
      name: "Jane Cooper",
      avatar: avatarSvg,
      rating: 5,
      time: "30 Apr, 2021",
      comment: 'Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to "bolt" or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants.'
    },
    {
      id: 3,
      name: "Jacob Jones",
      avatar: avatarSvg,
      rating: 4,
      time: "2 min ago",
      comment: "Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus."
    },
    {
      id: 4,
      name: "Ralph Edwards",
      avatar: avatarSvg,
      rating: 5,
      time: "2 min ago",
      comment: "200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom Non-GMO Productive Brassica rapa VAR. chinensis, a.k.a. Canton's Choice, Bok Choy, from USA."
    }
  ],
  mainImage: largecabageSvg,
  thumbnails: [cabbage1Svg, cabbage2Svg, cabbage3Svg, cabbage4Svg],
  videoImage: videoSvg,
};


export const tomatoProductData = {
  name: "Fresh Tomato",
  inStock: true,
  sku: "2,51,594",
  rating: 4,
  reviewsCount: 4,
  originalPrice: 16.00,
  currentPrice: 8.00,
  discountLabel: "50% Off",
  brand: "FarmFresh",
  brandLogo: brandLogoSvg,
  description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
  category: { name: "Fresh Fruit", link: "#" },
  tags: [
    { name: "Fresh Fruit", link: "#" },
    { name: "Healthy", link: "#" },
    { name: "Tomato", link: "#" }
  ],
  mainImage: tomatoSvg,
  thumbnails: [tomatoSvg, tomato1Svg, tomato2Svg, tomato3Svg],
  videoImage: videoSvg
};

export const redcapsiumProductData = {
  name: "Red Capsium",
  inStock: true,
  sku: "2,51,594",
  rating: 4,
  reviewsCount: 4,
  originalPrice: null,
  currentPrice: 18.00,
  discountLabel: null,
  brand: "FarmFresh",
  brandLogo: brandLogoSvg,
  description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
  category: { name: "Fresh Fruit", link: "#" },
  tags: [
    { name: "Fresh Fruit", link: "#" },
    { name: "Healthy", link: "#" },
    { name: "Red Capsium", link: "#" }
  ],
  mainImage: redcapsicumSvg,
  thumbnails: [redcapsicumSvg, redcapsicum1Svg, redcapsicum2Png, redcapsicum3Png],
  videoImage: videoSvg
};

export const mangoProductData = {
  name: "Surjapur Mango",
  inStock: true,
  sku: "2,51,594",
  rating: 4,
  reviewsCount: 4,
  originalPrice: null,
  currentPrice: 24.00,
  discountLabel: "64% Off",
  brand: "FarmFresh",
  brandLogo: brandLogoSvg,
  description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
  category: { name: "Fresh Fruit", link: "#" },
  tags: [
    { name: "Fresh Fruit", link: "#" },
    { name: "Healthy", link: "#" },
    { name: "Mango", link: "#" }
  
  ],
  descriptionParagraphs: [
    "Surjapur Mangoes are renowned for their sweet, aromatic flavor and vibrant golden color. Hand-picked from sun-drenched orchards, they are packed with rich vitamins and antioxidants.",
    "Perfect for freshly squeezed juices, smoothies, or fruit salads. Each mango is carefully inspected to ensure peak ripeness and premium quality."
  ],
  features: [
    "100% Organically grown tropical mangoes.",
    "Rich source of Vitamin A, Vitamin C and dietary fiber.",
    "No artificial ripening agents or chemical sprays used.",
    "Hand-harvested at full maturity for natural sweetness."
  ],
  
  relatedProducts: [
    tomatoProductData,
    redcapsiumProductData,
    defaultProductData
  ],
  mainImage: mangoSvg,
  thumbnails: [mangoSvg, mango1Svg, mango2Svg, mango3Svg],
  videoImage: videoSvg
};

export const PRODUCTS_LIST = [
  defaultProductData,
  mangoProductData,
  tomatoProductData,
  redcapsiumProductData
];

export const PRODUCTS_MAP = {
  "Chinese Cabbage": defaultProductData,
  "Surjapur Mango": mangoProductData,
  "Fresh Tomato": tomatoProductData,
  "Red Capsium": redcapsiumProductData,
  "Red Capsicum": redcapsiumProductData,
  "Green Capsicum": redcapsiumProductData
};



