"use client"

import type React from "react"
import { GraduationCap, RotateCcw, SlidersHorizontal, LayoutGrid, Mic, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// --- Твои базовые компоненты (остались без изменений) ---

function AiAvatar() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-white">
      <GraduationCap className="h-5 w-5" strokeWidth={2} />
    </div>
  )
}

function ChatPill({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-softer px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft"
    >
      <Icon className="h-4 w-4" strokeWidth={2} />
      {children}
    </button>
  )
}

function AiMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <AiAvatar />
      <div className="max-w-[80%] rounded-2xl rounded-tl-md border border-line bg-white px-4 py-3 text-[15px] leading-relaxed text-ink shadow-sm">
        {children}
      </div>
    </div>
  )
}

function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-brand px-4 py-3 text-[15px] font-medium leading-relaxed text-white">
        {children}
      </div>
    </div>
  )
}

// --- Магия массива: Сценарий диалога под AI Convergence ---

const conversation = [
  {
    id: 1,
    type: "ai",
    delay: 0.5,
    content: (
      <>
        Hi! I&apos;m Aya. I see you&apos;re preparing a portfolio for a Master&apos;s in <span className="font-semibold text-brand">AI Convergence</span>.
      </>
    )
  },
  {
    id: 2,
    type: "user",
    delay: 2.0,
    content: "Yes! Find programs that match my UX and creative tech background."
  },
  {
    id: 3,
    type: "ai",
    delay: 3.5,
    content: (
      <>
        Analyzing your recent research on <span className="font-semibold text-brand">Generative UI vs. Text Chat</span>...
      </>
    )
  },
  {
    id: 4,
    type: "ai",
    delay: 5.0,
    content: (
      <>
        Found <span className="font-semibold text-brand">3 elite programs</span> blending interactive media and human-centered design for your 2027 enrollment.
      </>
    )
  },
  {
    id: 5,
    type: "pill",
    delay: 6.0,
    icon: LayoutGrid,
    content: "View Results →"
  }
]

// --- Основной компонент ---

export function ChatPanel() {
  return (
    <section className="flex h-full min-w-0 flex-col border-r border-line bg-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
            <GraduationCap className="h-5 w-5" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-base font-bold text-brand">Aya AI</h1>
            <p className="flex items-center gap-1.5 text-xs text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              AI-powered advisor
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Reset conversation"
          className="text-ink-muted transition-colors hover:text-ink"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2} />
        </button>
      </header>

      {/* Messages (Анимированный вывод из массива) */}
      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
        {conversation.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: msg.delay }}
          >
            {msg.type === "ai" && <AiMessage>{msg.content}</AiMessage>}
            {msg.type === "user" && <UserMessage>{msg.content}</UserMessage>}
            {msg.type === "pill" && (
              <div className="flex pl-12">
                <ChatPill icon={msg.icon}>{msg.content}</ChatPill>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-line bg-white px-5 py-4">
        <div className="flex items-center gap-3 rounded-full border border-line px-4 py-2">
          <input
            type="text"
            placeholder="Ask Aya anything..."
            className="flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-muted"
          />
          <button type="button" aria-label="Voice input" className="text-ink-muted transition-colors hover:text-ink">
            <Mic className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Send message"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white",
              "transition-colors hover:bg-brand/90",
            )}
          >
            <Send className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  )
}