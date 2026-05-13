import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import BookingProvider from './context/BookingProvider'
import SmartBookingModal from './components/SmartBookingModal'
import AbandonWidget from './components/booking/AbandonWidget'
import DebugPanel from './components/booking/DebugPanel'
import LastCabinAlert from './components/booking/LastCabinAlert'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BookingProvider>
        <App />
        <SmartBookingModal />
        <AbandonWidget />
        <DebugPanel />
        <LastCabinAlert />
      </BookingProvider>
    </BrowserRouter>
  </StrictMode>,
)
