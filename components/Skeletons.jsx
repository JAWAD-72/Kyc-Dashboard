export function CardSkeleton({ className='' }) {
  return <div className={`card p-4 ${className}`}>
    <div className="h-4 w-24 skeleton mb-3"></div>
    <div className="h-8 w-32 skeleton"></div>
  </div>
}

export function ChartSkeleton() {
  return <div className="card p-4 h-[280px]">
    <div className="h-5 w-40 skeleton mb-3"></div>
    <div className="h-full w-full skeleton"></div>
  </div>
}