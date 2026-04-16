import type { NextRequest } from "next/server";
import { hasValidAdminAccess, requireAdminRequest } from "@/backend/admin/auth";
import { jsonNoStore } from "@/backend/http/json";
import {
  deleteArchive,
  getArchiveById,
  isValidationError,
  updateArchive,
} from "@/backend/content/service";

export const runtime = "nodejs";

type ArchiveRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: ArchiveRouteContext) {
  const { id } = await context.params;

  try {
    const item = await getArchiveById(id, {
      includeDraft: hasValidAdminAccess(request),
    });

    if (!item) {
      return jsonNoStore(
        { message: "Entri arsip tidak ditemukan." },
        { status: 404 },
      );
    }

    return jsonNoStore({ item });
  } catch (error) {
    console.error("Failed to read archive", error);

    return jsonNoStore(
      { message: "Detail arsip belum bisa dimuat." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, context: ArchiveRouteContext) {
  const auth = requireAdminRequest(request);

  if (!auth.ok) {
    return jsonNoStore({ message: auth.message }, { status: auth.status });
  }

  const { id } = await context.params;

  try {
    const body = (await request.json()) as unknown;
    const item = await updateArchive(id, body);

    if (!item) {
      return jsonNoStore(
        { message: "Entri arsip tidak ditemukan." },
        { status: 404 },
      );
    }

    return jsonNoStore({ message: "Entri arsip berhasil diperbarui.", item });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonNoStore({ message: "Payload JSON tidak valid." }, { status: 400 });
    }

    if (isValidationError(error)) {
      return jsonNoStore(
        { message: "Data update arsip belum valid.", issues: error.flatten() },
        { status: 400 },
      );
    }

    console.error("Failed to update archive", error);

    return jsonNoStore(
      { message: "Entri arsip belum bisa diperbarui saat ini." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: ArchiveRouteContext,
) {
  const auth = requireAdminRequest(request);

  if (!auth.ok) {
    return jsonNoStore({ message: auth.message }, { status: auth.status });
  }

  const { id } = await context.params;

  try {
    const deleted = await deleteArchive(id);

    if (!deleted) {
      return jsonNoStore(
        { message: "Entri arsip tidak ditemukan." },
        { status: 404 },
      );
    }

    return jsonNoStore({ message: "Entri arsip berhasil dihapus." });
  } catch (error) {
    console.error("Failed to delete archive", error);

    return jsonNoStore(
      { message: "Entri arsip belum bisa dihapus saat ini." },
      { status: 500 },
    );
  }
}
