import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="contact">
      <div className="container footer__container">
        <div className="footer__col footer__col--brand">
          <div className="footer__logo">
            <span className="footer__logo-main">Lumière</span>
            <span className="footer__logo-sub">Hair Salon</span>
          </div>
          <p className="footer__tagline">Where beauty meets confidence.</p>
          <div className="footer__social">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M15 3h-3a4 4 0 00-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" aria-label="Pinterest">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7c-2 0-3.5 1.5-3.5 3.5 0 1 .5 2 1.5 2.5l-1.5 5 1 1 2-4c.5.2 1 .3 1.5.3 2 0 3.5-1.5 3.5-3.5S14 7 12 7z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) }}>Home</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}>Services</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}>About</a></li>
            <li><a href="#gallery" onClick={(e) => { e.preventDefault(); document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }) }}>Gallery</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>Contact</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Information</h4>
          <ul className="footer__links">
            <li><a href="#book">Book Appointment</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Care Tips</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Contact</h4>
          <ul className="footer__contact">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .8 2.9a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c1 .4 2 .7 2.9.8a2 2 0 011.7 2z" /></svg>
              <span>(555) 123-4567</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16v16H4z" /><path d="M4 4l8 8 8-8" /></svg>
              <span>hello@lumieresalon.com</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              <span>123 Beauty Avenue, New York, NY</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {year} Lumière Hair Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
