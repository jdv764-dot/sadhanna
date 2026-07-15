import Foundation

/// Fallback data used when the (unofficial) leaderboard endpoint is
/// unavailable. Trader handles are fictional; profit figures are in the
/// ballpark of Kalshi's public leaderboard. Their "active bets" are
/// generated from REAL live Kalshi markets fetched from the official API,
/// so prices and P/L movement are genuine — only the trader attribution is
/// simulated. The UI labels all of this as demo data.
enum SampleData {
    private static let baseTraders: [(id: String, nickname: String, allTimeProfit: Double, symbol: String)] = [
        ("demo-01", "QuantumEdge", 18_400_000, "bolt.circle.fill"),
        ("demo-02", "MacroWhale", 12_950_000, "chart.line.uptrend.xyaxis.circle.fill"),
        ("demo-03", "ThetaBurn", 9_310_000, "flame.circle.fill"),
        ("demo-04", "PollsterPrime", 6_780_000, "checkmark.seal.fill"),
        ("demo-05", "RainOrShine", 4_420_000, "cloud.sun.fill"),
        ("demo-06", "FedWatcher", 3_150_000, "building.columns.circle.fill"),
        ("demo-07", "LateNightArb", 2_240_000, "moon.circle.fill"),
        ("demo-08", "SignalNoise", 1_480_000, "waveform.circle.fill"),
        ("demo-09", "CoinFlipKing", 890_000, "centsign.circle.fill"),
        ("demo-10", "SlowAndSteady", 615_000, "tortoise.circle.fill"),
    ]

    static func traders(for timeframe: Timeframe) -> [Trader] {
        let scale: Double
        switch timeframe {
        case .daily: scale = 0.004
        case .weekly: scale = 0.02
        case .monthly: scale = 0.08
        case .allTime: scale = 1.0
        }
        return baseTraders.enumerated().map { index, base in
            // Small deterministic jitter so timeframes don't look like a
            // uniform rescale of each other.
            var rng = SeededGenerator(seed: fnv1a("\(base.id)-\(timeframe.rawValue)"))
            let jitter = 0.75 + Double(rng.next(upTo: 50)) / 100.0
            return Trader(
                id: base.id,
                nickname: base.nickname,
                rank: index + 1,
                profitDollars: (base.allTimeProfit * scale * jitter).rounded(),
                avatarSymbol: base.symbol
            )
        }
    }

    /// Builds deterministic demo positions for a trader out of real live
    /// markets (highest-volume first), so current prices and P/L are real.
    static func demoPositions(for trader: Trader, from markets: [KalshiMarket]) -> [BetPosition] {
        guard !markets.isEmpty else { return [] }
        var rng = SeededGenerator(seed: fnv1a(trader.id))
        let count = min(4 + rng.next(upTo: 4), markets.count) // 4–7 bets

        // Spread picks across the market list so traders don't all hold the
        // same top markets.
        var pool = Array(markets.prefix(50))
        var picked: [KalshiMarket] = []
        for _ in 0..<count {
            guard !pool.isEmpty else { break }
            picked.append(pool.remove(at: rng.next(upTo: pool.count)))
        }

        // Bigger traders hold bigger positions.
        let sizeScale = max(1.0, trader.profitDollars / 40_000)

        return picked.map { market in
            let yesPrice = market.bestYesPriceCents ?? 50
            let side: PositionSide = rng.next(upTo: 2) == 0 ? .yes : .no
            let sidePrice = side == .yes ? yesPrice : 100 - yesPrice
            // Entry somewhere within ±14¢ of the current price.
            let drift = rng.next(upTo: 29) - 14
            let entry = min(97, max(3, sidePrice - drift))
            let contracts = (200 + rng.next(upTo: 1800)) * Int(sizeScale.squareRoot())
            return BetPosition(
                id: "\(trader.id)-\(market.ticker)",
                marketTicker: market.ticker,
                marketTitle: market.title,
                marketSubtitle: market.yesSubTitle,
                side: side,
                contracts: contracts,
                avgEntryCents: entry,
                lastYesPriceCents: yesPrice
            )
        }
    }
}

// MARK: - Deterministic randomness (stable across launches)

/// FNV-1a 64-bit hash — Swift's `hashValue` is randomized per launch, so we
/// hash manually to keep demo data stable between app runs.
func fnv1a(_ text: String) -> UInt64 {
    var hash: UInt64 = 0xcbf29ce484222325
    for byte in text.utf8 {
        hash ^= UInt64(byte)
        hash = hash &* 0x100000001b3
    }
    return hash
}

struct SeededGenerator {
    private var state: UInt64

    init(seed: UInt64) {
        self.state = seed == 0 ? 0x9E3779B97F4A7C15 : seed
    }

    /// Returns a value in 0..<bound (bound must be > 0).
    mutating func next(upTo bound: Int) -> Int {
        // xorshift64*
        state ^= state >> 12
        state ^= state << 25
        state ^= state >> 27
        let value = state &* 2685821657736338717
        return Int(value % UInt64(bound))
    }
}
