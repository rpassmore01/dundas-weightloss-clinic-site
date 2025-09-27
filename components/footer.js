import styles from "../styles/Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBody}>
        <h2>Dundas Weight Loss Clinic</h2>
        <p>
          Copyright <span>&copy;</span> 2025 Dundas Weight Loss Clinic.
        </p>
      </div>

      <div className={styles.links}>
        <Link href="/#bio">
          Bio
        </Link>
        <Link href="/#about">
          About
        </Link>
        <Link href="/#services">
          Services
        </Link>
        <Link href="/book">
          Book
        </Link>
      </div>
    </footer>
  );
}
