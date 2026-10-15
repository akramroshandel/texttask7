import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPropertyById, properties } from '../data/properties.js'
import PropertyCard from '../components/PropertyCard.jsx'
import './PropertyDetail.css'

export default function PropertyDetail() {
  const { id } = useParams()
  const property = getPropertyById(id)
  const [activeImg, setActiveImg] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [saved, setSaved] = useState(false)

  if (!property) {
    return (
      <div className="container" style={{ paddingTop: 140, textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 16 }}>Property not found</h2>
        <Link to="/properties" className="btn btn-navy">Back to Properties</Link>
      </div>
    )
  }

  const similar = properties.filter((p) => p.id !== property.id).slice(0, 3)

  return (
    <div className="property-detail">
      {/* Gallery */}
      <div className="property-detail__gallery">
        <div className="property-detail__main-img" onClick={() => setLightbox(true)}>
          <img src={property.gallery[activeImg]} alt={property.name} />
          <button className="property-detail__expand" aria-label="View fullscreen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
        </div>
        <div className="property-detail__thumbs">
          {property.gallery.map((img, i) => (
            <button
              key={i}
              className={`property-detail__thumb ${i === activeImg ? 'property-detail__thumb--active' : ''}`}
              onClick={() => setActiveImg(i)}
            >
              <img src={img} alt={`View ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      <div className="container property-detail__body">
        {/* Info */}
        <div className="property-detail__info">
          <div className="property-detail__header">
            <div>
              <span className="property-detail__type">{property.type}</span>
              <h1 className="property-detail__name">{property.name}</h1>
              <p className="property-detail__location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {property.location}
              </p>
            </div>
            <div className="property-detail__price-wrap">
              <span className="property-detail__price">{property.priceLabel}</span>
              <button
                className={`property-detail__save ${saved ? 'property-detail__save--active' : ''}`}
                onClick={() => setSaved(!saved)}
              >
                <svg viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
                  <path d="M20.8 5.6a5 5 0 00-7.1 0L12 7.3l-1.7-1.7a5 5 0 00-7.1 7.1L12 21.5l8.8-8.8a5 5 0 000-7.1z" />
                </svg>
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          <div className="property-detail__specs">
            <div className="property-detail__spec">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12h18M3 12v7h18v-7M7 12V9a2 2 0 012-2h6a2 2 0 012 2v3" /></svg>
              <span><strong>{property.beds}</strong> Bedrooms</span>
            </div>
            <div className="property-detail__spec">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2M5 6h14v6a7 7 0 01-14 0V6zM5 12v8h14v-8" /></svg>
              <span><strong>{property.baths}</strong> Bathrooms</span>
            </div>
            <div className="property-detail__spec">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3z M3 9h18 M9 3v18" /></svg>
              <span><strong>{property.sqft.toLocaleString()}</strong> Sq Ft</span>
            </div>
          </div>

          <div className="property-detail__section">
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>

          <div className="property-detail__section">
            <h3>Key Features</h3>
            <ul className="property-detail__features">
              {property.features.map((f) => (
                <li key={f}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="property-detail__section">
            <h3>Amenities</h3>
            <ul className="property-detail__features">
              {property.amenities.map((a) => (
                <li key={a}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="property-detail__sidebar">
          <div className="property-detail__agent-card">
            <h3>Interested in this property?</h3>
            <p>Contact our team to schedule a private viewing or request more information.</p>
            <div className="property-detail__agent">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&q=80" alt="Agent" />
              <div>
                <strong>Daniel Morgan</strong>
                <span>Managing Director</span>
              </div>
            </div>
            <a href="tel:5552467890" className="btn btn-navy property-detail__cta">Schedule a Viewing</a>
            <a href="mailto:info@horizonproperties.com" className="btn btn-outline-dark property-detail__cta">Contact Agent</a>
          </div>
        </aside>
      </div>

      {/* Similar properties */}
      <section className="property-detail__similar">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: 36 }}>Similar Properties</h2>
          <div className="property-detail__similar-grid">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="property-detail__lightbox" onClick={() => setLightbox(false)}>
          <button className="property-detail__lightbox-close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          <img src={property.gallery[activeImg]} alt={property.name} />
        </div>
      )}
    </div>
  )
}
