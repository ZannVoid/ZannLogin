# ANIZONE-X / ZannStore PRD

Product Requirements Document for the ANIZONE-X portfolio platform built for Bendzanu Kamagifi.

## Document Status

- Product: `ANIZONE-X`
- Repository: `ZannStore`
- Current implementation stack: Next.js 16 App Router, React 19, Tailwind CSS 4, Supabase
- Product stage: v1 shipped internally, still evolving in content quality and admin ergonomics
- Primary owner: Bendzanu Kamagifi / Zann

## 1. Product Summary

ANIZONE-X is a premium personal portfolio platform designed to sell technical credibility, visual taste, and operational confidence in one flow.

This is not supposed to feel like a generic profile site with a hero, a skills list, and a prayer. The product exists to turn curiosity into trust, trust into contact, and contact into actual project conversations.

The current product combines:

- a cinematic marketing-facing portfolio experience
- runtime-backed content for projects and archive entries
- a lead capture flow that stores briefs before redirecting to WhatsApp
- an internal admin dashboard for managing projects, archives, and lead visibility

## 2. Problem Statement

Most personal portfolio sites fail in at least one of these ways:

- they look clean but say nothing meaningful
- they list skills but fail to frame capability as usable value
- they collect leads badly, so context gets lost between website and chat
- they force content edits through code changes, which is fine until the owner wants speed instead of ceremony

ANIZONE-X needs to solve a sharper problem:

How do we present Zann as someone who can handle systems, automation, infrastructure, branding, and visual execution without making the site feel messy, amateur, or like a teenager cosplaying as an agency?

## 3. Product Vision

Build a portfolio platform that makes Zann look like a serious operator:

- technically dangerous in a useful way
- visually intentional
- easy to contact
- easy to keep updated
- strong enough to support freelance, consulting, brand building, and future case-study expansion

## 4. Goals

### Business Goals

- Increase qualified inbound contacts from the website
- Build stronger trust for freelance and technical service work
- Position ANIZONE-X as a serious technical-personal brand, not just a school-era experiment

### User Goals

- Let visitors understand what Zann does within the first scroll
- Let serious prospects reach out without friction
- Let the owner update projects and archives without editing arrays by hand every time

### Product Goals

- Keep public pages visually premium and content-heavy without becoming cluttered
- Support runtime CRUD for projects and archives
- Capture lead data before WhatsApp handoff
- Preserve a usable fallback mode when Supabase is not fully configured

## 5. Non-Goals

The current product is not trying to be:

- a full CMS with roles, granular permissions, and audit history
- a marketplace
- a blog engine
- a client portal
- a multi-user dashboard
- a heavy analytics suite

If the site starts pretending to be all of that at once, it will become bloated nonsense fast.

## 6. Target Personas

### Persona A: Client With Urgent Technical Need

- Needs a website, automation, infrastructure setup, recovery help, or technical consulting
- Wants someone who looks competent before the first message is even sent
- Cares about speed, confidence, and clarity

### Persona B: Collaborator / Technical Peer

- Evaluates Zann for collaboration or project partnership
- Wants proof of range, taste, and seriousness
- Looks for structure, consistency, and execution quality

### Persona C: Curious Audience / Social Proof Visitor

- Comes from Instagram, WhatsApp, or direct recommendation
- Needs a convincing first impression
- May convert later even if they do not contact immediately

## 7. Core Product Principles

- Function before fluff
- Visuals must support trust, not distract from it
- Copy should sound human, sharp, and intentional
- Every page must push toward understanding or contact
- Admin operations should be fast enough that updating content does not feel like punishment

## 8. User Journeys

### Journey 1: Prospect lands on homepage

1. Visitor sees brand signal, positioning, and visual identity
2. Visitor understands the kind of work Zann handles
3. Visitor sees proof through skills, projects, and archive signals
4. Visitor clicks through to contact or portfolio

### Journey 2: Prospect sends project brief

1. Visitor opens contact page
2. Visitor fills in context: identity, contact, need, budget, timeline, notes
3. Brief is stored in backend
4. Visitor is redirected to WhatsApp with better context continuity

### Journey 3: Owner updates content

1. Owner opens `/admin`
2. Owner saves admin token locally in browser
3. Owner creates, edits, publishes, or deletes projects and archives
4. Changes appear on public pages through runtime storage

## 9. Scope

### In Scope for Current Product

- Homepage
- About page
- Portfolio listing page
- Archive timeline page
- Contact page with lead capture
- Admin dashboard for projects, archives, and leads
- API layer for content CRUD and contact submission
- Supabase-backed runtime storage with seed fallback

### Planned Expansion Areas

- richer case study pages
- archive links to deeper writeups
- media gallery support
- admin authentication hardening beyond shared token
- analytics and conversion tracking

## 10. Functional Requirements

### 10.1 Public Site

#### Homepage

- Must introduce ANIZONE-X and Zann with a strong brand-first hero
- Must explain capability lanes quickly
- Must show featured projects
- Must show archive highlights
- Must expose clear CTA paths to portfolio and contact

#### About

- Must deepen positioning, narrative, and operating principles
- Must present the full "Ultimate 20" capability stack
- Must support trust-building copy rather than generic biography filler

