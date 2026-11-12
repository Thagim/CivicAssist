import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Bot, X, ArrowRight } from "lucide-react"
import { aiSuggestions } from "../data/mockData"

export default function AIChatWidget() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  function ask(q) {
    setOpen(false)
    navigate(`/assistant?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="fixed bottom-5 right-5 z-30">
      {open && (
        <div className="mb-3 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-800">Ask CivicAssist</p>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>
          <p className="text-xs text-slate-500 mb-3">Try asking about a service, or your application status.</p>
          <div className="flex flex-col gap-2">
            {aiSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                className="flex items-center justify-between text-left text-xs bg-slate-50 hover:bg-brand-50 hover:text-brand-700 px-3 py-2 rounded-lg text-slate-600"
              >
                {s}
                <ArrowRight size={12} />
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105"
        aria-label="Open AI Assistant"
      >
        <Bot size={24} />
      </button>
    </div>
  )
}
