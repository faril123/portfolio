const en = {
  nav: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    skills: "Skills",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    status: "Open to collaborate, work & intern",
    name: "Faril Rahman",
    role: "Web & Mobile Developer",
    title: "Faril Rahman. Web & Mobile Developer.",
    subtitle:
      "Informatics graduate focused on Flutter, Laravel, and clean UI/UX, building apps that solve real problems.",
    ctaProjects: "View Projects",
    ctaCv: "Download CV",
    ctaContact: "Contact",
    toolsLabel: "Selected work",
  },
  sections: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    skills: "Skills",
    contact: "Contact",
  },
  projects: {
    seeAll: "See all",
    allProjects: "All Projects",
    back: "Back",
    prev: "Previous",
    next: "Next",
    framework: "Framework",
    database: "Database",
    testing: "Testing",
    mockup: "Mockup",
    github: "GitHub",
  },
  contact: {
    blurb:
      "Open to internships, collaborations, and interesting projects. Feel free to reach out.",
  },
};

const id: typeof en = {
  nav: {
    about: "Tentang",
    projects: "Proyek",
    experience: "Pengalaman",
    skills: "Keahlian",
    contact: "Kontak",
    menu: "Menu",
    close: "Tutup",
  },
  hero: {
    status: "Terbuka untuk kolaborasi, kerja & magang",
    name: "Faril Rahman",
    role: "Web & Mobile Developer",
    title: "Faril Rahman. Web & Mobile Developer.",
    subtitle:
      "Lulusan Teknik Informatika yang fokus pada Flutter, Laravel, dan UI/UX yang rapi, membangun aplikasi yang menyelesaikan masalah nyata.",
    ctaProjects: "Lihat Proyek",
    ctaCv: "Unduh CV",
    ctaContact: "Hubungi Saya",
    toolsLabel: "Karya pilihan",
  },
  sections: {
    about: "Tentang",
    projects: "Proyek",
    experience: "Pengalaman",
    skills: "Keahlian",
    contact: "Kontak",
  },
  projects: {
    seeAll: "Lihat semua",
    allProjects: "Semua Proyek",
    back: "Kembali",
    prev: "Sebelumnya",
    next: "Berikutnya",
    framework: "Framework",
    database: "Database",
    testing: "Pengujian",
    mockup: "Mockup",
    github: "GitHub",
  },
  contact: {
    blurb:
      "Terbuka untuk magang, kolaborasi, dan proyek menarik. Silakan hubungi saya.",
  },
};

export const dict = { en, id };
export type Lang = keyof typeof dict;