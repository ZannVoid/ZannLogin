"use client";

import { useEffect, useState } from "react";
import type {
  FormEvent,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import type { ContactLeadRecord } from "@/backend/contact/schema";
import type { ArchiveRecord, ProjectRecord } from "@/backend/content/schema";
import { MotionReveal } from "@/components/motion-reveal";
import { PageHero } from "@/components/page-hero";

const ADMIN_TOKEN_STORAGE_KEY = "zannstore-admin-token";

type DashboardTab = "projects" | "archives" | "leads";

type FeedbackState = {
  tone: "success" | "error";
  message: string;
};

type CollectionResponse<T> = {
  total: number;
  items: T[];
};

type ItemResponse<T> = {
  message: string;
  item: T;
};

type LeadsResponse = {
  total: number;
  limit: number;
  items: ContactLeadRecord[];
};

type ProjectFormValues = {
  slug: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  tagsText: string;
  image: string;
  href: string;
  status: "draft" | "published";
  featured: boolean;
};

type ArchiveFormValues = {
  year: string;
  category: string;
  title: string;
  summary: string;
  link: string;
  status: "draft" | "published";
};

const emptyProjectForm: ProjectFormValues = {
  slug: "",
  title: "",
  category: "",
  description: "",
  impact: "",
  tagsText: "",
  image: "",
  href: "",
  status: "draft",
  featured: false,
};

const emptyArchiveForm: ArchiveFormValues = {
  year: new Date().getFullYear().toString(),
  category: "",
  title: "",
  summary: "",
  link: "",
  status: "draft",
};

function toProjectFormValues(project?: ProjectRecord): ProjectFormValues {
  if (!project) {
    return emptyProjectForm;
  }

  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    description: project.description,
    impact: project.impact,
    tagsText: project.tags.join(", "),
    image: project.image,
    href: project.href,
    status: project.status,
    featured: project.featured,
  };
}

function toArchiveFormValues(archive?: ArchiveRecord): ArchiveFormValues {
  if (!archive) {
    return emptyArchiveForm;
  }

  return {
    year: archive.year,
    category: archive.category,
    title: archive.title,
    summary: archive.summary,
    link: archive.link ?? "",
    status: archive.status,
  };
}

function formatDateTime(value: string) {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function normalizeTags(tagsText: string) {
  return Array.from(
    new Set(
      tagsText
        .split(/,|\n/)
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  );
}

function toErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi gangguan yang tidak terduga.";
}

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
};

