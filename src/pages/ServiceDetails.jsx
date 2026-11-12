import { useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { ArrowLeft, Clock3, IndianRupee, Monitor, CheckCircle2, Landmark } from "lucide-react"
import { services } from "../data/mockData"

const tabs = ["Overview", "Eligibility", "Documents", "Process", "FAQs"]

export default function ServiceDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const service = services.find((s) => s.id === id)
  const [tab, setTab] = useState("Overview")

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-slate-500">Service not found.</p>
        <Link to="/services" className="text-brand-600 font-medium hover:underline">
          Back to Services
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <button onClick={() => navigate("/services")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 w-fit">
        <ArrowLeft size={15} /> Back to Services
      </button>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <Landmark size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-xl font-display font-bold text-slate-900">{service.title}</p>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                Official Service
              </span>
            </div>
            <p className="text-sm text-slate-500">{service.govLevel}</p>
            <p className="text-xs text-slate-400">{service.department}</p>
          </div>
        </div>

        <div className="flex gap-6 mt-5 border-b border-slate-200 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px ${
                tab === t ? "border-brand-600 text-brand-700" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8">
          <div>
            {tab === "Overview" && (
              <div>
                <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="border border-slate-200 rounded-xl p-3">
                    <Clock3 size={16} className="text-brand-600 mb-1" />
                    <p className="text-[11px] text-slate-400">Processing Time</p>
                    <p className="text-sm font-semibold text-slate-800">{service.processingTime}</p>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-3">
                    <IndianRupee size={16} className="text-brand-600 mb-1" />
                    <p className="text-[11px] text-slate-400">Application Fee</p>
                    <p className="text-sm font-semibold text-slate-800">{service.fee}</p>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-3">
                    <Monitor size={16} className="text-brand-600 mb-1" />
                    <p className="text-[11px] text-slate-400">Mode</p>
                    <p className="text-sm font-semibold text-slate-800">{service.mode}</p>
                  </div>
                </div>
              </div>
            )}

            {tab === "Eligibility" && (
              <ul className="flex flex-col gap-2.5">
                {service.eligibility.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" /> {e}
                  </li>
                ))}
              </ul>
            )}

            {tab === "Documents" && (
              <ul className="flex flex-col gap-3">
                {service.documents.map((d) => (
                  <li key={d.label} className="border border-slate-200 rounded-xl p-3">
                    <p className="text-sm font-medium text-slate-800">{d.label}</p>
                    <p className="text-xs text-slate-500">{d.detail}</p>
                  </li>
                ))}
              </ul>
            )}

            {tab === "Process" && (
              <ol className="flex flex-col gap-4">
                {["Fill personal & address details", "Upload required documents", "Review your application", "Submit and track status"].map(
                  (step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  )
                )}
              </ol>
            )}

            {tab === "FAQs" && (
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">How long does approval take?</p>
                  <p className="text-sm text-slate-500">Typically within {service.processingTime}, depending on document verification.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Can I track my application?</p>
                  <p className="text-sm text-slate-500">Yes, from the My Applications page you can track live status updates.</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 h-fit">
            <p className="text-sm font-semibold text-slate-800 mb-3">Key Benefits</p>
            <ul className="flex flex-col gap-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" /> {b}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate(`/services/${service.id}/apply`)}
              className="w-full mt-5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold py-2.5 rounded-xl"
            >
              Start Application →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
