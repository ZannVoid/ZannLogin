import type { NextRequest } from "next/server";
import { requireAdminRequest } from "@/backend/admin/auth";
import {
  countContactLeads,
  isContactLeadStorageError,
  listContactLeads,
} from "@/backend/contact/service";
import { jsonNoStore } from "@/backend/http/json";

export const runtime = "nodejs";

function parseLimit(rawValue: string | null) {
  const value = Number(rawValue ?? "20");

  if (!Number.isFinite(value)) {
    return 20;
  }

  return Math.min(Math.max(Math.trunc(value), 1), 100);
}

export async function GET(request: NextRequest) {
  const auth = requireAdminRequest(request);

  if (!auth.ok) {
    return jsonNoStore(
      { message: auth.message },
      { status: auth.status },
    );
  }

  try {
    const limit = parseLimit(request.nextUrl.searchParams.get("limit"));
    const [total, items] = await Promise.all([
      countContactLeads(),
      listContactLeads(limit),
    ]);

    return jsonNoStore({
      total,
      limit,
      items,
    });
  } catch (error) {
    if (isContactLeadStorageError(error)) {
      return jsonNoStore(
        { message: error.message },
        { status: 503 },
      );
    }

    console.error("Failed to read contact leads", error);

    return jsonNoStore(
      {
        message: "Data lead belum bisa dibaca saat ini.",
      },
      { status: 500 },
    );
  }
}
