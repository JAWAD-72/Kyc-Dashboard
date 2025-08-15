'use client'
import { CheckCircle, FileText } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

export default function ConcentricRingsChart({ rings, total }) {
  const radii = [90, 70, 50, 30] // outer → inner
  const mkData = (val) => ([ 
    { name: 'value', value: val }, 
    { name: 'remainder', value: Math.max(0, 100 - val) } 
  ])
  const gray = '#E6E9F2'

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Tabs */}
      

      {/* Switch buttons */}
      <div className="flex gap-2 mb-6">
        <button className="bg-gray-200 text-sm px-3 py-1 rounded-full">Individual</button>
        <button className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-500">Non Individual</button>
      </div>

      {/* Chart + Legend */}
      <div className="flex">
        <div className="relative h-[250px] w-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {rings.map((r, idx) => (
                <Pie key={r.label}
                  data={mkData(r.value)}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  innerRadius={radii[idx] - 10}
                  outerRadius={radii[idx]}
                  stroke="none"
                >
                  <Cell fill={r.color} />
                  <Cell fill={gray} />
                </Pie>
              ))}
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-3xl font-bold">{total.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col justify-center ml-6 space-y-2">
          {rings.map((r) => (
            <div key={r.label} className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }}></span>
              <span className="text-gray-700">{r.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info Blocks */}
      <div className="mt-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <FileText className="w-5 h-5 text-blue-500" />
            <span>No. Of PANs Solicited</span>
          </div>
          <div className="text-lg font-bold mt-1">956</div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>400 KFin KRA</span>
            <span>250 With Image</span>
            <span>256 Without Image</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Data Received</span>
          </div>
          <div className="text-lg font-bold mt-1">320</div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>300 KFin KRA</span>
            <span>100 With Image</span>
            <span>20 Without Image</span>
          </div>
        </div>
      </div>
    </div>
  )
}
