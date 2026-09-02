import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'
import AboutPage from './pages/AboutPage/AboutPage'
import PortfolioPage from './pages/PortfolioPage/PortfolioPage'
import WorkPage from './pages/WorkPage/WorkPage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<WorkPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
