"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

const CATEGORIES = [
  { name: "All",      icon: "🔥" },
  { name: "Gym",      icon: "🏋️", badge: "badge-gym" },
  { name: "Yoga",     icon: "🧘", badge: "badge-yoga" },
  { name: "Pilates",  icon: "🤸", badge: "badge-pilates" },
  { name: "CrossFit", icon: "⚡", badge: "badge-crossfit" },
  { name: "Zumba",    icon: "💃", badge: "badge-zumba" },
  { name: "Boxing",   icon: "🥊", badge: "badge-boxing" },
  { name: "Swimming", icon: "🏊", badge: "badge-swimming" },
  { name: "Dance",    icon: "🕺", badge: "badge-dance" },
]

const CAT_COLORS = {
  gym: "#b6f36a", yoga: "#a78bfa", pilates: "#f472b6",
  crossfit: "#ff8c42", zumba: "#38bdf8", boxing: "#ff4757",
  swimming: "#2dd4bf", dance: "#fb923c",
}

const PLACEHOLDER_CENTERS = Array.from({ length: 12 }).map((_, i) => {
  const cats = ["gym", "yoga", "pilates", "crossfit", "zumba", "boxing", "swimming", "dance"]
  const names = [
    "Iron Temple Gym", "Serenity Yoga Studio", "Core Pilates", "Beast CrossFit",
    "Rhythm Zumba", "KO Boxing", "AquaFit Swimming", "Groove Dance",
    "PowerHouse Gym", "Zen Yoga Flow", "FlexCore Pilates", "Urban Boxing Club",
  ]
  const locs = ["Bengaluru", "Mumbai", "Delhi", "Pune", "Chennai", "Hyderabad", "Kolkata", "Ahmedabad", "Surat", "Jaipur", "Lucknow", "Nagpur"]
  const ratings = [4.8, 4.6, 4.9, 4.7, 4.5, 4.8, 4.6, 4.7, 4.9, 4.4, 4.8, 4.6]
  return {
    id: i, name: names[i], location: locs[i],
    rating: ratings[i], category: cats[i % cats.length],
  }
})

function ExploreContent() {
  const searchParams = useSearchParams()
  const [centers, setCenters] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all")
  const [activeCity, setActiveCity] = useState(searchParams.get("city") || "all")

  const CITIES = ["All", "Bengaluru", "Mumbai", "Delhi", "Pune", "Chennai", "Hyderabad", "Kolkata", "Ahmedabad"]

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )
        const { data } = await supabase.from("gyms").select("*")
        setCenters(data?.length ? data : PLACEHOLDER_CENTERS)
      } catch {
        setCenters(PLACEHOLDER_CENTERS)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = centers.filter(c => {
    const matchSearch = !search || c.name?.toLowerCase().includes(search.toLowerCase()) || c.location?.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === "all" || c.category?.toLowerCase() === activeCategory.toLowerCase()
    const matchCity = activeCity === "all" || c.location?.toLowerCase().includes(activeCity.toLowerCase())
    return matchSearch && matchCat && matchCity
  })

  const getIcon = (cat) => CATEGORIES.find(c => c.name.toLowerCase() === cat?.toLowerCase())?.icon || "🏋️"
  const getBadge = (cat) => CATEGORIES.find(c => c.name.toLowerCase() === cat?.toLowerCase())?.badge || "badge-gym"
  const getColor = (cat) => CAT_COLORS[cat?.toLowerCase()] || "#b6f36a"

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid var(--border)",
        background: "linear-gradient(to bottom, rgba(182,243,106,0.03), transparent)",
        padding: "48px 0 40px",
      }}>
        <div className="container">
          <div className="accent-line" />
          <h1 className="section-title" style={{ marginBottom: "12px" }}>
            Find your <span style={{ color: "var(--lime)" }}>space</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "32px" }}>
            Discover fitness centers across India — filter by type, city and more.
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "520px" }}>
            <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "18px" }}>🔍</span>
            <input
              className="search-input"
              style={{ paddingLeft: "48px" }}
              placeholder="Search by name or city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "32px" }}>
        {/* Category filters */}
        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontFamily: "var(--font-syne)", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "12px" }}>
            Category
          </p>
          <div className="scroll-strip">
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                className={`cat-pill ${activeCategory === cat.name.toLowerCase() ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.name.toLowerCase())}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* City filters */}
        <div style={{ marginBottom: "40px" }}>
          <p style={{ fontFamily: "var(--font-syne)", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "12px" }}>
            City
          </p>
          <div className="scroll-strip">
            {CITIES.map(city => (
              <button
                key={city}
                className={`cat-pill ${activeCity === city.toLowerCase() ? "active" : ""}`}
                onClick={() => setActiveCity(city.toLowerCase())}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            {loading ? "Loading..." : `${filtered.length} center${filtered.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ height: "280px", borderRadius: "12px", background: "var(--bg-card)", border: "1px solid var(--border)", animation: "pulse 1.5s ease infinite" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "20px", color: "var(--text-primary)", marginBottom: "8px" }}>No centers found</h3>
            <p style={{ color: "var(--text-secondary)" }}>Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid-centers">
            {filtered.map((center, i) => (
              <div key={center.id} className="card anim-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div style={{
                  height: "160px",
                  background: "linear-gradient(135deg, #111 0%, #1a1a1a 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "40px", position: "relative", overflow: "hidden",
                }}>
                  {center.image_url ? (
                    <img
                      src={center.image_url}
                      alt={center.name}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: `radial-gradient(circle at 30% 40%, ${getColor(center.category)}18, transparent 60%)`,
                    }} />
                  )}
                  {!center.image_url && getIcon(center.category)}
                  <span className={`tag ${getBadge(center.category)}`} style={{ position: "absolute", top: "12px", left: "12px", textTransform: "capitalize" }}>
                    {center.category || "Gym"}
                  </span>
                </div>

                <div style={{ padding: "20px" }}>
                  <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "16px", margin: "0 0 6px", color: "var(--text-primary)" }}>
                    {center.name}
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: "0 0 16px" }}>
                    📍 {center.location}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="stars">
                      {"★".repeat(Math.max(0, Math.min(5, Math.round(center.rating || 4))))}
                      {"☆".repeat(Math.max(0, 5 - Math.min(5, Math.round(center.rating || 4))))}
                    </span>
                    <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>{center.rating || 4.0} / 5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ height: "80px" }} />
      </div>
    </div>
  )
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: "200px", textAlign: "center", color: "var(--text-muted)" }}>Loading...</div>}>
      <ExploreContent />
    </Suspense>
  )
}
