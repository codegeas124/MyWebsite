"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
        
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "6px",
            background: "var(--lime)", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: "16px", fontWeight: 900, color: "#080808", fontFamily: "var(--font-syne)" }}>F</span>
          </div>
          <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "18px", color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
            fitnara
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={`nav-link ${pathname === l.href ? "active" : ""}`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }} className="desktop-nav">
          <Link href="/explore" className="btn-primary" style={{ padding: "10px 20px", fontSize: "13px" }}>
            Find a Center →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            background: "none", border: "1px solid var(--border-hover)",
            borderRadius: "6px", padding: "8px 10px", cursor: "pointer",
            color: "var(--text-primary)", display: "none",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "rgba(8,8,8,0.98)", backdropFilter: "blur(20px)",
          borderTop: "1px solid var(--border)", padding: "20px 24px",
          display: "flex", flexDirection: "column", gap: "20px",
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`nav-link ${pathname === l.href ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: "16px" }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/explore" className="btn-primary" style={{ width: "fit-content" }} onClick={() => setMenuOpen(false)}>
            Find a Center →
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