async function requestAdminJson<T>(
  token: string,
  path: string,
  options: RequestOptions = {},
) {
  const headers = new Headers({
    "x-admin-token": token,
  });

  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(path, {
    method: options.method ?? "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const rawText = await response.text();
  const payload = rawText ? (JSON.parse(rawText) as Record<string, unknown>) : {};

  if (!response.ok) {
    const message =
      typeof payload.message === "string"
        ? payload.message
        : `Request gagal dengan status ${response.status}.`;

    throw new Error(message);
  }

  return payload as T;
}

async function fetchAdminCollections(token: string) {
  const [projectsResponse, archivesResponse, leadsResponse] = await Promise.all([
    requestAdminJson<CollectionResponse<ProjectRecord>>(
      token,
      "/api/projects?status=all",
    ),
    requestAdminJson<CollectionResponse<ArchiveRecord>>(
      token,
      "/api/archives?status=all",
    ),
    requestAdminJson<LeadsResponse>(token, "/api/leads?limit=12"),
  ]);

  return {
    projects: projectsResponse.items,
    archives: archivesResponse.items,
    leads: leadsResponse.items,
  };
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("projects");
  const [tokenInput, setTokenInput] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [archives, setArchives] = useState<ArchiveRecord[]>([]);
  const [leads, setLeads] = useState<ContactLeadRecord[]>([]);
  const [editingProjectSlug, setEditingProjectSlug] = useState<string | null>(null);
  const [editingArchiveId, setEditingArchiveId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<ProjectFormValues>(emptyProjectForm);
  const [archiveForm, setArchiveForm] = useState<ArchiveFormValues>(emptyArchiveForm);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [isSavingArchive, setIsSavingArchive] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  useEffect(() => {
    const savedToken = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) ?? "";
    setTokenInput(savedToken);
    setAdminToken(savedToken);
    setIsBootstrapping(false);
  }, []);

  useEffect(() => {
    if (!adminToken) {
      return;
    }

    async function bootstrapCollections() {
      setIsRefreshing(true);

      try {
        const collections = await fetchAdminCollections(adminToken);
        setProjects(collections.projects);
        setArchives(collections.archives);
        setLeads(collections.leads);
        setFeedback(null);
      } catch (error) {
        setFeedback({
          tone: "error",
          message: toErrorMessage(error),
        });
      } finally {
        setIsRefreshing(false);
      }
    }

    void bootstrapCollections();
  }, [adminToken]);

  async function refreshCollections(tokenOverride = adminToken) {
    if (!tokenOverride) {
      return;
    }

    setIsRefreshing(true);

    try {
      const collections = await fetchAdminCollections(tokenOverride);
      setProjects(collections.projects);
      setArchives(collections.archives);
      setLeads(collections.leads);
      setFeedback(null);
    } catch (error) {
      setFeedback({
        tone: "error",
        message: toErrorMessage(error),
      });
    } finally {
      setIsRefreshing(false);
    }
  }

  function handleSaveToken() {
    const trimmedToken = tokenInput.trim();

    if (!trimmedToken) {
      window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
      setAdminToken("");
      setProjects([]);
      setArchives([]);
      setLeads([]);
      setFeedback({
        tone: "error",
        message: "Masukkan token admin terlebih dulu.",
      });
      return;
    }

    window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, trimmedToken);
    setAdminToken(trimmedToken);
    setFeedback({
      tone: "success",
      message: "Token admin tersimpan. Dashboard sedang memuat data terbaru.",
    });
  }

  function handleClearToken() {
    window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    setTokenInput("");
    setAdminToken("");
    setProjects([]);
    setArchives([]);
    setLeads([]);
    setEditingProjectSlug(null);
    setEditingArchiveId(null);
    setProjectForm(emptyProjectForm);
    setArchiveForm(emptyArchiveForm);
    setFeedback({
      tone: "success",
      message: "Token admin dihapus dari browser ini.",
    });
  }

  async function handleProjectSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!adminToken) {
      setFeedback({
        tone: "error",
        message: "Simpan token admin sebelum membuat atau mengubah project.",
      });
      return;
    }

    setIsSavingProject(true);

    try {
      const payload = {
        slug: projectForm.slug.trim(),
        title: projectForm.title.trim(),
        category: projectForm.category.trim(),
        description: projectForm.description.trim(),
        impact: projectForm.impact.trim(),
        tags: normalizeTags(projectForm.tagsText),
        image: projectForm.image.trim(),
        href: projectForm.href.trim(),
        status: projectForm.status,
        featured: projectForm.featured,
      };

      const response = editingProjectSlug
        ? await requestAdminJson<ItemResponse<ProjectRecord>>(
            adminToken,
            `/api/projects/${encodeURIComponent(editingProjectSlug)}`,
            {
              method: "PATCH",
              body: payload,
            },
          )
        : await requestAdminJson<ItemResponse<ProjectRecord>>(
            adminToken,
            "/api/projects",
            {
              method: "POST",
              body: payload,
            },
          );

      await refreshCollections(adminToken);
      setEditingProjectSlug(null);
      setProjectForm(emptyProjectForm);
      setFeedback({
        tone: "success",
        message: response.message,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        message: toErrorMessage(error),
      });
    } finally {
      setIsSavingProject(false);
    }
  }

  async function handleArchiveSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!adminToken) {
      setFeedback({
        tone: "error",
        message: "Simpan token admin sebelum membuat atau mengubah archive.",
      });
      return;
    }

    setIsSavingArchive(true);

    try {
      const payload = {
        year: archiveForm.year.trim(),
        category: archiveForm.category.trim(),
        title: archiveForm.title.trim(),
        summary: archiveForm.summary.trim(),
        link: archiveForm.link.trim(),
        status: archiveForm.status,
      };

      const response = editingArchiveId
        ? await requestAdminJson<ItemResponse<ArchiveRecord>>(
            adminToken,
            `/api/archives/${editingArchiveId}`,
            {
              method: "PATCH",
              body: payload,
            },
          )
        : await requestAdminJson<ItemResponse<ArchiveRecord>>(
            adminToken,
            "/api/archives",
            {
              method: "POST",
              body: payload,
            },
          );

      await refreshCollections(adminToken);
      setEditingArchiveId(null);
      setArchiveForm(emptyArchiveForm);
      setFeedback({
        tone: "success",
        message: response.message,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        message: toErrorMessage(error),
      });
    } finally {
      setIsSavingArchive(false);
    }
  }

  async function handleProjectDelete(slug: string) {
    if (!adminToken) {
      setFeedback({
        tone: "error",
        message: "Token admin belum aktif.",
      });
      return;
    }

    if (!window.confirm(`Hapus project "${slug}"?`)) {
      return;
    }

    try {
      const response = await requestAdminJson<{ message: string }>(
        adminToken,
        `/api/projects/${encodeURIComponent(slug)}`,
        {
          method: "DELETE",
        },
      );

      await refreshCollections(adminToken);

      if (editingProjectSlug === slug) {
        setEditingProjectSlug(null);
        setProjectForm(emptyProjectForm);
      }

      setFeedback({
        tone: "success",
        message: response.message,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        message: toErrorMessage(error),
      });
    }
  }

  async function handleArchiveDelete(id: string) {
    if (!adminToken) {
      setFeedback({
        tone: "error",
        message: "Token admin belum aktif.",
      });
      return;
    }

    if (!window.confirm("Hapus entry archive ini?")) {
      return;
    }

    try {
      const response = await requestAdminJson<{ message: string }>(
        adminToken,
        `/api/archives/${id}`,
        {
          method: "DELETE",
        },
      );

      await refreshCollections(adminToken);

      if (editingArchiveId === id) {
        setEditingArchiveId(null);
        setArchiveForm(emptyArchiveForm);
      }

      setFeedback({
        tone: "success",
        message: response.message,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        message: toErrorMessage(error),
      });
    }
  }

  const publishedProjects = projects.filter((item) => item.status === "published");
  const publishedArchives = archives.filter((item) => item.status === "published");
  const feedbackStyles =
    feedback?.tone === "success"
      ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
      : "border-red-400/30 bg-red-500/10 text-red-100";

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 sm:pb-24">
      <PageHero
        badge="Internal Console"
        eyebrow="Admin / Content Ops"
        title="Dashboard admin untuk CRUD project, archive, dan monitoring lead."
        description="Semua operasi write memakai token admin dan langsung menembak endpoint backend yang sudah kita siapkan. Konten yang diubah di sini akan ikut tampil di halaman publik."
      >
        <article className="panel rounded-[1.5rem] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Projects</p>
          <p className="mt-3 text-lg text-white">{projects.length} total</p>
          <p className="mt-2 text-sm text-muted">
            {publishedProjects.length} published
          </p>
        </article>
        <article className="panel rounded-[1.5rem] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Archives</p>
          <p className="mt-3 text-lg text-white">{archives.length} total</p>
          <p className="mt-2 text-sm text-muted">
            {publishedArchives.length} published
          </p>
        </article>
        <article className="panel rounded-[1.5rem] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Leads</p>
          <p className="mt-3 text-lg text-white">{leads.length} terbaru</p>
          <p className="mt-2 text-sm text-muted">View only</p>
        </article>
      </PageHero>

      <MotionReveal delay={0.05} className="mt-10">
        <section className="section-shell rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="eyebrow text-xs">Admin Access</p>
              <h2 className="mt-4 font-headline text-3xl font-semibold tracking-[-0.05em] text-white">
                Simpan token admin di browser untuk mengaktifkan dashboard.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                Dashboard ini tidak membuat session server-side dulu. Untuk
                sekarang, token dipakai langsung sebagai header `x-admin-token`
                saat browser memanggil API CRUD.
              </p>
            </div>

            <div className="panel rounded-[1.75rem] p-5">
              <div className="flex flex-col gap-4">
                <AdminInput
                  label="Admin Token"
                  placeholder="Masukkan ADMIN_API_TOKEN"
                  value={tokenInput}
                  onChange={(event) => setTokenInput(event.target.value)}
                />

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleSaveToken}
                    className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-black hover:bg-white"
                  >
                    Simpan token
                  </button>
                  <button
                    type="button"
                    onClick={() => void refreshCollections()}
                    disabled={!adminToken || isRefreshing}
                    className="rounded-full border border-white/14 px-5 py-3 text-sm text-white/84 hover:border-primary/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isRefreshing ? "Menyegarkan..." : "Refresh data"}
                  </button>
                  <button
                    type="button"
                    onClick={handleClearToken}
                    className="rounded-full border border-red-400/30 px-5 py-3 text-sm text-red-200 hover:border-red-300/50 hover:bg-red-500/10"
                  >
                    Hapus token
                  </button>
                </div>

                <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/72">
                  {isBootstrapping
                    ? "Memeriksa token lokal..."
                    : adminToken
                      ? "Token aktif. Kamu bisa create, edit, delete, dan refresh data dari sini."
                      : "Belum ada token aktif. Dashboard tetap terbuka, tapi operasi admin akan ditolak API."}
                </div>
              </div>
            </div>
          </div>

          {feedback ? (
            <div
              className={`mt-6 rounded-[1.4rem] border px-4 py-4 text-sm ${feedbackStyles}`}
            >
              {feedback.message}
            </div>
          ) : null}
        </section>
      </MotionReveal>

      <MotionReveal delay={0.1} className="mt-10">
        <section className="section-shell rounded-[2rem] p-4 sm:p-5">
          <div className="flex flex-wrap gap-3">
            {[
              { id: "projects", label: "Projects" },
              { id: "archives", label: "Archives" },
              { id: "leads", label: "Leads" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as DashboardTab)}
                  className={`rounded-full px-4 py-2 text-sm ${
                    isActive
                      ? "border border-primary/25 bg-primary/10 text-white"
                      : "border border-white/10 bg-white/[0.03] text-white/68 hover:border-primary/30 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>
      </MotionReveal>

      {activeTab === "projects" ? (
        <MotionReveal delay={0.14} className="mt-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="section-shell rounded-[2rem] p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-[11px]">Project Editor</p>
                  <h3 className="mt-3 font-headline text-3xl font-semibold tracking-[-0.05em] text-white">
                    {editingProjectSlug ? "Edit project" : "Buat project baru"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProjectSlug(null);
                    setProjectForm(emptyProjectForm);
                  }}
                  className="rounded-full border border-white/14 px-4 py-2 text-sm text-white/70 hover:border-primary/30 hover:text-white"
                >
                  Reset
                </button>
              </div>

              <form className="grid gap-4" onSubmit={handleProjectSubmit}>
                <AdminInput
                  label="Slug"
                  placeholder="control-room"
                  value={projectForm.slug}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, slug: event.target.value }))
                  }
                />
                <AdminInput
                  label="Title"
                  placeholder="Control Room Landing System"
                  value={projectForm.title}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, title: event.target.value }))
                  }
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <AdminInput
                    label="Category"
                    placeholder="Web Experience"
                    value={projectForm.category}
                    onChange={(event) =>
                      setProjectForm((current) => ({ ...current, category: event.target.value }))
                    }
                  />
                  <AdminSelect
                    label="Status"
                    value={projectForm.status}
                    onChange={(event) =>
                      setProjectForm((current) => ({
                        ...current,
                        status: event.target.value as ProjectFormValues["status"],
                      }))
                    }
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </AdminSelect>
                </div>
                <AdminTextarea
                  label="Description"
                  rows={4}
                  placeholder="Deskripsi singkat proyek"
                  value={projectForm.description}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                />
                <AdminTextarea
                  label="Impact"
                  rows={3}
                  placeholder="Dampak atau hasil utama"
                  value={projectForm.impact}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, impact: event.target.value }))
                  }
                />
                <AdminInput
                  label="Tags"
                  placeholder="Next.js, Tailwind, Branding"
                  value={projectForm.tagsText}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, tagsText: event.target.value }))
                  }
                />
                <AdminInput
                  label="Image"
                  placeholder="/images/portfolio-control-room.svg"
                  value={projectForm.image}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, image: event.target.value }))
                  }
                />
                <AdminInput
                  label="Href"
                  placeholder="/portfolio#control-room"
                  value={projectForm.href}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, href: event.target.value }))
                  }
                />
                <label className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/82">
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(event) =>
                      setProjectForm((current) => ({
                        ...current,
                        featured: event.target.checked,
                      }))
                    }
                  />
                  Featured di homepage
                </label>

                <button
                  type="submit"
                  disabled={isSavingProject}
                  className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSavingProject
                    ? "Menyimpan..."
                    : editingProjectSlug
                      ? "Update project"
                      : "Buat project"}
                </button>
              </form>
            </section>

            <section className="section-shell rounded-[2rem] p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-[11px]">Project List</p>
                  <h3 className="mt-3 font-headline text-3xl font-semibold tracking-[-0.05em] text-white">
                    Semua project
                  </h3>
                </div>
                <div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/56">
                  {projects.length} item
                </div>
              </div>

              <div className="grid gap-4">
                {projects.map((project) => (
                  <article key={project.id} className="panel rounded-[1.5rem] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
                            {project.category}
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${
                              project.status === "published"
                                ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                                : "border border-amber-400/30 bg-amber-500/10 text-amber-100"
                            }`}
                          >
                            {project.status}
                          </span>
                          {project.featured ? (
                            <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary">
                              featured
                            </span>
                          ) : null}
                        </div>
                        <h4 className="mt-4 font-headline text-2xl tracking-[-0.04em] text-white">
                          {project.title}
                        </h4>
                        <p className="mt-2 text-sm text-white/54">{project.slug}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProjectSlug(project.slug);
                            setProjectForm(toProjectFormValues(project));
                          }}
                          className="rounded-full border border-white/14 px-4 py-2 text-sm text-white/82 hover:border-primary/30 hover:text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleProjectDelete(project.slug)}
                          className="rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-200 hover:border-red-300/50 hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-muted">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/68"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/38">
                      Updated {formatDateTime(project.updatedAt)}
                    </p>
                  </article>
                ))}

                {projects.length === 0 ? (
                  <div className="panel rounded-[1.5rem] p-5 text-sm leading-7 text-muted">
                    Belum ada project di storage runtime.
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        </MotionReveal>
      ) : null}

      {activeTab === "archives" ? (
        <MotionReveal delay={0.14} className="mt-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="section-shell rounded-[2rem] p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-[11px]">Archive Editor</p>
                  <h3 className="mt-3 font-headline text-3xl font-semibold tracking-[-0.05em] text-white">
                    {editingArchiveId ? "Edit archive" : "Buat archive baru"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingArchiveId(null);
                    setArchiveForm(emptyArchiveForm);
                  }}
                  className="rounded-full border border-white/14 px-4 py-2 text-sm text-white/70 hover:border-primary/30 hover:text-white"
                >
                  Reset
                </button>
              </div>

              <form className="grid gap-4" onSubmit={handleArchiveSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <AdminInput
                    label="Year"
                    placeholder="2026"
                    value={archiveForm.year}
                    onChange={(event) =>
                      setArchiveForm((current) => ({ ...current, year: event.target.value }))
                    }
                  />
                  <AdminSelect
                    label="Status"
                    value={archiveForm.status}
                    onChange={(event) =>
                      setArchiveForm((current) => ({
                        ...current,
                        status: event.target.value as ArchiveFormValues["status"],
                      }))
                    }
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </AdminSelect>
                </div>
                <AdminInput
                  label="Category"
                  placeholder="Brand System"
                  value={archiveForm.category}
                  onChange={(event) =>
                    setArchiveForm((current) => ({ ...current, category: event.target.value }))
                  }
                />
                <AdminInput
                  label="Title"
                  placeholder="ANIZONE-X Portfolio Rebuild"
                  value={archiveForm.title}
                  onChange={(event) =>
                    setArchiveForm((current) => ({ ...current, title: event.target.value }))
                  }
                />
                <AdminTextarea
                  label="Summary"
                  rows={5}
                  placeholder="Ringkasan singkat entry archive"
                  value={archiveForm.summary}
                  onChange={(event) =>
                    setArchiveForm((current) => ({ ...current, summary: event.target.value }))
                  }
                />
                <AdminInput
                  label="Link"
                  placeholder="https://example.com/case-study"
                  value={archiveForm.link}
                  onChange={(event) =>
                    setArchiveForm((current) => ({ ...current, link: event.target.value }))
                  }
                />

                <button
                  type="submit"
                  disabled={isSavingArchive}
                  className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSavingArchive
                    ? "Menyimpan..."
                    : editingArchiveId
                      ? "Update archive"
                      : "Buat archive"}
                </button>
              </form>
            </section>

            <section className="section-shell rounded-[2rem] p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-[11px]">Archive List</p>
                  <h3 className="mt-3 font-headline text-3xl font-semibold tracking-[-0.05em] text-white">
                    Timeline entries
                  </h3>
                </div>
                <div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/56">
                  {archives.length} item
                </div>
              </div>

              <div className="grid gap-4">
                {archives.map((archive) => (
                  <article key={archive.id} className="panel rounded-[1.5rem] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
                            {archive.year}
                          </span>
                          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
                            {archive.category}
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${
                              archive.status === "published"
                                ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                                : "border border-amber-400/30 bg-amber-500/10 text-amber-100"
                            }`}
                          >
                            {archive.status}
                          </span>
                        </div>
                        <h4 className="mt-4 font-headline text-2xl tracking-[-0.04em] text-white">
                          {archive.title}
                        </h4>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingArchiveId(archive.id);
                            setArchiveForm(toArchiveFormValues(archive));
                          }}
                          className="rounded-full border border-white/14 px-4 py-2 text-sm text-white/82 hover:border-primary/30 hover:text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleArchiveDelete(archive.id)}
                          className="rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-200 hover:border-red-300/50 hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-muted">{archive.summary}</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/38">
                      Updated {formatDateTime(archive.updatedAt)}
                    </p>
                  </article>
                ))}

                {archives.length === 0 ? (
                  <div className="panel rounded-[1.5rem] p-5 text-sm leading-7 text-muted">
                    Belum ada archive di storage runtime.
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        </MotionReveal>
      ) : null}

      {activeTab === "leads" ? (
        <MotionReveal delay={0.14} className="mt-8">
          <section className="section-shell rounded-[2rem] p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-[11px]">Lead Inbox</p>
                <h3 className="mt-3 font-headline text-3xl font-semibold tracking-[-0.05em] text-white">
                  Lead terbaru dari form kontak
                </h3>
              </div>
              <button
                type="button"
                onClick={() => void refreshCollections()}
                disabled={!adminToken || isRefreshing}
                className="rounded-full border border-white/14 px-4 py-2 text-sm text-white/82 hover:border-primary/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isRefreshing ? "Menyegarkan..." : "Refresh"}
              </button>
            </div>

            <div className="grid gap-4">
              {leads.map((lead) => (
                <article key={lead.id} className="panel rounded-[1.5rem] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
                          {lead.name}
                        </span>
                        <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary">
                          {lead.status}
                        </span>
                      </div>
                      <p className="mt-4 text-sm text-white/72">{lead.handle}</p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/38">
                      {formatDateTime(lead.createdAt)}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <LeadMeta label="Kebutuhan" value={lead.projectNeed} />
                    <LeadMeta label="Budget" value={lead.budget || "-"} />
                    <LeadMeta label="Timeline" value={lead.timeline || "-"} />
                  </div>

                  <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-primary">
                      Catatan teknis
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/78">
                      {lead.message || "Tidak ada catatan tambahan."}
                    </p>
                  </div>
                </article>
              ))}

              {leads.length === 0 ? (
                <div className="panel rounded-[1.5rem] p-5 text-sm leading-7 text-muted">
                  Belum ada lead masuk atau token admin belum valid.
                </div>
              ) : null}
            </div>
          </section>
        </MotionReveal>
      ) : null}
    </div>
  );
}

function LeadMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.2em] text-white/44">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/82">{value}</p>
    </div>
  );
}

type AdminInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function AdminInput({ label, className, ...props }: AdminInputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-white/82">
      <span>{label}</span>
      <input
        {...props}
        className={`field-shell rounded-[1.25rem] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary/60 focus:outline-none ${className ?? ""}`}
      />
    </label>
  );
}

type AdminTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

function AdminTextarea({ label, className, ...props }: AdminTextareaProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-white/82">
      <span>{label}</span>
      <textarea
        {...props}
        className={`field-shell rounded-[1.25rem] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary/60 focus:outline-none ${className ?? ""}`}
      />
    </label>
  );
}

type AdminSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
};

function AdminSelect({ label, className, children, ...props }: AdminSelectProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-white/82">
      <span>{label}</span>
      <select
        {...props}
        className={`field-shell rounded-[1.25rem] px-4 py-3 text-sm text-white focus:border-primary/60 focus:outline-none ${className ?? ""}`}
      >
        {children}
      </select>
    </label>
  );
}
