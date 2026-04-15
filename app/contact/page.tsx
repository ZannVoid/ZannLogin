import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact-page-content";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Halaman kontak ANIZONE-X untuk briefing proyek, akses WhatsApp, dan jalur komunikasi utama yang lebih terstruktur.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
