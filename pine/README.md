# Bull Flag — Trend-Based Fib Extension (Pine Script v6)

A TradingView indicator that detects **bull flags**, identifies the **first
corrective swing inside the flag**, projects that swing downward with a
**trend-based Fibonacci extension**, and plots a complete trade plan:

| Level | Rule |
|---|---|
| **Buy zone** | Near the **1.0** extension of the corrective swing (A→B projected from C) |
| **Stop** | Below the **1.618** extension of the corrective swing |
| **Target** | Breakout above the pole, approximated by the **−0.236** Fibonacci extension of the pole |

File: [`bull-flag-fib-extension.pine`](bull-flag-fib-extension.pine)

## Background — *Technical Analysis of the Financial Markets* (John J. Murphy)

Murphy treats flags and pennants as among the most reliable **continuation
patterns** (Chapter 6). The key characteristics the script encodes:

1. **The flagpole.** The pattern must be preceded by a sharp, almost
   straight-line advance on heavy volume. The script measures this impulse
   leg in ATR multiples (`Min pole height`, default 3.5 × ATR-14) between a
   pivot low (pole base) and a pivot high (**A**, the flag high).
2. **The flag.** A brief pause that drifts *against* the trend — a small,
   downward-sloping channel. Murphy notes flags should be shallow; the
   script rejects setups where the first corrective low retraces more than
   a configurable share of the pole (default **50%**).
3. **Volume.** Volume should dry up during the consolidation and expand on
   the breakout. The optional volume filter requires average flag volume to
   be lower than average pole volume.
4. **The measured move.** Flags "fly at half-mast": the pole height tends to
   repeat after the breakout. The −0.236 pole extension used here
   (pole high + 23.6% of the pole) is a *conservative* first objective in
   the direction of that measured move — price must break out above the flag
   high and clear the pole by roughly a quarter of its height.

## How the levels are computed

The script finds three pivots inside the flag:

```
A = flag high (top of the pole)
B = first corrective pivot low after A     ← the "first corrective swing" is A→B
C = first reaction pivot high after B (a lower high)
```

It then applies the same math as TradingView's **Trend-Based Fib Extension**
drawing tool anchored A → B → C, projected downward:

```
level(r) = C − r · (A − B)

entry  = C − 1.000 · (A − B)     // AB = CD: the corrective swing repeats
stop   = C − 1.618 · (A − B)     // golden-ratio overshoot = pattern failure
target = A + 0.236 · (A − pole low)   // the −0.236 fib extension of the pole
```

The 1.0 extension is the classic **AB = CD** completion — the second leg of
the flag equals the first corrective swing, which is where a bull flag's
lower channel line is typically tagged. A decisive close beyond the 1.618
extension means the "correction" has grown too large to be a flag, so the
stop sits just below it.

## Catching setups as they form (not just after the fact)

Pivot-based detection normally confirms swings only `Pivot length` bars
later, so a setup would first appear when it is nearly complete. The
**Anticipation / live setups** inputs surface the setup *while it is still
building*:

- **Show provisional levels while the flag is forming** (default on) — as
  soon as the pole is detected, the flag high and the maximum-retracement
  floor for B are plotted forward. Once B confirms, the script tracks the
  *developing* reaction high as a stand-in for C and projects live,
  bar-by-bar provisional entry/stop/target lines (faded colors). They firm
  up into the final levels the moment C confirms.
- **Status table** (default on, top-right) — shows the current state
  ("Scanning", "Pole found — waiting for B", "B set — levels projecting",
  "ARMED", "LONG") plus the live level values (`~` prefix = provisional).
- **Early alerts** — *"Bull flag pole detected"* and *"Corrective low
  confirmed"* fire at the earliest stages, so you can watch a candidate
  before it arms.
- **Allow early entry on provisional levels** (default **off**) — lets the
  buy trigger fire from the provisional 1.0 extension before C is a
  confirmed pivot. This catches fast flags that tag the extension within
  the pivot-confirmation window, at the cost of occasionally entering
  against a C that would never have confirmed. The provisional levels are
  live-updating (they ratchet up as the reaction high extends) but nothing
  repaints — history shows exactly what was known on each bar.

## Signal lifecycle

The indicator runs a small state machine on confirmed pivots
(`Pivot length`, default 3 bars each side):

1. **Pole found** → waits for the first corrective low **B** (rejected if it
   retraces too deep, takes too long, or price just keeps trending).
2. **B confirmed** → waits for the reaction high **C** (must be a lower high).
3. **Armed** — draws the A/B/C swing, the entry/stop/target lines, and fires
   the *"Bull flag armed"* alert.
4. **Buy** — price tags the 1.0-extension zone (± an ATR tolerance) →
   triangle marker + *"Bull flag buy"* alert.
5. **Resolution** — either the −0.236 pole target is reached (*"Bull flag
   target"*), or a close below the 1.618 extension stops the trade
   (*"Bull flag stopped"*). A breakout above the flag high before the buy
   zone is tagged cancels the setup ("Breakout — no fill").

## Installation

1. TradingView → **Pine Editor** → paste the contents of
   `bull-flag-fib-extension.pine` → **Add to chart**.
2. Create alerts from the four `alertcondition`s if you want notifications
   ("Any alert() function call" is not used; pick the specific condition).

## Settings worth tuning

| Input | Default | Notes |
|---|---|---|
| Pivot length | 3 | Larger = fewer, bigger swings; smaller = more sensitive |
| Min pole height (ATR) | 3.5 | Raise on choppy symbols to demand a sharper pole |
| Max pole retracement by B | 0.5 | Murphy's flags are shallow; 0.38–0.5 is typical |
| Max flag duration | 40 bars | Flags are *brief* — long consolidations lose reliability |
| Entry / stop extensions | 1.0 / 1.618 | The requested trade plan; adjustable |
| Pole fib level for target | −0.236 | More aggressive: −0.618 or −1.0 (full measured move) |

## Reading the chart / troubleshooting

- **Old entry/stop lines with the table saying "Scanning"** = a *finished*
  setup, not a live one. Every setup now ends with an outcome label at its
  last bar: `BUY` → `TARGET`/`STOPPED`, or `Breakout — no fill`,
  `Setup invalidated`, `Setup expired (flag too old)`,
  `No entry — below trend EMA`. If you'd rather not keep the lines of
  setups that never filled, turn off *"Keep drawings of setups that never
  filled"*.
- **Trend EMA entry filter** (default on, EMA-50): a buy-zone touch that
  happens with price below the trend EMA is refused and the setup is
  cancelled — flags are continuation patterns, and a tag of the zone deep
  inside a breakdown is a falling knife, not a pullback.
- **Flag duration**: default max is 25 bars. Murphy's flags last one to
  three weeks, so on a daily chart consider 10–15; on intraday charts the
  bar count matters more than the wall-clock time.

## Disclaimer

Educational tooling only — not financial advice. Pattern detection on
historical pivots confirms `Pivot length` bars after the fact; always
validate on your own symbols/timeframes before trading.
