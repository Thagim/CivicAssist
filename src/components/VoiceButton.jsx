import { useState } from "react"
import { Mic } from "lucide-react"

export default function VoiceButton({ onResult, className = "" }) {
  const [listening, setListening] = useState(false)

  function handleClick() {
    setListening(true)
    // Simulated voice capture for demo purposes (no external speech API wired up).
    setTimeout(() => {
      setListening(false)
      onResult?.("I need a caste certificate")
    }, 1200)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Speak your request"
      className={`flex items-center justify-center rounded-full transition-colors ${
        listening ? "bg-red-500 animate-pulse" : "bg-brand-600 hover:bg-brand-700"
      } text-white ${className}`}
    >
      <Mic size={18} />
    </button>
  )
}
