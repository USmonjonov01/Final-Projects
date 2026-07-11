// context/notification.jsx
import React, { createContext, useContext } from 'react'
import { ConfigProvider, message, theme } from 'antd'
import { ThemeData } from '../Theme'

const NotificationContext = createContext(null)

export function MessagesProvider({ children }) {
  const [{ isDark }] = ThemeData() 

  const [messageApi, contextHolder] = message.useMessage()

  function notify(type, content) {
    messageApi.open({
      key: "notify",
      type,      // 'loading' | 'success' | 'error' | 'warning'
      content,
      duration: type === 'loading' ? 0 : 3,
    })
  }

  function destroyNotify() {
    messageApi.destroy("notify")
  }

  return (
    <ConfigProvider theme={{ algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <NotificationContext.Provider value={{ notify, destroyNotify }}>
        {contextHolder}
        {children}
      </NotificationContext.Provider>
    </ConfigProvider>
  )
}

export function useNotification() {
  return useContext(NotificationContext)
}