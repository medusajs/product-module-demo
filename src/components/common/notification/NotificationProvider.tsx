"use client";

import { createContext, useState, ReactNode, useContext } from "react";
import { Notification } from "./";

type NotificationType = "success" | "error";

type NotificationProps = {
  type: NotificationType;
  title: string;
  body: string;
  showNotification?: boolean;
  onClose: () => void;
};

type NotificationContextType = {
  showNotification: (
    type: NotificationType,
    title: string,
    body: string,
    onClose: () => void
  ) => void;
  hideNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {},
  hideNotification: () => {},
});

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  return context;
};

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );

  const showNotification = (
    type: NotificationType,
    title: string,
    body: string,
    onClose: () => void
  ) => {
    setNotification({ type, title, body, onClose });
    setTimeout(hideNotification, 5000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, hideNotification }}
    >
      {children}
      {notification && (
        <Notification
          type={notification.type}
          title={notification.title}
          body={notification.body}
          onClose={notification.onClose}
        />
      )}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
