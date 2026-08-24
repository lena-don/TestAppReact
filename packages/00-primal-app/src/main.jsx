import { StrictMode } from 'react' // ядро библиотеки
import { createRoot } from 'react-dom/client' // пакет для рендеринга компонентов в веб-браузере
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
