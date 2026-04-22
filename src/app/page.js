import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

async function getFeaturedCenters() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    const { data } = await supabase.from("gyms").select("*").limit(6)
    return data || []
  } catch { return [] }
}

const CATEGORIES = [
  { name: "Gym",      icon: "🏋️", color: "#b6f36a", badge: "badge-gym" },
  { name: "Yoga",     icon: "🧘", color: "#a78bfa", badge: "badge-yoga" },
  { name: "Pilates",  icon: "🤸", color: "#f472b6", badge: "badge-pilates" },
  { name: "CrossFit", icon: "⚡", color: "#ff8c42", badge: "badge-crossfit" },
  { name: "Zumba",    icon: "💃", color: "#38bdf8", badge: "badge-zumba" },
  { name: "Boxing",   icon: "🥊", color: "#ff4757", badge: "badge-boxing" },
  { name: "Swimming", icon: "🏊", color: "#2dd4bf", badge: "badge-swimming" },
  { name: "Dance",    icon: "🕺", color: "#fb923c", badge: "badge-dance" },
]

const TICKER_ITEMS = [
  "GYMS", "YOGA STUDIOS", "PILATES CENTERS", "CROSSFIT BOXES",
  "BOXING GYMS", "DANCE STUDIOS", "SWIM CENTERS", "ZUMBA CLASSES",
  "FITNESS FOR ALL", "MAKING INDIA FIT",
]

const STEPS = [
  { num: "01", title: "Search Your City", desc: "Enter your city or area and browse hundreds of verified fitness centers near you." },
  { num: "02", title: "Filter by Category", desc: "Choose from gyms, yoga, pilates, crossfit, boxing, dance, swimming and more." },
  { num: "03", title: "Show Up & Train", desc: "Get directions, check timings, see ratings and start your fitness journey today." },
]

function CenterCard({ center, idx }) {
  const cat = CATEGORIES[idx % CATEGORIES.length]
  return (
    <div className="card anim-fade-up" style={{ animationDelay: `${idx * 0.08}s` }}>
      {/* Image placeholder */}
      <div style={{
        height: "180px",
        background: `linear-gradient(135deg, #111 0%, #1a1a1a 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "48px", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at 30% 40%, ${cat.color}18, transparent 60%)`,
        }} />
        {cat.icon}
        <span className={`tag ${cat.badge}`} style={{
          position: "absolute", top: "12px", left: "12px",
        }}>
          {cat.name}
        </span>
      </div>

      <div style={{ padding: "20px" }}>
        <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "16px", margin: "0 0 6px", color: "var(--text-primary)" }}>
          {center.name || `Fitness Center ${idx + 1}`}
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: "0 0 12px", display: "flex", alignItems: "center", gap: "4px" }}>
          📍 {center.location || "India"}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="stars">{"★".repeat(Math.round(center.rating || 4))}{"☆".repeat(5 - Math.round(center.rating || 4))}</span>
          <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>{center.rating || "4.0"} / 5</span>
        </div>
      </div>
    </div>
  )
}

function PlaceholderCard({ idx }) {
  const cat = CATEGORIES[idx % CATEGORIES.length]
  const names = ["Iron Temple Gym", "Serenity Yoga Studio", "Core Pilates Studio", "Beast CrossFit", "Rhythm Zumba", "KO Boxing Club", "AquaFit Swimming", "Groove Dance Academy"]
  const locs = ["Bengaluru", "Mumbai", "Delhi", "Pune", "Chennai", "Hyderabad", "Kolkata", "Ahmedabad"]
  const ratings = [4.8, 4.6, 4.9, 4.7, 4.5, 4.8, 4.6, 4.7]
  return (
    <div className="card anim-fade-up" style={{ animationDelay: `${idx * 0.08}s` }}>
      <div style={{
        height: "180px",
        background: `linear-gradient(135deg, #111 0%, #1a1a1a 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "48px", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at 30% 40%, ${cat.color}18, transparent 60%)`,
        }} />
        {cat.icon}
        <span className={`tag ${cat.badge}`} style={{ position: "absolute", top: "12px", left: "12px" }}>
          {cat.name}
        </span>
      </div>
      <div style={{ padding: "20px" }}>
        <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "16px", margin: "0 0 6px", color: "var(--text-primary)" }}>
          {names[idx % names.length]}
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: "0 0 12px" }}>
          📍 {locs[idx % locs.length]}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="stars">{"★".repeat(Math.round(ratings[idx % ratings.length]))}{"☆".repeat(5 - Math.round(ratings[idx % ratings.length]))}</span>
          <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>{ratings[idx % ratings.length]} / 5</span>
        </div>
      </div>
    </div>
  )
}

