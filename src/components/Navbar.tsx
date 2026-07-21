"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE, PRODUCTS } from "@/lib/data";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300); // 300ms delay to give user time to move cursor
  };

  const closeAll = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.nav}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={closeAll}>
            <div className={styles.logoIcon}>
              <Image src="/logo.jpeg" alt="Sri Bhairaveshwara Power Control Logo" width={40} height={40} priority />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>SRI BHAIRAVESHWARA</span>
              <span className={styles.logoSub}>POWER CONTROL</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/about" className={styles.navLink}>About</Link>

            {/* Products Dropdown */}
            <div
              className={styles.dropdown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`${styles.navLink} ${styles.dropdownTrigger}`} aria-expanded={dropdownOpen}>
                Products & Services
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ""}`}>
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`${styles.dropdownMenu} ${dropdownOpen ? styles.dropdownOpen : ""}`}>
                <div className={styles.dropdownGrid}>
                  {PRODUCTS.map((p) => (
                    <Link key={p.slug} href={`/products/${p.slug}`} className={styles.dropdownItem} onClick={closeAll}>
                      <span className={styles.dropdownIcon}>{p.icon}</span>
                      <div>
                        <div className={styles.dropdownName}>{p.name}</div>
                        <div className={styles.dropdownCategory}>{p.category}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className={styles.dropdownFooter}>
                  <Link href="/products" className={styles.dropdownAll} onClick={closeAll}>
                    View All Products →
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/gallery" className={styles.navLink}>Gallery</Link>
            <Link href="/brochure" className={styles.navLink}>Brochure</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
          </nav>

          {/* Desktop CTA */}
          <div className={styles.desktopCta}>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-accent btn-sm ${styles.whatsappCta}`}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="btn btn-primary btn-sm">
              Get a Quote
              <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" className="btn-arrow">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </Link>
          </div>

          {/* Mobile Burger */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileOverlay} ${menuOpen ? styles.mobileOpen : ""}`} onClick={closeAll} />

      {/* Mobile Drawer */}
      <nav className={`${styles.mobileDrawer} ${menuOpen ? styles.drawerOpen : ""}`} aria-label="Mobile navigation">
        <div className={styles.drawerHeader}>
          <Link href="/" className={styles.logo} onClick={closeAll}>
            <div className={styles.logoIcon}>
              <Image src="/logo.jpeg" alt="Logo" width={36} height={36} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>SRI BHAIRAVESHWARA</span>
              <span className={styles.logoSub}>POWER CONTROL</span>
            </div>
          </Link>
          <button className={styles.drawerClose} onClick={closeAll} aria-label="Close menu">✕</button>
        </div>

        <ul className={styles.mobileLinks}>
          <li><Link href="/" onClick={closeAll} className={styles.mobileLink}>Home</Link></li>
          <li><Link href="/about" onClick={closeAll} className={styles.mobileLink}>About Us</Link></li>
          <li>
            <button
              className={`${styles.mobileLink} ${styles.mobileAccordion}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Products & Services
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={dropdownOpen ? styles.chevronOpen : ""}>
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {dropdownOpen && (
              <ul className={styles.mobileSubmenu}>
                {PRODUCTS.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`} onClick={closeAll} className={styles.mobileSubLink}>
                      <span>{p.icon}</span> {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li><Link href="/gallery" onClick={closeAll} className={styles.mobileLink}>Gallery</Link></li>
          <li><Link href="/brochure" onClick={closeAll} className={styles.mobileLink}>Brochure</Link></li>
          <li><Link href="/contact" onClick={closeAll} className={styles.mobileLink}>Contact Us</Link></li>
        </ul>

        <div className={styles.drawerCta}>
          <Link href="/contact" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={closeAll}>
            Get a Free Quote
          </Link>
          <a
            href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-accent ${styles.whatsappBtn}`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      </nav>
    </>
  );
}
