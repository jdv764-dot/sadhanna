import Foundation
import Observation

@Observable
@MainActor
final class LeaderboardViewModel {
    var traders: [Trader] = []
    var isLoading = false
    var isDemoData = false
    var errorMessage: String?

    var timeframe: Timeframe = .monthly {
        didSet {
            guard timeframe != oldValue else { return }
            Task { await load() }
        }
    }

    func load() async {
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        do {
            traders = try await KalshiClient.shared.fetchLeaderboard(timeframe: timeframe)
            isDemoData = false
        } catch {
            // Kalshi exposes no official leaderboard API; fall back to
            // clearly-labeled demo traders.
            traders = SampleData.traders(for: timeframe)
            isDemoData = true
        }
    }
}
