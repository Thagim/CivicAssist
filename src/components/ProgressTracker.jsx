import { Check } from "lucide-react"

export default function ProgressTracker({ steps, current }) {
  return (
    <div className="flex items-center">
      {steps.map((step, i) => {
        const idx = i + 1
        const done = idx < current
        const active = idx === current
        return (
          <div key={step} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                  done
                    ? "bg-emerald-500 text-white"
                    : active
                    ? "bg-brand-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {done ? <Check size={12} /> : idx}
              </div>
              <span className={`text-sm ${active ? "font-semibold text-slate-900" : "text-slate-500"}`}>{step}</span>
            </div>
            {idx !== steps.length && <div className="w-8 sm:w-14 h-px bg-slate-300 mx-3" />}
          </div>
        )
      })}
    </div>
  )
}
