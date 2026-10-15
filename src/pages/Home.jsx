import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import FeaturedProperties from '../components/FeaturedProperties.jsx'
import Services from '../components/Services.jsx'
import WhyChoose from '../components/WhyChoose.jsx'
import Team from '../components/Team.jsx'
import CTA from '../components/CTA.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProperties />
      <Services />
      <WhyChoose />
      <Team />
      <CTA />
    </>
  )
}
