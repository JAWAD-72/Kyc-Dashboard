'use client'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function BarComparisonChart() {
  const [dateFilter, setDateFilter] = useState('today')
  const [typeFilter, setTypeFilter] = useState('individual')
  const [chartData, setChartData] = useState([])

  // Simulated fetch function (replace with real API call)
  const fetchData = (date, type) => {
    // Example static data (replace with backend data)
    const mockData = {
      today: [
        { label: 'Individual', today: 360, yesterday: 300 },
        { label: 'Non Individual', today: 300, yesterday: 250 }
      ],
      yesterday: [
        { label: 'Individual', today: 300, yesterday: 260 },
        { label: 'Non Individual', today: 250, yesterday: 200 }
      ]
    }
    return mockData[date]
  }

  // Refresh data when filters change
  useEffect(() => {
    const data = fetchData(dateFilter, typeFilter)
    setChartData(data)
  }, [dateFilter, typeFilter])

  return (
    <div className="card p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">Individual vs Non-Individual</div>
        <div className="text-xs text-gray-500">Today vs Yesterday</div>
      </div>

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            barCategoryGap="30%"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: 'rgba(59,130,246,0.08)' }} />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="today" name="Today" radius={[6, 6, 0, 0]} fill="#2563eb" barSize={40} />
            <Bar dataKey="yesterday" name="Yesterday" radius={[6, 6, 0, 0]} fill="#93c5fd" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-between mt-4">
        {/* Date Filter */}
        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              dateFilter === 'today' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
            }`}
            onClick={() => setDateFilter('today')}
          >
            Today
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              dateFilter === 'yesterday' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
            }`}
            onClick={() => setDateFilter('yesterday')}
          >
            Yesterday
          </button>
        </div>

        {/* Type Filter */}
        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              typeFilter === 'individual' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
            }`}
            onClick={() => setTypeFilter('individual')}
          >
            Individual
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              typeFilter === 'nonindividual' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
            }`}
            onClick={() => setTypeFilter('nonindividual')}
          >
            Non Individual
          </button>
        </div>
      </div>
    </div>
  )
}
