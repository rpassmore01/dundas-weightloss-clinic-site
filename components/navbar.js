import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [navClass, setNavClass] = useState(styles.navbarHidden);
  const [burgerIcon, setBurgerIcon] = useState("/../public/burger.svg");

  function handleBurger() {
    if (navClass == styles.navbarHidden) {
      setNavClass(styles.navbarVisible);
      setBurgerIcon("/../public/x.svg");
    } else {
      setNavClass(styles.navbarHidden);
      setBurgerIcon("/../public/burger.svg");
    }
  }

  return (
    <div className={styles.navbar}>
      <Link href="/">
        <a
          className={styles.navbarTitle}
          onClick={() => {
            handleBurger();
          }}
        >
          Dundas Weight Loss Clinic
        </a>
      </Link>
      <nav className={navClass}>
        <Link href="/#bio">
          <a
            onClick={() => {
              handleBurger();
            }}
          >
            Bio
          </a>
        </Link>
        <Link href="/#about">
          <a
            onClick={() => {
              handleBurger();
            }}
          >
            About
          </a>
        </Link>
        <Link href="/#services">
          <a
            onClick={() => {
              handleBurger();
            }}
          >
            Services
          </a>
        </Link>
        <Link href="/book">
          <a
            onClick={() => {
              handleBurger();
            }}
          >
            Book Apointment
          </a>
        </Link>
      </nav>
      <button
        className={styles.navbarButton}
        onClick={() => {
          handleBurger();
        }}
      >
        <Image src={burgerIcon} width="32px" height="32px"></Image>
      </button>
    </div>
  );
}
