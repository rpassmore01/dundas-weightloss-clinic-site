import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [navClass, setNavClass] = useState(styles.navbarHidden);
  const [burgerIcon, setBurgerIcon] = useState("/burger.svg");

  function handleBurger() {
    if (navClass === styles.navbarHidden) {
      setNavClass(styles.navbarVisible);
      setBurgerIcon("/x.svg");
    } else {
      setNavClass(styles.navbarHidden);
      setBurgerIcon("/burger.svg");
    }
  }

  return (
    <div className={styles.navbar}>
      <Link href="/#top" className={styles.navbarTitle} onClick={() => handleBurger()}>
          Dundas Weight Loss Clinic
      </Link>

      <nav className={navClass}>
        <Link href="/#bio" onClick={() => handleBurger()}>
          Bio
        </Link>

        <Link href="/#about" onClick={() => handleBurger()}>
          About
        </Link>

        <Link href="/#services" onClick={() => handleBurger()}>
          Services
        </Link>

        <Link href="/#location" onClick={() => handleBurger()}>
          Location
        </Link>

        <Link href="/book" onClick={() => handleBurger()}>
          Book Appointment
        </Link>
      </nav>
      <button
        className={styles.navbarButton}
        onClick={() => {
          handleBurger();
        }}
        aria-label="menu"
      >
        <Image src={burgerIcon} width="40" height="40" alt=""></Image>
      </button>
    </div>
  );
}
