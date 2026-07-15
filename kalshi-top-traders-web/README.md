# Kalshi Top Traders — Web (Vercel-ready)

Web version of the Kalshi Top Traders app (see `../kalshi-top-traders/`
for the native iOS version). Installable on an iPhone home screen as a
standalone app — no Xcode or App Store needed.

- **Leaderboard** with Today / Week / Month / All-time switcher
- **Trader detail** with active bets: YES/NO side, contracts, entry vs.
  current price, per-bet and total unrealized P/L
- Live market prices via a small serverless proxy (`api/kalshi.js`) so the
  browser never hits CORS issues
- Same honest fallback as the iOS app: Kalshi has no public leaderboard
  API, so if the unofficial endpoint isn't reachable the app shows
  clearly-labeled fictional demo traders whose bets are built from real
  live Kalshi markets

## Deploy to Vercel (~2 minutes)

1. Go to <https://vercel.com/new> and import the `jdv764-dot/sadhanna`
   GitHub repo (sign in with GitHub and grant it access if asked).
2. Set **Root Directory** to `kalshi-top-traders-web`. Leave framework as
   "Other" — there is no build step.
3. Deploy. Vercel auto-detects `api/kalshi.js` as a serverless function.

Every future push to the repo's production branch redeploys automatically.

## Install on iPhone

Open the deployed URL in Safari → Share → **Add to Home Screen**. It
launches full-screen with its own icon like a native app.

## Local preview

Any static server works for the UI (`python3 -m http.server`), but the
`/api/kalshi` proxy only runs on Vercel — locally use `npx vercel dev`, or
just let the app fall back to demo data.
