import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE, CERTIFICATIONS, WHY_US } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Sri Bhairaveshwara Power Control — a leading manufacturer of electrical control panels in Bangalore with over 20 years of engineering excellence.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        background: "var(--clr-dark)",
        padding: "clamp(5rem, 10vh, 8rem) 0 clamp(3rem, 6vh, 5rem)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(11,61,145,0.35) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.55)" }}>Home</Link>
            <span>›</span>
            <span>About Us</span>
          </nav>
          <span className="section-label">Our Story</span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginTop: "0.75rem", lineHeight: 1.15 }}>
            Built on Trust,<br />
            <span style={{ color: "var(--clr-accent)" }}>Engineered for Excellence</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", maxWidth: "560px", lineHeight: 1.8, marginTop: "1rem" }}>
            Sri Bhairaveshwara Power Control has been a trusted manufacturer of industrial electrical control panels in Bangalore.
          </p>
        </div>
      </section>

      {/* About content */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <span className="section-label">Who We Are</span>
              <h2 className="section-title" style={{ marginTop: "0.75rem" }}>
                Sri Bhairaveshwara<br />
                <span className="highlight">Power Control</span>
              </h2>
              <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p style={{ fontSize: "1rem", color: "var(--clr-text-muted)", lineHeight: 1.85 }}>
                  <strong>Sri Bhairaveshwara Power Control</strong> is one of the leading manufacturers of electrical control panels in Bangalore. We specialize in the design, manufacture and commissioning of MCC, PCC, AMF, APFC panels, E-House containers, synchronizing panels, LT panels and switchboards.
                </p>
                <p style={{ fontSize: "1rem", color: "var(--clr-text-muted)", lineHeight: 1.85 }}>
                  Located at <strong>Begur, Bangalore</strong>, our facility houses an experienced team of engineers and highly skilled technicians who bring decades of combined expertise to every project. We serve medium and major industries, institutions, and commercial establishments across Karnataka and beyond.
                </p>
                <p style={{ fontSize: "1rem", color: "var(--clr-text-muted)", lineHeight: 1.85 }}>
                  Our in-house manufacturing process — from design and fabrication to wiring, testing and commissioning — ensures complete quality control at every stage. Every panel we deliver meets IS/IEC standards and comes with full test documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section" style={{ background: "var(--clr-bg-alt)" }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Our Strengths</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {WHY_US.map((w) => (
              <div key={w.title} className="card" style={{ padding: "1.75rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{w.icon}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{w.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--clr-text-muted)", lineHeight: 1.7 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Standards & Certifications</span>
            <h2 className="section-title">
              Quality You Can <span className="highlight">Rely On</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
            {CERTIFICATIONS.map((c) => (
              <div key={c} style={{
                padding: "1.25rem 2rem",
                background: "var(--clr-primary-soft)",
                border: "1px solid rgba(11,61,145,0.15)",
                borderRadius: "var(--radius-lg)",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "var(--clr-primary)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                🏆 {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--clr-bg-alt)" }}>
        <div className="container">
          <div style={{
            background: "var(--grad-primary)",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(2.5rem, 5vw, 4rem)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "white", marginBottom: "0.875rem" }}>
              Ready to Work with Us?
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", marginBottom: "2rem", maxWidth: "480px", marginInline: "auto" }}>
              Contact our team today to discuss your electrical control panel requirements.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact" className="btn btn-white btn-lg">
                Get In Touch
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" className="btn-arrow">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </Link>
              <Link href="/products" className="btn btn-ghost-white btn-lg">View Products</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
