import { useNavigate } from "react-router-dom"
import { ArrowRight, FileText, Landmark, GraduationCap, HeartPulse, Briefcase, Grid3x3 } from "lucide-react"

const categoryStyle = {
  Certificates: { bg: "bg-emerald-50", text: "text-emerald-600", icon: FileText },
  Schemes: { bg: "bg-purple-50", text: "text-purple-600", icon: Landmark },
  Education: { bg: "bg-amber-50", text: "text-amber-600", icon: GraduationCap },
  Health: { bg: "bg-rose-50", text: "text-rose-600", icon: HeartPulse },
  Employment: { bg: "bg-blue-50", text: "text-blue-600", icon: Briefcase }
}

export default function ServiceCard({ service }) {
  const navigate = useNavigate()
  const style = categoryStyle[service.category] || { bg: "bg-slate-50", text: "text-slate-600", icon: Grid3x3 }
  const Icon = style.icon

  return (
    <button
      onClick={() => navigate(`/services/${service.id}`)}
      className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-card hover:-translate-y-0.5 transition-all group"
    >
      <div className={`w-11 h-11 rounded-xl ${style.bg} ${style.text} flex items-center justify-center mb-4`}>
        <Icon size={20} />
      </div>
      <p className="font-display font-semibold text-slate-900">{service.title}</p>
      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{service.description}</p>
      <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 mt-4 group-hover:gap-2 transition-all">
        View details <ArrowRight size={13} />
      </span>
    </button>
  )
}
