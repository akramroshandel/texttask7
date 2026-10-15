import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero__container">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">Where Confidence Blossoms</p>
          <h1 className="hero__title">
            Healthy Hair.<br />
            Beautiful You.<br />
            Every Day.
          </h1>
          <p className="hero__text">
            At Lumière, we believe every visit is a moment of transformation.
            Our expert stylists craft looks that celebrate your natural beauty,
            using premium products and personalized care.
          </p>
          <a href="#book" className="btn-primary hero__btn" onClick={(e) => {
            e.preventDefault()
            document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Book Your Experience
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <div className="hero__social">
            <div className="hero__avatars">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="Client" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" alt="Client" />
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face" alt="Client" />
            </div>
            <div className="hero__social-text">
              <div className="hero__stars">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <p>Loved by 500+ clients</p>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-wrap">
            <img
              src="https://images.unsplash.com/photo-1560869713-7d0a29430803?w=900&h=1000&fit=crop"
              alt="Stylist working on client's hair"
              className="hero__image"
            />
            <div className="hero__badge">
              <svg viewBox="0 0 200 200" className="hero__badge-svg">
                <defs>
                  <path id="circlePath" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                </defs>
                <text className="hero__badge-text">
                  <textPath href="#circlePath">
                    Lumière • Premium Hair Care • Since 2010 •
                  </textPath>
                </text>
              </svg>
              <div className="hero__badge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L9 7l-5 .5 3.5 3.5L6 16l6-3 6 3-1.5-5L20 7.5 15 7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
