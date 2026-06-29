export const BRAND = {
  name: "Advalora Consulting",
  mark: "Advalora",
  email: "amrith.pujarie@advaloraconuslting.com",
  whatsapp: "919820771922",
  whatsappDisplay: "+91 98207 71922",
  linkedin: "https://www.linkedin.com/in/amrith-pujarie/",
  founder: {
    name: "Amrith Pujarie",
    title: "Founder & Principal Advisor",
    pedigree: "Ex-Oracle LMS (License Management Services)",
  },
};

export const WHATSAPP_LINK = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
  "Hello Amrith, I'd like to discuss our Oracle / software licensing position."
)}`;

export const MAIL_LINK = `mailto:${BRAND.email}?subject=${encodeURIComponent(
  "Licensing advisory enquiry"
)}`;
