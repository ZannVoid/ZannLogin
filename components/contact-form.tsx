"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type FormState = {
  name: string;
  handle: string;
  projectNeed: string;
  budget: string;
  timeline: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  handle: "",
  projectNeed: "",
  budget: "",
  timeline: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
      return;
    }

    const url = buildWhatsAppUrl(
      siteConfig.whatsapp.phone,
      siteConfig.whatsapp.defaultIntro,
      siteConfig.contactFormFields.whatsappTemplate,
      values,
    );

    window.open(url, "_blank", "noopener,noreferrer");
    setValues(initialState);
  };

  const fields = siteConfig.contactFormFields;

  return (
    <form className="panel rounded-[2rem] p-6 sm:p-8" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label={fields.labels.name}
          placeholder={fields.placeholders.name}
          value={values.name}
          error={errors.name}
          onChange={(value) => handleChange("name", value)}
        />
        <Field
          label={fields.labels.handle}
          placeholder={fields.placeholders.handle}
          value={values.handle}
          error={errors.handle}
          onChange={(value) => handleChange("handle", value)}
        />
        <Field
          label={fields.labels.projectNeed}
          placeholder={fields.placeholders.projectNeed}
          value={values.projectNeed}
          error={errors.projectNeed}
          onChange={(value) => handleChange("projectNeed", value)}
        />
        <Field
          label={fields.labels.budget}
          placeholder={fields.placeholders.budget}
          value={values.budget}
          onChange={(value) => handleChange("budget", value)}
        />
        <Field
          label={fields.labels.timeline}
          placeholder={fields.placeholders.timeline}
          value={values.timeline}
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
            onChange={(event) => handleChange("message", event.target.value)}
            placeholder={fields.placeholders.message}
            className="min-h-36 rounded-[1.25rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary/60 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-lg text-sm leading-6 text-muted">
          Form ini akan menyiapkan pesan WhatsApp otomatis agar briefing awal
          langsung rapi dan siap dikirim.
        </p>
        <button
          type="submit"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black hover:-translate-y-0.5 hover:bg-white"
        >
          Kirim ke WhatsApp
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

function Field({ label, placeholder, value, error, onChange }: FieldProps) {
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white/84" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`rounded-full border bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none ${
          error
            ? "border-red-400/70"
            : "border-white/10 focus:border-primary/60"
        }`}
      />
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
