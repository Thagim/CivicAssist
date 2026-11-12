import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import {
  Search,
  Globe2,
  Bell,
  ChevronDown,
  LogIn,
  LogOut
} from "lucide-react"

export default function Navbar() {
  const navigate = useNavigate()

  const [showLanguage, setShowLanguage] = useState(false)
  const [search, setSearch] = useState("")

  const languages = [
    "English",
    "हिन्दी",
    "தமிழ்",
    "తెలుగు",
    "ಕನ್ನಡ"
  ]

  // =====================================================
  // SEARCH
  // =====================================================

  function handleSearch(e) {
    e.preventDefault()

    if (!search.trim()) return

    navigate(
      `/services?search=${encodeURIComponent(
        search.trim()
      )}`
    )
  }


  // =====================================================
  // LOGOUT
  // =====================================================

  function handleLogout() {
    // Remove login status
    localStorage.removeItem("civicAssistLoggedIn")

    // Notify other components
    window.dispatchEvent(
      new Event("civicAssistAuthChanged")
    )

    // Go to Login/Register page
    navigate("/profile")
  }


  return (
    <header className="h-[72px] shrink-0 border-b border-slate-200 bg-white flex items-center justify-between px-4 sm:px-6 gap-4">

      {/* =================================================
          SEARCH BAR
      ================================================= */}

      <form
        onSubmit={handleSearch}
        className="flex-1 max-w-2xl"
      >

        <div className="relative">

          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search for services, schemes, documents..."
            className="w-full h-11 rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
          />

        </div>

      </form>


      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="flex items-center gap-4 shrink-0">

        {/* =================================================
            LANGUAGE
        ================================================= */}

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setShowLanguage(!showLanguage)
            }
            className="flex items-center gap-1.5 text-sm text-slate-700 hover:text-brand-700"
          >

            <Globe2 size={18} />

            <span className="hidden sm:inline">
              English
            </span>

            <ChevronDown
              size={15}
              className={
                showLanguage
                  ? "rotate-180"
                  : ""
              }
            />

          </button>


          {showLanguage && (

            <div className="absolute right-0 top-10 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">

              {languages.map((language) => (

                <button
                  key={language}
                  type="button"
                  onClick={() =>
                    setShowLanguage(false)
                  }
                  className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  {language}
                </button>

              ))}

            </div>

          )}

        </div>


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            navigate("/notifications")
          }
          className="relative p-2 text-slate-600 hover:text-brand-700"
          title="Notifications"
        >

          <Bell size={20} />

          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            3
          </span>

        </button>


        {/* =================================================
            AUTH BUTTONS
        ================================================= */}

        <div className="flex flex-col items-stretch gap-1">

          {/* Register / Login */}

          <NavLink
            to="/profile"
            className="flex items-center justify-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >

            <LogIn size={17} />

            Register / Login

          </NavLink>


          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-1.5 text-red-600 border border-red-200 hover:bg-red-50 text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors whitespace-nowrap"
          >

            <LogOut size={16} />

            Logout

          </button>

        </div>

      </div>

    </header>
  )
}