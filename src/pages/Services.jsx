import { useState, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { Search } from "lucide-react"
import ServiceCard from "../components/ServiceCard"
import { services } from "../data/mockData"

const categories = ["All", "Certificates", "Schemes", "Education", "Health", "Employment"]

export default function Services() {
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get("category") || "All"
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchesCategory = activeCategory === "All" || s.category === activeCategory
      const matchesQuery = s.title.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
      <div>
        <p className="text-2xl font-display font-bold text-slate-900">Find Services</p>
        <p className="text-sm text-slate-500">Browse certificates, schemes, and government support programs.</p>
      </div>

      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2.5 max-w-lg">
        <Search size={16} className="text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services..."
          className="flex-1 outline-none text-sm placeholder:text-slate-400"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setParams(c === "All" ? {} : { category: c })}
            className={`text-sm font-medium px-4 py-1.5 rounded-full border ${
              activeCategory === c
                ? "bg-brand-600 border-brand-600 text-white"
                : "bg-white border-slate-200 text-slate-600 hover:border-brand-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-slate-500 col-span-full text-center py-12">No services match your search.</p>
        )}
      </div>
    </div>
  )
}
