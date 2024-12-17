// pages/_app.js
import '../styles/globals.css';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Layout.module.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
