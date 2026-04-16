import type { NextRequest } from "next/server";

const DEFAULT_ADMIN_TOKEN = "ZannWord";

type AdminAuthFailure = {
  ok: false;
  status: number;
  message: string;
};

type AdminAuthSuccess = {
  ok: true;
  token: string;
};

export type AdminAuthResult = AdminAuthFailure | AdminAuthSuccess;

export function getConfiguredAdminToken() {
  return (
    process.env.ADMIN_API_TOKEN?.trim() ||
    process.env.LEADS_ADMIN_TOKEN?.trim() ||
    DEFAULT_ADMIN_TOKEN
  );
}

export function readIncomingAdminToken(request: NextRequest) {
  return request.headers.get("x-admin-token")?.trim() || null;
}

export function requireAdminRequest(request: NextRequest): AdminAuthResult {
  const configuredToken = getConfiguredAdminToken();

  if (!configuredToken) {
    return {
      ok: false,
      status: 503,
      message: "ADMIN_API_TOKEN belum dikonfigurasi di environment backend.",
    };
  }

  const incomingToken = readIncomingAdminToken(request);

  if (!incomingToken) {
    return {
      ok: false,
      status: 401,
      message: "Header x-admin-token wajib diisi.",
    };
  }

  if (incomingToken !== configuredToken) {
    return {
      ok: false,
      status: 403,
      message: "Token admin tidak valid.",
    };
  }

  return {
    ok: true,
    token: incomingToken,
  };
}

export function hasValidAdminAccess(request: NextRequest) {
  return requireAdminRequest(request).ok;
}
