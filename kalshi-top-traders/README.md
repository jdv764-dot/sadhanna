# Kalshi Top Traders (iOS)

A SwiftUI iPhone app that shows the most profitable traders on
[Kalshi](https://kalshi.com) and the active bets they're holding.

- **Leaderboard** — top traders ranked by profit, with a Today / Week /
  Month / All-time timeframe switcher.
- **Trader detail** — the trader's active bets: market, YES/NO side,
  contracts held, average entry price, current price, and unrealized P/L,
  plus a total open-P/L figure.

## Where the data comes from (important)

Kalshi's **official public API** (`api.elections.kalshi.com/trade-api/v2`)
only exposes *market* data — prices, order books, trades. It has **no
endpoint for the trader leaderboard or other users' positions**, even
though Kalshi's website has an opt-in public
[leaderboard](https://kalshi.com/social/leaderboard).

So the app works in two layers:

1. **Live market data (real):** current prices for every bet come from
   Kalshi's official, keyless market API.
2. **Traders (live if possible, demo otherwise):** on launch the app tries
   the unofficial endpoint behind Kalshi's leaderboard page (configurable
   in `KalshiClient.swift` → `KalshiConfig.leaderboardURLTemplate`). If it
   isn't reachable or its shape has changed, the app falls back to ten
   fictional demo traders whose "active bets" are generated from **real,
   live Kalshi markets** — so prices and P/L still move for real. A banner
   at the bottom of the screen makes it obvious when demo data is showing.

### Pointing it at the real leaderboard

Kalshi's web leaderboard is backed by an undocumented endpoint that can
change at any time. To wire it up:

1. Open <https://kalshi.com/social/leaderboard> in a desktop browser.
2. Open DevTools ▸ Network, filter by XHR/fetch, and reload.
3. Copy the request URL of the leaderboard call and paste it into
   `KalshiConfig.leaderboardURLTemplate` in
   `KalshiTopTraders/KalshiClient.swift` (use `%@` where the time period
   goes).

The response parser is deliberately lenient (it accepts several common
wrapper keys and field names), so a pasted URL will often work without
further code changes.

## Building and running

Requirements: a Mac with **Xcode 16 or newer** (the project uses
folder-synchronized groups), iOS 17+ device or simulator.

1. Open `KalshiTopTraders.xcodeproj` in Xcode.
2. Select the `KalshiTopTraders` target ▸ *Signing & Capabilities*, pick
   your Apple ID team, and change the bundle identifier from
   `com.example.KalshiTopTraders` to something unique.
3. Choose an iPhone simulator or your plugged-in iPhone and press **Run**.

No dependencies, no API keys — everything is stock SwiftUI + URLSession.

## Project layout

```
KalshiTopTraders/
├── KalshiTopTradersApp.swift    App entry point
├── Models.swift                 Trader / position / market models, formatting
├── KalshiClient.swift           Official market API + leaderboard attempt
├── SampleData.swift             Demo traders + positions from live markets
├── LeaderboardViewModel.swift
├── TraderDetailViewModel.swift
└── Views/
    ├── LeaderboardView.swift    Ranked list + timeframe picker
    └── TraderDetailView.swift   Active bets with live prices and P/L
```

## Disclaimer

This app is an unofficial viewer and is not affiliated with Kalshi. Demo
traders are fictional; nothing here is investment advice.
