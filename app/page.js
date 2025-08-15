"use client";
import BarComparisonChart from "@/components/BarComparisonChart";
import ConcentricRingsChart from "@/components/ConcentricRingsChart";
import ProgressBar from "@/components/ProgressBar";
import { CardSkeleton, ChartSkeleton } from "@/components/Skeletons";
import StatCard from "@/components/StatCard";
import { fetchDashboard } from "@/lib/api";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DashboardPage() {
  const [range, setRange] = useState("today");
  const [type, setType] = useState("individual");
  const [customDate, setCustomDate] = useState("");
  const [view, setView] = useState("solicited");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchDashboard({ range, type })
      .then(setData)
      .finally(() => setLoading(false));
  }, [range, type]);

  const status = useMemo(() => data?.status?.[type] ?? {}, [data, type]);
  const cats = useMemo(() => data?.categories?.[type] ?? {}, [data, type]);
  const circle = useMemo(
    () => data?.circular?.[view] ?? { total: 0, rings: [] },
    [data, view]
  );

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-xl font-semibold">Axis MF</h1>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setRange("today")}
            className={`btn-tab ${
              range === "today" ? "btn-tab-active" : "btn-tab-muted"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setRange("month")}
            className={`btn-tab ${
              range === "month" ? "btn-tab-active" : "btn-tab-muted"
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setRange("custom")}
            className={`btn-tab ${
              range === "custom" ? "btn-tab-active" : "btn-tab-muted"
            }`}
          >
            Custom
          </button>
          {range === "custom" && (
            <input
              type="date"
              className="input h-9"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* Totals & Chart Row */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Totals */}
          <div className="card p-4">
            <div className="text-sm text-gray-500">Total KYCs</div>
            {loading ? (
              <Skeleton width={100} height={28} className="mt-1" />
            ) : (
              <div className="text-3xl font-semibold">
                {data.totals.totalKYCs.toLocaleString()}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {loading ? (
                <CardSkeleton />
              ) : (
                <StatCard
                  title="New KYC"
                  value={data.totals.newKYC.count}
                  change={data.totals.newKYC.change}
                  positive
                />
              )}
              {loading ? (
                <CardSkeleton />
              ) : (
                <StatCard
                  title="Modified KYC"
                  value={data.totals.modifiedKYC.count}
                  change={data.totals.modifiedKYC.change}
                  positive={false}
                />
              )}
            </div>
          </div>

          {/* Bar Chart */}
          {loading ? <ChartSkeleton /> : <BarComparisonChart data={data.bar} />}

          {/* Status Cards */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium">KYC Status</div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} height={60} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-6 md:grid-cols- gap-4 ">
                <StatTile
                  label="KYC Initiated"
                  value={status.initiated}
                  icon="🚀"
                  color="#2563eb"
                />
                <StatTile
                  label="Under Process"
                  value={status.underProcess}
                  icon="⚙️"
                  color="#f97316"
                />
                <StatTile
                  label="Registered"
                  value={status.registered}
                  icon="👤"
                  color="#06b6d4"
                />
                <StatTile
                  label="Validated"
                  value={status.validated}
                  icon="✅"
                  color="#22c55e"
                />
                <StatTile
                  label="Hold"
                  value={status.hold}
                  icon="⏸️"
                  color="#38bdf8"
                />
                <StatTile
                  label="Docs Pending"
                  value={status.docsPending}
                  icon="⏳"
                  color="#ef4444"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Categories FIRST */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">Categories</div>
              <div className="segment-toggle">
                <button
                  onClick={() => setType("individual")}
                  className={`segment-button ${
                    type === "individual" ? "active" : ""
                  }`}
                >
                  Individual
                </button>
                <button
                  onClick={() => setType("nonIndividual")}
                  className={`segment-button ${
                    type === "nonIndividual" ? "active" : ""
                  }`}
                >
                  Non Individual
                </button>
              </div>
            </div>
            {loading ? (
              <div className="space-y-3">
                <Skeleton width={60} height={14} />
                <Skeleton height={8} />
                <Skeleton width={60} height={14} />
                <Skeleton height={8} />
              </div>
            ) : (
              <>
                <ProgressBar label="RI" value={cats.ri ?? 0} />
                <ProgressBar label="NRI" value={cats.nri ?? 0} />
              </>
            )}
          </div>

          {/* Circular Chart SECOND */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">
                {view === "solicited" ? "Solicited" : "Unsolicited"}
              </div>
              <div className="flex gap-6 border-b border-gray-200">
                <button
                  onClick={() => setView("solicited")}
                  className={`tab-button ${
                    view === "solicited" ? "active" : ""
                  }`}
                >
                  Solicited
                </button>
                <button
                  onClick={() => setView("unsolicited")}
                  className={`tab-button ${
                    view === "unsolicited" ? "active" : ""
                  }`}
                >
                  Unsolicited
                </button>
              </div>
            </div>
            {loading ? (
              <Skeleton height={280} />
            ) : (
              <ConcentricRingsChart rings={circle.rings} total={circle.total} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value, icon, color }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-sm border border-gray-200">
      <div className="text-3xl mb-2" style={{ color }}>
        {icon}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-xl font-bold">{(value ?? 0).toLocaleString()}</div>
    </div>
  );
}

function Pill({ label, value }) {
  return (
    <div className="flex items-center justify-between border border-border dark:border-border-dark rounded-lg px-3 py-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
