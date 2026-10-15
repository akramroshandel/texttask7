import './CTA.css'

export default function CTA() {
  return (
    <section className="cta-section section" id="contact">
      <div className="container">
        <div className="cta-section__inner animate-on-scroll">
          <div className="cta-section__visual">
            <div className="cta-section__circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
          </div>
          <div className="cta-section__content">
            <h2 className="section-title cta-section__title">
              Ready to Find Your<br />Perfect Property?
            </h2>
            <p className="cta-section__text">
              Let our experts guide you to the right home or investment.
            </p>
          </div>
          <div className="cta-section__action">
            <a href="tel:5552467890" className="btn btn-navy">
              Get in Touch
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
