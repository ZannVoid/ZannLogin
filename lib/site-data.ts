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

export type AchievementItem = {
  label: string;
  title: string;
  value: string;
  description: string;
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
  siteUrl: string;
  tagline: string;
  keywords: string[];
  sameAs: string[];
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
  brand: "ZannVoid",
  founder: "Bendzanu Kamagifi",
  siteTitle: "Bendzanu Kamagifi (ZannVoid) - Web Developer Indonesia",
  description:
    "Bendzanu Kamagifi, dikenal sebagai ZannVoid, adalah Web Developer Indonesia yang fokus pada Next.js, UI/UX, automation, dan sistem digital.",
  siteUrl: "https://zannvoid.my.id",
  tagline: "ZannVoid - Web Developer Indonesia",
  keywords: [
    "Bendzanu Kamagifi",
    "ZannVoid",
    "Zann Void",
    "ZannVoid Developer",
    "Web Developer Indonesia",
    "Next.js Developer Indonesia",
  ],
  sameAs: [
    "https://github.com/ZannVoid",
    "https://instagram.com/zannvoid",
  ],
  nav: [
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Portofolio", href: "/portfolio" },
    { label: "Arsip", href: "/archive" },
    { label: "Kontak", href: "/contact" },
  ],
  socialLinks: [
    {
      label: "WhatsApp",
      href: "https://wa.me/6288224853243",
      description: "Kanal tercepat untuk diskusi proyek website, UI/UX, atau automation.",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/zannvoid",
      description: "Update visual, proses build, dan personal brand ZannVoid.",
    },
    {
      label: "GitHub",
      href: "https://github.com/ZannVoid",
      description: "Repository Next.js, automation, dan eksperimen produk digital.",
    },
  ],
  cvHref: "/files/zann-cv-placeholder.txt",
  whatsapp: {
    phone: "6288224853243",
    defaultIntro:
      "Halo Bendzanu, saya ingin berdiskusi tentang proyek website atau automation.",
  },
  footerMotto:
    "Next.js, UI/UX, dan automation system untuk brand digital yang ingin terlihat serius.",
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
    "Jelaskan tujuan website atau landing page yang ingin dibangun.",
    "Sertakan referensi visual, tone brand, atau contoh situs yang disukai.",
    "Tentukan CTA utama, target audiens, dan platform yang diprioritaskan.",
    "Jika perlu automation, jelaskan alur manual yang ingin dipangkas.",
    "Sertakan link GitHub, Instagram, atau website yang ingin disambungkan.",
  ],
};

export const heroContent = {
  eyebrow: "Personal Brand / Next.js / Automation",
  headline: ["BENDZANU", "KAMAGIFI"],
  highlight: "KAMAGIFI",
  subheadline:
    "Bendzanu Kamagifi, dikenal sebagai ZannVoid, adalah developer yang fokus pada Next.js, UI/UX, dan automation system.",
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
  { value: "Next.js", label: "Main stack" },
  { value: "UI/UX", label: "Design focus" },
  { value: "Automation", label: "Workflow layer" },
  { value: "Indonesia", label: "Base signal" },
];

export const aboutNarrative = [
  "Bendzanu Kamagifi, dikenal sebagai ZannVoid, membangun identitasnya sebagai Web Developer Indonesia yang menggabungkan kejelasan engineering dengan taste visual yang rapi.",
  "Fokus utamanya ada pada Next.js, UI/UX, automation, dan sistem digital yang terasa profesional sejak first impression sampai flow backend di belakang layar.",
  "Di luar jalur teknis, ia juga punya rekam disiplin belajar yang kuat: wisuda Amtsilati dan menuntaskan khatam umum dalam 4 bulan, lebih cepat dari durasi umum 8 bulan.",
];

export const achievementHighlights: AchievementItem[] = [
  {
    label: "01",
    title: "Wisuda Amtsilati",
    value: "Lulus dan diwisuda",
    description:
      "Prestasi ini menjadi penanda bahwa konsistensi belajar bukan sekadar wacana, tapi sesuatu yang benar-benar dijalani sampai tuntas.",
  },
  {
    label: "02",
    title: "Khatam Umum",
    value: "4 bulan dari 8 bulan",
    description:
      "Jika jalur umumnya ditempuh sekitar 8 bulan, Bendzanu menyelesaikannya dalam 4 bulan dengan ritme belajar yang lebih cepat dan lebih disiplin.",
  },
  {
    label: "03",
    title: "Mentalitas Belajar",
    value: "Cepat tangkap, tahan proses",
    description:
      "Achievement ini ikut membentuk cara kerjanya hari ini: serius saat belajar, cepat beradaptasi, dan tidak gampang berhenti saat target belum tercapai.",
  },
];

