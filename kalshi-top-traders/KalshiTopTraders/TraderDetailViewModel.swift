import Foundation
import Observation

@Observable
@MainActor
final class TraderDetailViewModel {
    let trader: Trader
    let isDemoData: Bool

    var positions: [BetPosition] = []
    var isLoading = false
    var errorMessage: String?

    init(trader: Trader, isDemoData: Bool) {
        self.trader = trader
        self.isDemoData = isDemoData
    }

    var totalUnrealizedPnL: Double? {
        let values = positions.compactMap(\.unrealizedPnLDollars)
        return values.isEmpty ? nil : values.reduce(0, +)
    }

    var totalCostBasis: Double {
        positions.reduce(0) { $0 + $1.costBasisDollars }
    }

    func load() async {
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        do {
            // Kalshi has no public API for another user's positions, so
            // demo positions are generated from REAL live markets fetched
            // from the official market API — prices and P/L movement are
            // genuine, the attribution to this trader is simulated.
            let markets = try await KalshiClient.shared.fetchOpenMarkets(limit: 60)
            positions = SampleData.demoPositions(for: trader, from: markets)
                .sorted { abs($0.unrealizedPnLDollars ?? 0) > abs($1.unrealizedPnLDollars ?? 0) }
        } catch {
            positions = []
            errorMessage = error.localizedDescription
        }
    }
}
