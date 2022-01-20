import styles from "../styles/Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBody}>
        <h2>Dundas Weight Loss Clinic</h2>
        <p>
          Copyright <span>&copy;</span> 2022 Dundas Weight Loss Clinic.
        </p>
      </div>

      <div className={styles.links}>
        <Link href="/#bio">
          <a>Bio</a>
        </Link>
        <Link href="/#about">
          <a>About</a>
        </Link>
        <Link href="/#services">
          <a>Services</a>
        </Link>
        <Link href="/book">
          <a>Book Appointment</a>
        </Link>
      </div>
    </footer>
  );
}
