import { SOCIAL_ICONS, iconStar } from "../components/icons.js";

import cabbage1Svg from "../assets/images/cabbage1.svg";
import cabbage2Svg from "../assets/images/cabbage2.svg";
import cabbage3Svg from "../assets/images/cabbage3.svg";
import cabbage4Svg from "../assets/images/cabbage4.svg";
import largecabageSvg from "../assets/images/largecabage.svg";
import videoSvg from "../assets/images/video.svg";
import avatarSvg from "../assets/images/avatar.svg";
import brandLogoSvg from "../assets/images/brand.svg";

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
      rating: 5,
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