import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <>
      <header className={styles.header}>
        <NavLink to="/" className={styles.title}>Pokedex</NavLink>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Cards
          </NavLink>
          <NavLink
            to="/battle"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Battle
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
