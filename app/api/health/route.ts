import {
  countContactLeads,
  getContactLeadStorageInfo,
} from "@/backend/contact/service";
import { listArchives, listProjects } from "@/backend/content/service";
import { getContentStorageInfo } from "@/backend/content/store";
import { jsonNoStore } from "@/backend/http/json";

export const runtime = "nodejs";

export async function GET() {
  const issues: string[] = [];
  let totalLeads = 0;
  let totalProjects = 0;
  let totalArchives = 0;

  try {
    totalLeads = await countContactLeads();
  } catch (error) {
    console.error("Health check: failed to count leads", error);
    issues.push("Lead storage belum siap diakses.");
  }

  try {
    totalProjects = await listProjects({ status: "all" }).then((items) => items.length);
  } catch (error) {
    console.error("Health check: failed to count projects", error);
    issues.push("Project storage belum siap diakses.");
  }

  try {
    totalArchives = await listArchives({ status: "all" }).then((items) => items.length);
  } catch (error) {
    console.error("Health check: failed to count archives", error);
    issues.push("Archive storage belum siap diakses.");
  }

  return jsonNoStore(
    {
      status: issues.length === 0 ? "ok" : "degraded",
      service: "zannvoid-content-backend",
      storageMode: getContactLeadStorageInfo().storageMode,
      contentStorageMode: getContentStorageInfo().mode,
      totalLeads,
      totalProjects,
      totalArchives,
      issues,
      timestamp: new Date().toISOString(),
    },
    { status: issues.length === 0 ? 200 : 207 },
  );
}
