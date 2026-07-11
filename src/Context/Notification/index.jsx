import React, { createContext, useContext } from 'react'
import { ConfigProvider, message, notification, Modal, theme } from 'antd'
import { ThemeData } from '../Theme'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [{ isDark }] = ThemeData() 

  const [messageApi, contextHolder] = message.useMessage()
  const [notificationApi, notificationContextHolder] = notification.useNotification()
  const [modalApi, modalContextHolder] = Modal.useModal()

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

  function notifyBox(type, title, description) {
    notificationApi[type]({
      message: title,
      description: description,
      placement: 'topRight',
      duration: type === 'error' ? 4.5 : 3,
    })
  }


  function notifyByStatus(status, context = 'default') {
    const defaultMessages = {
      200: { type: 'success', title: 'Muvaffaqiyatli', desc: "Amal muvaffaqiyatli bajarildi." },
      201: { type: 'success', title: 'Yaratildi', desc: "Ma'lumot muvaffaqiyatli yaratildi." },
      400: { type: 'error', title: "Noto'g'ri so'rov", desc: "Kiritilgan ma'lumotlar noto'g'ri." },
      401: { type: 'error', title: 'Ruxsat yo\'q', desc: "Email yoki parol noto'g'ri." },
      404: { type: 'error', title: 'Topilmadi', desc: "So'ralgan ma'lumot topilmadi." },
      409: { type: 'error', title: 'Ziddiyat', desc: "Bunday ma'lumot allaqachon mavjud." },
      500: { type: 'error', title: 'Server xatosi', desc: "Serverda xatolik yuz berdi, keyinroq urinib ko'ring." },
    }

    const contextMessages = {
      signIn: {
        200: { type: 'success', title: 'Xush kelibsiz', desc: 'Muvaffaqiyatli tizimga kirdingiz.' },
        401: { type: 'error', title: 'Kirish rad etildi', desc: "Email yoki parol noto'g'ri kiritildi." },
        404: { type: 'error', title: 'Hisob topilmadi', desc: "Bunday foydalanuvchi ro'yxatdan o'tmagan." },
      },
      signUp: {
        200: { type: 'success', title: "Ro'yxatdan o'tildi", desc: 'Hisobingiz muvaffaqiyatli yaratildi.' },
        201: { type: 'success', title: "Ro'yxatdan o'tildi", desc: 'Hisobingiz muvaffaqiyatli yaratildi.' },
        400: { type: 'error', title: 'Xatolik', desc: "Kiritilgan ma'lumotlarni tekshiring." },
        409: { type: 'error', title: 'Band', desc: 'Bu email bilan hisob allaqachon mavjud.' },
      },
    }

    const entry =
      contextMessages[context]?.[status] ||
      defaultMessages[status] ||
      { type: 'error', title: 'Xatolik', desc: "Noma'lum xatolik yuz berdi." }

    notifyBox(entry.type, entry.title, entry.desc)
  }

  return (
    // ⛔ YANGI: ConfigProvider bilan o'ralgan, isDark ga qarab algoritm tanlanadi
    <ConfigProvider theme={{ algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <NotificationContext.Provider value={{ notify, destroyNotify, notifyBox, notifyByStatus, confirmModal: modalApi.confirm }}>
        {contextHolder}
        {notificationContextHolder}
        {modalContextHolder}
        {children}
      </NotificationContext.Provider>
    </ConfigProvider>
  )
}

export function Use_Notification() {
  return useContext(NotificationContext)
}