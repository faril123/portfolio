import type { Lang } from "./dictionary";

type L = Record<Lang, string>;

export const about: { paragraphs: L[] } = {
  paragraphs: [
    {
      en: "Informatics graduate with internship experience as a Web Developer, building web and mobile applications. Comfortable with Laravel, React, Flutter, and databases to deliver solutions that fit user needs.",
      id: "Lulusan Teknik Informatika dengan pengalaman magang sebagai Web Developer dan mengembangkan berbagai proyek aplikasi web serta mobile. Terbiasa menggunakan Laravel, React, Flutter, dan basis data untuk membangun solusi sesuai kebutuhan pengguna.",
    },
    {
      en: "I work well in a team, adapt quickly to new technology, and handle challenges and pressure well. I'm interested in building applications that are functional, easy to use, and sustainable.",
      id: "Mampu bekerja sama dalam tim, beradaptasi dengan teknologi baru, serta menghadapi tantangan dan tekanan kerja dengan baik. Tertarik mengembangkan aplikasi yang fungsional, mudah digunakan, dan berkelanjutan.",
    },
  ],
};

export const experience: { period: L; title: L; place: string; detail: L }[] = [
  {
    period: { en: "Oct 2025 – Feb 2026", id: "Okt 2025 – Feb 2026" },
    title: { en: "Freelance Web Developer", id: "Web Developer Freelance" },
    place: "Freelance",
    detail: {
      en: "Built a boarding-house rent system (rooms, electricity, water and Wi-Fi bills, payment tracking) and a motorbike-wash booking system (services, packages, time slots, admin order management), both with Laravel.",
      id: "Membangun sistem sewa kos (kamar, tagihan listrik, air, Wi-Fi, pemantauan pembayaran) dan sistem pemesanan cuci motor (layanan, paket, slot waktu, pengelolaan pesanan oleh admin), keduanya dengan Laravel.",
    },
  },
  {
    period: { en: "Jan 2025 – Jun 2025", id: "Jan 2025 – Jun 2025" },
    title: { en: "Web Developer Intern", id: "Web Developer (Magang)" },
    place: "BID TIK Polda Jatim, Surabaya",
    detail: {
      en: "Developed a web-based inventory system with Laravel and React, replacing manual records for 5 staff and 1 admin, plus a tower-mapping feature to monitor telecommunication infrastructure in East Java.",
      id: "Mengembangkan sistem inventaris berbasis web dengan Laravel dan React, menggantikan pencatatan manual bagi 5 staf dan 1 admin, serta fitur pemetaan tower untuk memantau infrastruktur telekomunikasi di Jawa Timur.",
    },
  },
  {
    period: { en: "Sep 2022 – Aug 2026", id: "Sep 2022 – Agt 2026" },
    title: { en: "B.Sc. Informatics Engineering", id: "Sarjana Teknik Informatika" },
    place: "Universitas 17 Agustus 1945 Surabaya",
    detail: {
      en: "GPA 3.55/4.00. Final thesis: AngkringanKu, a financial recording app for angkringan micro-businesses (Flutter & Firebase, SAK EMKM).",
      id: "IPK 3,55/4,00. Tugas akhir: AngkringanKu, aplikasi pencatatan keuangan untuk usaha angkringan (Flutter & Firebase, SAK EMKM).",
    },
  },
];

export const skills: { group: L; items: string[] }[] = [
  {
    group: { en: "Programming", id: "Pemrograman" },
    items: ["PHP", "JavaScript", "TypeScript", "Dart", "Python", "Java"],
  },
  {
    group: { en: "Frameworks", id: "Framework" },
    items: ["Flutter", "Laravel", "Filament", "React", "Next.js", "Tailwind CSS"],
  },
  {
    group: { en: "Backend & Data", id: "Backend & Data" },
    items: ["Firebase", "Supabase", "MySQL", "PostgreSQL", "REST API"],
  },
  {
    group: { en: "Data Analysis", id: "Analisis Data" },
    items: ["Power BI", "Excel", "Google Colab", "BigQuery"],
  },
  {
    group: { en: "Tools", id: "Tools" },
    items: ["Git", "GitHub", "Postman", "UI/UX"],
  },
  {
    group: { en: "Certificates", id: "Sertifikat" },
    items: [
      "Dbimbing: Web Application Development",
      "LSP Untag Surabaya: Junior Web Development",
      "KarirNex: Data Analyst",
    ],
  },
];

export const contact = {
  email: "farilrahman27@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/faril123" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/faril-rahman-50ab0724b/" },
  ],
};