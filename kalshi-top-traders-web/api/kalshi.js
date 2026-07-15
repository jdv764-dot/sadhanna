// Serverless proxy so the browser can reach Kalshi without CORS issues.
// GET /api/kalshi?path=markets&status=open&limit=60
// GET /api/kalshi?path=leaderboard&period=monthly
const OFFICIAL_BASE = "https://api.elections.kalshi.com/trade-api/v2";

// Kalshi has no official leaderboard API; this is the best-guess endpoint
// behind kalshi.com/social/leaderboard. If it 404s the client falls back
// to demo traders. Update it here if you find the real URL in DevTools.
const LEADERBOARD_BASE = "https://api.elections.kalshi.com/v1/social/leaderboard";

export default async function handler(req, res) {
  const { path = "markets", ...rest } = req.query;
  const qs = new URLSearchParams(rest).toString();

  let url;
  if (path === "leaderboard") {
    url = `${LEADERBOARD_BASE}${qs ? `?${qs}` : ""}`;
  } else if (/^(markets|events|series)(\/[A-Za-z0-9_.-]+)?$/.test(path)) {
    url = `${OFFICIAL_BASE}/${path}${qs ? `?${qs}` : ""}`;
  } else {
    return res.status(400).json({ error: "unsupported path" });
  }

  try {
    const upstream = await fetch(url, {
      headers: { accept: "application/json" },
    });
    const body = await upstream.text();
    res.setHeader("access-control-allow-origin", "*");
    res.setHeader("cache-control", "s-maxage=30, stale-while-revalidate=120");
    res.status(upstream.status).send(body);
  } catch (err) {
    res.status(502).json({ error: String(err) });
  }
}
