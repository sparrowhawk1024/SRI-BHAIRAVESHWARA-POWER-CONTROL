"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./gallery.module.css";

const GALLERY_ITEMS = [
  { id: 1, title: "MCC Panel", category: "Motor Control", src: "/MCC pannel.jpeg" },
  { id: 2, title: "Industrial Control Panel", category: "Power Distribution", src: "/industry controle panel.jpeg" },
  { id: 3, title: "PLC Automation System", category: "Automation", src: "/plc panel.jpeg" },
  { id: 4, title: "HT Switchgear", category: "Power Distribution", src: "/HT switch gear.jpg" },
  { id: 5, title: "APFC Panel", category: "Power Quality", src: "/APFC panel.jpeg" },
  { id: 6, title: "Power Distribution Board", category: "Power Distribution", src: "/-Power-Distribution-Board.jpg" },
  { id: 7, title: "Bus Ducts", category: "Power Distribution", src: "/Bus_Ducts_.jpg" },
  { id: 8, title: "Feeder Pillar Panel", category: "Power Distribution", src: "/feeder pillar.jpg" },
  { id: 9, title: "E-House", category: "Specialized", src: "/E-House.jpeg" },
  { id: 10, title: "LT Metering Panel", category: "Metering", src: "/lt meyeering panel.jpg" },
];

const CATEGORIES = ["All", ...new Set(GALLERY_ITEMS.map((g) => g.category))];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.category === activeCategory);

  const currentItem = lightbox !== null ? GALLERY_ITEMS.find((g) => g.id === lightbox) : null;

  const navigate = (dir: 1 | -1) => {
    if (lightbox === null) return;
    const idx = filtered.findIndex((g) => g.id === lightbox);
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    setLightbox(next.id);
  };

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
          background: "radial-gradient(ellipse 70% 60% at 80% 40%, rgba(11,61,145,0.35) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.55)" }}>Home</Link>
            <span>›</span>
            <span>Gallery</span>
          </nav>
          <span className="section-label">Our Work</span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginTop: "0.75rem" }}>
            Project Gallery &<br />
            <span style={{ color: "var(--clr-accent)" }}>Manufacturing Showcase</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", maxWidth: "520px", lineHeight: 1.8, marginTop: "1rem" }}>
            A visual showcase of our electrical control panels, automation systems and completed installations.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <div className="container">
          {/* Filter tabs */}
          <div className={styles.filterTabs}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className={styles.galleryGrid}>
            {filtered.map((item) => (
              <button
                key={item.id}
                className={styles.galleryItem}
                onClick={() => setLightbox(item.id)}
                aria-label={`View ${item.title}`}
              >
                <div className={styles.galleryImg}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.img}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  <div className={styles.galleryFallback}>
                    <span>📸</span>
                    <span>{item.title}</span>
                  </div>
                </div>
                <div className={styles.galleryOverlay}>
                  <div className={styles.overlayIcon}>🔍</div>
                  <div className={styles.overlayTitle}>{item.title}</div>
                  <div className={styles.overlayCategory}>{item.category}</div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem", color: "var(--clr-text-muted)" }}>
              No items found in this category.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--clr-bg-alt)", borderTop: "1px solid var(--clr-border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">Interested in Our Work?</h2>
          <p style={{ color: "var(--clr-text-muted)", marginTop: "0.875rem", marginBottom: "2rem", maxWidth: "480px", marginInline: "auto" }}>
            Contact us today to discuss your electrical panel requirements and get a tailored quotation.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary btn-lg">Request a Quote</Link>
            <Link href="/products" className="btn btn-outline btn-lg">View Products</Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {currentItem && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
          <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={(e) => { e.stopPropagation(); navigate(-1); }}>‹</button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImg}>
              <Image src={currentItem.src} alt={currentItem.title} fill className={styles.img} />
              <div className={styles.galleryFallback}>
                <span style={{ fontSize: "4rem" }}>📸</span>
                <span style={{ fontSize: "1.2rem" }}>{currentItem.title}</span>
              </div>
            </div>
            <div className={styles.lightboxInfo}>
              <div className={styles.lightboxBadge}>{currentItem.category}</div>
              <h3 className={styles.lightboxTitle}>{currentItem.title}</h3>
            </div>
          </div>
          <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={(e) => { e.stopPropagation(); navigate(1); }}>›</button>
        </div>
      )}
    </>
  );
}
