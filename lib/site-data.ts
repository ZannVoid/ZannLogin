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

export type UltimateSkillsetItem = {
  title: string;
  label: string;
  primary: {
    title: string;
    description: string;
  };
  secondary: {
    title: string;
    description: string;
  };
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
    href: "/contact",
  },
  secondaryCta: {
    label: "Lihat Portofolio",
    href: "/portfolio",
  },
  heroImage: "/images/zann-portrait-optimized.jpg",
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

export const ultimateSkillset: UltimateSkillsetItem[] = [
  {
    label: "01",
    title: "OS & System Tweaking",
    primary: {
      title: "Windows Wizard",
      description:
        "Menangani setup Windows/Office, tuning registry, dan debloating agar sistem terasa lebih ringan dan efisien untuk dipakai harian.",
    },
    secondary: {
      title: "Linux Basic",
      description:
        "Paham command line Linux untuk mengelola server, terutama distro Ubuntu dan Debian yang umum dipakai di lingkungan hosting.",
    },
  },
  {
    label: "02",
    title: "Automation & Scripting",
    primary: {
      title: "PowerShell Ninja",
      description:
        "Membuat script otomatis untuk alur kerja repetitif seperti input data Excel ke Word, administrasi file, atau tugas sistem dalam skala besar.",
    },
    secondary: {
      title: "Python Automation",
      description:
        "Menggunakan Python untuk membangun otomasi, bot sederhana, dan pengolah data yang membantu workflow jadi lebih cepat dan konsisten.",
    },
  },
  {
    label: "03",
    title: "Modern Web Development",
    primary: {
      title: "Frontend Master",
      description:
        "Terbiasa membangun antarmuka modern dengan Next.js, React, dan Tailwind CSS untuk menghasilkan web yang bersih, responsif, dan terasa rapi.",
    },
    secondary: {
      title: "Backend Specialist",
      description:
        "Mengembangkan sistem backend berbasis Laravel dan Node.js untuk kebutuhan aplikasi yang stabil, kuat, dan siap berkembang.",
    },
  },
  {
    label: "04",
    title: "Database Management",
    primary: {
      title: "Database Architect",
      description:
        "Merancang skema database dengan PostgreSQL atau MySQL agar struktur data tetap rapi, logis, dan mudah dipelihara.",
    },
    secondary: {
      title: "ORM Mastery",
      description:
        "Mengimplementasikan Prisma ORM supaya integrasi database di codebase terasa lebih cepat, lebih bersih, dan lebih terstruktur.",
    },
  },
  {
    label: "05",
    title: "Server & Infrastructure",
    primary: {
      title: "Pterodactyl Specialist",
      description:
        "Berpengalaman memasang panel hosting game Pterodactyl, mengelola node, dan menyesuaikan Egg script sesuai kebutuhan layanan.",
    },
    secondary: {
      title: "Azure Cloud",
      description:
        "Mengelola VPS berperforma tinggi di Microsoft Azure untuk menjalankan bot, server, dan service yang perlu aktif 24/7.",
    },
  },
  {
    label: "06",
    title: "Networking (Mikrotik)",
    primary: {
      title: "Router Configuration",
      description:
        "Mampu melakukan setup router Mikrotik dari nol hingga jaringan berjalan stabil dan sesuai kebutuhan operasional.",
    },
    secondary: {
      title: "Network Management",
      description:
        "Menangani bandwidth limiting, firewall scripting, dan filtering situs untuk menjaga jaringan lokal tetap terkontrol.",
    },
  },
  {
    label: "07",
    title: "Artificial Intelligence (AI)",
    primary: {
      title: "Self-Hosted AI",
      description:
        "Mampu melakukan deployment AI lokal menggunakan Ollama atau stack sejenis di server sendiri tanpa ketergantungan penuh pada layanan eksternal.",
    },
    secondary: {
      title: "Prompt Engineering",
      description:
        "Terbiasa merancang prompt yang presisi untuk kebutuhan coding, teks, maupun gambar agar hasil AI tetap terarah.",
    },
  },
  {
    label: "08",
    title: "Creative Editing",
    primary: {
      title: "Video Editing",
      description:
        "Mengerjakan video promosi dan cinematic dengan transisi yang halus serta ritme visual yang terasa estetik.",
    },
    secondary: {
      title: "Graphic Design",
      description:
        "Merancang aset visual seperti logo, banner, dan UI web dengan tampilan yang profesional dan beridentitas jelas.",
    },
  },
  {
    label: "09",
    title: "Game Technical Mastery",
    primary: {
      title: "Point Blank Specialist",
      description:
        "Memahami sisi teknis Point Blank, termasuk pengaturan title, gear, dan setup permainan untuk kebutuhan optimasi.",
    },
    secondary: {
      title: "Growtopia Economy",
      description:
        "Menganalisis harga aset high-tier di Growtopia, membaca arah market, dan mencari peluang trading yang rasional.",
    },
  },
  {
    label: "10",
    title: "Web Scraping & Botting",
    primary: {
      title: "Data Miner",
      description:
        "Membangun bot untuk menarik data market secara real-time dari website atau komunitas agar proses pemantauan lebih efisien.",
    },
    secondary: {
      title: "Automated Bot",
      description:
        "Membuat bot helper untuk kebutuhan server, monitoring, atau otomasi lain yang membantu pekerjaan jadi lebih ringan.",
    },
  },
  {
    label: "11",
    title: "Cyber Security Dasar",
    primary: {
      title: "System Hardening",
      description:
        "Melakukan hardening dasar pada server dan panel untuk mengurangi risiko brute force dan gangguan operasional umum.",
    },
    secondary: {
      title: "SSL & Security",
      description:
        "Memahami pemasangan SSL/HTTPS dan konfigurasi keamanan dasar agar website lebih aman dan dipercaya browser.",
    },
  },
  {
    label: "12",
    title: "Business & Branding",
    primary: {
      title: "Brand Builder (AniZone-X)",
      description:
        "Membangun identitas brand dari nol hingga terasa konsisten, dipercaya, dan punya positioning yang jelas.",
    },
    secondary: {
      title: "Sales Copywriting",
      description:
        "Menulis copy penjualan yang tetap persuasif tanpa terasa memaksa, sehingga lebih nyaman dibaca calon klien.",
    },
  },
  {
    label: "13",
    title: "Hardware & PC Tech",
    primary: {
      title: "Hardware Medic",
      description:
        "Menangani troubleshooting PC dan laptop, bongkar pasang perangkat, hingga upgrade komponen seperti RAM, SSD, atau GPU.",
    },
    secondary: {
      title: "Spec Analyst",
      description:
        "Menganalisis pilihan hardware dari sisi price-to-performance agar spesifikasi yang dipilih sesuai kebutuhan produktivitas.",
    },
  },
  {
    label: "14",
    title: "E-commerce Integration",
    primary: {
      title: "Auto-Payment System",
      description:
        "Mengintegrasikan gerbang pembayaran seperti QRIS atau e-wallet agar toko digital dapat memproses transaksi secara otomatis.",
    },
    secondary: {
      title: "Order Management",
      description:
        "Menyusun alur order digital supaya proses delivery ke buyer berjalan lebih instan, rapi, dan minim kesalahan.",
    },
  },
  {
    label: "15",
    title: "Multimedia & Drone",
    primary: {
      title: "Drone Pilot",
      description:
        "Terbiasa mengambil footage cinematic menggunakan drone untuk menghasilkan visual yang dinamis dan terkontrol.",
    },
    secondary: {
      title: "Mobile Photography",
      description:
        "Memahami komposisi, angle, dan grading agar hasil foto dari smartphone terlihat lebih matang dan profesional.",
    },
  },
  {
    label: "16",
    title: "Software Engineering Mindset (RPL)",
    primary: {
      title: "Version Control",
      description:
        "Memahami penggunaan Git dan GitHub untuk penyimpanan versi, pelacakan perubahan, dan kolaborasi kode yang lebih rapi.",
    },
    secondary: {
      title: "Clean Code",
      description:
        "Terbiasa menulis kode yang rapi, mudah dibaca, dan lebih nyaman dipelihara oleh diri sendiri maupun tim.",
    },
  },
  {
    label: "17",
    title: "Project Management",
    primary: {
      title: "Team Coordination",
      description:
        "Mampu berkoordinasi dengan tim dalam menjalankan proyek teknis agar pembagian peran dan alur kerja tetap selaras.",
    },
    secondary: {
      title: "Task Prioritization",
      description:
        "Terbiasa memprioritaskan tugas antara sekolah, proyek teknis, dan bisnis digital agar semuanya tetap berjalan seimbang.",
    },
  },
  {
    label: "18",
    title: "Technical Support",
    primary: {
      title: "Problem Solver",
      description:
        "Cepat mengidentifikasi sumber masalah pada server, website, atau jaringan, lalu mengarahkannya ke solusi yang relevan.",
    },
    secondary: {
      title: "Consultant",
      description:
        "Bisa memberi saran teknis bagi orang yang ingin membangun server, memilih hardware, atau memulai sistem digital dari awal.",
    },
  },
  {
    label: "19",
    title: "API Integration",
    primary: {
      title: "API Connector",
      description:
        "Terbiasa menghubungkan aplikasi dengan layanan pihak ketiga seperti payment gateway, bot Telegram, dan integrasi serupa.",
    },
    secondary: {
      title: "RESTful API",
      description:
        "Mampu membangun RESTful API yang efisien dan mudah dipakai untuk aplikasi web maupun mobile.",
    },
  },
  {
    label: "20",
    title: "Learning & Adaptability",
    primary: {
      title: "Fast Learner",
      description:
        "Cepat beradaptasi dengan tools, framework, dan teknologi baru yang relevan dengan kebutuhan proyek.",
    },
    secondary: {
      title: "Tech Research",
      description:
        "Aktif mencari referensi dari dokumentasi dan forum internasional untuk menemukan pendekatan teknis yang lebih efektif.",
    },
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
    year: "2026",
    category: "Automation Systems",
    title: "Excel-to-Word Workflow Automation",
    summary:
      "Dummy archive untuk menunjukkan kemampuan PowerShell dan scripting dalam mengubah pekerjaan administrasi berulang menjadi alur otomatis yang lebih cepat dan konsisten.",
  },
  {
    year: "2026",
    category: "Web Engineering",
    title: "ZannStore Interface Direction Pass",
    summary:
      "Placeholder arsip untuk project frontend berbasis Next.js, React, dan Tailwind CSS yang menekankan layout premium, CTA jelas, dan responsivitas lintas perangkat.",
  },
  {
    year: "2026",
    category: "Database Systems",
    title: "Prisma Catalog Schema Blueprint",
    summary:
      "Dummy milestone untuk menggambarkan perancangan skema database PostgreSQL atau MySQL beserta implementasi Prisma ORM yang lebih rapi dan mudah dikembangkan.",
  },
  {
    year: "2026",
    category: "Network Ops",
    title: "Mikrotik hAP Lite Baseline Deployment",
    summary:
      "Entry dummy yang merekam setup router Mikrotik dari nol, termasuk pembagian bandwidth, firewall dasar, dan filtering situs untuk kebutuhan jaringan lokal.",
  },
  {
    year: "2026",
    category: "AI Infrastructure",
    title: "Local Ollama Workspace Rollout",
    summary:
      "Arsip simulasi untuk deployment AI lokal di server pribadi, diposisikan sebagai bagian dari eksperimen self-hosted AI dan prompt engineering yang lebih mandiri.",
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
    year: "2025",
    category: "Game Hosting",
    title: "Pterodactyl Egg Customization Sprint",
    summary:
      "Dummy archive untuk kemampuan server game hosting yang mencakup pemasangan panel Pterodactyl, pengelolaan node, dan penyesuaian Egg script.",
  },
  {
    year: "2025",
    category: "Security Layer",
    title: "SSL and Panel Hardening Pass",
    summary:
      "Milestone dummy yang menggambarkan pemasangan SSL/HTTPS, penyusunan konfigurasi keamanan dasar, dan hardening awal untuk panel maupun website.",
  },
  {
    year: "2025",
    category: "Bot Systems",
    title: "Realtime Market Scraper Prototype",
    summary:
      "Entry dummy yang mewakili kemampuan web scraping dan botting untuk menarik data market real-time dari website atau komunitas dengan alur pemantauan yang lebih efisien.",
  },
  {
    year: "2025",
    category: "Commerce Flow",
    title: "QRIS Auto-Payment Checkout Mockup",
    summary:
      "Arsip simulasi untuk integrasi pembayaran digital dan order management, dengan fokus pada alur checkout yang lebih otomatis untuk toko digital.",
  },
  {
    year: "2024",
    category: "Foundation",
    title: "AniZone-X Established",
    summary:
      "Memulai brand teknis pribadi dengan fokus pada sistem, perangkat, dan eksperimen yang tidak takut masuk ke area sulit.",
  },
  {
    year: "2024",
    category: "Visual Identity",
    title: "AniZone-X Brand Builder Draft",
    summary:
      "Dummy archive yang menandai fase awal pembangunan identitas brand, termasuk positioning, gaya visual, dan copywriting untuk kebutuhan promosi.",
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
