# TradingView indicators

## NeoWave Impulse Waves (`neowave-impulse-waves.pine`)

A chart-overlay Elliott/NeoWave impulse counter, modeled on the StockLi wave-forecast view:

- Detects bullish and bearish **5-wave impulses** from swing pivots and labels them **⓪ ① ② ③ ④ ⑤** directly on the candles (⑤? while wave 5 is still projected).
- Enforces the inviolable rules before drawing a count:
  - Wave 2 never retraces all of Wave 1
  - Wave 3 is never the shortest motive wave
  - Wave 4 stays out of Wave 1 territory (no overlap)
- Projects the **Wave-5 target zone** from Wave 1 (default 0.618×–1.0×, both configurable) with `Target` and `Stretch` levels pinned to the right edge.
- Draws the dashed **invalidation line** ("Wrong below/above …") at the Wave-1 extreme; if price breaks it, the line turns solid red and the count is flagged invalid.
- Optional **rule-check panel** (bottom right) showing W2 retrace %, W3 vs W1 ratio, W4 retrace %, overlap status, and the live Wave-5 projection.
- Built-in **alerts**: new count detected, Wave-5 target reached, count invalidated.

## Active Setups (`neowave-active-setups.pine`)

Same engine, but it shows **only the setup that is live right now** — and it catches four stages, each with its own target zone and invalidation line:

| Setup | Trigger | Target zone | Wrong when |
| --- | --- | --- | --- |
| **Wave 4** | Waves 0–3 confirmed, pullback unfolding | 0.382–0.50 retrace of W3 | Price enters Wave-1 territory |
| **Wave 5** | Waves 0–4 confirmed | 0.618–1.0× W1 from the W4 pivot | Price re-enters Wave-1 territory |
| **Wave B** | A 5-wave impulse completed and leg A confirmed | 0.382–0.618 retrace of A | Price takes out the correction origin |
| **Wave C** | Legs A and B confirmed | 1.0–1.618× A from the B pivot | Price takes out the correction origin |

Everything is wiped from the chart the moment a setup resolves (the next pivot confirms) or gets invalidated, so no stale counts ever remain — a blank chart means nothing qualifies right now. Each setup type can be toggled individually, all fib multiples are inputs, and four alerts are available: setup detected/updated, target reached, setup invalidated, setup resolved.

### Install

1. Open any chart on [TradingView](https://www.tradingview.com) and open the **Pine Editor** (bottom panel).
2. Paste the contents of `neowave-impulse-waves.pine`, then click **Add to chart**.
3. Optionally **Save** the script so it appears under *Indicators → My scripts*.

### Settings

| Input | Default | What it does |
| --- | --- | --- |
| Pivot strength | 6 | Bars on each side a swing must dominate. Raise it for bigger, slower wave counts; lower it for faster ones. |
| Wave-5 target / stretch | 0.618 / 1.0 | Fibonacci multiples of Wave 1 projected from the Wave-4 low/high. |
| Detect bullish / bearish | on | Toggle either direction off. |
| Show rule-check panel | on | Turn off for a pure overlay with no table. |

To set an alert: chart → *Alerts* → condition **NeoWave Impulse Waves** → pick one of the three events.
