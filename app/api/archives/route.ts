import type { NextRequest } from "next/server";
import { requireAdminRequest } from "@/backend/admin/auth";
import { jsonNoStore } from "@/backend/http/json";
import {
  createArchive,
  isReadOnlyContentStorageError,
  isValidationError,
  listArchives,
} from "@/backend/content/service";

export const runtime = "nodejs";

function parseStatusFilter(
  request: NextRequest,
): "published" | "draft" | "all" {
  const value = request.nextUrl.searchParams.get("status");

  if (value === "draft" || value === "all" || value === "published") {
    return value;
  }

  return "published";
}

function parseLimit(request: NextRequest) {
  const value = Number(request.nextUrl.searchParams.get("limit"));

  if (!Number.isFinite(value)) {
    return undefined;
  }

  return Math.trunc(value);
}

export async function GET(request: NextRequest) {
  const status = parseStatusFilter(request);
  const needsAdminAccess = status !== "published";

  if (needsAdminAccess) {
    const auth = requireAdminRequest(request);

    if (!auth.ok) {
      return jsonNoStore({ message: auth.message }, { status: auth.status });
    }
  }

  try {
    const items = await listArchives({
      status,
      limit: parseLimit(request),
    });

    return jsonNoStore({
      total: items.length,
      items,
    });
  } catch (error) {
    console.error("Failed to list archives", error);

    return jsonNoStore(
      { message: "Daftar arsip belum bisa dimuat saat ini." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = requireAdminRequest(request);

  if (!auth.ok) {
    return jsonNoStore({ message: auth.message }, { status: auth.status });
  }

  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return jsonNoStore(
      { message: "Gunakan payload JSON untuk membuat arsip." },
      { status: 415 },
    );
  }

  try {
    const body = (await request.json()) as unknown;
    const item = await createArchive(body);

    return jsonNoStore(
      {
        message: "Entri arsip berhasil dibuat.",
        item,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonNoStore({ message: "Payload JSON tidak valid." }, { status: 400 });
    }

    if (isValidationError(error)) {
      return jsonNoStore(
        { message: "Data arsip belum valid.", issues: error.flatten() },
        { status: 400 },
      );
    }

    if (isReadOnlyContentStorageError(error)) {
      return jsonNoStore({ message: error.message }, { status: 503 });
    }

    console.error("Failed to create archive", error);

    return jsonNoStore(
      { message: "Entri arsip belum bisa dibuat saat ini." },
      { status: 500 },
    );
  }
}
