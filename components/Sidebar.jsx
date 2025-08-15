'use client'
import { BellRing, CreditCard, FileSignature, FileText, Layers, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Applications', href: '#', icon: Layers },
  { name: 'Billing', href: '#', icon: CreditCard },
  { name: 'Rate Card', href: '#', icon: FileText },
  { name: 'Agreement Copy', href: '#', icon: FileSignature },
  { name: 'Notices', href: '#', icon: BellRing },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed md:sticky left-0 top-0 z-40 h-screen w-32 shrink-0 border-r border-gray-200 bg-white">
      
      {/* Logo Section */}
      <div className="flex flex-col items-center py-4 border-b border-gray-200">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
        <span className="text-xs text-gray-500 mt-1">Logo</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col mt-1">
        {NAV.map((item) => {
          const Icon = item.icon
          const active = item.href === '/' ? pathname === '/' : pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center h-14 w-full transition-colors
                ${active
                  ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600'
                  : 'text-gray-400 hover:bg-gray-50'
                }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[11px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
