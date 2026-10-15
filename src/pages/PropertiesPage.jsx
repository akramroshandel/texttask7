import { useState, useMemo } from 'react'
import { properties, allLocations, allTypes } from '../data/properties.js'
import PropertyCard from '../components/PropertyCard.jsx'
import './PropertiesPage.css'

export default function PropertiesPage() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [minBeds, setMinBeds] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10)
  const [sortBy, setSortBy] = useState('default')

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())
      const matchLocation = !location || p.location === location
      const matchType = !type || p.type === type
      const matchBeds = p.beds >= minBeds
      const matchPrice = p.price <= maxPrice
      return matchSearch && matchLocation && matchType && matchBeds && matchPrice
    })

    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price)
    if (sortBy === 'beds') result = [...result].sort((a, b) => b.beds - a.beds)

    return result
  }, [search, location, type, minBeds, maxPrice, sortBy])

  const resetFilters = () => {
    setSearch(''); setLocation(''); setType(''); setMinBeds(0); setMaxPrice(10); setSortBy('default')
  }

  return (
    <div className="properties-page">
      <div className="properties-page__hero">
        <div className="container">
          <p className="eyebrow properties-page__eyebrow">Our Portfolio</p>
          <h1 className="properties-page__title">Browse Properties</h1>
          <p className="properties-page__subtitle">
            Explore our curated collection of premium homes and investment properties.
          </p>
        </div>
      </div>

      <div className="container properties-page__body">
        <aside className="properties-page__filters">
          <h3 className="properties-page__filters-title">Filters</h3>

          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Keyword or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Location</label>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">All Locations</option>
              {allLocations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Property Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All Types</option>
              {allTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Min Bedrooms</label>
            <select value={minBeds} onChange={(e) => setMinBeds(Number(e.target.value))}>
              <option value={0}>Any</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
              <option value={5}>5+</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Max Price: ${maxPrice}M</label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="filter-range"
            />
          </div>

          <button className="btn btn-outline-dark properties-page__reset" onClick={resetFilters}>
            Reset Filters
          </button>
        </aside>

        <div className="properties-page__main">
          <div className="properties-page__toolbar">
            <span className="properties-page__count">{filtered.length} properties found</span>
            <div className="properties-page__sort">
              <label>Sort by</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="beds">Most Bedrooms</option>
              </select>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="properties-page__grid">
              {filtered.map((p, i) => (
                <div key={p.id} className="animate-on-scroll" style={{ transitionDelay: `${i * 0.04}s` }}>
                  <PropertyCard property={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="properties-page__empty">
              <p>No properties match your filters.</p>
              <button className="btn btn-navy" onClick={resetFilters}>Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
