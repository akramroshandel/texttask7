import './WhyChoose.css'

const stats = [
  { value: '500+', label: 'Properties Sold' },
  { value: '15', label: 'Years Experience' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '$2B+', label: 'In Sales Volume' },
]

const reasons = [
  { title: 'Curated Selection', desc: 'Every property is hand-picked for quality, location, and investment potential.' },
  { title: 'Expert Guidance', desc: 'Our advisors bring decades of experience in luxury real estate markets.' },
  { title: 'Transparent Process', desc: 'Clear communication and honest advice from first viewing to closing day.' },
  { title: 'Global Network', desc: 'Connected to buyers, sellers, and partners across international markets.' },
]

export default function WhyChoose() {
  return (
    <section className="why-choose section">
      <div className="container">
        <div className="why-choose__header animate-on-scroll">
          <p className="eyebrow">Why Horizon</p>
          <h2 className="section-title">A Different Standard of Service</h2>
        </div>

        <div className="why-choose__stats animate-on-scroll">
          {stats.map((s) => (
            <div key={s.label} className="why-choose__stat">
              <span className="why-choose__stat-value">{s.value}</span>
              <span className="why-choose__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="why-choose__grid">
          {reasons.map((r, i) => (
            <div className="why-choose__item animate-on-scroll" key={r.title} style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="why-choose__check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="why-choose__item-title">{r.title}</h3>
              <p className="why-choose__item-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
