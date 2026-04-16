import type { NextRequest } from "next/server";
import { requireAdminRequest } from "@/backend/admin/auth";
import { jsonNoStore } from "@/backend/http/json";
import {
  createProject,
  isDuplicateSlugError,
  isReadOnlyContentStorageError,
  isValidationError,
  listProjects,
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

function parseFeaturedOnly(request: NextRequest) {
  return request.nextUrl.searchParams.get("featured") === "true";
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
    const items = await listProjects({
      status,
      featuredOnly: parseFeaturedOnly(request),
      limit: parseLimit(request),
    });

    return jsonNoStore({
      total: items.length,
      items,
    });
  } catch (error) {
    console.error("Failed to list projects", error);

    return jsonNoStore(
      { message: "Daftar proyek belum bisa dimuat saat ini." },
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
      { message: "Gunakan payload JSON untuk membuat proyek." },
      { status: 415 },
    );
  }

  try {
    const body = (await request.json()) as unknown;
    const project = await createProject(body);

    return jsonNoStore(
      {
        message: "Proyek berhasil dibuat.",
        item: project,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonNoStore({ message: "Payload JSON tidak valid." }, { status: 400 });
    }

    if (isValidationError(error)) {
      return jsonNoStore(
        {
          message: "Data proyek belum valid.",
          issues: error.flatten(),
        },
        { status: 400 },
      );
    }

    if (isDuplicateSlugError(error)) {
      return jsonNoStore({ message: error.message }, { status: 409 });
    }

    if (isReadOnlyContentStorageError(error)) {
      return jsonNoStore({ message: error.message }, { status: 503 });
    }

    console.error("Failed to create project", error);

    return jsonNoStore(
      { message: "Proyek belum bisa dibuat saat ini." },
      { status: 500 },
    );
  }
}
