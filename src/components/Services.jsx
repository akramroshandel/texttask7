import './Services.css'

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    title: 'Property Buying',
    desc: 'Find your dream home with our curated portfolio of premium residences and investment properties.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
        <path d="M12 2v6" />
      </svg>
    ),
    title: 'Property Selling',
    desc: 'Maximize your property value with expert market analysis, staging advice, and targeted marketing.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: 'Investment Advisory',
    desc: 'Strategic guidance on real estate investments, portfolio diversification, and market opportunities.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Property Management',
    desc: 'Comprehensive management services for your properties, from tenant relations to maintenance.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6M3 7a2 2 0 012-2h14a2 2 0 012 2" />
      </svg>
    ),
    title: 'Mortgage Consultation',
    desc: 'Navigate financing options with our network of trusted lenders and tailored mortgage solutions.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Property Valuation',
    desc: 'Accurate, data-driven property assessments to help you make informed buying or selling decisions.',
  },
]

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="services__header animate-on-scroll">
          <p className="eyebrow">What We Do</p>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle services__subtitle">
            From finding the perfect property to managing your investment,
            we offer a full spectrum of real estate services.
          </p>
        </div>

        <div className="services__grid">
          {services.map((s, i) => (
            <div
              className="services__card animate-on-scroll"
              key={s.title}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="services__icon">{s.icon}</div>
              <h3 className="services__card-title">{s.title}</h3>
              <p className="services__card-desc">{s.desc}</p>
              <span className="services__link">
                Learn More
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
