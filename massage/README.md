# Kneaded · partner massage, East & West

An app for learning massage on the person you love — a library of
**Eastern and Western techniques**, **guided timed routines**, and a
**practice log** that captures your partner's feedback so you actually
improve session over session.

Built as an installable web app (PWA), so it runs full-screen on an iPhone
like a native app — no App Store, no Mac, no developer account needed.

## What's inside

- **Learn** — 19 techniques across both traditions, each with step-by-step
  instructions, tips, pressure level, and cautions:
  - *Western:* Swedish (effleurage, petrissage, friction, tapotement,
    vibration), deep-tissue forearm glides, trigger point release,
    myofascial skin stretching, sports compression.
  - *Eastern:* shiatsu palming & meridian thumbing, classic acupressure
    points, Thai palm presses & passive stretches, tuina rolling (gun fa)
    and grasping (na fa), Ayurvedic abhyanga, foot reflexology
    thumb-walking, Indian head massage (champi).
- **Body map** — a tappable front/back body figure: tap any body part to
  see which techniques suit it, how to approach the area, and its cautions
  (including off-limits zones like the front of the neck).
- **Routines** — six guided, timed sessions (10–25 min) with a full-screen
  step timer, gentle chimes, pause/skip, and a screen wake-lock:
  First Swedish Back, Tension Melter, East Meets West, Thai-Inspired Floor
  Session, Foot Wind-Down, Ten-Minute Reset.
- **Log** — after each session, record your partner's pressure feedback,
  a rating, and "one thing to do more of, one to change." Stats track
  sessions, minutes, and most-practiced techniques.
- **Basics** — room setup, oils, body mechanics, a check-in script, a
  pressure guide, areas to treat with care, and when to skip massage
  entirely.
- Everything is stored only on the device (localStorage); nothing is
  uploaded anywhere. Works offline after first load (service worker).

Kneaded is for wellness massage between consenting partners — it is not
medical or therapeutic care.

## Install on iPhone

1. Open the app's URL in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**.
3. Launch it from the home screen — it opens full-screen like a native app.

## Deploy

This folder is a plain static site — no build step. It deploys to GitHub
Pages automatically via `.github/workflows/deploy-pages.yml` (served at
`/massage/` alongside the other apps in this repo), or drag-and-drop
the folder (or `massage-vercel-ready.zip` from the repo root) onto
vercel.com/new.
