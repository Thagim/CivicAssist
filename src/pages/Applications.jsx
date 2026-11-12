import { useNavigate } from "react-router-dom"
import { Award, ArrowRight } from "lucide-react"
import StatusTimeline from "../components/StatusTimeline"
import { applications } from "../data/mockData"

const statusStyle = {
  Completed: "text-emerald-600 bg-emerald-50",
  Processing: "text-blue-600 bg-blue-50",
  "Under Verification": "text-amber-600 bg-amber-50"
}

export default function Applications() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div>
        <p className="text-2xl font-display font-bold text-slate-900">My Applications</p>
        <p className="text-sm text-slate-500">Track the progress of every application you've submitted.</p>
      </div>

      <div className="flex flex-col gap-5">
        {applications.map((app) => (
          <div key={app.id} className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                  <Award size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{app.title}</p>
                  <p className="text-xs text-slate-400">Application ID: {app.id}</p>
                  <span className={`inline-block text-xs font-medium mt-1 px-2 py-0.5 rounded-full ${statusStyle[app.status]}`}>
                    {app.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Submitted</p>
                <p className="text-sm font-medium text-slate-700">{app.submitted}</p>
              </div>
            </div>

            <div className="mt-5">
              <StatusTimeline steps={app.steps} current={app.step} />
            </div>

            <button
              onClick={() => navigate(`/applications/${app.id}`)}
              className="mt-5 w-full sm:w-auto ml-auto flex items-center justify-center gap-1.5 text-sm font-semibold border border-brand-200 text-brand-600 hover:bg-brand-50 rounded-lg px-4 py-2"
            >
              View Details <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
