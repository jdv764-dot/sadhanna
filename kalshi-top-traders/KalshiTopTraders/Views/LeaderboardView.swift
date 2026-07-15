import SwiftUI

struct LeaderboardView: View {
    @State private var viewModel = LeaderboardViewModel()

    var body: some View {
        NavigationStack {
            List {
                Section {
                    ForEach(viewModel.traders) { trader in
                        NavigationLink(
                            value: trader
                        ) {
                            TraderRow(trader: trader)
                        }
                    }
                } header: {
                    Picker("Timeframe", selection: $viewModel.timeframe) {
                        ForEach(Timeframe.allCases) { timeframe in
                            Text(timeframe.label).tag(timeframe)
                        }
                    }
                    .pickerStyle(.segmented)
                    .textCase(nil)
                    .listRowInsets(EdgeInsets())
                    .padding(.bottom, 8)
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Top Traders")
            .navigationDestination(for: Trader.self) { trader in
                TraderDetailView(trader: trader, isDemoData: viewModel.isDemoData)
            }
            .overlay {
                if viewModel.isLoading && viewModel.traders.isEmpty {
                    ProgressView("Loading leaderboard…")
                }
            }
            .refreshable { await viewModel.load() }
            .safeAreaInset(edge: .bottom) {
                if viewModel.isDemoData {
                    DemoBanner()
                }
            }
            .task {
                if viewModel.traders.isEmpty {
                    await viewModel.load()
                }
            }
        }
    }
}

private struct TraderRow: View {
    let trader: Trader

    var body: some View {
        HStack(spacing: 12) {
            RankBadge(rank: trader.rank)

            Image(systemName: trader.avatarSymbol)
                .font(.title2)
                .foregroundStyle(.tint)
                .frame(width: 34)

            VStack(alignment: .leading, spacing: 2) {
                Text(trader.nickname)
                    .font(.headline)
                Text("Rank #\(trader.rank)")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Spacer()

            Text(Format.signedCompactDollars(trader.profitDollars))
                .font(.headline.monospacedDigit())
                .foregroundStyle(trader.profitDollars >= 0 ? .green : .red)
        }
        .padding(.vertical, 2)
    }
}

struct RankBadge: View {
    let rank: Int

    var body: some View {
        Group {
            switch rank {
            case 1: medal(.yellow)
            case 2: medal(.gray)
            case 3: medal(.orange)
            default:
                Text("\(rank)")
                    .font(.subheadline.weight(.semibold).monospacedDigit())
                    .foregroundStyle(.secondary)
            }
        }
        .frame(width: 26)
    }

    private func medal(_ color: Color) -> some View {
        Image(systemName: "medal.fill")
            .foregroundStyle(color)
    }
}

struct DemoBanner: View {
    var body: some View {
        Label {
            Text("Demo traders — Kalshi has no public leaderboard API. Prices are live from Kalshi's market API.")
        } icon: {
            Image(systemName: "info.circle.fill")
        }
        .font(.caption)
        .foregroundStyle(.secondary)
        .padding(10)
        .frame(maxWidth: .infinity)
        .background(.thinMaterial)
    }
}

#Preview {
    LeaderboardView()
}
