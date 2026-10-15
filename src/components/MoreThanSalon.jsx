import './MoreThanSalon.css'

export default function MoreThanSalon() {
  return (
    <section className="more-than" id="about">
      <div className="more-than__bg">
        <div className="more-than__bg-left" />
        <div className="more-than__bg-right" />
      </div>
      <div className="container more-than__container">
        <div className="more-than__visual animate-on-scroll">
          <div className="more-than__circle">
            <div className="more-than__circle-left">
              <div className="more-than__circle-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11z" />
                </svg>
              </div>
              <p className="more-than__circle-text">Your<br />Glow</p>
            </div>
            <div className="more-than__circle-right">
              <img
                src="https://images.unsplash.com/photo-1695527081848-1e46c06e6458?w=500&h=500&fit=crop"
                alt="Salon interior"
              />
            </div>
          </div>
        </div>

        <div className="more-than__content animate-on-scroll">
          <p className="eyebrow">More Than a Salon</p>
          <h2 className="section-title more-than__title">
            It's Your Time.<br />It's Your Glow.
          </h2>
          <p className="more-than__text">
            Lumière is more than a place to get your hair done — it's a sanctuary
            where you can unwind, recharge, and leave feeling like the best version
            of yourself. Our space is designed for comfort, our team for excellence,
            and our mission for your confidence.
          </p>
          <a href="#about" className="text-link more-than__link">
            Our Story
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
