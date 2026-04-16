import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { archiveItems, portfolioItems } from "@/lib/site-data";
import {
  archiveListSchema,
  type ArchiveRecord,
  projectListSchema,
  type ProjectRecord,
} from "@/backend/content/schema";

type CollectionName = "projects" | "archives";

const contentDataDirectory = path.join(
  process.cwd(),
  "backend",
  "data",
  "content",
);

function getCollectionPath(name: CollectionName) {
  return path.join(contentDataDirectory, `${name}.json`);
}

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

async function ensureContentDirectory() {
  await mkdir(contentDataDirectory, { recursive: true });
}

async function ensureSeededFile(name: CollectionName) {
  await ensureContentDirectory();
  const filePath = getCollectionPath(name);

  try {
    await readFile(filePath, "utf8");
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException;

    if (fileError.code !== "ENOENT") {
      throw error;
    }

    const initialData =
      name === "projects" ? createProjectSeedRecords() : createArchiveSeedRecords();

    await writeFile(filePath, `${JSON.stringify(initialData, null, 2)}\n`, "utf8");
  }
}

async function readProjectRecords() {
  await ensureSeededFile("projects");
  const rawContent = await readFile(getCollectionPath("projects"), "utf8");
  const parsed = projectListSchema.safeParse(JSON.parse(rawContent));

  if (!parsed.success) {
    throw new Error("Project storage is corrupted.");
  }

  return parsed.data;
}

async function writeProjectRecords(records: ProjectRecord[]) {
  await ensureSeededFile("projects");
  await writeFile(
    getCollectionPath("projects"),
    `${JSON.stringify(records, null, 2)}\n`,
    "utf8",
  );
}

async function readArchiveRecords() {
  await ensureSeededFile("archives");
  const rawContent = await readFile(getCollectionPath("archives"), "utf8");
  const parsed = archiveListSchema.safeParse(JSON.parse(rawContent));

  if (!parsed.success) {
    throw new Error("Archive storage is corrupted.");
  }

  return parsed.data;
}

async function writeArchiveRecords(records: ArchiveRecord[]) {
  await ensureSeededFile("archives");
  await writeFile(
    getCollectionPath("archives"),
    `${JSON.stringify(records, null, 2)}\n`,
    "utf8",
  );
}

export async function listStoredProjects() {
  return readProjectRecords();
}

export async function replaceStoredProjects(records: ProjectRecord[]) {
  await writeProjectRecords(records);
}

export async function listStoredArchives() {
  return readArchiveRecords();
}

export async function replaceStoredArchives(records: ArchiveRecord[]) {
  await writeArchiveRecords(records);
}

export function getContentStorageInfo() {
  return {
    dataDirectory: contentDataDirectory,
    projectsFilePath: getCollectionPath("projects"),
    archivesFilePath: getCollectionPath("archives"),
  };
}
