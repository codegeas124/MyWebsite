import Link from "next/link"

export default function Footer() {
  const categories = ["Gym", "Yoga", "Pilates", "CrossFit", "Zumba", "Boxing", "Swimming", "Dance"]
  const cities = ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad"]

  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: "80px" }}>
      {/* CTA Banner */}
      <div style={{
        background: "linear-gradient(135deg, rgba(182,243,106,0.08) 0%, rgba(182,243,106,0.02) 100%)",
        borderBottom: "1px solid var(--border)",
        padding: "60px 0",
      }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          <div>
            <div className="accent-line" />
            <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(24px, 4vw, 40px)", letterSpacing: "-1px", margin: "0 0 8px" }}>
              Own a fitness center?
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", margin: 0 }}>
              List your space on Fitnara and reach thousands of fitness seekers across India.
            </p>
          </div>
          <a href="mailto:hello@fitnara.in" className="btn-primary">
            List Your Center →
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="container" style={{ padding: "60px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "40px", marginBottom: "48px" }}>
          
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "5px", background: "var(--lime)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: 900, color: "#080808", fontFamily: "var(--font-syne)" }}>F</span>
              </div>
              <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "16px", color: "var(--text-primary)" }}>fitnara</span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "13px", lineHeight: "1.6", margin: "0 0 20px" }}>
              Making India fit — one center at a time.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {["𝕏", "ig", "in"].map(s => (
                <div key={s} style={{
                  width: "32px", height: "32px", borderRadius: "6px",
                  border: "1px solid var(--border-hover)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", color: "var(--text-muted)", cursor: "pointer",
                  transition: "all 0.2s",
                }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <p style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>
              Categories
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {categories.map(c => (
                <Link key={c} href={`/explore?category=${c.toLowerCase()}`} className="footer-link">{c}</Link>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div>
            <p style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>
              Cities
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {cities.map(c => (
                <Link key={c} href={`/explore?city=${c.toLowerCase()}`} className="footer-link">{c}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>
              Company
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[["About", "/about"], ["Explore", "/explore"], ["Contact", "mailto:hello@fitnara.in"]].map(([label, href]) => (
                <Link key={label} href={href} className="footer-link">{label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="divider" />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", paddingTop: "24px", gap: "12px" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "13px", margin: 0 }}>
            © 2025 Fitnara. Making India Fit.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "13px", margin: 0 }}>
            Built with ❤️ for India
          </p>
        </div>
      </div>
    </footer>
  )
}
