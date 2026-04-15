import type { NextRequest } from "next/server";
import {
  countContactLeads,
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

function authorizeAdminRequest(request: NextRequest) {
  const configuredToken = process.env.LEADS_ADMIN_TOKEN?.trim();

  if (!configuredToken) {
    return {
      ok: false as const,
      status: 503,
      message:
        "LEADS_ADMIN_TOKEN belum dikonfigurasi di environment backend.",
    };
  }

  const incomingToken = request.headers.get("x-leads-admin-token")?.trim();

  if (!incomingToken) {
    return {
      ok: false as const,
      status: 401,
      message: "Header x-leads-admin-token wajib diisi.",
    };
  }

  if (incomingToken !== configuredToken) {
    return {
      ok: false as const,
      status: 403,
      message: "Token admin tidak valid.",
    };
  }

  return {
    ok: true as const,
  };
}

export async function GET(request: NextRequest) {
  const auth = authorizeAdminRequest(request);

  if (!auth.ok) {
    return jsonNoStore(
      {
        message: auth.message,
      },
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
    console.error("Failed to read contact leads", error);

    return jsonNoStore(
      {
        message: "Data lead belum bisa dibaca saat ini.",
      },
      { status: 500 },
    );
  }
}
