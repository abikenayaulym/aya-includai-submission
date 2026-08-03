"use client"

import { useState } from "react"
import { LayoutGrid, ChevronLeft, Sparkles, Check, DollarSign, Clock, MapPin, ArrowRight, ExternalLink, Globe, Users, Award, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

import { programs } from "@/components/data.aya/programs"

type Program = {
  logo: string
  logoClass: string
  match: number
  country: string
  name: string
  degree: string
  price: string
  duration: string
  location: string
  highlights: string[]
  stats: { tag: string, icon: React.ElementType }[]
  desc: string
}

function Stepper({ step }: { step: 2 | 3 }) {
  const steps = [true, true, step === 3, false]
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {steps.map((active, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={cn("h-2.5 w-2.5 rounded-full", active ? "bg-emerald-600" : "bg-gray-200")} />
            {i < steps.length - 1 && <span className={cn("h-px w-8", steps[i+1] ? "bg-emerald-600" : "bg-gray-200")} />}
          </div>
        ))}
      </div>
      <span className="ml-2 text-sm text-gray-500">
        {step === 2 ? "Step 2 — Browse Results" : "Step 3 — Review Program"}
      </span>
    </div>
  )
}

function Tag({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
      <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
      {children}
    </span>
  )
}

function ProgramCard({ program, onViewDetails }: { program: Program, onViewDetails: (p: Program) => void }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-sm", program.logoClass)}>
            {program.logo}
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
            {program.match}% match
          </span>
        </div>
        
        <p className="text-xs font-bold text-gray-400 mb-1">{program.country}</p>
        <h3 className="text-xl font-bold text-gray-900">{program.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{program.degree}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Tag icon={DollarSign}>{program.price}</Tag>
          <Tag icon={Clock}>{program.duration}</Tag>
          <Tag icon={MapPin}>{program.location}</Tag>
        </div>

        <ul className="mt-6 space-y-3 flex-1 mb-8">
          {program.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onViewDetails(program)}
          className="w-full mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
        >
          View Details
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
    </article>
  )
}

export function BrowseResults({ onEditFilters }: { onEditFilters: () => void }) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)

  return (
    <AnimatePresence mode="wait">
      {selectedProgram ? (
        // ЭКРАН ДЕТАЛЕЙ (State 3)
        <motion.div
          key="details"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="h-full flex-1 flex flex-col"
        >
          <section className="flex h-full flex-1 flex-col overflow-y-auto bg-slate-50/50 px-8 py-6 lg:px-10">
            <div className="mx-auto w-full max-w-4xl">
              <div className="mb-8 flex justify-center">
                <Stepper step={3} />
              </div>

              <div className="mb-8 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
                  Back to Results
                </button>
              </div>

              <div className="flex gap-6 items-start mb-8">
                <div className={cn("flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl text-3xl font-bold text-white shadow-md", selectedProgram.logoClass)}>
                  {selectedProgram.logo}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                      <span className="text-gray-400 mr-2">{selectedProgram.country}</span> 
                      {selectedProgram.name}
                    </h1>
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                      <Sparkles className="h-3.5 w-3.5" /> {selectedProgram.match}% Match
                    </span>
                  </div>
                  <p className="text-lg font-medium text-emerald-700">{selectedProgram.degree}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                {selectedProgram.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm text-sm font-medium text-gray-700">
                    <stat.icon className="w-4 h-4 text-emerald-600" />
                    {stat.tag}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <Tag icon={Clock}>{selectedProgram.duration}</Tag>
                <Tag icon={DollarSign}>{selectedProgram.price}</Tag>
                <Tag icon={MapPin}>{selectedProgram.location}</Tag>
              </div>

              <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-2 mb-4 text-purple-700 font-bold">
                  <Sparkles className="h-5 w-5" />
                  Aya AI Insights
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProgram.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-10">
                {selectedProgram.desc}
              </p>

              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-colors">
                Go to University Website
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </section>
        </motion.div>
      ) : (
        // ЭКРАН СПИСКА (State 2)
        <motion.div
          key="list"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className="h-full flex-1 flex flex-col"
        >
          <section className="flex h-full flex-1 flex-col overflow-y-auto bg-slate-50/50 px-8 py-6 lg:px-10">
            <div className="mx-auto w-full max-w-6xl">
              <div className="mb-8 flex justify-center">
                <Stepper step={2} />
              </div>

              <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
                    <LayoutGrid className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-emerald-950">Top Matches</h2>
                    <p className="text-[15px] text-gray-500 mt-1">
                      <span className="font-semibold text-emerald-700">3 elite programs</span> found for you
                    </p>
                  </div>
                </div>
                <button
                  onClick={onEditFilters}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 shadow-sm"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
                  Edit Filters
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                {programs.map((program) => (
                  <motion.div
                    key={program.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: programs.indexOf(program) * 0.1 }}
                  >
                    <ProgramCard program={program} onViewDetails={setSelectedProgram} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}