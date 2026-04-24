import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact-page-content";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Halaman kontak Bendzanu Kamagifi (ZannVoid) untuk briefing proyek website, UI/UX, dan automation yang lebih terstruktur.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
