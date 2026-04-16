import type { NextRequest } from "next/server";
import { hasValidAdminAccess, requireAdminRequest } from "@/backend/admin/auth";
import { jsonNoStore } from "@/backend/http/json";
import {
  deleteProject,
  getProjectBySlug,
  isDuplicateSlugError,
  isValidationError,
  updateProject,
} from "@/backend/content/service";

export const runtime = "nodejs";

type ProjectRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, context: ProjectRouteContext) {
  const { slug } = await context.params;

  try {
    const item = await getProjectBySlug(slug, {
      includeDraft: hasValidAdminAccess(request),
    });

    if (!item) {
      return jsonNoStore({ message: "Proyek tidak ditemukan." }, { status: 404 });
    }

    return jsonNoStore({ item });
  } catch (error) {
    console.error("Failed to read project", error);

    return jsonNoStore(
      { message: "Detail proyek belum bisa dimuat." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, context: ProjectRouteContext) {
  const auth = requireAdminRequest(request);

  if (!auth.ok) {
    return jsonNoStore({ message: auth.message }, { status: auth.status });
  }

  const { slug } = await context.params;

  try {
    const body = (await request.json()) as unknown;
    const item = await updateProject(slug, body);

    if (!item) {
      return jsonNoStore({ message: "Proyek tidak ditemukan." }, { status: 404 });
    }

    return jsonNoStore({ message: "Proyek berhasil diperbarui.", item });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonNoStore({ message: "Payload JSON tidak valid." }, { status: 400 });
    }

    if (isValidationError(error)) {
      return jsonNoStore(
        { message: "Data update proyek belum valid.", issues: error.flatten() },
        { status: 400 },
      );
    }

    if (isDuplicateSlugError(error)) {
      return jsonNoStore({ message: error.message }, { status: 409 });
    }

    console.error("Failed to update project", error);

    return jsonNoStore(
      { message: "Proyek belum bisa diperbarui saat ini." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: ProjectRouteContext,
) {
  const auth = requireAdminRequest(request);

  if (!auth.ok) {
    return jsonNoStore({ message: auth.message }, { status: auth.status });
  }

  const { slug } = await context.params;

  try {
    const deleted = await deleteProject(slug);

    if (!deleted) {
      return jsonNoStore({ message: "Proyek tidak ditemukan." }, { status: 404 });
    }

    return jsonNoStore({ message: "Proyek berhasil dihapus." });
  } catch (error) {
    console.error("Failed to delete project", error);

    return jsonNoStore(
      { message: "Proyek belum bisa dihapus saat ini." },
      { status: 500 },
    );
  }
}
