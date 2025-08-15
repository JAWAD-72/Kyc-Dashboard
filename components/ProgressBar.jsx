export default function ProgressBar({ label, value }) {
  const pct = Math.min(100, Math.max(0, Math.round(value*100)))
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium">{pct}%</span>
      </div>
      <div className="progress">
        <div style={{ width: pct + '%' }} className="bg-blue-600"></div>
      </div>
    </div>
  )
}
