'use client'
import { format } from 'date-fns'
import { Bell, ChevronDown, Menu, Moon, Search, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

export default function Topbar({ onMenu }) {
  const { theme, setTheme } = useTheme()
  const [q, setQ] = useState('')
  const today = format(new Date(), 'MMM d, yyyy')

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="h-full flex items-center gap-3 px-4">
        <button className="md:hidden pill" onClick={onMenu} aria-label="Open sidebar"><Menu className="h-5 w-5"/></button>

        <div className="text-sm text-gray-500 dark:text-slate-400 hidden sm:block">
          Home / <span className="text-gray-900 dark:text-slate-100 font-medium">Dashboard</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-xl px-3 py-2">
            <Search className="h-4 w-4 text-gray-500" />
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search intermediaries" className="bg-transparent outline-none text-sm placeholder:text-gray-400 w-64"/>
          </div>
          <button className="pill" aria-label="Notifications"><Bell className="h-5 w-5"/></button>
          <button className="pill" onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
          </button>
          <div className="flex items-center gap-3">
            <img alt="avatar" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Madhu`} className="h-8 w-8 rounded-full"/>
            <div className="hidden sm:block">
              <div className="text-sm font-medium">Madhu Kumar</div>
              <div className="text-xs text-gray-500">{today}</div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500"/>
          </div>
        </div>
      </div>
    </header>
  )
}
