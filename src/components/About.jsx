import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container about__container">
        <div className="about__content animate-on-scroll">
          <p className="eyebrow">About Us</p>
          <h2 className="section-title about__title">Who We Are</h2>
          <p className="about__text">
            At Horizon Properties, we connect people with extraordinary homes and smart
            investments. Integrity, transparency, and client satisfaction are at the
            heart of everything we do.
          </p>
          <Link to="/properties" className="btn btn-navy about__btn">
            Learn More
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="about__visual animate-on-scroll">
          <div className="about__img-main">
            <img
              src="https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?w=700&h=560&fit=crop&q=80"
              alt="Luxury modern home with pool"
              loading="lazy"
            />
          </div>
          <div className="about__img-secondary">
            <img
              src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=320&h=400&fit=crop&q=80"
              alt="Modern interior"
              loading="lazy"
            />
          </div>
          <button className="about__arrow" aria-label="View more">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
