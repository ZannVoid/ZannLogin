import { randomUUID } from "node:crypto";
import { ZodError } from "zod";
import {
  archiveInputSchema,
  archiveUpdateSchema,
  type ArchiveRecord,
  type ProjectRecord,
  projectInputSchema,
  projectUpdateSchema,
} from "@/backend/content/schema";
import {
  createStoredArchive,
  createStoredProject,
  deleteStoredArchive as removeStoredArchive,
  deleteStoredProject as removeStoredProject,
  isReadOnlyContentStorageError,
  listStoredArchives,
  listStoredProjects,
  updateStoredArchive,
  updateStoredProject,
} from "@/backend/content/store";

type RecordStatusFilter = "published" | "draft" | "all";

type ListProjectOptions = {
  status?: RecordStatusFilter;
  featuredOnly?: boolean;
  limit?: number;
};

type ListArchiveOptions = {
  status?: RecordStatusFilter;
  limit?: number;
};

function applyStatusFilter<T extends { status: "draft" | "published" }>(
  items: T[],
  status: RecordStatusFilter,
) {
  if (status === "all") {
    return items;
  }

  return items.filter((item) => item.status === status);
}

function clampLimit(limit?: number) {
  if (!limit) {
    return undefined;
  }

  return Math.min(Math.max(limit, 1), 100);
}

export async function listProjects(options: ListProjectOptions = {}) {
  const status = options.status ?? "published";
  const limit = clampLimit(options.limit);
  let items = applyStatusFilter(await listStoredProjects(), status);

  if (options.featuredOnly) {
    items = items.filter((item) => item.featured);
  }

  items = [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export async function getProjectBySlug(
  slug: string,
  options: { includeDraft?: boolean } = {},
) {
  const items = await listStoredProjects();
  const item = items.find((entry) => entry.slug === slug) ?? null;

  if (!item) {
    return null;
  }

  if (item.status === "draft" && !options.includeDraft) {
    return null;
  }

  return item;
}

function applyProjectDefaults<T extends { slug: string; href?: string }>(input: T) {
  return {
    ...input,
    href: input.href?.trim() || `/portfolio#${input.slug}`,
  };
}

export async function createProject(input: unknown) {
  const parsed = applyProjectDefaults(projectInputSchema.parse(input));
  const projects = await listStoredProjects();

  if (projects.some((item) => item.slug === parsed.slug)) {
    throw new Error("Slug proyek sudah dipakai.");
  }

  const timestamp = new Date().toISOString();
  const nextRecord: ProjectRecord = {
    ...parsed,
    id: randomUUID(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  return createStoredProject(nextRecord);
}

export async function updateProject(slug: string, input: unknown) {
  const patch = projectUpdateSchema.parse(input);
  const projects = await listStoredProjects();
  const current = projects.find((item) => item.slug === slug);

  if (!current) {
    return null;
  }

  const nextSlug = patch.slug ?? current.slug;

  if (
    nextSlug !== current.slug &&
    projects.some((item) => item.slug === nextSlug && item.id !== current.id)
  ) {
    throw new Error("Slug proyek sudah dipakai.");
  }

  const nextRecord: ProjectRecord = {
    ...applyProjectDefaults({
      ...current,
      ...patch,
    }),
    id: current.id,
    createdAt: current.createdAt,
    updatedAt: new Date().toISOString(),
  };

  return updateStoredProject(nextRecord);
}

export async function deleteProject(slug: string) {
  const projects = await listStoredProjects();
  const current = projects.find((item) => item.slug === slug);

  if (!current) {
    return false;
  }

  await removeStoredProject(current.id);
  return true;
}

export async function listArchives(options: ListArchiveOptions = {}) {
  const status = options.status ?? "published";
  const limit = clampLimit(options.limit);
  let items = applyStatusFilter(await listStoredArchives(), status);

  items = [...items].sort((a, b) => {
    const yearDiff = Number(b.year) - Number(a.year);

    if (yearDiff !== 0) {
      return yearDiff;
    }

    return b.updatedAt.localeCompare(a.updatedAt);
  });

  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export async function getArchiveById(
  id: string,
  options: { includeDraft?: boolean } = {},
) {
  const items = await listStoredArchives();
  const item = items.find((entry) => entry.id === id) ?? null;

  if (!item) {
    return null;
  }

  if (item.status === "draft" && !options.includeDraft) {
    return null;
  }

  return item;
}

export async function createArchive(input: unknown) {
  const parsed = archiveInputSchema.parse(input);
  const timestamp = new Date().toISOString();
  const nextRecord: ArchiveRecord = {
    ...parsed,
    id: randomUUID(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  return createStoredArchive(nextRecord);
}

export async function updateArchive(id: string, input: unknown) {
  const patch = archiveUpdateSchema.parse(input);
  const archives = await listStoredArchives();
  const current = archives.find((item) => item.id === id);

  if (!current) {
    return null;
  }

  const nextRecord: ArchiveRecord = {
    ...current,
    ...patch,
    id: current.id,
    createdAt: current.createdAt,
    updatedAt: new Date().toISOString(),
  };

  return updateStoredArchive(nextRecord);
}

export async function deleteArchive(id: string) {
  const archives = await listStoredArchives();
  const current = archives.find((item) => item.id === id);

  if (!current) {
    return false;
  }

  await removeStoredArchive(current.id);
  return true;
}

export function isValidationError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

export function isDuplicateSlugError(error: unknown): error is Error {
  return (
    error instanceof Error && error.message === "Slug proyek sudah dipakai."
  );
}

export { isReadOnlyContentStorageError };
