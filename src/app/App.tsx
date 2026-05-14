// src/app/App.tsx
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '@widgets/Header/Header';
import { Footer } from '@widgets/Footer/Footer';
import styles from './App.module.scss';

export default function App() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}