# The Checklist · based on *The Checklist Manifesto*

A personal checklist app built on the principles of Atul Gawande's
*The Checklist Manifesto: How to Get Things Right* — short, sharp
checklists that catch the dumb, avoidable mistakes.

Built as an installable web app (PWA), so it runs full-screen on an iPhone
like a native app — no App Store, no Mac, no developer account needed.

## What's inside

- **Checklists** — build your own, following the book's rules: every list
  has a **type** (Do–Confirm or Read–Do), a **pause point** (the moment
  that triggers it), and **killer items** (⚑) — the steps most dangerous
  to skip. The app nudges you if a list grows past 9 items.
- **Run mode** — big tap targets, a progress bar, and a warning if you try
  to finish with a killer item unchecked. Runs are counted per list.
- **Templates** — 8 starter checklists built on the book's rules: Morning
  Launch, Leaving the House, Packing for a Trip, Before Hitting Send,
  Meeting Prep, Weekly Review, Before a Big Purchase, Shutdown Ritual.
- **Principles** — the book's core ideas in 8 short cards, with quotes.
- Everything is stored only on the device (localStorage); nothing is
  uploaded anywhere. Works offline after first load (service worker).

## Install on iPhone

1. Open the app's URL in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**.
3. Launch it from the home screen — it opens full-screen like a native app.

## Deploy

This folder is a plain static site — no build step. It deploys to GitHub
Pages automatically via `.github/workflows/deploy-pages.yml` (served at
`/checklist/` alongside the other apps in this repo), or drag-and-drop
the folder (or `checklist-vercel-ready.zip` from the repo root) onto
vercel.com/new.
