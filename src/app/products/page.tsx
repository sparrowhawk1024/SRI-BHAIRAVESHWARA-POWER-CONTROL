import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
import styles from "./products.module.css";

export const metadata: Metadata = {
  title: "Products & Services",
  description: "Explore our complete range of electrical control panels — MCC, PCC, AMF, APFC, E-House, Feeder Pillars and more. Engineered for reliability in Bangalore.",
};

export default function ProductsPage() {
  const categories = [...new Set(PRODUCTS.map((p) => p.category))];

  return (
    <>
      {/* Page Header */}
      <section className={styles.pageHero}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Products & Services</span>
          </nav>
          <span className="section-label">Our Products & Services</span>
          <h1 className={styles.pageTitle}>
            Complete Range of<br />
            <span className="highlight">Electrical Control Panels</span>
          </h1>
          <p className={styles.pageSubtitle}>
            From Motor Control Centres to E-Houses — every panel we manufacture is engineered, tested and delivered to the highest standards.
          </p>
        </div>
      </section>

      {/* Products by Category */}
      {categories.map((cat) => (
        <section key={cat} className={styles.categorySection}>
          <div className="container">
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{cat}</h2>
              <div className={styles.categoryLine} />
            </div>
            <div className={styles.productsGrid}>
              {PRODUCTS.filter((p) => p.category === cat).map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`} className={styles.productCard}>
                  {(product as { image?: string }).image ? (
                    <div className={styles.cardImageBanner}>
                      <Image
                        src={(product as { image?: string }).image!}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={styles.cardBannerImg}
                      />
                      <div className={styles.cardImageOverlay} />
                    </div>
                  ) : (
                    <div className={styles.cardIcon} style={{ background: `${product.color}18` }}>
                      <span className={styles.cardIconEmoji}>{product.icon}</span>
                    </div>
                  )}
                  <div className={styles.cardBody}>
                    <span className={styles.cardBadge}>{product.category}</span>
                    <h3 className={styles.cardName}>{product.name}</h3>
                    <p className={styles.cardTagline}>{product.tagline}</p>
                    <ul className={styles.cardFeatures}>
                      {product.features.slice(0, 3).map((f) => (
                        <li key={f}>
                          <span className={styles.featureDot} style={{ background: product.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardLearn}>View Details →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Can't Find What You're Looking For?</h2>
            <p>We offer custom panel solutions tailored to your exact requirements. Get in touch with our engineering team.</p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn btn-white btn-lg">
                Contact Us
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" className="btn-arrow">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </Link>
              <a
                href="https://wa.me/919986418219?text=Hello!%20I%20need%20a%20custom%20panel%20solution."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-white btn-lg"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
