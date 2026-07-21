import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, SITE } from "@/lib/data";
import styles from "./product.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== slug).slice(0, 3);
  const waMsg = `Hello! I'm interested in your ${product.name}. Please share more details and pricing.`;

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} style={{ "--accent-color": product.color } as React.CSSProperties}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/products">Products</Link>
            <span>›</span>
            <span>{product.name}</span>
          </nav>
          <div className={styles.heroIcon} style={{ background: `${product.color}25` }}>
            <span>{product.icon}</span>
          </div>
          <span className="section-label">{product.category}</span>
          <h1 className={styles.heroTitle}>{product.name}</h1>
          <p className={styles.heroTagline}>{product.tagline}</p>
          <div className={styles.heroCtas}>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-accent btn-lg`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enquire on WhatsApp
            </a>
            <Link href="/contact" className="btn btn-ghost-white btn-lg">Request a Quote</Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className={`section ${styles.contentSection}`}>
        <div className={`container ${styles.contentGrid}`}>
          {/* Left */}
          <div className={styles.mainContent}>
            <h2 className={styles.sectionHeading}>Overview</h2>
            <p className={styles.description}>{product.description}</p>

            <h2 className={styles.sectionHeading}>Key Features</h2>
            <ul className={styles.featureList}>
              {product.features.map((f) => (
                <li key={f} className={styles.featureItem}>
                  <span className={styles.featureCheck} style={{ background: product.color }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <h2 className={styles.sectionHeading}>Applications</h2>
            <div className={styles.applicationTags}>
              {product.applications.map((a) => (
                <span key={a} className={styles.appTag}>{a}</span>
              ))}
            </div>

          </div>

          {/* Right sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.enquiryCard}>
              <h3>Get a Quote</h3>
              <p>Contact our engineering team for pricing, technical specs and delivery timelines.</p>
              <div className={styles.enquiryMethods}>
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(waMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.waEnquiry}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
                <a href={`tel:${SITE.phone1}`} className={styles.callEnquiry}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M13.832 16.568a1 1 0 001.213-.303l.355-.465A2 2 0 0117 15h3a2 2 0 012 2v3a2 2 0 01-2 2A18 18 0 012 4a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-.8 1.6l-.468.351a1 1 0 00-.292 1.233 14 14 0 006.392 6.384" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {SITE.phone1Display}
                </a>
                <Link href="/contact" className={styles.formEnquiry}>
                  Contact Form →
                </Link>
              </div>
            </div>

            {/* Company info card */}
            <div className={styles.companyCard}>
              <div className={styles.companyCardIcon}>🏭</div>
              <div>
                <div className={styles.companyCardTitle}>Made in Bangalore</div>
                <div className={styles.companyCardText}>Designed, assembled & tested at our Begur facility.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className={`section ${styles.relatedSection}`}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Related Products</span>
              <h2 className="section-title">You May Also Be Interested In</h2>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className={styles.relatedCard}>
                  <span className={styles.relatedIcon}>{p.icon}</span>
                  <div>
                    <div className={styles.relatedName}>{p.name}</div>
                    <div className={styles.relatedCat}>{p.category}</div>
                  </div>
                  <span className={styles.relatedArrow}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
