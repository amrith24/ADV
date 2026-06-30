export const BRAND = {
  name: "Advalora Consulting",
  mark: "Advalora",
  tagline: "Save · Defend · Learn",
  logo: "https://customer-assets.emergentagent.com/job_cio-licensing-guide/artifacts/i3vyt7zp_Logo_ADVALORA%20Q.jpg",
  email: "amrith.pujarie@advaloraconsulting.com",
  whatsapp: "919820771922",
  whatsappDisplay: "+91 98207 71922",
  linkedin: "https://www.linkedin.com/in/amrith-pujarie/",
  address: {
    line1: "C 228 Shreyas Industrial Estate",
    line2: "Near Jay Coach, Goregaon East",
    city: "Mumbai 400063",
    country: "India",
  },
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
