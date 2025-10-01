import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Privacy from './routes/Privacy.tsx'
import Terms from './routes/Terms.tsx'
import Waiver from './routes/Waiver.tsx'
import TournamentPage from './routes/TournamentPage.tsx'
import AboutPage from './routes/AboutPage.tsx'
import AppPage from './routes/AppPage.tsx'
import ContactPage from './routes/ContactPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tournament" element={<TournamentPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/contact" element={<ContactPage />} />
  <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
  <Route path="/waiver" element={<Waiver />} />
        {/* Fallback: let App handle in-app navigation */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
