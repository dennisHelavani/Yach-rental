import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import EarlyBirdBanner from '../components/EarlyBirdBanner'
import FeatureBadges from '../components/FeatureBadges'
import VibeGrid from '../components/VibeGrid'
import HowItWorks from '../components/HowItWorks'
import Fleet from '../components/Fleet'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import AddOns from '../components/AddOns'
import Footer from '../components/Footer'

export default function HomePage() {
    return (
        <>
            <Navbar />
            <Hero />
            <EarlyBirdBanner />
            <FeatureBadges />
            <VibeGrid />
            <HowItWorks />
            <Fleet />
            <Testimonials />
            <FAQ />
            <AddOns />
            <Footer />
        </>
    )
}
