import { FiArrowUpRight, FiGithub, FiUsers } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top" aria-label="Common Ground home">
          <span className={styles.mark}>
            <FiUsers aria-hidden="true" />
          </span>
          <span>Common Ground</span>
        </a>
        <nav className={styles.navigation} aria-label="Main navigation">
          <a className={styles.navLink} href="#people">People</a>
          <a className={styles.navLink} href="#teams">Teams</a>
          <a className={styles.navLink} href="#offices">Offices</a>
        </nav>
        <a
          className={styles.repository}
          href="https://github.com/a2rp/team-directory"
          target="_blank"
          rel="noreferrer"
        >
          <FiGithub aria-hidden="true" />
          <span>Repository</span>
          <FiArrowUpRight className={styles.arrow} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
};

export default SiteHeader;
