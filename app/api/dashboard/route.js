import data from "@/data/dashboard.json";

function scale(v, factor) {
  return Math.round(v * factor);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "today"; // 'today' | 'month' | 'custom'
  const type = searchParams.get("type") || "individual"; // used client-side to pick status/categories

  // Clone base data so we can tweak values per range without mutating the JSON
  const payload = JSON.parse(JSON.stringify(data));

  // Lightly modify numbers to simulate different ranges
  const f = range === "month" ? 4 : range === "custom" ? 1.2 : 1;

  payload.totals.totalKYCs = scale(payload.totals.totalKYCs, f);
  payload.totals.newKYC.count = scale(payload.totals.newKYC.count, f);
  payload.totals.modifiedKYC.count = scale(payload.totals.modifiedKYC.count, f);

  payload.bar = payload.bar.map((row) => ({
    ...row,
    today: scale(row.today, f),
    yesterday: scale(row.yesterday, f * 0.9),
  }));

  // Status cards per type are left as-is (client selects which set to show)
  // same for categories

  return new Response(JSON.stringify(payload), {
    headers: { "Content-Type": "application/json" },
  });
}
