import { Link } from 'react-router-dom'
import './PropertyCard.css'

export default function PropertyCard({ property, variant = 'default' }) {
  return (
    <Link to={`/properties/${property.id}`} className={`property-card property-card--${variant}`}>
      <div className="property-card__img-wrap">
        <img src={property.image} alt={property.name} loading="lazy" />
        <span className="property-card__type">{property.type}</span>
        <button
          className="property-card__fav"
          onClick={(e) => { e.preventDefault(); e.currentTarget.classList.toggle('property-card__fav--active') }}
          aria-label="Save property"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20.8 5.6a5 5 0 00-7.1 0L12 7.3l-1.7-1.7a5 5 0 00-7.1 7.1L12 21.5l8.8-8.8a5 5 0 000-7.1z" />
          </svg>
        </button>
      </div>
      <div className="property-card__body">
        <h3 className="property-card__name">{property.name}</h3>
        <p className="property-card__location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          {property.location}
        </p>
        <div className="property-card__specs">
          <span><strong>{property.beds}</strong> Beds</span>
          <span><strong>{property.baths}</strong> Baths</span>
          <span><strong>{property.sqft.toLocaleString()}</strong> Sqft</span>
        </div>
        <div className="property-card__footer">
          <span className="property-card__price">{property.priceLabel}</span>
          <span className="property-card__link">View Details
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
