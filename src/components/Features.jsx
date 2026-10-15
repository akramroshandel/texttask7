import './Features.css'

const features = [
  {
    title: 'Premium Products',
    desc: 'We use only the finest, salon-grade products for your hair.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11z" />
        <path d="M12 22c-3 0-5-2-5-5" />
      </svg>
    ),
  },
  {
    title: 'Expert Stylists',
    desc: 'Our team brings years of experience and continuous training.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
        <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" />
      </svg>
    ),
  },
  {
    title: 'Personalized Care',
    desc: 'Every style is tailored to your face, lifestyle, and personality.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.8 5.6a5 5 0 00-7.1 0L12 7.3l-1.7-1.7a5 5 0 00-7.1 7.1L12 21.5l8.8-8.8a5 5 0 000-7.1z" />
      </svg>
    ),
  },
  {
    title: 'Easy Booking',
    desc: 'Schedule your appointment online in just a few clicks.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 3v4M16 3v4" />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section className="features">
      <div className="container">
        <div className="features__grid">
          {features.map((f, i) => (
            <div className="features__item animate-on-scroll" key={f.title} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="features__icon">{f.icon}</div>
              <h3 className="features__title">{f.title}</h3>
              <p className="features__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
