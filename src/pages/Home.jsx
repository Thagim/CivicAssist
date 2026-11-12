import { useNavigate } from "react-router-dom"
import { Bot, ArrowRight, ShieldCheck, Users, Clock3, Globe2, Award, Landmark, GraduationCap, HeartPulse, Briefcase, Grid3x3, Mic, Wallet, Lock, TrendingUp } from "lucide-react"
import VoiceButton from "../components/VoiceButton"
import StatusTimeline from "../components/StatusTimeline"
import { applications, popularSearches, services, notifications, user } from "../data/mockData"

const exploreCards = [
  { title: "Certificates", desc: "Caste, Income, Domicile and more", icon: Award, bg: "bg-emerald-50", text: "text-emerald-600", to: "/services?category=Certificates" },
  { title: "Schemes & Benefits", desc: "Central & State Government Schemes", icon: Landmark, bg: "bg-purple-50", text: "text-purple-600", to: "/services?category=Schemes" },
  { title: "Education", desc: "Scholarships, Admissions & Education Support", icon: GraduationCap, bg: "bg-amber-50", text: "text-amber-600", to: "/services?category=Education" },
  { title: "Health", desc: "Health Cards, Insurance & Medical Support", icon: HeartPulse, bg: "bg-rose-50", text: "text-rose-600", to: "/services?category=Health" },
  { title: "Employment", desc: "Jobs, Skill Training & Employment Support", icon: Briefcase, bg: "bg-blue-50", text: "text-blue-600", to: "/services?category=Employment" },
  { title: "More", desc: "All Other Services", icon: Grid3x3, bg: "bg-slate-100", text: "text-slate-600", to: "/services" }
]

export default function Home() {
  const navigate = useNavigate()

  function goToAssistant(text) {
    navigate(`/assistant?q=${encodeURIComponent(text)}`)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const value = e.target.elements.query.value.trim()
    if (value) goToAssistant(value)
  }

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
      {/* Hero + Who can use panel */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-50 to-blue-50 rounded-2xl p-8">
          <p className="text-2xl sm:text-3xl font-display font-bold text-slate-900">Hi {user.name.split(" ")[0]}! 👋</p>
          <p className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-2">How can I help you today?</p>
          <p className="text-sm text-slate-500 mb-5">Tell me what you need in your own words.</p>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white rounded-full pl-5 pr-2 py-2 shadow-card max-w-xl">
            <input
              name="query"
              placeholder="Example: I need a caste certificate"
              className="flex-1 outline-none text-sm placeholder:text-slate-400"
            />
            <VoiceButton className="w-9 h-9" onResult={goToAssistant} />
          </form>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-xs text-slate-500">Popular Searches:</span>
            {popularSearches.map((s) => (
              <button
                key={s}
                onClick={() => goToAssistant(s)}
                className="text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-full px-3 py-1.5 hover:border-brand-300 hover:text-brand-700"
              >
                {s}
              </button>
            ))}
          </div>

          <Bot size={140} className="hidden md:block text-brand-200 absolute right-6 bottom-0 opacity-70" />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col">
          <p className="font-display font-semibold text-slate-900 mb-4">Who can use CivicAssist?</p>
          <ul className="flex flex-col gap-3 text-sm text-slate-600 mb-4">
            <li className="flex items-center gap-2"><Users size={15} className="text-brand-600" /> All Indian Citizens</li>
            <li className="flex items-center gap-2"><Clock3 size={15} className="text-brand-600" /> Available 24x7</li>
            <li className="flex items-center gap-2"><Globe2 size={15} className="text-brand-600" /> Multi-language Support</li>
            <li className="flex items-center gap-2"><ShieldCheck size={15} className="text-brand-600" /> Secure & Reliable</li>
          </ul>
          <div className="mt-auto bg-brand-50 rounded-xl p-4 text-sm text-brand-800 italic">
            "Making Government Services Simple, Accessible & Transparent"
          </div>
        </div>
      </div>

      {/* My Applications + Get Started */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="font-display font-semibold text-slate-900">My Applications</p>
            <button onClick={() => navigate("/applications")} className="text-sm font-medium text-brand-600 hover:underline">
              View All
            </button>
          </div>
          <div className="flex flex-col gap-5">
            {applications.map((app) => (
              <div key={app.id} className="flex flex-col lg:flex-row lg:items-center gap-4 border-b border-slate-100 last:border-0 pb-5 last:pb-0">
                <div className="flex items-start gap-3 lg:w-64 shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                    <Award size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{app.title}</p>
                    <p className="text-xs text-slate-400">Application ID: {app.id}</p>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium mt-1 ${
                        app.status === "Completed" ? "text-emerald-600" : app.status === "Processing" ? "text-blue-600" : "text-amber-600"
                      }`}
                    >
                      • {app.status}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-[220px]">
                  <StatusTimeline steps={app.steps} current={app.step} />
                </div>
                <div className="flex items-center justify-between lg:flex-col lg:items-end gap-2 lg:w-32 shrink-0">
                  <p className="text-xs text-slate-400">{app.submitted}</p>
                  <button
                    onClick={() => navigate(`/applications/${app.id}`)}
                    className="text-xs font-semibold border border-brand-200 text-brand-600 hover:bg-brand-50 rounded-lg px-3 py-1.5"
                  >
                    {app.status === "Completed" ? "View" : "Track"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/applications")}
            className="w-full mt-5 border border-slate-200 hover:border-brand-300 hover:text-brand-700 text-slate-600 text-sm font-medium py-2.5 rounded-xl"
          >
            View All Applications
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="font-display font-semibold text-slate-900 mb-5">Get Started in 3 Simple Steps</p>
          <div className="flex flex-col gap-5">
            {[
              { n: 1, t: "Tell us what you need", d: "Type or speak your requirement" },
              { n: 2, t: "We find the right service", d: "AI identifies the best matching service" },
              { n: 3, t: "We help you apply", d: "Complete application with our guidance" }
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-brand-600 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  {s.n}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{s.t}</p>
                  <p className="text-xs text-slate-500">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explore Services */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <p className="font-display font-semibold text-slate-900">Explore Services</p>
          <button onClick={() => navigate("/services")} className="text-sm font-medium text-brand-600 hover:underline">
            View All Services
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {exploreCards.map((c) => (
            <button
              key={c.title}
              onClick={() => navigate(c.to)}
              className={`text-left rounded-xl p-4 ${c.bg} hover:-translate-y-0.5 transition-transform`}
            >
              <c.icon size={20} className={c.text} />
              <p className="text-sm font-semibold text-slate-800 mt-3">{c.title}</p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{c.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-5 gap-6">
        {[
          { icon: Mic, t: "Voice Enabled", d: "Speak your requirements" },
          { icon: Globe2, t: "Multi-language", d: "10+ Indian Languages" },
          { icon: Lock, t: "Secure & Private", d: "Your data is safe with us" },
          { icon: TrendingUp, t: "Application Tracking", d: "Real-time status updates" },
          { icon: Bot, t: "AI Assistance", d: "24x7 Intelligent Support" }
        ].map((f) => (
          <div key={f.t} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <f.icon size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{f.t}</p>
              <p className="text-xs text-slate-500">{f.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
