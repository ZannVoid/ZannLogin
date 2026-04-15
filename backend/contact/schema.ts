import { z } from "zod";
import { siteConfig } from "@/lib/site-data";

const requiredTrimmedString = (message: string, max: number) =>
  z.string().trim().min(1, message).max(max, `Maksimal ${max} karakter.`);

const optionalTrimmedString = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Maksimal ${max} karakter.`)
    .optional()
    .transform((value) => value ?? "");

export const contactLeadInputSchema = z.object({
  name: requiredTrimmedString(
    siteConfig.contactFormFields.validationMessages.name,
    120,
  ),
  handle: requiredTrimmedString(
    siteConfig.contactFormFields.validationMessages.handle,
    160,
  ),
  projectNeed: requiredTrimmedString(
    siteConfig.contactFormFields.validationMessages.projectNeed,
    240,
  ),
  budget: optionalTrimmedString(80),
  timeline: optionalTrimmedString(80),
  message: optionalTrimmedString(2000),
});

export const contactLeadRecordSchema = contactLeadInputSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime({ offset: true }),
  source: z.literal("contact-page"),
  status: z.enum(["new", "reviewed"]),
  ipFingerprint: z.string().min(12).max(64).nullable(),
  userAgent: z.string().min(1).max(512).nullable(),
});

export const contactLeadListSchema = z.array(contactLeadRecordSchema);

export type ContactLeadInput = z.infer<typeof contactLeadInputSchema>;
export type ContactLeadRecord = z.infer<typeof contactLeadRecordSchema>;
export type ContactFieldErrors = Partial<Record<keyof ContactLeadInput, string>>;

export function toContactFieldErrors(
  error: z.ZodError<ContactLeadInput>,
): ContactFieldErrors {
  const flattened = error.flatten().fieldErrors;

  return {
    name: flattened.name?.[0],
    handle: flattened.handle?.[0],
    projectNeed: flattened.projectNeed?.[0],
    budget: flattened.budget?.[0],
    timeline: flattened.timeline?.[0],
    message: flattened.message?.[0],
  };
}
