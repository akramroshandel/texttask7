import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = ['Home', 'Services', 'About', 'Gallery', 'Book', 'Contact']

  const handleNavClick = (e, link) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.getElementById(link.toLowerCase())
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#home" className="navbar__logo" onClick={(e) => handleNavClick(e, 'home')}>
          <span className="navbar__logo-main">Lumière</span>
          <span className="navbar__logo-sub">Hair Salon</span>
        </a>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#book"
            className="btn-primary navbar__cta-mobile"
            onClick={(e) => handleNavClick(e, 'book')}
          >
            Book Appointment
          </a>
        </nav>

        <a
          href="#book"
          className="btn-primary navbar__cta"
          onClick={(e) => handleNavClick(e, 'book')}
        >
          Book Appointment
        </a>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
