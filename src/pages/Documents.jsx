import { useState } from "react"
import { FileText, UploadCloud, Trash2, Download } from "lucide-react"

const initialDocs = [
  { id: 1, name: "Aadhaar Card.pdf", type: "Identity Proof", size: "2.4 MB", date: "20 May 2024" },
  { id: 2, name: "Address Proof.jpg", type: "Address Proof", size: "1.6 MB", date: "20 May 2024" },
  { id: 3, name: "Caste Proof.pdf", type: "Supporting Document", size: "3.1 MB", date: "18 May 2024" },
  { id: 4, name: "Income Slip.pdf", type: "Income Proof", size: "0.9 MB", date: "10 May 2024" }
]

export default function Documents() {
  const [docs, setDocs] = useState(initialDocs)

  function remove(id) {
    setDocs((d) => d.filter((x) => x.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-2xl font-display font-bold text-slate-900">My Documents</p>
          <p className="text-sm text-slate-500">All documents you've uploaded, stored securely in one place.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
          <UploadCloud size={16} /> Upload Document
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
        {docs.map((d) => (
          <div key={d.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <FileText size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{d.name}</p>
                <p className="text-xs text-slate-400">
                  {d.type} • {d.size} • Uploaded {d.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500" aria-label="Download">
                <Download size={15} />
              </button>
              <button
                onClick={() => remove(d.id)}
                className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-red-500"
                aria-label="Delete"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
        {docs.length === 0 && <p className="text-center text-sm text-slate-400 py-10">No documents uploaded yet.</p>}
      </div>
    </div>
  )
}
