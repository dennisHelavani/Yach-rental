import { Routes, Route, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import HowItWorksPage from './pages/HowItWorksPage'
import FaqPage from './pages/FaqPage'
import GalleryPage from './pages/GalleryPage'
import DestinationsPage from './pages/DestinationsPage'
import DestinationDetailPage from './pages/DestinationDetailPage'
import RoutesIndexPage from './pages/RoutesIndexPage'
import RouteOverviewPage from './pages/RouteOverviewPage'
import YachtsPage from './pages/YachtsPage'
import YachtDetailPage from './pages/YachtDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import QuotePage from './pages/QuotePage'
import SuccessPage from './pages/SuccessPage'
import CancelPage from './pages/CancelPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
        <Route path="/routes" element={<RoutesIndexPage />} />
        <Route path="/routes/:nights" element={<RouteOverviewPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/yachts" element={<YachtsPage />} />
        <Route path="/yachts/:slug" element={<YachtDetailPage />} />
        <Route path="/fleet" element={<YachtsPage />} />
        <Route path="/fleet/:slug" element={<YachtDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}
