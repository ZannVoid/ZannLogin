export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  description: string;
};

export type StatItem = {
  label: string;
  value: string;
};

export type SkillCategory = {
  title: string;
  label: string;
  description: string;
  tags: string[];
};

export type PortfolioItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  tags: string[];
  image: string;
  href: string;
};

export type ArchiveItem = {
  title: string;
  year: string;
  category: string;
  summary: string;
  link?: string;
};

export type ContactFormFields = {
  labels: Record<string, string>;
  placeholders: Record<string, string>;
  validationMessages: {
    name: string;
    handle: string;
    projectNeed: string;
  };
  whatsappTemplate: string;
};

export type SiteConfig = {
  brand: string;
  founder: string;
  siteTitle: string;
  description: string;
  nav: NavItem[];
  socialLinks: SocialLink[];
  cvHref: string;
  whatsapp: {
    phone: string;
    defaultIntro: string;
  };
  footerMotto: string;
  contactFormFields: ContactFormFields;
  contentIntakeChecklist: string[];
};

export const siteConfig: SiteConfig = {
  brand: "ANIZONE-X",
  founder: "Bendzanu Kamagifi",
  siteTitle: "ANIZONE-X | Portofolio Zann",
  description:
    "Portofolio dark-first untuk Bendzanu Kamagifi, menampilkan arsitektur sistem, cloud, forensik seluler, dan produksi visual dalam satu pengalaman brand yang sinematik.",
  nav: [
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/about" },
    { label: "Portofolio", href: "/portfolio" },
    { label: "Arsip", href: "/archive" },
    { label: "Kontak", href: "/contact" },
  ],
  socialLinks: [
    {
      label: "WhatsApp",
      href: "https://wa.me/6288224853243",
      description: "Kanal tercepat untuk diskusi proyek dan troubleshooting.",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/zannvoid",
      description: "Aktivitas visual, update eksperimen, dan brand presence.",
    },
    {
      label: "GitHub",
      href: "https://github.com/zannvoid",
      description: "Repository eksperimen, otomasi, dan tooling pribadi.",
    },
  ],
  cvHref: "/files/zann-cv-placeholder.txt",
  whatsapp: {
    phone: "6288224853243",
    defaultIntro: "Halo Zann, saya ingin berdiskusi tentang proyek baru.",
  },
  footerMotto: "Realitas yang direkayasa untuk bertahan 24/7.",
  contactFormFields: {
    labels: {
      name: "Nama / Brand",
      handle: "Kontak aktif",
      projectNeed: "Jenis kebutuhan",
      budget: "Budget / skala",
      timeline: "Target waktu",
      message: "Catatan teknis",
    },
    placeholders: {
      name: "Contoh: Studio Atlas",
      handle: "WhatsApp, email, atau akun Telegram",
      projectNeed: "Contoh: landing page premium + setup deployment",
      budget: "Opsional, mis. IDR 3-5 juta",
      timeline: "Opsional, mis. go live dalam 2 minggu",
      message: "Jelaskan konteks, target, atau tantangan utama proyek.",
    },
    validationMessages: {
      name: "Nama atau brand wajib diisi.",
      handle: "Masukkan kontak yang bisa dihubungi.",
      projectNeed: "Jelaskan kebutuhan utamanya terlebih dulu.",
    },
    whatsappTemplate: "Ringkasan permintaan proyek",
  },
  contentIntakeChecklist: [
    "Ganti nomor WhatsApp produksi di site config.",
    "Unggah CV final ke public/files dan perbarui path unduhan.",
    "Ganti hero image dan visual portfolio dengan aset final.",
    "Verifikasi URL GitHub dan Instagram resmi.",
    "Tambahkan metadata proyek nyata ke daftar portfolio dan archive.",
  ],
};

export const heroContent = {
  eyebrow: "Arsitek Sistem // Pelajar SMK",
  headline: ["BENDZANU", "KAMAGIFI"],
  highlight: "KAMAGIFI",
  subheadline:
    "Membangun arsitektur digital tanpa kompromi, dari cloud dan otomasi sampai pemulihan hardware dan visual direction yang terasa hidup.",
  primaryCta: {
    label: "Mulai Proyek",
    href: "/#contact",
  },
  secondaryCta: {
    label: "Lihat Portofolio",
    href: "/portfolio",
  },
  heroImage: "/images/zann-portrait.png",
};

export const stats: StatItem[] = [
  { value: "100+", label: "Sistem dipulihkan" },
  { value: "56GB", label: "Azure compute" },
  { value: "24/7", label: "Mentalitas uptime" },
  { value: "01", label: "Brand operasi" },
];

export const aboutNarrative = [
  "Sebagai pendiri AniZone-X, Zann memadukan rasa ingin tahu masa muda dengan disiplin teknis yang keras. Fokusnya bukan sekadar membuat sistem berjalan, tetapi memastikan semuanya tetap hidup saat tekanan meningkat.",
  "Pendekatannya tetap brutal: fungsionalitas di atas dekorasi. Mulai dari deployment LLM di VPS, cloud orchestration, sampai pemulihan perangkat yang sudah dianggap selesai, setiap proyek diperlakukan sebagai operasi penting yang harus berhasil.",
];

