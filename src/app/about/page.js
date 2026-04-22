import Link from "next/link"

export const metadata = {
  title: "About – Fitnara",
  description: "Fitnara is on a mission to make India fit by connecting people with gyms, yoga studios, pilates, crossfit and more across every city in India.",
}

const VALUES = [
  { icon: "🎯", title: "Accessible Fitness", desc: "We believe fitness should be accessible to every Indian, regardless of city, income or background." },
  { icon: "🤝", title: "Community First", desc: "We build bridges between fitness seekers and the incredible trainers and centers across India." },
  { icon: "🇮🇳", title: "Made for India", desc: "From Mumbai to Manipur, Bengaluru to Bihar — we are building for the whole country." },
  { icon: "📊", title: "Data Driven", desc: "Real ratings, real reviews, real data — so you always make the best decision for your health." },
]

const TEAM = [
  { name: "The Fitnara Team", role: "Building India's fitness future", emoji: "💪" },
]

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section style={{
        minHeight: "70vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(182,243,106,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="container">
          <div style={{ maxWidth: "740px" }}>
            <div className="accent-line" />
            <h1 className="hero-headline anim-fade-up">
              We're on a<br />
              <span style={{ color: "var(--lime)" }}>mission.</span>
            </h1>
            <p className="anim-fade-up-2" style={{
              color: "var(--text-secondary)", fontSize: "clamp(16px, 2vw, 22px)",
              lineHeight: "1.6", maxWidth: "560px", margin: "32px 0 0",
            }}>
              Fitnara exists to connect every Indian with world-class fitness — gyms, yoga, pilates, crossfit, boxing, dance, swimming and beyond. One platform. All of India.
            </p>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "60px", alignItems: "center" }}>
            <div>
              <div className="accent-line" />
              <h2 className="section-title">Why <span style={{ color: "var(--lime)" }}>Fitnara?</span></h2>
            </div>
            <div>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: "1.8", margin: "0 0 20px" }}>
                India is one of the most fitness-conscious nations in the world — yet discovering the right fitness center near you remains frustratingly hard. Information is scattered, outdated or simply missing.
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: "1.8", margin: 0 }}>
                Fitnara is the single destination where you can find, compare and connect with every type of fitness center — from boutique yoga studios in Bengaluru to crossfit boxes in Delhi and boxing gyms in Mumbai.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Values */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: "60px" }}>
            <div className="accent-line" />
            <h2 className="section-title">What we <span style={{ color: "var(--lime)" }}>stand for</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {VALUES.map((v, i) => (
              <div key={v.title} className="card anim-fade-up" style={{ animationDelay: `${i * 0.1}s`, padding: "32px" }}>
                <div style={{ fontSize: "36px", marginBottom: "20px" }}>{v.icon}</div>
                <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "18px", margin: "0 0 12px", color: "var(--text-primary)" }}>
                  {v.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Stats */}
      <section className="section-sm" style={{ background: "linear-gradient(135deg, rgba(182,243,106,0.04) 0%, transparent 100%)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "40px", textAlign: "center" }}>
            {[
              ["500+", "Centers Listed"],
              ["50+", "Cities"],
              ["8", "Categories"],
              ["2025", "Founded"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="stat-num">{num}</div>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "8px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="accent-line" style={{ margin: "0 auto 16px" }} />
          <h2 className="section-title" style={{ marginBottom: "20px" }}>
            Ready to get <span style={{ color: "var(--lime)" }}>moving?</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "40px" }}>
            Discover fitness centers across India and start your journey today.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/explore" className="btn-primary" style={{ fontSize: "15px", padding: "16px 36px" }}>
              Explore Centers →
            </Link>
            <a href="mailto:hello@fitnara.in" className="btn-outline" style={{ fontSize: "15px", padding: "16px 36px" }}>
              List Your Center
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
