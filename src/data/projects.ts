export type Project = {
  slug: string;
  title: string;
  description: string;
  descriptionEn?: string; 
  framework: string[];
  database: string[];
  testing: string[];
  github: string;
  image?: string;
};
  
  export const projects: Project[] = [
    {
      slug: "angkringanku",
      title: "AngkringanKu",
      description: "Aplikasi pencatatan keuangan untuk usaha angkringan, mengacu pada SAK EMKM.",
      framework: ["Flutter"],
      database: ["Firebase"],
      testing: ["Black Box Testing"],
      github: "#",
    },
    {
      slug: "dodigi",
      title: "DODIGI",
      description: "Aplikasi manajemen keuangan pribadi dengan tema hangat dan navigasi yang rapi.",
      framework: ["Flutter", "Riverpod"],
      database: ["Supabase"],
      testing: ["Manual Testing"],
      github: "#",
    },
    ...[3, 4, 5, 6].map((n) => ({
      slug: `dummy-${n}`,
      title: `Project Dummy ${n}`,
      description: "Contoh deskripsi project. Hapus data dummy ini nanti.",
      framework: ["Next.js"],
      database: ["PostgreSQL"],
      testing: ["Unit Test"],
      github: "#",
    })),
  ];