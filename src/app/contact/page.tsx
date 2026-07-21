"use client";
import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/data";
import styles from "./contact.module.css";

function QuoteForm() {
  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "", product: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const products = [
    "APFC Panel", "Auto Synchronizing Panels", "MCC Panels", "PCC Panel",
    "AMF Panel", "Power Distribution Boards", "Bus Ducts & Others",
    "LT Metering Panel", "Feeder Pillar Panels", "E-House", "Other / Custom",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message
    const msg = [
      `🔌 *New Enquiry — Sri Bhairaveshwara Power Control*`,
      ``,
      `👤 *Name:* ${form.name}`,
      form.company ? `🏢 *Company:* ${form.company}` : "",
      `📞 *Phone:* ${form.phone}`,
      form.email ? `✉️ *Email:* ${form.email}` : "",
      form.product ? `⚡ *Product:* ${form.product}` : "",
      form.message ? `💬 *Message:* ${form.message}` : "",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.successBox}>
        <div className={styles.successIcon}>✅</div>
        <h3>Message Sent to WhatsApp!</h3>
        <p>WhatsApp has opened with your enquiry pre-filled. Our team will respond promptly.</p>
        <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="company" className={styles.label}>Company / Organization</label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Company name (optional)"
            value={form.company}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>Phone Number *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+91 XXXXX XXXXX"
            value={form.phone}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="product" className={styles.label}>Product / Service Required</label>
        <select
          id="product"
          name="product"
          value={form.product}
          onChange={handleChange}
          className={styles.input}
        >
          <option value="">Select a product...</option>
          {products.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>Your Requirements / Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Describe your requirements, specifications, quantity, or any other details..."
          value={form.message}
          onChange={handleChange}
          className={`${styles.input} ${styles.textarea}`}
        />
      </div>

      <button type="submit" className={`btn btn-accent btn-lg ${styles.submitBtn}`} disabled={!form.name || !form.phone}>
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Send Quote Request via WhatsApp
      </button>

      <p className={styles.formNote}>
        Your details will be sent directly to our WhatsApp for a quick response. We respond within 2-4 hours during business hours.
      </p>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Contact Us</span>
          </nav>
          <span className="section-label">Get In Touch</span>
          <h1 className={styles.heroTitle}>
            Let's Build Something<br />
            <span className={styles.accent}>Great Together</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Share your requirements with us. Our engineering team typically responds within 24 hours with a detailed proposal.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className={`section ${styles.mainSection}`}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Contact form */}
            <div className={styles.formSection}>
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <h2>Request a Quote</h2>
                  <p>Fill in your details and we'll send your enquiry directly to our WhatsApp</p>
                </div>
                <QuoteForm />
              </div>
            </div>

            {/* Contact info */}
            <div className={styles.infoSection}>
              {/* Address card */}
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📍</div>
                <div>
                  <h3 className={styles.infoTitle}>Our Workshop & Office</h3>
                  <address className={styles.infoText} style={{ fontStyle: "normal" }}>
                    {SITE.address.split("\n").map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </address>
                  <a
                    href="https://www.google.com/maps/place/12%C2%B050'28.8%22N+77%C2%B036'51.3%22E/@12.8413439,77.6116829,17z/data=!3m1!4b1!4m4!3m3!8m2!3d12.8413439!4d77.6142578?hl=en&entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapLink}
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              {/* Phone cards */}
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📞</div>
                <div>
                  <h3 className={styles.infoTitle}>Call Us</h3>
                  <div className={styles.phones}>
                    <a href={`tel:${SITE.phone1}`} className={styles.phoneLink}>{SITE.phone1Display}</a>
                    <a href={`tel:${SITE.phone2}`} className={styles.phoneLink}>{SITE.phone2Display}</a>
                  </div>
                </div>
              </div>

              {/* Email card */}
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>✉️</div>
                <div>
                  <h3 className={styles.infoTitle}>Email Us</h3>
                  <a href={`mailto:${SITE.email}`} className={styles.emailLink}>{SITE.email}</a>
                </div>
              </div>

              {/* WhatsApp card */}
              <div className={styles.waCard}>
                <div className={styles.waCardHeader}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <div>
                    <div className={styles.waTitle}>Instant WhatsApp</div>
                    <div className={styles.waNumber}>{SITE.phone1Display}</div>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.waBtn}
                >
                  Start Chat
                </a>
              </div>

              {/* Business hours */}
              <div className={styles.hoursCard}>
                <h3 className={styles.hoursTitle}>Business Hours</h3>
                <div className={styles.hoursList}>
                  <div className={styles.hoursRow}><span>Monday – Saturday</span><span className={styles.hoursTime}>9:00 AM – 6:00 PM</span></div>
                  <div className={styles.hoursRow}><span>Sunday</span><span className={styles.hoursClosed}>Closed</span></div>
                </div>
                <p className={styles.hoursNote}>WhatsApp responses available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className={styles.mapSection}>
        <div className={styles.mapOverlay}>
          <div className={styles.mapLabel}>
            <span>📍</span>
            <div>
              <div className={styles.mapLabelTitle}>Sri Bhairaveshwara Power Control</div>
              <div className={styles.mapLabelAddr}>Begur, Bangalore - 560068</div>
            </div>
            <a
              href="https://www.google.com/maps/place/12%C2%B050'28.8%22N+77%C2%B036'51.3%22E/@12.8413439,77.6116829,17z/data=!3m1!4b1!4m4!3m3!8m2!3d12.8413439!4d77.6142578?hl=en&entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Get Directions
            </a>
          </div>
        </div>
        <iframe
          src="https://maps.google.com/maps?q=12.8413439,77.6142578&output=embed&z=17"
          width="100%"
          height="400"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Sri Bhairaveshwara Power Control Location"
        />
      </section>
    </>
  );
}
