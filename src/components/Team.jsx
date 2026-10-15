import './Team.css'

const team = [
  {
    name: 'Daniel Morgan',
    role: 'Managing Director',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&q=80',
  },
  {
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face&q=80',
  },
  {
    name: 'James Wilson',
    role: 'Investment Consultant',
    img: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face&q=80',
  },
  {
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face&q=80',
  },
]

export default function Team() {
  return (
    <section className="team section" id="team">
      <div className="container">
        <div className="team__header animate-on-scroll">
          <p className="eyebrow">Our Team</p>
          <h2 className="section-title">Meet the Experts</h2>
          <p className="section-subtitle team__subtitle">
            A dedicated team of professionals committed to making your property
            journey exceptional.
          </p>
        </div>

        <div className="team__grid">
          {team.map((member, i) => (
            <div className="team__card animate-on-scroll" key={member.name} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="team__img-wrap">
                <img src={member.img} alt={member.name} loading="lazy" />
                <div className="team__overlay">
                  <div className="team__socials">
                    <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.3 18.3V10H5.7v8.3h2.6zM7 8.8a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11.3 9.5v-4.6c0-2.5-1.3-3.6-3.1-3.6-1.4 0-2 .8-2.4 1.3V10h-2.6v8.3h2.6v-4.4c0-1.2.8-1.8 1.6-1.8s1.5.5 1.5 1.8v4.4h2.4z" /></svg></a>
                    <a href="#" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16v16H4z" /><path d="M4 4l8 8 8-8" /></svg></a>
                    <a href="#" aria-label="Phone"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .8 2.9a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c1 .4 2 .7 2.9.8a2 2 0 011.7 2z" /></svg></a>
                  </div>
                </div>
              </div>
              <h3 className="team__name">{member.name}</h3>
              <p className="team__role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
