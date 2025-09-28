'use client'

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
      <div className="mx-auto flex items-center justify-between px-4 md:px-8 xl:px-12 h-16 md:h-20">
        {/* Brand */}
        <Link
          href="/#top"
          className="text-2xl md:text-3xl font-bold text-gray-900"
          onClick={() => setIsOpen(false)}
        >
          Dundas Weight Loss Clinic
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
          <Link href="/" className="text-gray-900 hover:text-sky-700 transition">Home</Link>
          <Link href="/team" className="text-gray-900 hover:text-sky-700 transition">Team</Link>
          {/*<Link href="/resources" className="text-gray-900 hover:text-sky-700 transition">Resources</Link>*/}
          <Link
            href="/book"
            className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl text-lg shadow-lg"
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
        className={`md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-sky-50 flex flex-col items-center justify-center gap-8 text-2xl  font-medium transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <Link href="/" onClick={toggleMenu}>Home</Link>
        <Link href="/team" onClick={toggleMenu}>Team</Link>
        {/*<Link href="/resources" onClick={toggleMenu}>Resources</Link>*/}
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
