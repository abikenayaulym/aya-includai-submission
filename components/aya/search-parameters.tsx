"use client"

import { useEffect, useRef, useState } from "react"
import { SlidersHorizontal, ChevronDown, Search, ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const FIELD_OPTIONS = [
  "Any Field of Study",
  "✨ Help Me Choose",
  "Artificial Intelligence",
  "Business & Management",
  "Computer Science",
  "Creative Arts & Media",
  "Data Science & Analytics",
  "Education & Linguistics",
  "UI/UX & Interactive Design",
]

const LOCATION_OPTIONS = [
  "Any Country",
  "✨ Help Me Choose",
  "Australia",
  "Belgium",
  "China",
  "Germany",
  "Japan",
  "Kazakhstan",
  "South Korea",
  "United Kingdom",
  "United States",
]

function Stepper() {
  const steps = [true, false, false, false]
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {steps.map((active, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={cn("h-2.5 w-2.5 rounded-full", active ? "bg-brand" : "bg-line")} />
            {i < steps.length - 1 && <span className="h-px w-8 bg-line" />}
          </div>
        ))}
      </div>
      <span className="ml-2 text-sm text-ink-muted">Step 1 — Configure Filters</span>
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-sm font-semibold text-brand">{children}</label>
}

function Select({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [open])

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3.5 text-left text-[15px] text-ink transition-colors",
            open ? "border-brand/60 ring-2 ring-brand/15" : "border-line hover:border-brand/40",
          )}
        >
          {value}
          <ChevronDown
            className={cn("h-4 w-4 text-ink-muted transition-transform", open && "rotate-180")}
            strokeWidth={2}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-72 overflow-y-auto rounded-xl border border-line bg-white p-1.5 shadow-xl shadow-black/10"
          >
            {options.map((option) => {
              const active = option === value
              return (
                <li key={option} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option)
                      setOpen(false)
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[15px] transition-colors",
                      active ? "bg-brand-soft font-semibold text-brand" : "text-ink hover:bg-brand-softer",
                    )}
                  >
                    {option}
                    {active && <Check className="h-4 w-4 text-brand" strokeWidth={2.5} />}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

function RangeSlider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  display: string
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  const percent = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-brand">{label}</span>
        <span className="text-lg font-semibold text-brand tabular-nums">{display}</span>
      </div>
      <div className="relative flex h-4 items-center">
        <div className="absolute h-1.5 w-full rounded-full bg-line" />
        <div className="absolute h-1.5 rounded-full bg-brand" style={{ width: `${percent}%` }} />
        <div
          className="absolute h-5 w-5 -translate-x-1/2 rounded-full border-[3px] border-brand bg-white shadow-md"
          style={{ left: `${percent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="absolute h-4 w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  )
}

function PillGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string
  options: string[]
  selected: string
  onSelect: (v: string) => void
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const active = option === selected
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-brand text-white" : "border border-line bg-white text-ink hover:border-brand/40",
              )}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function SearchParameters({ onFindPrograms }: { onFindPrograms: () => void }) {
  const [field, setField] = useState("Artificial Intelligence")
  const [location, setLocation] = useState("Any Country")
  const [budget, setBudget] = useState(10000)
  const [gpa, setGpa] = useState(3.5)
  const [language, setLanguage] = useState("English")
  const [format, setFormat] = useState("On-Campus")
  const [duration, setDuration] = useState("2 Years")

  return (
    <section className="flex h-full flex-1 flex-col overflow-y-auto bg-white px-8 py-6 lg:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 flex justify-center">
          <Stepper />
        </div>

        {/* Title */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
            <SlidersHorizontal className="h-5 w-5" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand">Search Parameters</h2>
            <p className="text-[15px] text-ink-muted">Customize to match your profile</p>
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Select label="Field of Study" options={FIELD_OPTIONS} value={field} onChange={setField} />
          <Select label="Location" options={LOCATION_OPTIONS} value={location} onChange={setLocation} />
        </div>

        <div className="my-8 h-px w-full bg-line" />

        {/* Sliders */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <RangeSlider
            label="Annual Tuition Budget"
            value={budget}
            display={`$${budget.toLocaleString("en-US").replace(/,/g, " ")}`}
            min={0}
            max={20000}
            step={500}
            onChange={setBudget}
          />
          <RangeSlider
            label="Minimum GPA"
            value={gpa}
            display={`${gpa.toFixed(1)} / 4.0`}
            min={0}
            max={4}
            step={0.1}
            onChange={setGpa}
          />
        </div>

        <div className="my-8 h-px w-full bg-line" />

        {/* Pill groups */}
        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <PillGroup label="Language" options={["English", "Local Language"]} selected={language} onSelect={setLanguage} />
          <PillGroup
            label="Study Format"
            options={["Online", "On-Campus", "Hybrid"]}
            selected={format}
            onSelect={setFormat}
          />
          <PillGroup
            label="Duration"
            options={["1 Year", "18 Months", "2 Years"]}
            selected={duration}
            onSelect={setDuration}
          />
        </div>

        {/* Action */}
        <div className="mt-10 flex items-center gap-6">
          <button
            type="button"
            onClick={onFindPrograms}
            className="inline-flex items-center gap-3 rounded-xl bg-brand px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand/90"
          >
            <Search className="h-5 w-5" strokeWidth={2} />
            Find Programs
            <ArrowRight className="h-5 w-5" strokeWidth={2} />
          </button>
          <span className="text-[15px] text-ink-muted">Searching across 200+ institutions</span>
        </div>
      </div>
    </section>
  )
}
