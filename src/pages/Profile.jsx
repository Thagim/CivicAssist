import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar,
  Pencil,
  Save,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff
} from "lucide-react"

export default function Profile() {
  const navigate = useNavigate()
  const location = useLocation()

  // =====================================================
  // GET SAVED USER
  // =====================================================

  const getSavedUser = () => {
    try {
      const saved = localStorage.getItem("civicAssistUser")
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  }

  const savedUser = getSavedUser()

  // =====================================================
  // LOGIN STATUS
  // =====================================================

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("civicAssistLoggedIn") === "true"
  )

  const [user, setUser] = useState(savedUser)

  // =====================================================
  // LOGIN / REGISTER MODE
  // =====================================================

  const [mode, setMode] = useState(
    location.state?.mode || "login"
  )

  // =====================================================
  // LOGIN DATA
  // =====================================================

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  // =====================================================
  // REGISTER DATA
  // =====================================================

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    address: ""
  })

  const [editing, setEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")


  // =====================================================
  // LOGIN
  // =====================================================

  function handleLogin(e) {
    e.preventDefault()

    setError("")
    setSuccess("")

    const savedUser = getSavedUser()

    if (!savedUser) {
      setError("No account found. Please register first.")
      return
    }

    if (
      loginData.email.trim().toLowerCase() !==
        savedUser.email.trim().toLowerCase() ||
      loginData.password !== savedUser.password
    ) {
      setError("Invalid email or password.")
      return
    }

    // Save login status
    localStorage.setItem(
      "civicAssistLoggedIn",
      "true"
    )

    setUser(savedUser)
    setLoggedIn(true)

    // IMPORTANT:
    // Tell Navbar that login has happened
    window.dispatchEvent(
      new Event("civicAssistAuthChanged")
    )

    setSuccess("Login successful!")

    setTimeout(() => {
      navigate("/dashboard")
    }, 500)
  }


  // =====================================================
  // REGISTER
  // =====================================================

  function handleRegister(e) {
    e.preventDefault()

    setError("")
    setSuccess("")

    if (
      !registerData.name.trim() ||
      !registerData.email.trim() ||
      !registerData.mobile.trim() ||
      !registerData.password
    ) {
      setError("Please fill all required fields.")
      return
    }

    if (
      registerData.password !==
      registerData.confirmPassword
    ) {
      setError("Passwords do not match.")
      return
    }

    if (registerData.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      )
      return
    }

    const existingUser = getSavedUser()

    if (
      existingUser &&
      existingUser.email &&
      existingUser.email.toLowerCase() ===
        registerData.email.trim().toLowerCase()
    ) {
      setError(
        "An account with this email already exists."
      )
      return
    }

    // Generate initials
    const initials = registerData.name
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase()

    const newUser = {
      name: registerData.name.trim(),
      initials: initials || "GU",
      mobile: registerData.mobile.trim(),
      email: registerData.email.trim(),
      address: registerData.address.trim(),
      dob: registerData.dob,
      gender: registerData.gender,
      password: registerData.password
    }

    // Save user
    localStorage.setItem(
      "civicAssistUser",
      JSON.stringify(newUser)
    )

    // Save login status
    localStorage.setItem(
      "civicAssistLoggedIn",
      "true"
    )

    setUser(newUser)
    setLoggedIn(true)

    // IMPORTANT:
    // Tell Navbar that registration/login happened
    window.dispatchEvent(
      new Event("civicAssistAuthChanged")
    )

    setSuccess(
      "Account created successfully!"
    )

    setTimeout(() => {
      navigate("/dashboard")
    }, 500)
  }


  // =====================================================
  // LOGOUT
  // =====================================================

  function handleLogout() {

    localStorage.removeItem(
      "civicAssistLoggedIn"
    )

    setLoggedIn(false)
    setUser(null)

    // Tell Navbar that logout happened
    window.dispatchEvent(
      new Event("civicAssistAuthChanged")
    )

    setLoginData({
      email: "",
      password: ""
    })

    setMode("login")
    setError("")
    setSuccess("")
    setEditing(false)

    navigate("/profile")
  }


  // =====================================================
  // UPDATE PROFILE
  // =====================================================

  function update(field, value) {
    setUser((previous) => ({
      ...previous,
      [field]: value
    }))
  }


  // =====================================================
  // SAVE PROFILE
  // =====================================================

  function saveProfile() {
    if (!user) return

    const updatedUser = {
      ...user
    }

    if (updatedUser.name) {
      updatedUser.initials = updatedUser.name
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase()
    }

    localStorage.setItem(
      "civicAssistUser",
      JSON.stringify(updatedUser)
    )

    setUser(updatedUser)
    setEditing(false)
    setSuccess(
      "Profile updated successfully."
    )

    setTimeout(() => {
      setSuccess("")
    }, 2500)
  }


  // =====================================================
  // LOGIN / REGISTER PAGE
  // =====================================================

  if (!loggedIn) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-lg">

          {/* Logo */}

          <div className="text-center mb-8">

            <div className="w-20 h-20 bg-brand-700 rounded-2xl mx-auto flex items-center justify-center mb-5">

              <ShieldCheck
                size={42}
                className="text-white"
              />

            </div>

            <h1 className="text-3xl font-display font-bold text-slate-900">
              CivicAssist
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Your guide to government services
            </p>

          </div>


          {/* Login / Register Card */}

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

            {/* Tabs */}

            <div className="flex bg-slate-100 rounded-lg p-1 mb-6">

              <button
                type="button"
                onClick={() => {
                  setMode("login")
                  setError("")
                  setSuccess("")
                }}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition ${
                  mode === "login"
                    ? "bg-white text-brand-700 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("register")
                  setError("")
                  setSuccess("")
                }}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition ${
                  mode === "register"
                    ? "bg-white text-brand-700 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Register
              </button>

            </div>


            {/* Error */}

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}


            {/* Success */}

            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg px-4 py-3">
                {success}
              </div>
            )}


            {/* =================================================
                LOGIN FORM
            ================================================= */}

            {mode === "login" && (
              <form
                onSubmit={handleLogin}
                className="space-y-4"
              >

                {/* Email */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          email: e.target.value
                        })
                      }
                      className="w-full border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-200"
                      required
                    />

                  </div>

                </div>


                {/* Password */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value
                        })
                      }
                      className="w-full border border-slate-200 rounded-lg pl-10 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-200"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>


                {/* Login Button */}

                <button
                  type="submit"
                  className="w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-lg py-3 transition"
                >
                  Login
                </button>


                <p className="text-center text-sm text-slate-500 pt-2">

                  Don't have an account?{" "}

                  <button
                    type="button"
                    onClick={() => {
                      setMode("register")
                      setError("")
                      setSuccess("")
                    }}
                    className="text-brand-700 font-semibold"
                  >
                    Register
                  </button>

                </p>

              </form>
            )}


            {/* =================================================
                REGISTER FORM
            ================================================= */}

            {mode === "register" && (
              <form
                onSubmit={handleRegister}
                className="space-y-4"
              >

                {/* Full Name */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          name: e.target.value
                        })
                      }
                      className="w-full border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-200"
                      required
                    />

                  </div>

                </div>


                {/* Email */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email *
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value
                        })
                      }
                      className="w-full border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-200"
                      required
                    />

                  </div>

                </div>


                {/* Mobile */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mobile Number *
                  </label>

                  <div className="relative">

                    <Phone
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={registerData.mobile}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          mobile: e.target.value
                        })
                      }
                      className="w-full border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-200"
                      required
                    />

                  </div>

                </div>


                {/* Date of Birth */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date of Birth
                  </label>

                  <div className="relative">

                    <Calendar
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="date"
                      value={registerData.dob}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          dob: e.target.value
                        })
                      }
                      className="w-full border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-200"
                    />

                  </div>

                </div>


                {/* Gender */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Gender
                  </label>

                  <select
                    value={registerData.gender}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        gender: e.target.value
                      })
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-200"
                  >

                    <option value="">
                      Select gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>

                  </select>

                </div>


                {/* Address */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Address
                  </label>

                  <div className="relative">

                    <MapPin
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <textarea
                      placeholder="Enter your address"
                      value={registerData.address}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          address: e.target.value
                        })
                      }
                      rows="2"
                      className="w-full border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-200"
                    />

                  </div>

                </div>


                {/* Password */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Password *
                  </label>

                  <div className="relative">

                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Create password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value
                        })
                      }
                      className="w-full border border-slate-200 rounded-lg pl-10 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-200"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>


                {/* Confirm Password */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Confirm Password *
                  </label>

                  <div className="relative">

                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value
                        })
                      }
                      className="w-full border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-200"
                      required
                    />

                  </div>

                </div>


                {/* Register Button */}

                <button
                  type="submit"
                  className="w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-lg py-3 transition"
                >
                  Create Account
                </button>


                <p className="text-center text-sm text-slate-500 pt-2">

                  Already have an account?{" "}

                  <button
                    type="button"
                    onClick={() => {
                      setMode("login")
                      setError("")
                      setSuccess("")
                    }}
                    className="text-brand-700 font-semibold"
                  >
                    Login
                  </button>

                </p>

              </form>
            )}

          </div>


          <p className="text-center text-xs text-slate-400 mt-5">
            CivicAssist • Simplifying access to government services
          </p>

        </div>

      </div>
    )
  }


  // =====================================================
  // LOGGED-IN PROFILE
  // =====================================================

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-2xl font-display font-bold text-slate-900">
            Profile
          </p>

          <p className="text-sm text-slate-500">
            Your personal information as used across applications.
          </p>

        </div>


        <div className="flex gap-2">

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 rounded-lg px-3.5 py-2"
          >

            <LogOut size={14} />

            Logout

          </button>


          {/* Edit / Save */}

          <button
            onClick={() => {
              if (editing) {
                saveProfile()
              } else {
                setEditing(true)
              }
            }}
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 border border-brand-200 hover:bg-brand-50 rounded-lg px-3.5 py-2"
          >

            {editing ? (
              <Save size={14} />
            ) : (
              <Pencil size={14} />
            )}

            {editing ? "Save" : "Edit"}

          </button>

        </div>

      </div>


      {/* Success */}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg px-4 py-3">
          {success}
        </div>
      )}


      {/* Profile Card */}

      <div className="bg-white border border-slate-200 rounded-2xl p-6">

        <div className="flex items-center gap-4 mb-7">

          <div className="w-16 h-16 rounded-full bg-brand-700 text-white text-xl font-semibold flex items-center justify-center">

            {user?.initials || "GU"}

          </div>


          <div>

            <p className="font-display font-semibold text-lg text-slate-900">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-slate-400 flex items-center gap-1">

              <ShieldCheck size={13} />

              CivicAssist Account

            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <ProfileField
            label="Full Name"
            value={user?.name || ""}
            editing={editing}
            onChange={(value) =>
              update("name", value)
            }
          />

          <ProfileField
            label="Date of Birth"
            value={user?.dob || ""}
            editing={editing}
            onChange={(value) =>
              update("dob", value)
            }
            type="date"
          />

          <ProfileField
            label="Gender"
            value={user?.gender || ""}
            editing={editing}
            onChange={(value) =>
              update("gender", value)
            }
          />

          <ProfileField
            label="Mobile Number"
            value={user?.mobile || ""}
            editing={editing}
            onChange={(value) =>
              update("mobile", value)
            }
          />

          <ProfileField
            label="Email"
            value={user?.email || ""}
            editing={editing}
            onChange={(value) =>
              update("email", value)
            }
          />

          <ProfileField
            label="Address"
            value={user?.address || ""}
            editing={editing}
            onChange={(value) =>
              update("address", value)
            }
            full
          />

        </div>

      </div>

    </div>
  )
}


// =====================================================
// PROFILE FIELD
// =====================================================

function ProfileField({
  label,
  value,
  editing,
  onChange,
  full,
  type = "text"
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>

      <p className="text-xs text-slate-400 mb-1">
        {label}
      </p>

      {editing ? (

        <input
          type={type}
          value={value || ""}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-200"
        />

      ) : (

        <p className="text-sm text-slate-800 min-h-[20px]">
          {value || "Not provided"}
        </p>

      )}

    </div>
  )
}