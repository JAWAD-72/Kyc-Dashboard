import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

export default function StatCard({ title, value, change, positive }) {
  return (
    <div className="card p-4">
      <div className="text-xs text-gray-500 mb-1">{title}</div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-semibold">{value.toLocaleString()}</div>
        {typeof change === 'number' && (
          <div className={positive ? 'badge-up' : 'badge-down'}>
            {positive ? <ArrowUpRight className="h-3.5 w-3.5 mr-1"/> : <ArrowDownRight className="h-3.5 w-3.5 mr-1"/>}
            {Math.abs(change*100).toFixed(0)}%
          </div>
        )}
      </div>
    </div>
  )
}
