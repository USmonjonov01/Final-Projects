import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './root'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './Context/Theme'
import ProfileProvider from './Context/Users'
import { MessagesProvider } from './Context/Messages'
import { NotificationProvider } from './Context/Notification'

createRoot(document.getElementById('root')).render(
  <>
    <ThemeProvider>
      <NotificationProvider>
        <MessagesProvider>
          <ProfileProvider>
            <BrowserRouter>
              <Root />
            </BrowserRouter>
          </ProfileProvider>
        </MessagesProvider>
      </NotificationProvider>
    </ThemeProvider>
  </>
)
