# ANIZONE-X

Premium portfolio site for Bendzanu Kamagifi, built with Next.js App Router and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

## Content intake checklist

Before shipping this as a production portfolio, replace the temporary values in [lib/site-data.ts](/Users/Hype/Downloads/ZannStore/lib/site-data.ts) and `public/` assets with the final materials:

- WhatsApp production number
- Official GitHub profile URL
- Final Instagram URL
- Final CV file in `public/files`
- Final hero image and portfolio images in `public/images`
- Real portfolio and archive metadata

## Content model

The site content is centralized in [lib/site-data.ts](/Users/Hype/Downloads/ZannStore/lib/site-data.ts), including:

- brand metadata
- navigation
- social links
- hero copy
- stats
- skill cards
- portfolio items
- archive entries
- contact form labels and validation copy

## Notes

- The current CV download is a placeholder text file so the route is already wired.
- The WhatsApp form opens a prefilled message in a new tab and can be upgraded later to a real backend flow if needed.
