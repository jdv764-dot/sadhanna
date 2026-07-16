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
