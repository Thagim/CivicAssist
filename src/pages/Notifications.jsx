import { Clock3, CheckCircle2, AlertCircle } from "lucide-react"
import { notifications } from "../data/mockData"

const iconMap = {
  success: { icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-600" },
  pending: { icon: Clock3, cls: "bg-amber-50 text-amber-600" },
  action: { icon: AlertCircle, cls: "bg-blue-50 text-blue-600" }
}

export default function Notifications() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div>
        <p className="text-2xl font-display font-bold text-slate-900">Notifications</p>
        <p className="text-sm text-slate-500">Stay updated on your applications and account activity.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
        {notifications.map((n) => {
          const { icon: Icon, cls } = iconMap[n.type]
          return (
            <div key={n.id} className="flex items-start gap-3 px-5 py-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cls}`}>
                <Icon size={16} />
              </div>
              <div>
                <p className="text-sm text-slate-700">{n.text}</p>
                <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
