"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE, PRODUCTS, WHY_US, CERTIFICATIONS } from "@/lib/data";
import styles from "./page.module.css";

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Animated Counter ── */
function Counter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numericTarget = parseInt(target.replace(/\D/g, ""), 10);
    if (isNaN(numericTarget)) { el.textContent = target; return; }
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * numericTarget) + (progress < 1 ? "" : suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { requestAnimationFrame(step); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix]);
  return <span ref={ref}>{target}</span>;
}

/* ── Reveal wrapper component (to avoid hooks-in-map) ── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── HERO SECTION ── */
function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <div className={styles.heroBgGradient} />
        <div className={styles.heroParticles}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.particle} style={{ animationDelay: `${i * 0.8}s`, left: `${10 + i * 15}%` }} />
          ))}
        </div>
      </div>

      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroLeft}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Bengaluru, India
          </div>

          <h1 className={styles.heroHeading}>
            Powering Industries with{" "}
            <span className={styles.heroAccent}>Reliable Electrical Control</span>{" "}
            Solutions
          </h1>

          <p className={styles.heroDesc}>
            Design, manufacture and commissioning of premium LT panels, motor control centres, APFC, PLC and automation systems — engineered for uptime.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/products" className="btn btn-white btn-lg">
              Explore Products
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" className="btn-arrow">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hello! I'd like to request a quote for electrical control panels.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-white btn-lg"
            >
              Request a Quote
            </a>
          </div>

          <div className={styles.heroCerts}>
            {CERTIFICATIONS.map((c) => (
              <div key={c} className={styles.heroCert}>{c}</div>
            ))}
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroLogoBox}>
            <svg viewBox="0 0 200 200" className={styles.heroGraphic} fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="100,10 185,55 185,145 100,190 15,145 15,55" stroke="rgba(245,158,11,0.6)" strokeWidth="3" fill="rgba(245,158,11,0.05)" />
              <polygon points="100,35 165,70 165,130 100,165 35,130 35,70" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="rgba(11,61,145,0.2)" />
              <path d="M100 10 L100 35 M15 55 L35 70 M185 55 L165 70 M15 145 L35 130 M185 145 L165 130 M100 190 L100 165" stroke="rgba(245,158,11,0.4)" strokeWidth="3" />
              <path d="M110 50 L75 110 L105 110 L90 150 L130 90 L100 90 Z" fill="var(--clr-accent)" />
            </svg>
            <div className={styles.heroLogoRing} />
            <div className={styles.heroLogoRing2} />
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}



