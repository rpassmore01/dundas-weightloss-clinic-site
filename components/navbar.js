import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16 md:h-20">
        {/* Brand */}
        <Link
          href="/#top"
          className="font-serif text-2xl md:text-3xl font-bold text-gray-900"
          onClick={() => setIsOpen(false)}
        >
          Dundas Weight Loss Clinic
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-medium font-serif">
          <Link href="/#bio" className="hover:text-sky-700 transition">Bio</Link>
          <Link href="/#about" className="hover:text-sky-700 transition">About</Link>
          <Link href="/#services" className="hover:text-sky-700 transition">Services</Link>
          <Link href="/#location" className="hover:text-sky-700 transition">Location</Link>
          <Link
            href="/book"
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            Book Appointment
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded border border-gray-400"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Image
            src={isOpen ? "/x.svg" : "/burger.svg"}
            alt="menu toggle"
            width={30}
            height={30}
          />
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-sky-50 flex flex-col items-center justify-center gap-8 text-2xl font-serif font-medium transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Link href="/#bio" onClick={toggleMenu}>Bio</Link>
        <Link href="/#about" onClick={toggleMenu}>About</Link>
        <Link href="/#services" onClick={toggleMenu}>Services</Link>
        <Link href="/#location" onClick={toggleMenu}>Location</Link>
        <Link
          href="/book"
          onClick={toggleMenu}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg shadow transition"
        >
          Book Appointment
        </Link>
      </div>
    </header>
  );
}
