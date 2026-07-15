# First · A study in generous lovemaking

A private, mobile-first study companion inspired by the core principles of Ian
Kerner's *She Comes First* — pleasure-first philosophy, honest anatomy, the
arousal arc, oral technique, and communication. All content is original
educational writing; nothing is reproduced from the book.

Built as an installable web app (PWA), so it runs full-screen on an iPhone like
a native app — no App Store, no Mac, no developer account needed.

## What's inside

- **Learn** — 5 modules, 21 lessons, each ending with a concrete "Try this"
  exercise. Completion is tracked.
- **Guide** — the ten principles and an 8-step session flow for quick reference.
- **Reflect** — a private journal with rotating prompts. Entries never leave
  the device (localStorage only — nothing is uploaded anywhere).
- **Progress** — completion stats per module.
- Works offline after first load (service worker).

## Deploy (Vercel)

This folder is a plain static site — no build step.

1. In Vercel: **Add New → Project**, import this repo.
2. Set **Root Directory** to `she-comes-first`.
3. Framework preset: **Other**. Deploy.

(Or drag-and-drop the `she-comes-first` folder onto vercel.com/new.)

## Install on your iPhone

1. Open the deployed URL in **Safari**.
2. Tap the **Share** button → **Add to Home Screen**.
3. It appears as a discreet "F·" icon named **First** and opens full-screen,
   with no browser chrome.

## Privacy

There is no account, no analytics, and no server storage. Lesson progress and
journal entries live only in the browser storage of the device the app is
installed on. Deleting the app from the home screen (and clearing Safari
website data for the site) removes everything.
