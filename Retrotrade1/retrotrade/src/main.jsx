import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'

// import "./assets/user.css"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </StrictMode>
  </Provider>
)