/* ── ABOUT SECTION ── */
function AboutSection() {
  const leftRef = useReveal();
  const rightRef = useReveal();
  return (
    <section className={`section ${styles.aboutSection}`}>
      <div className="container">
        <div className={styles.aboutGrid}>
          <div ref={leftRef} className="reveal reveal-left">
            <span className="section-label">About the Company</span>
            <h2 className={`section-title ${styles.aboutTitle}`}>
              Engineered for Reliability.{" "}
              <span className="highlight">Built for Industry.</span>
            </h2>
            <p className={styles.aboutText}>
              Sri Bhairaveshwara Power Control is a specialist manufacturer of industrial electrical control panels and automation systems, located in <strong>Begur, Bangalore</strong>. From concept design to on-site commissioning, we deliver solutions that keep critical processes running.
            </p>
            <ul className={styles.aboutChecks}>
              {[
                "In-house design, fabrication, wiring and testing",
                "Compliant with IS 8623 / IEC 61439 standards",
                "Tailored solutions for power, process and infrastructure",
                "Over 20 years of manufacturing excellence",
              ].map((item) => (
                <li key={item} className={styles.checkItem}>
                  <span className={styles.checkIcon}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className={styles.aboutCtas}>
              <Link href="/about" className="btn btn-primary">
                About Us
                <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" className="btn-arrow">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </Link>
              <Link href="/contact" className="btn btn-outline">Get a Quote</Link>
            </div>
          </div>

          <div ref={rightRef} className={`reveal reveal-right ${styles.aboutImageArea}`}>
            {/* Logo card */}
            <div className={styles.aboutCircle}>
              <Image src="/logo.jpeg" alt="SBPC" width={80} height={80} className={styles.aboutCircleImg} />
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--clr-text)" }}>Sri Bhairaveshwara</div>
                <div style={{ fontSize: "0.75rem", color: "var(--clr-text-muted)", marginTop: "0.15rem" }}>Power Control</div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.6rem" }}>
                  {["ISO 9001", "BIS", "CPRI"].map((c) => (
                    <span key={c} style={{ fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.5rem", background: "var(--clr-primary-soft)", color: "var(--clr-primary)", borderRadius: "4px" }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Stat cards */}
            <div className={styles.aboutImgCardsRow}>
              {[
                { icon: "🏆", label: "Certifications", value: "ISO · BIS" },
                { icon: "🏭", label: "Location", value: "Bangalore" },
              ].map((item) => (
                <div key={item.label} className={styles.aboutImgCard}>
                  <div className={styles.aboutImgIcon}>{item.icon}</div>
                  <div>
                    <div className={styles.aboutImgLabel}>{item.label}</div>
                    <div className={styles.aboutImgValue}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PRODUCTS SECTION ── */
function ProductsSection() {
  const headerRef = useReveal();
  return (
    <section className={`section ${styles.productsSection}`}>
      <div className="container">
        <div ref={headerRef} className={`section-header center reveal`}>
          <span className="section-label">Our Products & Services</span>
          <h2 className="section-title">
            Solutions Across <span className="highlight">the Plant Floor</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive portfolio of electrical control panels and services — engineered, tested and delivered under one roof.
          </p>
        </div>

        <div className={styles.productsGrid}>
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 5) * 80}>
              <div className={`${styles.productCard} card`}>
                <Link href={`/products/${p.slug}`} className={styles.productLink}>
                  <div className={styles.productIconWrap} style={{ background: `${p.color}20` }}>
                    <span className={styles.productIcon}>{p.icon}</span>
                  </div>
                  <span className={styles.productBadge}>{p.category}</span>
                  <h3 className={styles.productName}>{p.name}</h3>
                  <p className={styles.productTagline}>{p.tagline}</p>
                  <span className={styles.productLearn}>
                    Learn more
                    <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" className="btn-arrow">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className={styles.productsViewAll}>
          <Link href="/products" className="btn btn-primary btn-lg">
            View All Products
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" className="btn-arrow">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── WHY US SECTION ── */
function WhyUsSection() {
  const headerRef = useReveal();
  return (
    <section className={`section ${styles.whySection}`}>
      <div className="container">
        <div ref={headerRef} className={`section-header center reveal`}>
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title" style={{ color: "white" }}>
            A Partner Your <span style={{ color: "var(--clr-accent)" }}>Operations Can Rely On</span>
          </h2>
        </div>

        <div className={styles.whyGrid}>
          {WHY_US.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 100}>
              <div className={`${styles.whyCard} card`}>
                <div className={styles.whyIcon}>{item.icon}</div>
                <h3 className={styles.whyTitle}>{item.title}</h3>
                <p className={styles.whyDesc}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA BANNER ── */
function CtaBanner() {
  const ref = useReveal();
  return (
    <section className={`section ${styles.ctaSection}`}>
      <div className="container">
        <div ref={ref} className={`reveal ${styles.ctaBox}`}>
          <div className={styles.ctaBg} />
          <div className={styles.ctaContent}>
            <div className={styles.ctaLeft}>
              <h2 className={styles.ctaTitle}>Have a Project in Mind?<br />Let's Engineer It Together.</h2>
              <p className={styles.ctaDesc}>Share your requirements — our engineering team will get back within 24 hours with a tailored proposal.</p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn btn-white btn-lg">
                Talk to an Engineer
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" className="btn-arrow">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </Link>
              <Link href="/products" className="btn btn-ghost-white btn-lg">View Catalogue</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PAGE EXPORT ── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProductsSection />
      <WhyUsSection />
      <CtaBanner />
    </>
  );
}
