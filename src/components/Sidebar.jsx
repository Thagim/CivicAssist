import { NavLink } from "react-router-dom"
import {
  Home,
  Search,
  Sparkles,
  FileText,
  FolderOpen,
  Bell,
  Award,
  GraduationCap,
  HeartPulse,
  Sprout,
  Briefcase,
  Bot,
  LayoutDashboard
} from "lucide-react"


// =====================================================
// MAIN NAVIGATION
// =====================================================

const mainLinks = [
  {
    to: "/",
    label: "Home",
    icon: Home,
    end: true
  },
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  },
  {
    to: "/services",
    label: "Find Services",
    icon: Search
  },
  {
    to: "/assistant",
    label: "AI Assistant",
    icon: Sparkles,
    badge: "New"
  },
  {
    to: "/applications",
    label: "My Applications",
    icon: FileText
  },
  {
    to: "/documents",
    label: "Documents",
    icon: FolderOpen
  },
  {
    to: "/notifications",
    label: "Notifications",
    icon: Bell,
    count: 3
  }
]


// =====================================================
// QUICK LINKS
// =====================================================

const quickLinks = [
  {
    to: "/services?category=Certificates",
    label: "Certificates",
    icon: Award
  },
  {
    to: "/services?category=Education",
    label: "Education Scheme",
    icon: GraduationCap
  },
  {
    to: "/services?category=Health",
    label: "Health Scheme",
    icon: HeartPulse
  },
  {
    to: "/services?category=Agriculture",
    label: "Agriculture Scheme",
    icon: Sprout
  },
  {
    to: "/services?category=Employment",
    label: "Employment Scheme",
    icon: Briefcase
  }
]


// =====================================================
// SIDEBAR
// =====================================================

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white h-screen sticky top-0 overflow-y-auto">

      {/* =================================================
          LOGO
      ================================================= */}

      <div className="flex items-center gap-2 px-5 py-5">

        <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">

          <Bot
            size={20}
            className="text-white"
          />

        </div>

        <div>

          <p className="font-display font-semibold text-slate-900 leading-tight">
            CivicAssist
          </p>

          <p className="text-[11px] text-slate-500 leading-tight">
            AI Government Service Assistant
          </p>

        </div>

      </div>


      {/* =================================================
          MAIN NAVIGATION
      ================================================= */}

      <nav className="px-3 flex flex-col gap-1">

        {mainLinks.map((link) => (

          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >

            <span className="flex items-center gap-3">

              <link.icon size={18} />

              {link.label}

            </span>


            {/* New Badge */}

            {link.badge && (

              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-semibold">

                {link.badge}

              </span>

            )}


            {/* Notification Count */}

            {link.count && (

              <span className="text-[10px] bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center">

                {link.count}

              </span>

            )}

          </NavLink>

        ))}

      </nav>


      {/* =================================================
          QUICK LINKS
      ================================================= */}

      <div className="px-5 pt-6 pb-2">

        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Quick Links
        </p>

      </div>


      <nav className="px-3 flex flex-col gap-1">

        {quickLinks.map((link) => (

          <NavLink
            key={link.label}
            to={link.to}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50"
          >

            <link.icon size={17} />

            {link.label}

          </NavLink>

        ))}

      </nav>

    </aside>
  )
}