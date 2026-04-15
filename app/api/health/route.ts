import { countContactLeads } from "@/backend/contact/service";
import { jsonNoStore } from "@/backend/http/json";

export const runtime = "nodejs";

export async function GET() {
  try {
    const totalLeads = await countContactLeads();

    return jsonNoStore({
      status: "ok",
      service: "zannstore-contact-backend",
      storageMode: "file",
      totalLeads,
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
