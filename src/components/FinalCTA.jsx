import './FinalCTA.css'

export default function FinalCTA() {
  return (
    <section className="final-cta" id="book">
      <div className="container final-cta__container">
        <div className="final-cta__visual animate-on-scroll">
          <div className="final-cta__circle">
            <img
              src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=600&h=600&fit=crop"
              alt="Salon interior"
            />
          </div>
        </div>
        <div className="final-cta__content animate-on-scroll">
          <h2 className="section-title final-cta__title">
            Ready for Your<br />Best Hair?
          </h2>
          <p className="final-cta__text">
            Book your appointment today and experience the Lumière difference.
          </p>
          <a href="#contact" className="btn-primary" onClick={(e) => {
            e.preventDefault()
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Book Appointment
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
