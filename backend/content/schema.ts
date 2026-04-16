import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const yearPattern = /^\d{4}$/;

const requiredTrimmedString = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} wajib diisi.`)
    .max(max, `${label} maksimal ${max} karakter.`);

const optionalUrlSchema = z
  .string()
  .trim()
  .url("Masukkan URL yang valid.")
  .optional()
  .or(z.literal(""))
  .transform((value) => value || undefined);

const pathOrUrlSchema = z
  .string()
  .trim()
  .min(1, "Path atau URL wajib diisi.")
  .refine(
    (value) =>
      value.startsWith("/") ||
      value.startsWith("http://") ||
      value.startsWith("https://"),
    "Gunakan path internal atau URL absolut yang valid.",
  );

const tagsSchema = z
  .array(requiredTrimmedString("Tag", 32))
  .min(1, "Minimal satu tag wajib diisi.")
  .max(10, "Maksimal 10 tag.");

export const projectInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug wajib diisi.")
    .max(80, "Slug maksimal 80 karakter.")
    .regex(
      slugPattern,
      "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.",
    ),
  title: requiredTrimmedString("Judul proyek", 160),
  category: requiredTrimmedString("Kategori", 80),
  description: requiredTrimmedString("Deskripsi", 600),
  impact: requiredTrimmedString("Impact", 400),
  tags: tagsSchema,
  image: pathOrUrlSchema,
  href: pathOrUrlSchema.optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  featured: z.boolean().default(false),
});

export const projectUpdateSchema = projectInputSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "Payload update proyek tidak boleh kosong.",
  });

export const projectRecordSchema = projectInputSchema.extend({
  href: pathOrUrlSchema,
  id: z.string().uuid(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export const projectListSchema = z.array(projectRecordSchema);

export const archiveInputSchema = z.object({
  year: z
    .string()
    .trim()
    .regex(yearPattern, "Tahun harus 4 digit."),
  category: requiredTrimmedString("Kategori", 80),
  title: requiredTrimmedString("Judul arsip", 160),
  summary: requiredTrimmedString("Ringkasan", 500),
  link: optionalUrlSchema,
  status: z.enum(["draft", "published"]).default("draft"),
});

export const archiveUpdateSchema = archiveInputSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "Payload update arsip tidak boleh kosong.",
  });

export const archiveRecordSchema = archiveInputSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export const archiveListSchema = z.array(archiveRecordSchema);

export type ProjectInput = z.infer<typeof projectInputSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
export type ProjectRecord = z.infer<typeof projectRecordSchema>;
export type ArchiveInput = z.infer<typeof archiveInputSchema>;
export type ArchiveUpdateInput = z.infer<typeof archiveUpdateSchema>;
export type ArchiveRecord = z.infer<typeof archiveRecordSchema>;
