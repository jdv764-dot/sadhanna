import Foundation

// MARK: - App models

struct Trader: Identifiable, Hashable {
    let id: String
    let nickname: String
    let rank: Int
    let profitDollars: Double
    /// SF Symbol used as the avatar (Kalshi avatars are not available offline).
    let avatarSymbol: String
}

enum PositionSide: String, Hashable {
    case yes = "YES"
    case no = "NO"
}

struct BetPosition: Identifiable, Hashable {
    let id: String
    let marketTicker: String
    let marketTitle: String
    let marketSubtitle: String?
    let side: PositionSide
    let contracts: Int
    /// Average entry price for the held side, in cents (1–99).
    let avgEntryCents: Int
    /// Latest YES price from the official market API, in cents.
    var lastYesPriceCents: Int?

    /// Current price of the side this position holds.
    var currentSidePriceCents: Int? {
        guard let yes = lastYesPriceCents else { return nil }
        return side == .yes ? yes : 100 - yes
    }

    var costBasisDollars: Double {
        Double(avgEntryCents * contracts) / 100.0
    }

    var unrealizedPnLDollars: Double? {
        guard let current = currentSidePriceCents else { return nil }
        return Double((current - avgEntryCents) * contracts) / 100.0
    }
}

enum Timeframe: String, CaseIterable, Identifiable {
    case daily
    case weekly
    case monthly
    case allTime

    var id: String { rawValue }

    var label: String {
        switch self {
        case .daily: return "Today"
        case .weekly: return "Week"
        case .monthly: return "Month"
        case .allTime: return "All time"
        }
    }

    /// Value sent to the leaderboard endpoint's period parameter.
    var apiValue: String {
        switch self {
        case .daily: return "daily"
        case .weekly: return "weekly"
        case .monthly: return "monthly"
        case .allTime: return "all_time"
        }
    }
}

// MARK: - Official Kalshi market API DTOs

struct MarketsResponse: Decodable {
    let markets: [KalshiMarket]
}

struct KalshiMarket: Decodable {
    let ticker: String
    let title: String
    let yesSubTitle: String?
    let lastPrice: Int?
    let yesBid: Int?
    let yesAsk: Int?
    let volume: Int?

    enum CodingKeys: String, CodingKey {
        case ticker, title, volume
        case yesSubTitle = "yes_sub_title"
        case lastPrice = "last_price"
        case yesBid = "yes_bid"
        case yesAsk = "yes_ask"
    }

    /// Best available YES price in cents: last trade, else bid/ask midpoint.
    var bestYesPriceCents: Int? {
        if let last = lastPrice, last > 0 { return last }
        if let bid = yesBid, let ask = yesAsk, bid > 0 || ask > 0 {
            return (bid + ask + 1) / 2
        }
        return nil
    }
}

// MARK: - Formatting helpers

enum Format {
    /// Compact dollar amount with sign, e.g. "+$12.4M", "-$830", "+$4,210".
    static func signedCompactDollars(_ value: Double) -> String {
        let sign = value < 0 ? "-" : "+"
        return sign + compactDollars(abs(value))
    }

    static func compactDollars(_ value: Double) -> String {
        let magnitude = abs(value)
        switch magnitude {
        case 1_000_000...:
            return String(format: "$%.1fM", magnitude / 1_000_000)
        case 10_000...:
            return String(format: "$%.0fK", magnitude / 1_000)
        default:
            let formatter = NumberFormatter()
            formatter.numberStyle = .currency
            formatter.currencyCode = "USD"
            formatter.maximumFractionDigits = 0
            return formatter.string(from: NSNumber(value: magnitude)) ?? String(format: "$%.0f", magnitude)
        }
    }

    static func cents(_ value: Int) -> String {
        "\(value)\u{00A2}"
    }
}