export default async function Home() {
  const centers = await getFeaturedCenters()
  const showPlaceholders = centers.length === 0

  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: "80px" }}>
        <div className="hero-mesh" />

        {/* Ticker */}
        <div style={{
          position: "absolute", top: "80px", left: 0, right: 0,
          overflow: "hidden", borderBottom: "1px solid var(--border)",
          background: "rgba(182,243,106,0.03)", padding: "10px 0",
        }}>
          <div className="marquee-track" style={{ gap: "0" }}>
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} style={{
                padding: "0 28px",
                fontFamily: "var(--font-syne)", fontSize: "11px", fontWeight: 700,
                letterSpacing: "2px", color: "var(--text-muted)",
              }}>
                {item} <span style={{ color: "var(--lime)", marginLeft: "28px" }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        <div className="container" style={{ paddingTop: "80px" }}>
          <div style={{ maxWidth: "900px" }}>
            <div className="anim-fade-up" style={{ marginBottom: "24px" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                border: "1px solid rgba(182,243,106,0.3)", borderRadius: "100px",
                padding: "6px 14px", fontSize: "12px", fontWeight: 700,
                fontFamily: "var(--font-syne)", color: "var(--lime)",
                letterSpacing: "1px",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--lime)", display: "inline-block" }} />
                INDIA'S FITNESS DISCOVERY PLATFORM
              </span>
            </div>

            <h1 className="hero-headline anim-fade-up-1">
              Making<br />
              <span style={{ color: "var(--lime)" }}>India</span><br />
              Fit.
            </h1>

            <p className="anim-fade-up-2" style={{
              color: "var(--text-secondary)", fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: "1.6", maxWidth: "520px", margin: "32px 0 40px",
            }}>
              Discover gyms, yoga studios, pilates, crossfit boxes, boxing gyms, dance studios and more — across every city in India.
            </p>

            <div className="anim-fade-up-3" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/explore" className="btn-primary" style={{ fontSize: "15px", padding: "16px 32px" }}>
                Explore Centers →
              </Link>
              <Link href="/about" className="btn-outline" style={{ fontSize: "15px", padding: "16px 32px" }}>
                Our Mission
              </Link>
            </div>

            {/* Mini stats */}
            <div className="anim-fade-up-4" style={{ display: "flex", gap: "40px", marginTop: "64px", flexWrap: "wrap" }}>
              {[["500+", "Centers Listed"], ["50+", "Cities"], ["8", "Categories"], ["10K+", "Users"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "28px", color: "var(--lime)", letterSpacing: "-1px" }}>{num}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500, marginTop: "2px" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "1px", fontFamily: "var(--font-syne)" }}>SCROLL</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--border-hover), transparent)" }} />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px", marginBottom: "48px" }}>
            <div>
              <div className="accent-line" />
              <h2 className="section-title">Every type of<br /><span style={{ color: "var(--lime)" }}>fitness</span></h2>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", maxWidth: "340px" }}>
              From high-intensity training to mindful movement — find exactly what your body needs.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.name} href={`/explore?category=${cat.name.toLowerCase()}`} style={{ textDecoration: "none" }}>
                <div className="card anim-fade-up" style={{ animationDelay: `${i * 0.06}s`, padding: "28px 24px" }}>
                  <div style={{ fontSize: "36px", marginBottom: "16px" }}>{cat.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "18px", color: "var(--text-primary)", margin: "0 0 6px" }}>
                    {cat.name}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "13px", margin: "0 0 16px" }}>
                    Find {cat.name.toLowerCase()} centers near you
                  </p>
                  <span style={{ color: cat.color, fontSize: "13px", fontWeight: 600, fontFamily: "var(--font-syne)" }}>
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* FEATURED */}
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px", marginBottom: "48px" }}>
            <div>
              <div className="accent-line" />
              <h2 className="section-title">Featured<br /><span style={{ color: "var(--lime)" }}>Centers</span></h2>
            </div>
            <Link href="/explore" className="btn-outline">View All →</Link>
          </div>

          <div className="grid-centers">
            {showPlaceholders
              ? Array.from({ length: 6 }).map((_, i) => <PlaceholderCard key={i} idx={i} />)
              : centers.map((c, i) => <CenterCard key={c.id} center={c} idx={i} />)
            }
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: "60px" }}>
            <div className="accent-line" />
            <h2 className="section-title">How it <span style={{ color: "var(--lime)" }}>works</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px" }}>
            {STEPS.map((step, i) => (
              <div key={step.num} className="anim-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{
                  fontFamily: "var(--font-syne)", fontWeight: 800,
                  fontSize: "72px", lineHeight: 1,
                  color: "var(--border-hover)",
                  marginBottom: "20px", letterSpacing: "-2px",
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "22px", margin: "0 0 12px", color: "var(--text-primary)" }}>
                  {step.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.6", margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* STATS BAND */}
      <section className="section-sm" style={{ background: "linear-gradient(135deg, rgba(182,243,106,0.04) 0%, transparent 100%)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "40px", textAlign: "center" }}>
            {[
              ["500+", "Fitness Centers"],
              ["50+", "Cities Covered"],
              ["8", "Fitness Categories"],
              ["10,000+", "Happy Members"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="stat-num">{num}</div>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "8px", fontWeight: 500 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
