import Foundation

// MARK: - Configuration

enum KalshiConfig {
    /// Official public market data API. No authentication required.
    /// Docs: https://docs.kalshi.com
    static let marketAPIBase = URL(string: "https://api.elections.kalshi.com/trade-api/v2")!

    /// Kalshi's trader leaderboard (kalshi.com/social/leaderboard) has NO
    /// official, documented API. The URL below is a best guess at the
    /// endpoint backing that page and may return 404/403, in which case the
    /// app falls back to demo traders (clearly labeled in the UI).
    ///
    /// To wire up the real thing: open https://kalshi.com/social/leaderboard
    /// in a desktop browser, open DevTools ▸ Network, filter XHR/fetch,
    /// reload, and paste the leaderboard request URL here (a `%@` will be
    /// replaced with the period, e.g. "daily", "monthly", "all_time").
    static let leaderboardURLTemplate =
        "https://api.elections.kalshi.com/v1/social/leaderboard?period=%@&limit=25"
}

// MARK: - Errors

enum KalshiError: LocalizedError {
    case badStatus(Int)
    case unrecognizedPayload

    var errorDescription: String? {
        switch self {
        case .badStatus(let code): return "Kalshi returned HTTP \(code)."
        case .unrecognizedPayload: return "Kalshi returned data in an unexpected format."
        }
    }
}

// MARK: - Client

struct KalshiClient {
    static let shared = KalshiClient()

    private let session: URLSession = {
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 15
        config.requestCachePolicy = .reloadIgnoringLocalCacheData
        return URLSession(configuration: config)
    }()

    private func getJSON(_ url: URL) async throws -> Data {
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        let (data, response) = try await session.data(for: request)
        if let http = response as? HTTPURLResponse, !(200...299).contains(http.statusCode) {
            throw KalshiError.badStatus(http.statusCode)
        }
        return data
    }

    // MARK: Official market data (documented, public)

    /// Open markets, highest volume first — used to price positions and to
    /// build demo positions from real live markets.
    func fetchOpenMarkets(limit: Int = 60) async throws -> [KalshiMarket] {
        var components = URLComponents(
            url: KalshiConfig.marketAPIBase.appendingPathComponent("markets"),
            resolvingAgainstBaseURL: false
        )!
        components.queryItems = [
            URLQueryItem(name: "status", value: "open"),
            URLQueryItem(name: "limit", value: String(limit)),
        ]
        let data = try await getJSON(components.url!)
        let decoded = try JSONDecoder().decode(MarketsResponse.self, from: data)
        return decoded.markets
            .filter { $0.bestYesPriceCents != nil }
            .sorted { ($0.volume ?? 0) > ($1.volume ?? 0) }
    }

    // MARK: Leaderboard (unofficial — see KalshiConfig)

    /// Tries the configured leaderboard endpoint and parses defensively,
    /// since the payload shape is not documented. Throws when unreachable
    /// or unrecognizable; callers fall back to demo data.
    func fetchLeaderboard(timeframe: Timeframe) async throws -> [Trader] {
        let urlString = String(
            format: KalshiConfig.leaderboardURLTemplate,
            timeframe.apiValue
        )
        guard let url = URL(string: urlString) else { throw KalshiError.unrecognizedPayload }
        let data = try await getJSON(url)

        guard let root = try JSONSerialization.jsonObject(with: data) as? [String: Any] else {
            throw KalshiError.unrecognizedPayload
        }

        // Look for the first array-of-objects under common wrapper keys.
        let candidateKeys = ["leaderboard", "entries", "rankings", "users", "traders", "data"]
        var rows: [[String: Any]] = []
        for key in candidateKeys {
            if let array = root[key] as? [[String: Any]], !array.isEmpty {
                rows = array
                break
            }
        }
        guard !rows.isEmpty else { throw KalshiError.unrecognizedPayload }

        let traders = rows.enumerated().compactMap { index, row -> Trader? in
            let nickname = firstString(in: row, keys: ["nickname", "username", "handle", "display_name", "name"])
            guard let nickname else { return nil }
            let id = firstString(in: row, keys: ["user_id", "id", "member_id"]) ?? nickname
            let rank = firstNumber(in: row, keys: ["rank", "position"]).map(Int.init) ?? index + 1

            // Profit may arrive in cents or dollars depending on the field.
            var profit = 0.0
            if let cents = firstNumber(in: row, keys: ["profit_cents", "pnl_cents", "realized_pnl_cents"]) {
                profit = cents / 100.0
            } else if let dollars = firstNumber(in: row, keys: ["profit", "pnl", "realized_pnl", "earnings"]) {
                profit = dollars
            }

            return Trader(
                id: id,
                nickname: nickname,
                rank: rank,
                profitDollars: profit,
                avatarSymbol: "person.crop.circle.fill"
            )
        }

        guard !traders.isEmpty else { throw KalshiError.unrecognizedPayload }
        return traders.sorted { $0.rank < $1.rank }
    }

    private func firstString(in row: [String: Any], keys: [String]) -> String? {
        for key in keys {
            if let value = row[key] as? String, !value.isEmpty { return value }
        }
        return nil
    }

    private func firstNumber(in row: [String: Any], keys: [String]) -> Double? {
        for key in keys {
            if let value = row[key] as? NSNumber { return value.doubleValue }
            if let value = row[key] as? String, let parsed = Double(value) { return parsed }
        }
        return nil
    }
}
