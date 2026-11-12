import { useRef, useState } from "react"
import { FileCheck2, UploadCloud, RefreshCw } from "lucide-react"

export default function DocumentUpload({ label, detail, onChange }) {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)

  function handleFile(e) {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f)
      onChange?.(f)
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 border border-slate-200 rounded-xl px-4 py-3.5 bg-white">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
          <UploadCloud size={17} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-800">{label} *</p>
          <p className="text-xs text-slate-500 truncate">{detail}</p>
        </div>
      </div>

      <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFile} />

      {file ? (
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-slate-700 truncate max-w-[120px]">{file.name}</p>
            <p className="text-[11px] text-slate-400">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
          </div>
          <FileCheck2 size={18} className="text-emerald-500" />
          <button
            onClick={() => inputRef.current?.click()}
            className="text-xs font-medium text-brand-600 hover:underline flex items-center gap-1"
          >
            <RefreshCw size={12} /> Replace
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="text-xs font-semibold text-brand-600 border border-brand-200 hover:bg-brand-50 px-3 py-1.5 rounded-lg shrink-0"
        >
          Upload
        </button>
      )}
    </div>
  )
}