export const principles = [
  "Identitas brand harus konsisten di setiap platform.",
  "Website harus cepat, jelas, dan mudah dipahami manusia maupun search engine.",
  "Automation dipakai untuk memangkas kerja manual tanpa merusak pengalaman pengguna.",
];

export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    title: "Next.js Product Build",
    description:
      "Membangun website, landing page, dan interface modern dengan Next.js, React, dan Tailwind CSS untuk hasil yang cepat, rapi, dan siap deploy.",
    tags: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    label: "Design",
    title: "UI/UX & Conversion Flow",
    description:
      "Menyusun struktur halaman, hierarchy visual, dan CTA agar brand terasa lebih meyakinkan serta lebih mudah dipahami pengunjung.",
    tags: ["Wireframe", "UI Audit", "Landing Page"],
  },
  {
    label: "Automation",
    title: "Workflow & System Automation",
    description:
      "Menghubungkan form, dashboard, API, dan alur kerja otomatis supaya proses bisnis digital berjalan lebih cepat dan lebih stabil.",
    tags: ["API", "Dashboard", "Workflow"],
  },
  {
    label: "Delivery",
    title: "Deployment & Digital Ops",
    description:
      "Menangani deployment, integrasi backend, dan maintenance dasar supaya produk digital siap dipakai, dipantau, dan dikembangkan.",
    tags: ["Vercel", "Supabase", "System Design"],
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
      title: "Brand Builder (ZannVoid)",
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
    title: "Next.js Development",
    description:
      "Membangun website dan aplikasi web modern yang cepat, responsif, dan siap dikembangkan.",
  },
  {
    title: "UI/UX Systems",
    description:
      "Merapikan hierarki visual, struktur halaman, dan alur interaksi agar brand terasa lebih premium.",
  },
  {
    title: "Automation Workflow",
    description:
      "Mengotomatisasi flow berulang dari form, dashboard, hingga integrasi API untuk menghemat waktu eksekusi.",
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "zannvoid-personal-site",
    title: "ZannVoid Personal Brand Website",
    category: "Web Experience",
    description:
      "Website personal berbasis Next.js yang menyatukan nama Bendzanu Kamagifi dan alias ZannVoid dalam satu identitas digital yang konsisten.",
    impact:
      "Membantu search engine dan pengunjung memahami bahwa website, GitHub, dan social profile merujuk ke orang yang sama.",
    tags: ["Next.js", "SEO", "Personal Branding"],
    image: "/images/portfolio-control-room.svg",
    href: "/portfolio#zannvoid-personal-site",
  },
  {
    slug: "zannlogin-system",
    title: "ZannLogin Modern Login System",
    category: "Product UI",
    description:
      "Eksperimen login system modern dengan fokus pada tampilan, struktur komponen, dan pengalaman pengguna yang lebih bersih.",
    impact:
      "Membentuk fondasi produk yang bisa dipakai sebagai showcase kualitas UI, front-end engineering, dan personal brand developer.",
    tags: ["Next.js", "Authentication", "UI/UX"],
    image: "/images/portfolio-forensics-lab.svg",
    href: "/portfolio#zannlogin-system",
  },
  {
    slug: "automation-briefing-flow",
    title: "Automation Briefing Flow",
    category: "Automation",
    description:
      "Alur kontak dan pengumpulan brief yang dihubungkan ke sistem backend sederhana untuk memangkas kerja manual.",
    impact:
      "Membuat intake proyek lebih rapi, lebih mudah ditindaklanjuti, dan lebih siap dikembangkan menjadi workflow otomatis penuh.",
    tags: ["Automation", "Forms", "Backend"],
    image: "/images/portfolio-media-reactor.svg",
    href: "/portfolio#automation-briefing-flow",
  },
];

