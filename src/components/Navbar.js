"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Desktop dropdown
  const [resourcesOpen, setResourcesOpen] = useState(false);

  // Mobile submenu
  const [resourcesMobileOpen, setResourcesMobileOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) setResourcesMobileOpen(false); // closing menu collapses submenu
      return next;
    });
  }

  function closeMobileMenu() {
    setIsOpen(false);
    setResourcesMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto flex items-center justify-between px-4 md:px-8 xl:px-12 h-16 md:h-20">
        {/* Brand */}
        <Link
          href="/#top"
          className="text-2xl md:text-3xl font-bold text-gray-900"
          onClick={closeMobileMenu}
        >
          Dundas Weight Loss Clinic
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
          <Link href="/" className="text-gray-900 hover:text-sky-700 transition">
            Home
          </Link>

          <Link href="/blogs" className="text-gray-900 hover:text-sky-700 transition">
            Blogs
          </Link>

          <Link href="/team" className="text-gray-900 hover:text-sky-700 transition">
            Team
          </Link>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              className="text-gray-900 hover:text-sky-700 transition inline-flex items-center gap-2"
              aria-haspopup="menu"
              aria-expanded={resourcesOpen}
            >
              Resources
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Invisible bridge to cover the gap */}
            <div className="absolute left-0 top-full h-3 w-56" />

            <div
              className={`absolute left-0 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg p-2
      ${resourcesOpen ? "opacity-100 visible" : "opacity-0 invisible"} transition`}
              role="menu"
            >
              <Link
                href="/resources/clients"
                className="block rounded-lg px-4 py-2 text-gray-900 hover:bg-sky-50 hover:text-sky-700 transition"
                role="menuitem"
              >
                For Clients
              </Link>
              <Link
                href="/resources/professionals"
                className="block rounded-lg px-4 py-2 text-gray-900 hover:bg-sky-50 hover:text-sky-700 transition"
                role="menuitem"
              >
                For Professionals
              </Link>
            </div>
          </div>


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
        className={`md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-sky-50 flex flex-col items-center justify-center gap-8 text-2xl font-medium transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <Link href="/" onClick={closeMobileMenu} className="hover:text-sky-700 transition">
          Home
        </Link>

        <Link href="/team" onClick={closeMobileMenu} className="hover:text-sky-700 transition">
          Team
        </Link>

        {/* Mobile Resources Submenu */}
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setResourcesMobileOpen((p) => !p)}
            className="hover:text-sky-700 transition inline-flex items-center gap-2"
            aria-expanded={resourcesMobileOpen}
          >
            Resources
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Sliding panel */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-out
      ${resourcesMobileOpen ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1"}
    `}
          >
            <div className="flex flex-col items-center gap-3 text-xl pt-2">
              <Link
                href="/resources/clients"
                onClick={closeMobileMenu}
                className="px-4 py-2 rounded-lg hover:bg-white/60 hover:text-sky-700 transition"
              >
                For Clients
              </Link>
              <Link
                href="/resources/professionals"
                onClick={closeMobileMenu}
                className="px-4 py-2 rounded-lg hover:bg-white/60 hover:text-sky-700 transition"
              >
                For Professionals
              </Link>
            </div>
          </div>
        </div>


        <Link
          href="/book"
          onClick={closeMobileMenu}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg shadow transition"
        >
          Book Appointment
        </Link>
      </div>
    </header>
  );
}
