"use client"

import { GraduationCap, Search, BookOpen, Bell, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: GraduationCap, label: "Programs" },
  { icon: Search, label: "Search", active: true },
  { icon: BookOpen, label: "Guides" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
]

export function Sidebar() {
  return (
    <aside className="flex h-full w-20 flex-col items-center justify-between bg-brand-dark py-6">
      <nav className="flex flex-col items-center gap-4">
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full transition-colors",
              active
                ? "bg-brand-soft text-brand"
                : "text-white/60 hover:bg-white/10 hover:text-white",
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
          </button>
        ))}
      </nav>

      <button
        type="button"
        aria-label="Your account"
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-avatar-purple text-base font-semibold text-white"
      >
        A
      </button>
    </aside>
  )
}
