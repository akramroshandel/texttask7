import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { properties } from '../data/properties.js'
import PropertyCard from './PropertyCard.jsx'
import './FeaturedProperties.css'

export default function FeaturedProperties() {
  const scrollRef = useRef(null)
  const featured = properties.filter((p) => p.featured)
  const display = [...featured, ...properties.filter((p) => !p.featured).slice(0, 4)]

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('.property-card')?.offsetWidth || 340
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: 'smooth' })
  }

  return (
    <section className="featured section" id="properties">
      <div className="container">
        <div className="featured__header">
          <div className="animate-on-scroll">
            <p className="eyebrow">Featured</p>
            <h2 className="section-title">Featured Properties</h2>
          </div>
          <div className="featured__nav">
            <button onClick={() => scroll(-1)} className="featured__arrow" aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
            </button>
            <button onClick={() => scroll(1)} className="featured__arrow" aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="featured__scroll-wrap">
        <div className="featured__scroll" ref={scrollRef}>
          {display.map((p, i) => (
            <div key={p.id} className="featured__card-wrap animate-on-scroll" style={{ transitionDelay: `${i * 0.06}s` }}>
              <PropertyCard property={p} variant={i === 0 ? 'featured' : 'default'} />
            </div>
          ))}
        </div>
      </div>

      <div className="container featured__bottom">
        <Link to="/properties" className="btn btn-outline-dark">
          View All Properties
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
