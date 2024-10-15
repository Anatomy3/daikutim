import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.iconContainer}>
        <div className={styles.notificationIcon} onClick={toggleNotification}>
          <FaBell />
        </div>
      </div>

      {isNotificationOpen && (
        <div ref={notificationRef} className={styles.notificationPanel}>
          <div className={styles.notificationHeader}>
            <h3>Notifikasi Sistem</h3>
            <FaTimes className={styles.closeIcon} onClick={() => setIsNotificationOpen(false)} />
          </div>
          <div className={styles.notificationContent}>
            <p className={styles.noNotifications}>Tidak ada notifikasi saat ini.</p>
          </div>
        </div>
      )}
    </header>
  );
}