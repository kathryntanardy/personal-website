import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import AboutPage from './pages/AboutPage/AboutPage'
import HomePage from './pages/HomePage/HomePage'
import PortfolioPage from './pages/PortfolioPage/PortfolioPage'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </>
  )
}

export default App
