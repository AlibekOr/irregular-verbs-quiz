import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Older versions saved quiz results in the browser; the app no longer keeps any.
try {
  localStorage.removeItem('irregular-verbs-progress')
} catch {
  // Storage unavailable — nothing to clean up.
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
