import {
  countContactLeads,
  getContactLeadStorageInfo,
} from "@/backend/contact/service";
import { listArchives, listProjects } from "@/backend/content/service";
import { getContentStorageInfo } from "@/backend/content/store";
import { jsonNoStore } from "@/backend/http/json";

export const runtime = "nodejs";

export async function GET() {
  try {
    const [totalLeads, totalProjects, totalArchives] = await Promise.all([
      countContactLeads(),
      listProjects({ status: "all" }).then((items) => items.length),
      listArchives({ status: "all" }).then((items) => items.length),
    ]);

    return jsonNoStore({
      status: "ok",
      service: "zannstore-content-backend",
      storageMode: getContactLeadStorageInfo().storageMode,
      contentStorageMode: getContentStorageInfo().mode,
      totalLeads,
      totalProjects,
      totalArchives,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed", error);

    return jsonNoStore(
      {
        status: "error",
        message: "Storage backend belum bisa diakses.",
      },
      { status: 500 },
    );
  }
}
