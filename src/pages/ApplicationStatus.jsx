import { useNavigate, useParams, Link } from "react-router-dom"
import { ArrowLeft, Award, Download, Bot } from "lucide-react"
import StatusTimeline from "../components/StatusTimeline"
import { applications, services } from "../data/mockData"

export default function ApplicationStatus() {
  const { id } = useParams()
  const navigate = useNavigate()
  const app = applications.find((a) => a.id === id)
  const service = app ? services.find((s) => s.id === app.serviceId) : null

  if (!app) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <p className="text-slate-500">Application not found.</p>
        <Link to="/applications" className="text-brand-600 font-medium hover:underline">
          Back to My Applications
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <button onClick={() => navigate("/applications")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 w-fit">
        <ArrowLeft size={15} /> Back to My Applications
      </button>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
            <Award size={20} />
          </div>
          <div>
            <p className="font-display font-bold text-lg text-slate-900">{app.title}</p>
            <p className="text-xs text-slate-400">Application ID: {app.id}</p>
          </div>
        </div>

        <div className="mt-8 mb-2">
          <StatusTimeline steps={app.steps} current={app.step} />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <InfoBox label="Submitted On" value={app.submitted} />
          <InfoBox label="Current Status" value={app.status} />
          {service && <InfoBox label="Processing Time" value={service.processingTime} />}
          {service && <InfoBox label="Application Fee" value={service.fee} />}
        </div>

        {app.status === "Completed" && (
          <button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2">
            <Download size={15} /> Download Certificate
          </button>
        )}
      </div>

      <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 flex items-start gap-3">
        <Bot size={20} className="text-brand-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-slate-800">Have a question about this application?</p>
          <p className="text-xs text-slate-500 mb-3">Ask CivicAssist for updates, required actions, or estimated timelines.</p>
          <button
            onClick={() => navigate(`/assistant?q=${encodeURIComponent(`Status of ${app.title} application ${app.id}`)}`)}
            className="text-sm font-semibold text-brand-600 hover:underline"
          >
            Ask AI Assistant →
          </button>
        </div>
      </div>
    </div>
  )
}

function InfoBox({ label, value }) {
  return (
    <div className="border border-slate-200 rounded-xl p-3.5">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  )
}
