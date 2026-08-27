import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = createRoot( // Пришлось изменить немного код (root), чтобы примеры с сайта работали на структуре стандартного Реакт приложения от Вита.
  document.getElementById('root')
)

root.render(
  <StrictMode>
    <App root={root} />
  </StrictMode>
)