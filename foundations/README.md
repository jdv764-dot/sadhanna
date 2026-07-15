# Foundations · Learn the main teachings of Christianity

A mobile-first learning app covering the core teachings of Christianity —
God and the Trinity, Jesus' life, death, and resurrection, salvation by
grace, the Holy Spirit, the Bible, prayer, the ethics of Jesus, the church
and sacraments, Christian hope, and the creeds. Written to be ecumenical:
where Catholic, Orthodox, and Protestant traditions differ, the lessons
say so.

Built as an installable web app (PWA), so it runs full-screen on an iPhone
like a native app — no App Store, no Mac, no developer account needed.

## What's inside

- **Learn** — 5 modules, 21 lessons. Each has a key idea, a short teaching,
  a key Scripture verse, and key terms. Completion is tracked.
- **Quiz** — 10 random questions per round from a 30-question bank, with an
  explanation after every answer. Best score is saved.
- **Texts** — the great texts of the faith for reading and memorizing: the
  Lord's Prayer, the Apostles' Creed, the Ten Commandments, the Beatitudes,
  the Great Commandments, the Fruit of the Spirit, John 3:16, and a
  one-minute map of the Bible.
- **Progress** — completion per module and quiz stats. Everything is stored
  only on the device (localStorage); nothing is uploaded anywhere.
- Works offline after first load (service worker).

Scripture quotations follow the World English Bible and traditional
liturgical texts (public domain).

## Install on iPhone

1. Open the app's URL in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**.
3. Launch it from the home screen — it opens full-screen like a native app.

## Deploy

This folder is a plain static site — no build step. It deploys to GitHub
Pages automatically via `.github/workflows/deploy-pages.yml` (served at
`/foundations/` alongside the other app in this repo), or drag-and-drop
the folder onto vercel.com/new.
