import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { init } from '@emailjs/browser'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

init('nob1s8-BQqigGWF4S');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
