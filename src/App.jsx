import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { HomePage } from './pages/HomePage'
import { PosterA11yCaseStudy } from './pages/case-studies/PosterA11yCaseStudy'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-studies/poster-accessibility-eval" element={<PosterA11yCaseStudy />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
