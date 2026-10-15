import './Services.css'

const services = [
  {
    title: 'Cut & Style',
    desc: 'Precision cuts and styling tailored to enhance your natural look.',
    img: 'https://images.unsplash.com/photo-1761839256791-6a93f89fb8b0?w=600&h=700&fit=crop',
  },
  {
    title: 'Color Services',
    desc: 'From balayage to bold transformations, color that turns heads.',
    img: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&h=700&fit=crop',
  },
  {
    title: 'Hair Treatments',
    desc: 'Deep conditioning and keratin treatments for healthy, glossy hair.',
    img: 'https://images.unsplash.com/photo-1602549179763-ce6c9df961b7?w=600&h=700&fit=crop',
  },
  {
    title: 'Extensions',
    desc: 'Premium extensions for added length, volume, and confidence.',
    img: 'https://images.unsplash.com/photo-1620939391250-eb822ac0818a?w=600&h=700&fit=crop',
  },
]

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services__header">
          <div>
            <p className="eyebrow">Our Services</p>
            <h2 className="section-title">Luxury Care For Every You</h2>
          </div>
          <a href="#services" className="text-link">
            View All Services
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="services__grid">
          {services.map((s, i) => (
            <div className="services__card animate-on-scroll" key={s.title} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="services__img-wrap">
                <img src={s.img} alt={s.title} />
              </div>
              <div className="services__body">
                <h3 className="services__title">{s.title}</h3>
                <p className="services__desc">{s.desc}</p>
                <a href="#book" className="text-link" onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
                }}>
                  Learn More
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
