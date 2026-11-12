import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, CheckCircle2, Bot } from "lucide-react"
import ProgressTracker from "../components/ProgressTracker"
import DocumentUpload from "../components/DocumentUpload"
import { services, user } from "../data/mockData"

const steps = ["Personal Details", "Address Details", "Documents", "Review", "Submit"]

export default function Application() {
  const { id } = useParams()
  const navigate = useNavigate()
  const service = services.find((s) => s.id === id)
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [confirmChecked, setConfirmChecked] = useState(false)

  const [form, setForm] = useState({
    fullName: user.name,
    dob: user.dob,
    gender: user.gender,
    mobile: user.mobile,
    addressLine: user.address,
    state: "Tamil Nadu",
    pincode: "636001"
  })
  const [docs, setDocs] = useState({})

  if (!service) {
    return <p className="text-center text-slate-500 py-20">Service not found.</p>
  }

  function updateForm(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function next() {
    setStep((s) => Math.min(s + 1, steps.length))
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1))
  }

  const applicationId = `JH-2024-${Math.floor(1000000 + Math.random() * 8999999)}`

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 size={32} />
        </div>
        <p className="text-xl font-display font-bold text-slate-900">Application Submitted Successfully!</p>
        <p className="text-sm text-slate-500">Your {service.title} application has been submitted.</p>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 w-full text-left">
          <p className="text-xs text-slate-400">Application ID</p>
          <p className="text-sm font-semibold text-slate-800">{applicationId}</p>
          <p className="text-xs text-slate-400 mt-3">Status</p>
          <p className="text-sm font-semibold text-amber-600">• Under Verification</p>
        </div>
        <p className="text-xs text-slate-400">You will be notified about status updates via SMS and Email.</p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => navigate("/")}
            className="border border-slate-200 text-slate-600 text-sm font-medium px-4 py-2 rounded-xl hover:border-brand-300"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/applications")}
            className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-1.5"
          >
            Track Application <ArrowRight size={14} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 w-fit">
        <ArrowLeft size={15} /> Back
      </button>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <p className="text-lg font-display font-bold text-slate-900 mb-5">{service.title} Application</p>
        <div className="overflow-x-auto pb-2">
          <ProgressTracker steps={steps} current={step} />
        </div>

        <div className="mt-8">
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <p className="sm:col-span-2 text-sm text-slate-500 -mt-2 mb-1">Enter your basic information as per official documents</p>
              <Field label="Full Name" value={form.fullName} onChange={(v) => updateForm("fullName", v)} />
              <Field label="Date of Birth" value={form.dob} onChange={(v) => updateForm("dob", v)} />
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Gender *</label>
                <div className="flex items-center gap-4 pt-2">
                  {["Male", "Female", "Other"].map((g) => (
                    <label key={g} className="flex items-center gap-1.5 text-sm text-slate-600">
                      <input
                        type="radio"
                        name="gender"
                        checked={form.gender === g}
                        onChange={() => updateForm("gender", g)}
                        className="accent-brand-600"
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
              <Field label="Mobile Number" value={form.mobile} onChange={(v) => updateForm("mobile", v)} />
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <p className="sm:col-span-2 text-sm text-slate-500 -mt-2 mb-1">Enter your current residential address</p>
              <Field label="Address" value={form.addressLine} onChange={(v) => updateForm("addressLine", v)} full />
              <Field label="State" value={form.state} onChange={(v) => updateForm("state", v)} />
              <Field label="Pincode" value={form.pincode} onChange={(v) => updateForm("pincode", v)} />
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-slate-500 -mt-2 mb-1">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
              {service.documents.map((d) => (
                <DocumentUpload
                  key={d.label}
                  label={d.label}
                  detail={d.detail}
                  onChange={(f) => setDocs((prev) => ({ ...prev, [d.label]: f }))}
                />
              ))}
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="text-sm text-slate-500 -mt-2 mb-4">Everything looks good! You're almost done.</p>
              <div className="bg-slate-50 rounded-xl p-5 flex flex-col gap-3">
                <SummaryRow label="Service" value={service.title} />
                <SummaryRow label="Full Name" value={form.fullName} />
                <SummaryRow label="Date of Birth" value={form.dob} />
                <SummaryRow label="Gender" value={form.gender} />
                <SummaryRow label="Address" value={`${form.addressLine}, ${form.state} - ${form.pincode}`} />
                <SummaryRow label="Mobile Number" value={form.mobile} />
                <div>
                  <p className="text-xs text-slate-400 mb-2">Uploaded Documents</p>
                  <div className="flex flex-col gap-1.5">
                    {service.documents.map((d) => (
                      <div key={d.label} className="flex items-center justify-between text-sm text-slate-700">
                        {d.label}
                        <CheckCircle2 size={15} className="text-emerald-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-500 mt-4">
                <input type="checkbox" checked={confirmChecked} onChange={(e) => setConfirmChecked(e.target.checked)} className="accent-brand-600" />
                I confirm that all the information provided is correct to the best of my knowledge.
              </label>
            </div>
          )}

          {step === 5 && (
            <div className="text-center py-10">
              <p className="text-sm text-slate-500">Ready to submit your application for review.</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={back}
            disabled={step === 1}
            className="text-sm font-medium text-slate-500 disabled:opacity-0 flex items-center gap-1.5"
          >
            <ArrowLeft size={14} /> Back
          </button>
          {step < 4 && (
            <button onClick={next} className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5">
              Save & Continue <ArrowRight size={14} />
            </button>
          )}
          {step === 4 && (
            <button
              onClick={next}
              disabled={!confirmChecked}
              className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5"
            >
              Continue <ArrowRight size={14} />
            </button>
          )}
          {step === 5 && (
            <button
              onClick={() => setSubmitted(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5"
            >
              Submit Application <CheckCircle2 size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
        <Bot size={14} /> Not sure which document is needed? Ask CivicAssist AI for help anytime.
      </div>
    </div>
  )
}

function Field({ label, value, onChange, full }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-sm font-medium text-slate-700 mb-1.5 block">{label} *</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
      />
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-slate-800 text-right">{value}</span>
    </div>
  )
}
