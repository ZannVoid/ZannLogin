import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin",
  description:
    "Dashboard admin internal untuk mengelola project, archive, dan lead ZannVoid.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
