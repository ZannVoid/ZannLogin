"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site-data";

type FormState = {
  name: string;
  handle: string;
  projectNeed: string;
  budget: string;
  timeline: string;
  message: string;
};

type SubmissionState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string | null;
  whatsappUrl: string | null;
};

type ContactApiSuccessResponse = {
  message: string;
  leadId: string;
  createdAt: string;
  whatsappUrl: string;
};

type ContactApiErrorResponse = {
  message?: string;
  fieldErrors?: Partial<Record<keyof FormState, string>>;
  retryAfterSeconds?: number;
};

const initialState: FormState = {
  name: "",
  handle: "",
  projectNeed: "",
  budget: "",
  timeline: "",
  message: "",
};

const initialSubmissionState: SubmissionState = {
  status: "idle",
  message: null,
  whatsappUrl: null,
};

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [submission, setSubmission] = useState<SubmissionState>(
    initialSubmissionState,
  );

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));

    if (submission.status !== "idle") {
      setSubmission(initialSubmissionState);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!values.name.trim()) {
      nextErrors.name = siteConfig.contactFormFields.validationMessages.name;
    }

    if (!values.handle.trim()) {
      nextErrors.handle = siteConfig.contactFormFields.validationMessages.handle;
    }

    if (!values.projectNeed.trim()) {
      nextErrors.projectNeed =
        siteConfig.contactFormFields.validationMessages.projectNeed;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmission({
        status: "error",
        message: "Lengkapi field wajib terlebih dulu sebelum briefing dikirim.",
        whatsappUrl: null,
      });
      return;
    }

    setSubmission({
      status: "submitting",
      message: "Menyimpan briefing ke backend...",
      whatsappUrl: null,
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = (await response
        .json()
        .catch(() => ({}))) as ContactApiSuccessResponse | ContactApiErrorResponse;

      if (!response.ok) {
        const errorPayload = payload as ContactApiErrorResponse;
        const retrySuffix =
          typeof errorPayload.retryAfterSeconds === "number"
            ? ` Coba lagi dalam ${errorPayload.retryAfterSeconds} detik.`
            : "";

        setErrors(errorPayload.fieldErrors ?? {});
        setSubmission({
          status: "error",
          message:
            (errorPayload.message ??
              "Brief belum berhasil disimpan. Coba lagi sebentar.") + retrySuffix,
          whatsappUrl: null,
        });
        return;
      }

      const successPayload = payload as ContactApiSuccessResponse;
      const popup = window.open(
        successPayload.whatsappUrl,
        "_blank",
        "noopener,noreferrer",
      );

      setValues(initialState);
      setErrors({});
      setSubmission({
        status: "success",
        message: popup
          ? successPayload.message
          : `${successPayload.message} Jika tab WhatsApp tidak terbuka otomatis, gunakan tombol lanjutan di bawah.`,
        whatsappUrl: successPayload.whatsappUrl,
      });
    } catch {
      setSubmission({
        status: "error",
        message:
          "Backend belum bisa dihubungi. Coba lagi beberapa saat lagi.",
        whatsappUrl: null,
      });
    }
  };

  const fields = siteConfig.contactFormFields;
  const isSubmitting = submission.status === "submitting";
  const feedbackTone =
    submission.status === "success"
      ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
      : submission.status === "error"
        ? "border-red-400/30 bg-red-500/10 text-red-100"
        : "border-white/10 bg-white/[0.03] text-white/78";

  return (
    <form className="panel-strong rounded-[2rem] p-6 sm:p-8" onSubmit={handleSubmit}>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-[11px]">Brief Composer</p>
          <h2 className="mt-3 font-headline text-3xl font-semibold tracking-[-0.05em] text-white">
            Susun briefing awal tanpa ribet.
          </h2>
        </div>
        <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.24em] text-white/62">
          Lead capture + WA
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          id="contact-name"
          label={fields.labels.name}
          placeholder={fields.placeholders.name}
          value={values.name}
          error={errors.name}
          autoComplete="organization"
          disabled={isSubmitting}
          onChange={(value) => handleChange("name", value)}
        />
        <Field
          id="contact-handle"
          label={fields.labels.handle}
          placeholder={fields.placeholders.handle}
          value={values.handle}
          error={errors.handle}
          autoComplete="email"
          disabled={isSubmitting}
          onChange={(value) => handleChange("handle", value)}
        />
        <Field
          id="contact-project-need"
          label={fields.labels.projectNeed}
          placeholder={fields.placeholders.projectNeed}
          value={values.projectNeed}
          error={errors.projectNeed}
          disabled={isSubmitting}
          onChange={(value) => handleChange("projectNeed", value)}
        />
        <Field
          id="contact-budget"
          label={fields.labels.budget}
          placeholder={fields.placeholders.budget}
          value={values.budget}
          disabled={isSubmitting}
          onChange={(value) => handleChange("budget", value)}
        />
        <Field
          id="contact-timeline"
          label={fields.labels.timeline}
          placeholder={fields.placeholders.timeline}
          value={values.timeline}
          disabled={isSubmitting}
          onChange={(value) => handleChange("timeline", value)}
        />
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-white/84" htmlFor="message">
            {fields.labels.message}
          </label>
          <textarea
            id="message"
            rows={5}
            value={values.message}
            disabled={isSubmitting}
            onChange={(event) => handleChange("message", event.target.value)}
            placeholder={fields.placeholders.message}
            className={`field-shell min-h-36 rounded-[1.3rem] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary/60 focus:outline-none ${
              isSubmitting ? "cursor-not-allowed opacity-70" : ""
            }`}
          />
        </div>
      </div>

      {submission.message ? (
        <div
          className={`mt-6 rounded-[1.3rem] border px-4 py-4 text-sm leading-6 ${feedbackTone}`}
        >
          <p aria-live="polite">{submission.message}</p>
          {submission.whatsappUrl ? (
            <a
              href={submission.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex text-sm font-semibold text-primary transition-colors duration-200 hover:text-white"
            >
              Buka WhatsApp manual
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-lg text-sm leading-6 text-muted">
          Form ini akan menyimpan briefing ke backend terlebih dulu, lalu
          menyiapkan lanjutan WhatsApp agar konteks awal tetap rapi.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Brief"}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

function Field({
  id,
  label,
  placeholder,
  value,
  error,
  autoComplete,
  disabled,
  onChange,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white/84" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        autoComplete={autoComplete}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`field-shell rounded-[1.3rem] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none ${
          error
            ? "border-red-400/70"
            : "border-white/10 focus:border-primary/60"
        } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
      />
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
