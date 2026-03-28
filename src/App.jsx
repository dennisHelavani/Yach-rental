import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
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
import NotFoundPage from './pages/NotFoundPage'
// NEW: post-payment flow pages
import BookingSuccessPage from './pages/BookingSuccessPage'
import BookingCancelledPage from './pages/BookingCancelledPage'
import CookieBanner from './components/CookieBanner'
import TermsPage from './pages/TermsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import CancellationPolicyPage from './pages/CancellationPolicyPage'

export default function App() {
  // [INFLUENCER TRACKING] — capture ?via= param on landing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const via = params.get('via')
    if (!via) return

    const API_BASE = import.meta.env.VITE_API_URL || 'https://api.saltiecruises.com'
    fetch(`${API_BASE}/api/track/${encodeURIComponent(via)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.clickId) {
          sessionStorage.setItem('influencer_code', via)
          sessionStorage.setItem('click_id', data.clickId)
        }
      })
      .catch(() => { /* fail silently */ })
  }, [])

  return (
    <>
      <ScrollToTop />
      <CookieBanner />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        {/* <Route path="/destinations" element={<DestinationsPage />} /> */}
        {/* <Route path="/destinations/:slug" element={<DestinationDetailPage />} /> */}
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
        {/* NEW: post-payment flow routes */}
        <Route path="/booking-success" element={<BookingSuccessPage />} />
        <Route path="/booking-cancelled" element={<BookingCancelledPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/cancellation" element={<CancellationPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
