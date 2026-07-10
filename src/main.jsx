import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './root'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './Context/Theme'
import ProfileProvider from './Context/Users'
import { NotificationProvider } from './Context/Messages'

createRoot(document.getElementById('root')).render(
  <>
    <ThemeProvider>
      <NotificationProvider>
        <ProfileProvider>
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </ProfileProvider>
      </NotificationProvider>
    </ThemeProvider>
  </>
)
