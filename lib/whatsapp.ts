type ContactValues = {
  name: string;
  handle: string;
  projectNeed: string;
  budget?: string;
  timeline?: string;
  message?: string;
};

export function buildWhatsAppUrl(
  phone: string,
  intro: string,
  templateLabel: string,
  values: ContactValues,
) {
  const lines = [
    intro,
    "",
    `${templateLabel}:`,
    `Nama / Brand: ${values.name.trim()}`,
    `Kontak aktif: ${values.handle.trim()}`,
    `Jenis kebutuhan: ${values.projectNeed.trim()}`,
    values.budget?.trim() ? `Budget / skala: ${values.budget.trim()}` : null,
    values.timeline?.trim() ? `Target waktu: ${values.timeline.trim()}` : null,
    values.message?.trim() ? `Catatan teknis: ${values.message.trim()}` : null,
  ].filter(Boolean);

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}
