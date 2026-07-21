import Link from "next/link";
import Image from "next/image";
import { SITE, PRODUCTS } from "@/lib/data";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMsg)}`;

  return (
    <footer className={styles.footer}>
      {/* Main footer */}
      <div className={styles.main}>
        <div className={`container ${styles.grid}`}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoWrap}>
              <div className={styles.logoIcon}>
                <Image src="/logo.jpeg" alt="SBPC Logo" width={40} height={40} />
              </div>
              <div>
                <div className={styles.logoName}>SRI BHAIRAVESHWARA</div>
                <div className={styles.logoSub}>POWER CONTROL</div>
              </div>
            </div>
            <p className={styles.tagline}>
              Engineering trusted electrical control solutions for industries — from panels to plant-scale automation.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.links}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/brochure">Brochure</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Products</h4>
            <ul className={styles.links}>
              {PRODUCTS.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
              <li><Link href="/products" className={styles.viewAll}>View All →</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact Us</h4>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactIcon}>📍</span>
                <span>{SITE.address}</span>
              </li>
              <li>
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <a href={`tel:${SITE.phone1}`}>{SITE.phone1Display}</a>
                  <br />
                  <a href={`tel:${SITE.phone2}`}>{SITE.phone2Display}</a>
                </div>
              </li>
              <li>
                <span className={styles.contactIcon}>✉️</span>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            </ul>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p>© {year} Sri Bhairaveshwara Power Control. All rights reserved.</p>
          <p>Engineered for reliability. Built for industry.</p>
        </div>
      </div>
    </footer>
  );
}