#### Portfolio

- Must list published projects only
- Must show title, category, description, impact, tags, and CTA
- Must feel expandable into future case studies

#### Archive

- Must list published archive entries in descending year order
- Must group entries by year
- Must frame archives as timeline signals, not random scraps

#### Contact

- Must validate required briefing fields
- Must persist lead data through backend before WhatsApp handoff
- Must provide feedback on validation, backend failure, and success

### 10.2 Admin Console

- Must support token-based access using `x-admin-token`
- Must let admin view all projects, archives, and latest leads
- Must support create, update, delete for projects
- Must support create, update, delete for archives
- Must preserve draft vs published status
- Must store admin token in browser local storage for convenience

### 10.3 Backend API

- Must expose REST-style endpoints for projects and archives
- Must expose lead capture endpoint for contact form
- Must expose health endpoint for storage visibility
- Must reject admin-only operations when token is missing or invalid
- Must return usable error messages for invalid payloads and storage issues

## 11. Data and Content Requirements

### Project Entity

- slug
- title
- category
- description
- impact
- tags
- image
- href
- status
- featured
- created / updated timestamps

### Archive Entity

- year
- category
- title
- summary
- optional link
- status
- created / updated timestamps

### Contact Lead Entity

- name
- handle
- project need
- budget
- timeline
- message
- source
- status
- metadata such as fingerprint and user agent when available

### Seed Content

When Supabase is unavailable or incomplete, public content must still render using centralized seed data from `lib/site-data.ts`. This keeps the site usable instead of collapsing because infra is having a bad day.

## 12. UX and Brand Requirements

- Dark-first visual direction
- Strong editorial typography
- Motion should feel deliberate, not noisy
- Copy may be sharp and slightly aggressive, but still readable and conversion-friendly
- UI should feel premium on desktop and mobile
- Public experience should feel cohesive across home, about, archive, portfolio, and contact

## 13. Technical Requirements

- Framework: Next.js 16 App Router
- UI runtime: React 19
- Styling: Tailwind CSS 4 via global tokens in `app/globals.css`
- Validation: Zod
- Storage: Supabase when configured
- Fallback mode: seed-readonly content from `lib/site-data.ts`

### Runtime Storage Rules

- If Supabase env is configured and tables exist, runtime content reads from Supabase
- If Supabase is missing or schema is unavailable, public pages fall back to seed content
- Admin write operations must fail with clear messaging when storage is read-only

## 14. Success Metrics

The product should eventually be measured on:

- number of qualified contact submissions
- number of WhatsApp handoffs completed after brief save
- frequency of content updates through admin dashboard
- public page freshness, especially projects and archive entries
- qualitative trust signal from clients and collaborators

## 15. Risks

- Shared-token admin access is convenient but not robust long-term
- Publishable Supabase key fallback is acceptable for early stage, but not ideal as security posture matures
- Seed content can drift away from live storage if updates happen only in one place
- Brand voice can become try-hard if copy gets edgy without discipline

## 16. Open Questions

- Should archive entries eventually support images or attached case studies?
- Should project details get dedicated route pages instead of anchor links only?
- Should leads support admin-side status updates or notes?
- Should analytics track CTA clicks and contact conversion events?
- Should WhatsApp remain the main handoff channel, or should email become first-class later?

## 17. Release and Ops Checklist

Before treating this as production-ready:

- Replace final WhatsApp number in `lib/site-data.ts`
- Replace social URLs with production accounts
- Upload final CV to `public/files`
- Replace hero and portfolio visual assets in `public/images`
- Review all archive and project copy for public-facing tone
- Run SQL from `supabase/schema.sql`
- Configure `NEXT_PUBLIC_SUPABASE_URL`
- Configure `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Configure `ADMIN_API_TOKEN`
- Prefer setting `SUPABASE_SERVICE_ROLE_KEY` on server runtime

## 18. Development Setup

```bash
npm install
npm run dev
```

### Local Environment

1. Copy `.env.example` to `.env.local`
2. Fill in Supabase and admin token values
3. Run the schema in `supabase/schema.sql`
4. Start the app with `npm run dev`

## 19. Current API Surface

### Public / mixed endpoints

- `POST /api/contact`
- `GET /api/projects`
- `GET /api/projects/[slug]`
- `GET /api/archives`
- `GET /api/archives/[id]`
- `GET /api/health`

### Admin-only operations

- `POST /api/projects`
- `PATCH /api/projects/[slug]`
- `DELETE /api/projects/[slug]`
- `POST /api/archives`
- `PATCH /api/archives/[id]`
- `DELETE /api/archives/[id]`
- `GET /api/projects?status=all`
- `GET /api/archives?status=all`
- `GET /api/leads`

For admin-only requests, send:

```txt
x-admin-token: <ADMIN_API_TOKEN>
```

## 20. Repo Notes

- Public content seed lives in `lib/site-data.ts`
- Runtime content store is implemented through the backend layer in `backend/`
- Supabase schema lives in `supabase/schema.sql`
- Admin dashboard is available at `/admin`

This README is intentionally written as a product document first and a developer entrypoint second. If someone reads this and still cannot tell what the product is for, the doc failed.
