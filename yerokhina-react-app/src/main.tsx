import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import App2 from './App2.tsx'
import { App3 } from './App3.tsx'
import App4 from './App4';
import { ThemeProvider } from './contexts/ThemeContext.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <App2 />
    </ThemeProvider>
   
   
  </StrictMode>,
)
