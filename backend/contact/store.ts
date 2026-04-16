import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  contactLeadListSchema,
  type ContactLeadRecord,
} from "@/backend/contact/schema";
import {
  createServiceClient,
  isSupabaseConfigured,
} from "@/utils/supabase/service";

const configuredDataDirectory = process.env.CONTACT_DATA_DIR?.trim();

const dataDirectory = configuredDataDirectory
  ? path.resolve(
      /* turbopackIgnore: true */ process.cwd(),
      configuredDataDirectory,
    )
  : path.join(process.cwd(), "backend", "data");

const leadsFilePath = path.join(dataDirectory, "contact-leads.json");
const CONTACT_STORAGE_ERROR_MESSAGE =
  "Storage lead belum siap. Jalankan schema Supabase dan isi env deploy untuk mengaktifkan penyimpanan lead.";

type ContactLeadRow = {
  id: string;
  name: string;
  handle: string;
  project_need: string;
  budget: string;
  timeline: string;
  message: string;
  source: "contact-page";
  status: "new" | "reviewed";
  ip_fingerprint: string | null;
  user_agent: string | null;
  created_at: string;
};

async function ensureStorageFile() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(leadsFilePath, "utf8");
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException;

    if (fileError.code !== "ENOENT") {
      throw error;
    }

    await writeFile(leadsFilePath, "[]\n", "utf8");
  }
}

async function readLeadRecords(): Promise<ContactLeadRecord[]> {
  await ensureStorageFile();

  const rawContent = await readFile(leadsFilePath, "utf8");

  if (!rawContent.trim()) {
    return [];
  }

  const parsedContent = JSON.parse(rawContent) as unknown;
  const parsedLeads = contactLeadListSchema.safeParse(parsedContent);

  if (!parsedLeads.success) {
    throw new Error("Contact lead storage is corrupted.");
  }

  return parsedLeads.data;
}

async function writeLeadRecords(records: ContactLeadRecord[]) {
  await ensureStorageFile();
  await writeFile(leadsFilePath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
}

function mapContactLeadRow(row: ContactLeadRow): ContactLeadRecord {
  return {
    id: row.id,
    name: row.name,
    handle: row.handle,
    projectNeed: row.project_need,
    budget: row.budget,
    timeline: row.timeline,
    message: row.message,
    source: row.source,
    status: row.status,
    ipFingerprint: row.ip_fingerprint,
    userAgent: row.user_agent,
    createdAt: row.created_at,
  };
}

function toContactLeadRow(record: ContactLeadRecord): ContactLeadRow {
  return {
    id: record.id,
    name: record.name,
    handle: record.handle,
    project_need: record.projectNeed,
    budget: record.budget,
    timeline: record.timeline,
    message: record.message,
    source: record.source,
    status: record.status,
    ip_fingerprint: record.ipFingerprint,
    user_agent: record.userAgent,
    created_at: record.createdAt,
  };
}

function isMissingSupabaseTable(error: { code?: string | null } | null) {
  return error?.code === "42P01";
}

export async function saveContactLead(record: ContactLeadRecord) {
  if (isSupabaseConfigured()) {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("contact_leads")
      .insert(toContactLeadRow(record))
      .select("*")
      .single();

    if (error) {
      if (isMissingSupabaseTable(error)) {
        throw new Error(CONTACT_STORAGE_ERROR_MESSAGE);
      }

      throw error;
    }

    return mapContactLeadRow(data as ContactLeadRow);
  }

  const records = await readLeadRecords();
  records.unshift(record);
  await writeLeadRecords(records);
  return record;
}

export async function listContactLeads(limit = 20) {
  if (isSupabaseConfigured()) {
    const safeLimit = Math.min(Math.max(limit, 1), 100);
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("contact_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(safeLimit);

    if (error) {
      if (isMissingSupabaseTable(error)) {
        throw new Error(CONTACT_STORAGE_ERROR_MESSAGE);
      }

      throw error;
    }

    return (data as ContactLeadRow[]).map(mapContactLeadRow);
  }

  const records = await readLeadRecords();
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  return records.slice(0, safeLimit);
}

export async function countContactLeads() {
  if (isSupabaseConfigured()) {
    const supabase = createServiceClient();
    const { count, error } = await supabase
      .from("contact_leads")
      .select("*", { count: "exact", head: true });

    if (error) {
      if (isMissingSupabaseTable(error)) {
        throw new Error(CONTACT_STORAGE_ERROR_MESSAGE);
      }

      throw error;
    }

    return count ?? 0;
  }

  const records = await readLeadRecords();
  return records.length;
}

export function getContactLeadStorageInfo() {
  if (isSupabaseConfigured()) {
    return {
      storageMode: "supabase" as const,
      dataDirectory: null,
      leadsFilePath: null,
    };
  }

  return {
    storageMode: "file" as const,
    dataDirectory,
    leadsFilePath,
  };
}

export function isContactLeadStorageError(error: unknown): error is Error {
  return error instanceof Error && error.message === CONTACT_STORAGE_ERROR_MESSAGE;
}