export const archiveItems: ArchiveItem[] = [
  {
    year: "2026",
    category: "SEO System",
    title: "Personal Name Domination System",
    summary:
      "Penyatuan branding Bendzanu Kamagifi (ZannVoid) di website, GitHub, dan social profile untuk membangun sinyal entity yang lebih kuat.",
  },
  {
    year: "2026",
    category: "Brand Warfare",
    title: "ZannVoid Portfolio Rebuild, Biar First Impression Nggak Kayak Proyek Nanggung",
    summary:
      "Website ZannVoid dibongkar lalu dirakit ulang jadi experience yang lebih tajam, lebih mahal rasanya, dan nggak bikin orang mikir ini cuma landing page yang kebetulan gelap.",
  },
  {
    year: "2026",
    category: "Automation Ops",
    title: "Spreadsheet Treadmill Shutdown",
    summary:
      "Alur Excel ke Word dibikin otomatis full supaya kerja admin berhenti terasa kayak hukuman mingguan yang diwarisin dari zaman batu.",
  },
  {
    year: "2026",
    category: "Frontend Heat",
    title: "ZannLogin Interface Direction, Versi Nggak Malu-Maluin",
    summary:
      "Arah visual ZannLogin dipoles ulang biar layout, CTA, dan ritme halamannya nggak terasa kayak hasil gabung tiga template yang belum sempat akur.",
  },
  {
    year: "2026",
    category: "Data Backbone",
    title: "Schema Biar Query Nggak Tumbuh Jadi Dosa Kolektif",
    summary:
      "Skema PostgreSQL dan Prisma dirancang ulang biar data tetap waras, relasi nggak saling jegal, dan query nggak berubah jadi cerita horor tiap ada fitur baru.",
  },
  {
    year: "2026",
    category: "Network Discipline",
    title: "Mikrotik Rumah, Versi Nggak Asal Nyala",
    summary:
      "Setup Mikrotik hAP lite dirapihin dari nol, lengkap dengan bandwidth control dan filtering, jadi Wi-Fi dipake sesuai aturan, bukan sesuai siapa yang paling barbar.",
  },
  {
    year: "2026",
    category: "AI Underground",
    title: "Ollama Lokal, Biar AI Nggak Sok Cloud Terus",
    summary:
      "Workspace Ollama lokal digelar buat ngetes model sendiri dengan kontrol penuh, karena kadang solusi paling waras memang nggak numpang hidup di dashboard orang lain.",
  },
  {
    year: "2025",
    category: "Product Build",
    title: "ZannLogin Interface System",
    summary:
      "Perancangan login system modern berbasis Next.js sebagai salah satu showcase utama untuk identitas ZannVoid.",
  },
  {
    year: "2025",
    category: "Automation",
    title: "Automation Workflow Stack",
    summary:
      "Penyusunan alur formulir, API, dan dashboard internal supaya proses digital lebih cepat serta mudah dirawat.",
  },
  {
    year: "2025",
    category: "Cloud Pressure",
    title: "Azure Stack Upgrade, Biar Bot Nggak Ngemis Napas",
    summary:
      "Resource Azure dinaikin buat nampung workload yang makin berat tanpa drama performa sok tegar padahal CPU udah minta ampun.",
  },
  {
    year: "2025",
    category: "Firmware Rehab",
    title: "Device Recovery Loop yang Nggak Ngandelin Hoki",
    summary:
      "Flashing, unlocking, dan recovery device dibikin jadi alur yang lebih konsisten, jadi prosesnya nggak terasa kayak ritual coba-coba sambil berharap keajaiban.",
  },
  {
    year: "2025",
    category: "Game Infra",
    title: "Pterodactyl Tuning Session Buat Server yang Nggak Manja",
    summary:
      "Panel Pterodactyl, node, dan Egg script dituning biar environment game hosting jalan sesuai maunya operator, bukan sesuai mood konfigurasi bawaan.",
  },
  {
    year: "2025",
    category: "Security Slap",
    title: "HTTPS Dipasang, Panel Dikasih Rem",
    summary:
      "Lapisan keamanan dasar dipasang dari SSL sampai hardening panel, karena nunggu diserang dulu baru panik itu strategi yang cocoknya buat orang iseng.",
  },
  {
    year: "2025",
    category: "Bot Circuits",
    title: "Scraper Market yang Kerja Saat Orang Lain Masih Refresh Manual",
    summary:
      "Bot scraping dirakit buat narik data market real-time dari berbagai sumber, jadi keputusan bisa lahir dari data, bukan dari perasaan yang kebanyakan pede.",
  },
  {
    year: "2025",
    category: "Checkout Ops",
    title: "Checkout Biar Duit Masuk Tanpa Drama Panjang",
    summary:
      "Flow QRIS dan order delivery dibikin lebih otomatis supaya transaksi masuk, pesanan jalan, dan nggak ada lagi sesi nunggu bukti transfer kayak sedang jaga loket.",
  },
  {
    year: "2024",
    category: "Foundation",
    title: "ZannVoid Identity Started",
    summary:
      "Mulai membangun identitas personal sebagai developer yang menggabungkan web, visual taste, dan sistem digital.",
  },
  {
    year: "2024",
    category: "Identity Pressure",
    title: "Brand Draft yang Nggak Bau Template Gratisan",
    summary:
      "Fase awal identitas visual dan positioning dirakit buat nyari suara brand yang lebih nancep, biar tampilannya nggak terasa kayak pinjam muka dari internet lalu pura-pura unik.",
  },
];

export const serviceModes = [
  "Next.js website dan landing page premium",
  "UI/UX audit untuk personal brand dan bisnis digital",
  "Automation workflow untuk form, dashboard, dan operasional",
  "Deployment dan integrasi sistem digital",
];

export const aboutMetrics = [
  { label: "Status", value: "16 Tahun / Siswa SMK" },
  { label: "Prestasi", value: "Wisuda Amtsilati" },
  { label: "Khatam Umum", value: "4 bulan dari 8 bulan" },
  { label: "Fokus", value: "Next.js, UI/UX, automation" },
];
