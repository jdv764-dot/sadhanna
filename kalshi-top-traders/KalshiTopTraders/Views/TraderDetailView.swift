import SwiftUI

struct TraderDetailView: View {
    @State private var viewModel: TraderDetailViewModel

    init(trader: Trader, isDemoData: Bool) {
        _viewModel = State(initialValue: TraderDetailViewModel(trader: trader, isDemoData: isDemoData))
    }

    var body: some View {
        List {
            Section {
                header
            }

            Section("Active Bets") {
                if viewModel.isLoading && viewModel.positions.isEmpty {
                    HStack {
                        Spacer()
                        ProgressView("Loading live markets…")
                        Spacer()
                    }
                    .listRowBackground(Color.clear)
                } else if let error = viewModel.errorMessage, viewModel.positions.isEmpty {
                    ContentUnavailableView(
                        "Couldn't reach Kalshi",
                        systemImage: "wifi.exclamationmark",
                        description: Text(error)
                    )
                } else {
                    ForEach(viewModel.positions) { position in
                        PositionRow(position: position)
                    }
                }
            }
        }
        .listStyle(.insetGrouped)
        .navigationTitle(viewModel.trader.nickname)
        .navigationBarTitleDisplayMode(.inline)
        .refreshable { await viewModel.load() }
        .safeAreaInset(edge: .bottom) {
            if viewModel.isDemoData {
                DemoBanner()
            }
        }
        .task {
            if viewModel.positions.isEmpty {
                await viewModel.load()
            }
        }
    }

    private var header: some View {
        HStack(spacing: 14) {
            Image(systemName: viewModel.trader.avatarSymbol)
                .font(.system(size: 44))
                .foregroundStyle(.tint)

            VStack(alignment: .leading, spacing: 4) {
                Text("Rank #\(viewModel.trader.rank)")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                Text(Format.signedCompactDollars(viewModel.trader.profitDollars))
                    .font(.title2.bold().monospacedDigit())
                    .foregroundStyle(viewModel.trader.profitDollars >= 0 ? .green : .red)
                Text("Profit")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Spacer()

            if let total = viewModel.totalUnrealizedPnL {
                VStack(alignment: .trailing, spacing: 4) {
                    Text(Format.signedCompactDollars(total))
                        .font(.headline.monospacedDigit())
                        .foregroundStyle(total >= 0 ? .green : .red)
                    Text("Open P/L")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .padding(.vertical, 4)
    }
}

struct PositionRow: View {
    let position: BetPosition

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 2) {
                    Text(position.marketTitle)
                        .font(.subheadline.weight(.medium))
                        .lineLimit(2)
                    if let subtitle = position.marketSubtitle, !subtitle.isEmpty {
                        Text(subtitle)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
                Spacer()
                SideBadge(side: position.side)
            }

            HStack {
                Text(quantityLine)
                    .font(.caption.monospacedDigit())
                    .foregroundStyle(.secondary)

                Spacer()

                if let pnl = position.unrealizedPnLDollars {
                    Text(Format.signedCompactDollars(pnl))
                        .font(.subheadline.weight(.semibold).monospacedDigit())
                        .foregroundStyle(pnl >= 0 ? .green : .red)
                }
            }
        }
        .padding(.vertical, 2)
    }

    private var quantityLine: String {
        var line = "\(position.contracts.formatted()) @ \(Format.cents(position.avgEntryCents))"
        if let current = position.currentSidePriceCents {
            line += "  →  now \(Format.cents(current))"
        }
        return line
    }
}

struct SideBadge: View {
    let side: PositionSide

    var body: some View {
        Text(side.rawValue)
            .font(.caption2.bold())
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(side == .yes ? Color.green.opacity(0.18) : Color.red.opacity(0.18))
            .foregroundStyle(side == .yes ? .green : .red)
            .clipShape(Capsule())
    }
}

#Preview {
    NavigationStack {
        TraderDetailView(
            trader: Trader(
                id: "demo-01",
                nickname: "QuantumEdge",
                rank: 1,
                profitDollars: 1_472_000,
                avatarSymbol: "bolt.circle.fill"
            ),
            isDemoData: true
        )
    }
}
