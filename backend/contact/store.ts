import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  contactLeadListSchema,
  type ContactLeadRecord,
} from "@/backend/contact/schema";

const configuredDataDirectory = process.env.CONTACT_DATA_DIR?.trim();

const dataDirectory = configuredDataDirectory
  ? path.resolve(
      /* turbopackIgnore: true */ process.cwd(),
      configuredDataDirectory,
    )
  : path.join(process.cwd(), "backend", "data");

const leadsFilePath = path.join(dataDirectory, "contact-leads.json");

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

export async function saveContactLead(record: ContactLeadRecord) {
  const records = await readLeadRecords();
  records.unshift(record);
  await writeLeadRecords(records);
  return record;
}

export async function listContactLeads(limit = 20) {
  const records = await readLeadRecords();
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  return records.slice(0, safeLimit);
}

export async function countContactLeads() {
  const records = await readLeadRecords();
  return records.length;
}

export function getContactLeadStorageInfo() {
  return {
    storageMode: "file" as const,
    dataDirectory,
    leadsFilePath,
  };
}