export const principles = [
  "Fungsionalitas di atas ego visual.",
  "Setiap sistem harus bisa dipulihkan, diaudit, dan ditingkatkan.",
  "Brand dan engineering harus terasa satu suara.",
];

export const skillCategories: SkillCategory[] = [
  {
    label: "Infrastruktur",
    title: "Cloud, Kode & AI",
    description:
      "Mengelola lingkungan Azure, VPS performa tinggi, dan instance model lokal untuk eksperimen AI yang tetap dekat ke kebutuhan operasional.",
    tags: ["Azure 56GB", "VPS Deployment", "Ollama LLM"],
  },
  {
    label: "Hardware",
    title: "Rekayasa Perangkat Keras",
    description:
      "Pembongkaran perangkat, diagnostik tingkat komponen, dan pemulihan sistem pasca kerusakan dengan fokus pada stabilitas jangka panjang.",
    tags: ["Disassembly", "Recovery", "Diagnostics"],
  },
  {
    label: "Operasi Khusus",
    title: "Forensik Seluler",
    description:
      "Flashing firmware, modifikasi Android, dan operasi teknis mendalam untuk membuka kembali perangkat yang terkunci atau tidak stabil.",
    tags: ["Flashing", "Unlocking", "TFT Tools"],
  },
  {
    label: "Media",
    title: "Produksi Visual",
    description:
      "Post-processing sinematik dan pengemasan visual berdampak tinggi untuk proyek yang harus terasa sekuat performanya.",
    tags: ["Direction", "Motion", "Post Production"],
  },
];

export const capabilityCards = [
  {
    title: "Operasi Infrastruktur",
    description:
      "Setup environment, deployment, pemantauan, dan stabilisasi sistem lintas cloud dan VPS.",
  },
  {
    title: "Recovery Mission",
    description:
      "Menangani perangkat atau sistem yang rusak, gagal boot, atau terkunci dengan mindset forensik.",
  },
  {
    title: "Brand Execution",
    description:
      "Menyatukan visual, interaksi, dan positioning agar proyek terasa premium sejak first impression.",
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "control-room",
    title: "Control Room Landing System",
    category: "Web Experience",
    description:
      "Landing page sinematik untuk brand teknis dengan struktur CTA yang diarahkan ke kontak cepat dan trust-building visual.",
    impact: "Dirancang untuk mengubah first impression menjadi percakapan proyek dalam hitungan menit.",
    tags: ["Next.js", "Tailwind", "Branding"],
    image: "/images/portfolio-control-room.svg",
    href: "/portfolio#control-room",
  },
  {
    slug: "forensics-lab",
    title: "Forensics Device Lab",
    category: "Device Recovery",
    description:
      "Dokumentasi operasi pemulihan perangkat, flashing, dan validasi pasca recovery untuk perangkat Android bermasalah.",
    impact: "Meningkatkan repeatability proses yang sebelumnya bergantung pada trial and error.",
    tags: ["Android", "Firmware", "Recovery"],
    image: "/images/portfolio-forensics-lab.svg",
    href: "/portfolio#forensics-lab",
  },
  {
    slug: "media-reactor",
    title: "Media Reactor Pipeline",
    category: "Visual Production",
    description:
      "Workflow visual untuk aset promosi dan konten digital berkontras tinggi, dengan output yang tetap konsisten lintas platform.",
    impact: "Mempercepat produksi konten sambil menjaga identitas visual tetap tajam.",
    tags: ["Visual Design", "Editing", "Motion"],
    image: "/images/portfolio-media-reactor.svg",
    href: "/portfolio#media-reactor",
  },
];

export const archiveItems: ArchiveItem[] = [
  {
    year: "2026",
    category: "Brand System",
    title: "ANIZONE-X Portfolio Rebuild",
    summary:
      "Rekonstruksi identitas digital menjadi experience premium berbasis Next.js dengan contact flow yang siap dipakai.",
  },
  {
    year: "2025",
    category: "Cloud Ops",
    title: "Expanded Azure Compute Stack",
    summary:
      "Peningkatan resource komputasi dan eksperimen deployment model lokal untuk workload yang lebih berat.",
  },
  {
    year: "2025",
    category: "Device Recovery",
    title: "Mobile Forensics Routine",
    summary:
      "Penyusunan alur flashing, unlocking, dan recovery device menjadi operasi yang lebih konsisten dan terdokumentasi.",
  },
  {
    year: "2024",
    category: "Foundation",
    title: "AniZone-X Established",
    summary:
      "Memulai brand teknis pribadi dengan fokus pada sistem, perangkat, dan eksperimen yang tidak takut masuk ke area sulit.",
  },
];

export const serviceModes = [
  "Landing page dan portfolio premium",
  "Audit visual untuk brand teknis",
  "Deployment dan stabilisasi stack personal",
  "Recovery dan konsultasi perangkat bermasalah",
];

export const aboutMetrics = [
  { label: "Status", value: "16 Tahun / Siswa SMK" },
  { label: "Beroperasi", value: "Sejak 2024" },
  { label: "Fokus", value: "Cloud, recovery, visual systems" },
];
