import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Remove the direct import of LandingPage since it's now in index.tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)