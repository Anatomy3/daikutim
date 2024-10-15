import { useState, useEffect, useRef } from 'react';
import { FaRegCalendarAlt, FaUser, FaSignOutAlt, FaPlus, FaBars, FaMoneyCheckAlt } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { useRouter } from 'next/router';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [role, setRole] = useState('');
  const [profileName, setProfileName] = useState('Memuat...');
  const [profileImage, setProfileImage] = useState('/daiku/profile.png');
  const [profileDepartment, setProfileDepartment] = useState('');
  const [userId, setUserId] = useState(null);

  const router = useRouter();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);

    if (storedUserId) {
      fetchUserData(storedUserId);
    } else {
      router.push('/login');
    }
  }, [router]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`/api/sidebar?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setProfileName(data.userProfile.fullName);
        setProfileDepartment(data.userProfile.department);
        setProfileImage(data.userProfile.photo);
        setRole(data.userProfile.role);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setProfileName('Error loading data');
      setProfileDepartment('');
    }
  };

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [isMobile, router.events]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }

    if (isMobile && isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateToPage = (path) => {
    router.push(path);
  };

  const handleLogout = async () => {
    const userId = localStorage.getItem('userId');
    
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userImage');
        localStorage.removeItem('userId');
        
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const isActive = (path) => {
    return router.pathname === path ? styles.active : '';
  };

  const menuItems = role === 'admin' ? [
    { path: '/dashboard', icon: <MdDashboard className={styles.icon} />, label: 'DASHBOARD' },
    { path: '/laporan_karyawan', icon: <FaRegCalendarAlt className={styles.icon} />, label: 'LAPORAN KARYAWAN' },
    { path: '/kelola_karyawan', icon: <FaUser className={styles.icon} />, label: 'KELOLA KARYAWAN' },
    { path: '/form', icon: <FaMoneyCheckAlt className={styles.icon} />, label: 'FORM' },
  ] : [
    { path: '/dashboard', icon: <MdDashboard className={styles.icon} />, label: 'DASHBOARD' },
    { path: '/laporan_harian', icon: <FaRegCalendarAlt className={styles.icon} />, label: 'LAPORAN HARIAN' },
    { path: '/form', icon: <FaMoneyCheckAlt className={styles.icon} />, label: 'FORM' },
  ];

  return (
    <>
      {isMobile && (
        <button className={styles.hamburger} onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}

      <div ref={sidebarRef} className={`${styles.sidebar} ${isMobile && !isSidebarOpen ? styles.closed : styles.open}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.logoContainer}>
            <img src="/daiku/logo.png" alt="Daiku Logo" className={styles.logo} />
            <span className={styles.logoText}>daiku</span>
          </div>

          <div className={styles.profileInfo}>
            <div className={styles.profileImageWrapper}>
              <label htmlFor="profileImageInput">
                <img src={profileImage} alt="Profile" className={styles.profileImage} />
                <FaPlus className={styles.plusIcon} />
              </label>
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>

            <div className={styles.nameContainer}>
              <h2 className={styles.profileName}>{profileName}</h2>
            </div>
            <p className={styles.profileJob}>{profileDepartment}</p>
          </div>

          <div className={styles.divider}></div>

          <nav className={styles.sidebarNav}>
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className={`${isActive(item.path)}`}>
                  <a onClick={() => navigateToPage(item.path)}>
                    {item.icon} {item.label}
                  </a>
                </li>
              ))}
              <li className={`${isActive('/profile')}`}>
                <a onClick={() => navigateToPage('/profile')}>
                  <FaUser className={styles.icon} /> PROFILE
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.logoutSection}>
          <a onClick={handleLogout}>
            <FaSignOutAlt className={styles.icon} />
            <span>KELUAR</span>
          </a>
        </div>
      </div>
    </>
  );
}