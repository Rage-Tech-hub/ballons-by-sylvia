/*
  Single source of truth for business facts used on the page.
  Every value is tagged. Change here, not in components.
*/

export const BIZ = {
  name: "Balloons By Sylvia", // VERIFIED: facebook.com/Balloonsbysylvia, balloonsbysylvia.com/contact
  phoneDisplay: "07563 372067", // VERIFIED: balloonsbysylvia.com/contact + Facebook page
  phoneTel: "+447563372067",
  email: "balloonsbysylvia@gmail.com", // VERIFIED: balloonsbysylvia.com/contact
  instagram: "https://www.instagram.com/balloonsbysylvia/", // VERIFIED
  facebook: "https://www.facebook.com/Balloonsbysylvia/", // VERIFIED
  tiktok: "https://www.tiktok.com/@balloonsbysylvia", // VERIFIED via tiktok.com/discover
  areas: ["London", "Kent", "Essex", "Surrey"], // VERIFIED: balloonsbysylvia.com/contact footer
  tagline: "Luxury Balloon Stylist", // VERIFIED: Instagram display name
  startingPrice: "£90", // VERIFIED: balloonsbysylvia.com/product-page/mini-garland
  instagramFollowers: "2,400+", // VERIFIED: Instagram shows 2,425 followers (date of research)
  instagramPosts: "1,500+", // VERIFIED: 1,515 posts
  referral:
    "Refer a friend. When they make their first booking, you get 10% off your next one.", // VERIFIED: contact page (conditions apply)
  // UNKNOWN items (owner must supply): Google rating/review count, years in business,
  // public liability insurance, logo file, real photos, guarantee wording, hours.
  hours: "[OWNER TO CONFIRM — e.g. Mon–Sun, 9am–8pm]",
};

export const WA_LINK = `https://wa.me/447563372067?text=${encodeURIComponent(
  "Hi Sylvia, I'd like a quote for balloon decor. Date: ___ Area: ___ Occasion: ___"
)}`;
