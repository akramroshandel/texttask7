import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Services from './components/Services.jsx'
import MoreThanSalon from './components/MoreThanSalon.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Services />
        <MoreThanSalon />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
