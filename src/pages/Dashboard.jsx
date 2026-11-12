import { useNavigate } from "react-router-dom"
import {
  FileText,
  Clock3,
  CheckCircle2,
  Search,
  ShieldCheck,
  UploadCloud,
  Bot
} from "lucide-react"
import { applications } from "../data/mockData"

export default function Dashboard() {
  const navigate = useNavigate()

  const total = applications.length

  const inProgress = applications.filter(
    (a) => a.status !== "Completed"
  ).length

  const completed = applications.filter(
    (a) => a.status === "Completed"
  ).length

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">

      {/* =====================================================
          WELCOME
      ===================================================== */}

      <div>
        <p className="text-2xl font-display font-bold text-slate-900">
          WELCOME BACK !!! 
        </p>

        <p className="text-sm text-slate-500">
          Manage and track your government service applications.
        </p>
      </div>


      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <StatCard
          icon={FileText}
          label="Total Applications"
          value={total}
          color="text-brand-600 bg-brand-50"
        />

        <StatCard
          icon={Clock3}
          label="In Progress"
          value={inProgress}
          color="text-amber-600 bg-amber-50"
        />

        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={completed}
          color="text-emerald-600 bg-emerald-50"
        />

      </div>


      {/* =====================================================
          APPLICATIONS + QUICK ACTIONS
      ===================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

        {/* =================================================
            MY APPLICATIONS
        ================================================= */}

        <div className="bg-white border border-slate-200 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-4">

            <p className="font-display font-semibold text-slate-900">
              My Applications
            </p>

            <button
              onClick={() => navigate("/applications")}
              className="text-sm font-medium text-brand-600 hover:underline"
            >
              View All
            </button>

          </div>


          <div className="flex flex-col divide-y divide-slate-100">

            {applications.map((app) => (

              <button
                key={app.id}
                onClick={() =>
                  navigate(`/applications/${app.id}`)
                }
                className="flex items-center justify-between py-3.5 text-left hover:bg-slate-50 -mx-2 px-2 rounded-lg"
              >

                <div>

                  <p className="text-sm font-medium text-slate-800">
                    {app.title}
                  </p>

                  <p className="text-xs text-slate-400">
                    Application ID: {app.id} • Submitted {app.submitted}
                  </p>

                </div>


                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    app.status === "Completed"
                      ? "bg-emerald-50 text-emerald-600"
                      : app.status === "Processing"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {app.status}
                </span>

              </button>

            ))}

          </div>

        </div>


        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <div className="bg-white border border-slate-200 rounded-2xl p-6">

          <p className="font-display font-semibold text-slate-900 mb-4">
            Quick Actions
          </p>


          <div className="flex flex-col gap-2">

            <QuickAction
              icon={Search}
              label="Find a New Service"
              onClick={() => navigate("/services")}
            />

            <QuickAction
              icon={ShieldCheck}
              label="Check Eligibility"
              onClick={() => navigate("/services")}
            />

            <QuickAction
              icon={UploadCloud}
              label="Upload Documents"
              onClick={() => navigate("/documents")}
            />

            <QuickAction
              icon={Bot}
              label="Ask CivicAssist"
              onClick={() => navigate("/assistant")}
            />

          </div>

        </div>

      </div>

    </div>
  )
}


/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon: Icon,
  label,
  value,
  color
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">

      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon size={20} />
      </div>

      <div>

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="text-xl font-display font-bold text-slate-900">
          {value}
        </p>

      </div>

    </div>
  )
}


/* =====================================================
   QUICK ACTION
===================================================== */

function QuickAction({
  icon: Icon,
  label,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg px-3 py-2.5"
    >

      <Icon
        size={16}
        className="text-brand-600"
      />

      {label}

    </button>
  )
}