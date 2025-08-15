export async function fetchDashboard({
  range = "today",
  type = "individual",
} = {}) {
  const params = new URLSearchParams({ range, type });
  const res = await fetch(`/api/dashboard?${params.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load dashboard");
  return res.json();
}
