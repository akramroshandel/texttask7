import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/properties${query ? `?search=${encodeURIComponent(query)}` : ''}`)
  }

  return (
    <section className="hero">
      <div className="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?w=1920&h=1080&fit=crop&q=80"
          alt="Luxury modern architecture"
        />
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <p className="hero__eyebrow" style={{ animation: 'fadeInUp 0.8s ease forwards' }}>
          <span className="hero__eyebrow-line" /> Premium Real Estate
        </p>
        <h1 className="hero__title" style={{ animation: 'fadeInUp 0.8s 0.1s ease both' }}>
          Find a Place<br />You'll Love to Call Home
        </h1>
        <p className="hero__subtitle" style={{ animation: 'fadeInUp 0.8s 0.2s ease both' }}>
          Discover exceptional properties curated for those who appreciate
          quality, comfort, and timeless design.
        </p>

        <form className="hero__search" onSubmit={handleSearch} style={{ animation: 'fadeInUp 0.8s 0.3s ease both' }}>
          <div className="hero__search-field">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search by location, type, or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-gold hero__search-btn">
            Search
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
      </div>

      <div className="hero__scroll" style={{ animation: 'fadeIn 1s 0.6s ease both' }}>
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
