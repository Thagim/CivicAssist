import { Check } from "lucide-react"

/**
 * Horizontal step timeline used for tracking application progress.
 * steps: array of step labels
 * current: 1-indexed number of the currently active/completed step
 */
export default function StatusTimeline({ steps, current }) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, i) => {
        const idx = i + 1
        const done = idx < current
        const active = idx === current
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 min-w-[64px]">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 ${
                  done
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : active
                    ? "bg-brand-600 border-brand-600 text-white"
                    : "bg-white border-slate-300 text-slate-400"
                }`}
              >
                {done ? <Check size={14} /> : idx}
              </div>
              <span
                className={`text-[11px] text-center leading-tight ${
                  active ? "text-brand-700 font-semibold" : done ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {step}
              </span>
            </div>
            {idx !== steps.length && (
              <div className={`h-0.5 flex-1 mx-1 ${done ? "bg-emerald-500" : "bg-slate-200"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
