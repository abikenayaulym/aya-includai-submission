"use client"

import { useState } from "react"
import { SearchParameters } from "@/components/aya/search-parameters"
import { BrowseResults } from "@/components/aya/browse-results"

type View = "filters" | "results"

export function RightPanel() {
  const [view, setView] = useState<View>("filters")

  return (
    <div className="relative min-w-0 flex-1 overflow-hidden bg-white">
      <div
        key={view}
        className="h-full animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out"
      >
        {view === "filters" ? (
          <SearchParameters onFindPrograms={() => setView("results")} />
        ) : (
          <BrowseResults onEditFilters={() => setView("filters")} />
        )}
      </div>
    </div>
  )
}
