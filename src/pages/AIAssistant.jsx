import { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Bot, Send, ArrowRight, FileText } from "lucide-react"
import VoiceButton from "../components/VoiceButton"
import { services, aiSuggestions } from "../data/mockData"

function findMatchingService(query) {
  const q = query.toLowerCase()
  return (
    services.find((s) => q.includes(s.title.toLowerCase()) || s.title.toLowerCase().split(" ").some((w) => q.includes(w))) ||
    null
  )
}

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function AIAssistant() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const initialQuery = params.get("q") || ""
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const bottomRef = useRef(null)
  const askedRef = useRef(false)

  function respond(query) {
    const match = findMatchingService(query)
    setMessages((prev) => [
      ...prev,
      { role: "user", text: query, time: timestamp() },
      {
        role: "assistant",
        time: timestamp(),
        text: match
          ? `I understand you need a ${match.title}. I've found the relevant government service for your state.`
          : "I couldn't find an exact match, but here are a few services that might help. You can also browse all services.",
        service: match
      }
    ])
  }

  useEffect(() => {
    if (initialQuery && !askedRef.current) {
      askedRef.current = true
      respond(initialQuery)
    } else if (!askedRef.current) {
      askedRef.current = true
      setMessages([
        {
          role: "assistant",
          time: timestamp(),
          text: "Hi! I'm CivicAssist, your AI government service assistant. Tell me what document, certificate, or scheme you're looking for."
        }
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim()) return
    respond(input.trim())
    setInput("")
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-140px)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
          <Bot size={20} />
        </div>
        <div>
          <p className="font-display font-semibold text-slate-900">AI Assistant</p>
          <p className="text-xs text-slate-500">Ask about any government service in your own words</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] ${m.role === "user" ? "" : "w-full"}`}>
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  m.role === "user" ? "bg-brand-600 text-white rounded-br-sm" : "bg-white border border-slate-200 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
              <p className={`text-[11px] text-slate-400 mt-1 ${m.role === "user" ? "text-right" : ""}`}>{m.time}</p>

              {m.service && (
                <div className="mt-3 bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                      <FileText size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-slate-900">{m.service.title}</p>
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                          Official Government Service
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {m.service.govLevel} | {m.service.department}
                      </p>
                      <p className="text-sm text-slate-600 mt-2">{m.service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => navigate(`/services/${m.service.id}`)}
                      className="text-sm font-medium text-brand-600 hover:underline"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => navigate(`/services/${m.service.id}/apply`)}
                      className="ml-auto bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1.5"
                    >
                      Proceed with Application <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {aiSuggestions.map((s) => (
            <button
              key={s}
              onClick={() => respond(s)}
              className="text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-full px-3 py-1.5 hover:border-brand-300 hover:text-brand-700"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white border border-slate-200 rounded-full pl-5 pr-2 py-2 shadow-card">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about this service..."
          className="flex-1 outline-none text-sm placeholder:text-slate-400"
        />
        <VoiceButton className="w-9 h-9" onResult={(text) => respond(text)} />
        <button
          type="submit"
          className="w-9 h-9 rounded-full bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center"
          aria-label="Send"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}
