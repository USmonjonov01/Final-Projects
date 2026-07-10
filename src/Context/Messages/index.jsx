// context/notification.jsx
import React, { createContext, useContext, useRef } from 'react'
import { message } from 'antd'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
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
    <NotificationContext.Provider value={{ notify, destroyNotify }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  return useContext(NotificationContext)
}