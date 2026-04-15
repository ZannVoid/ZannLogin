import { ZodError } from "zod";
import type { NextRequest } from "next/server";
import { checkContactRateLimit } from "@/backend/contact/rate-limit";
import {
  type ContactLeadInput,
  toContactFieldErrors,
} from "@/backend/contact/schema";
import {
  createContactLead,
  getContactRateLimitKey,
} from "@/backend/contact/service";
import { jsonNoStore } from "@/backend/http/json";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return jsonNoStore(
      {
        message: "Gunakan payload JSON untuk mengirim briefing kontak.",
      },
      { status: 415 },
    );
  }

  const rateLimit = checkContactRateLimit(getContactRateLimitKey(request));

  if (!rateLimit.allowed) {
    return jsonNoStore(
      {
        message: "Terlalu banyak pengiriman. Coba lagi sebentar lagi.",
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  try {
    const body = (await request.json()) as unknown;
    const result = await createContactLead(body, request);

    return jsonNoStore(
      {
        message:
          "Brief berhasil disimpan. WhatsApp siap dibuka untuk melanjutkan percakapan.",
        leadId: result.lead.id,
        createdAt: result.lead.createdAt,
        whatsappUrl: result.whatsappUrl,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonNoStore(
        {
          message: "Payload JSON tidak valid.",
        },
        { status: 400 },
      );
    }

    if (error instanceof ZodError) {
      return jsonNoStore(
        {
          message: "Data briefing belum lengkap atau formatnya belum sesuai.",
          fieldErrors: toContactFieldErrors(
            error as ZodError<ContactLeadInput>,
          ),
        },
        { status: 400 },
      );
    }

    console.error("Failed to create contact lead", error);

    return jsonNoStore(
      {
        message:
          "Terjadi gangguan saat menyimpan briefing. Coba lagi beberapa saat.",
      },
      { status: 500 },
    );
  }
}
