import styles from './page.module.css';

export const metadata = {
  title: "Company Brochure | Sri Bhairaveshwara Power Control",
  description: "View and download our company profile and product brochure.",
};

export default function BrochurePage() {
  return (
    <main className={styles.main}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Company Brochure</h1>
          <p className={styles.subtitle}>
            Explore our comprehensive range of electrical control panels and automation solutions.
          </p>
          <a href="/brochure.pdf" download="SBPC_Brochure.pdf" className="btn btn-primary">
            Download Brochure
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15V3M12 15L8 11M12 15L16 11M21 21H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        
        <div className={styles.viewerContainer}>
          <iframe 
            src="/brochure.pdf#toolbar=0" 
            className={styles.viewer}
            title="Company Brochure"
          >
            <p>Your browser does not support PDFs. <a href="/brochure.pdf">Download the PDF</a>.</p>
          </iframe>
        </div>
      </div>
    </main>
  );
}
