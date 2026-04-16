import { randomUUID } from "node:crypto";
import { archiveItems, portfolioItems } from "@/lib/site-data";
import type { ArchiveRecord, ProjectRecord } from "@/backend/content/schema";
import {
  createServiceClient,
  isSupabaseConfigured,
} from "@/utils/supabase/service";

type ContentStorageMode = "supabase" | "seed-readonly";

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  tags: string[];
  image: string;
  href: string;
  status: "draft" | "published";
  featured: boolean;
  created_at: string;
  updated_at: string;
};

type ArchiveRow = {
  id: string;
  year: string;
  category: string;
  title: string;
  summary: string;
  link: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
};

const READ_ONLY_STORAGE_MESSAGE =
  "Storage publik sedang berjalan dalam mode read-only. Jalankan schema Supabase dan isi env deploy untuk mengaktifkan CRUD persisten.";

let cachedStorageMode: ContentStorageMode | null = null;

function createProjectSeedRecords(): ProjectRecord[] {
  const timestamp = new Date().toISOString();

  return portfolioItems.map((item, index) => ({
    ...item,
    id: randomUUID(),
    href: item.href || `/portfolio#${item.slug}`,
    status: "published",
    featured: index < 3,
    createdAt: timestamp,
    updatedAt: timestamp,
  }));
}

function createArchiveSeedRecords(): ArchiveRecord[] {
  const timestamp = new Date().toISOString();

  return archiveItems.map((item) => ({
    ...item,
    id: randomUUID(),
    link: item.link,
    status: "published",
    createdAt: timestamp,
    updatedAt: timestamp,
  }));
}

function mapProjectRow(row: ProjectRow): ProjectRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    description: row.description,
    impact: row.impact,
    tags: row.tags,
    image: row.image,
    href: row.href,
    status: row.status,
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapArchiveRow(row: ArchiveRow): ArchiveRecord {
  return {
    id: row.id,
    year: row.year,
    category: row.category,
    title: row.title,
    summary: row.summary,
    link: row.link ?? undefined,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toProjectRow(record: ProjectRecord): ProjectRow {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    category: record.category,
    description: record.description,
    impact: record.impact,
    tags: record.tags,
    image: record.image,
    href: record.href,
    status: record.status,
    featured: record.featured,
    created_at: record.createdAt,
    updated_at: record.updatedAt,
  };
}

function toArchiveRow(record: ArchiveRecord): ArchiveRow {
  return {
    id: record.id,
    year: record.year,
    category: record.category,
    title: record.title,
    summary: record.summary,
    link: record.link ?? null,
    status: record.status,
    created_at: record.createdAt,
    updated_at: record.updatedAt,
  };
}

function markSeedFallbackMode() {
  cachedStorageMode = "seed-readonly";
}

function markSupabaseMode() {
  cachedStorageMode = "supabase";
}

function isMissingSupabaseTable(error: { code?: string | null } | null) {
  return error?.code === "42P01";
}

function assertSupabaseWritable() {
  if (!isSupabaseConfigured()) {
    throw new Error(READ_ONLY_STORAGE_MESSAGE);
  }
}

export async function listStoredProjects() {
  if (!isSupabaseConfigured()) {
    markSeedFallbackMode();
    return createProjectSeedRecords();
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    if (isMissingSupabaseTable(error)) {
      markSeedFallbackMode();
      return createProjectSeedRecords();
    }

    throw error;
  }

  markSupabaseMode();
  return (data as ProjectRow[]).map(mapProjectRow);
}

export async function createStoredProject(record: ProjectRecord) {
  assertSupabaseWritable();
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("projects")
    .insert(toProjectRow(record))
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  markSupabaseMode();
  return mapProjectRow(data as ProjectRow);
}

export async function updateStoredProject(record: ProjectRecord) {
  assertSupabaseWritable();
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("projects")
    .update(toProjectRow(record))
    .eq("id", record.id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  markSupabaseMode();
  return mapProjectRow(data as ProjectRow);
}

export async function deleteStoredProject(id: string) {
  assertSupabaseWritable();
  const supabase = createServiceClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

export async function listStoredArchives() {
  if (!isSupabaseConfigured()) {
    markSeedFallbackMode();
    return createArchiveSeedRecords();
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("archives")
    .select("*")
    .order("year", { ascending: false })
    .order("updated_at", { ascending: false });

  if (error) {
    if (isMissingSupabaseTable(error)) {
      markSeedFallbackMode();
      return createArchiveSeedRecords();
    }

    throw error;
  }

  markSupabaseMode();
  return (data as ArchiveRow[]).map(mapArchiveRow);
}

export async function createStoredArchive(record: ArchiveRecord) {
  assertSupabaseWritable();
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("archives")
    .insert(toArchiveRow(record))
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  markSupabaseMode();
  return mapArchiveRow(data as ArchiveRow);
}

export async function updateStoredArchive(record: ArchiveRecord) {
  assertSupabaseWritable();
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("archives")
    .update(toArchiveRow(record))
    .eq("id", record.id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  markSupabaseMode();
  return mapArchiveRow(data as ArchiveRow);
}

export async function deleteStoredArchive(id: string) {
  assertSupabaseWritable();
  const supabase = createServiceClient();
  const { error } = await supabase.from("archives").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

export function getContentStorageInfo() {
  return {
    mode: cachedStorageMode ?? (isSupabaseConfigured() ? "supabase" : "seed-readonly"),
  };
}

export function isReadOnlyContentStorageError(error: unknown): error is Error {
  return error instanceof Error && error.message === READ_ONLY_STORAGE_MESSAGE;
}
