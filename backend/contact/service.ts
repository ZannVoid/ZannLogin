import { createHash, randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";
import {
  contactLeadInputSchema,
  type ContactLeadRecord,
} from "@/backend/contact/schema";
import {
  countContactLeads,
  isContactLeadStorageError,
  getContactLeadStorageInfo,
  listContactLeads,
  saveContactLead,
} from "@/backend/contact/store";
import { siteConfig } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function getForwardedAddress(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const [firstAddress] = forwardedFor.split(",");
    return firstAddress?.trim() || null;
  }

  return request.headers.get("x-real-ip")?.trim() || null;
}

function buildIpFingerprint(ipAddress: string | null) {
  if (!ipAddress) {
    return null;
  }

  return createHash("sha256").update(ipAddress).digest("hex").slice(0, 24);
}

export function getContactRateLimitKey(request: NextRequest) {
  const fingerprint = buildIpFingerprint(getForwardedAddress(request));

  if (fingerprint) {
    return fingerprint;
  }

  const userAgent = request.headers.get("user-agent")?.trim();

  return userAgent ? `ua:${userAgent.slice(0, 120)}` : "anonymous";
}

function getLeadRequestContext(request: NextRequest) {
  const userAgent = request.headers.get("user-agent")?.trim() || null;

  return {
    ipFingerprint: buildIpFingerprint(getForwardedAddress(request)),
    userAgent: userAgent ? userAgent.slice(0, 512) : null,
  };
}

export async function createContactLead(input: unknown, request: NextRequest) {
  const payload = contactLeadInputSchema.parse(input);

  const lead: ContactLeadRecord = {
    ...payload,
    ...getLeadRequestContext(request),
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    source: "contact-page",
    status: "new",
  };

  await saveContactLead(lead);

  return {
    lead,
    whatsappUrl: buildWhatsAppUrl(
      siteConfig.whatsapp.phone,
      siteConfig.whatsapp.defaultIntro,
      siteConfig.contactFormFields.whatsappTemplate,
      payload,
    ),
  };
}

export {
  countContactLeads,
  getContactLeadStorageInfo,
  isContactLeadStorageError,
  listContactLeads,
};
