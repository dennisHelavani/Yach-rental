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
import SEO from '../components/SEO'

export default function HomePage() {
    return (
        <>
            <SEO
                title="SALTIE Greece | The Ultimate Mediterranean Party"
                description="Experience the ultimate Greece party yacht vacation. Sail the Greek islands on a highly social, fun, and budget-friendly cruise. Book your epic sailing holiday today!"
                keywords="Greece party yacht vacations, Greek island social yacht cruise, party sailing holidays Greece"
            />
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
