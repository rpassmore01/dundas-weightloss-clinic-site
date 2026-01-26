"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/team", label: "Team" },
  { href: "/patients", label: "Patients" },
  { href: "/professionals", label: "Professionals" },
];

const ctaLink = { href: "/book", label: "Book Appointment" };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMobileMenu = () => setIsOpen(false);

  // Check if a link is currently active
  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto flex items-center justify-between px-4 md:px-8 xl:px-12 h-16 md:h-20">
        {/* Brand */}
        <Link
          href="/#top"
          className="text-xl md:text-2xl font-bold text-gray-900"
          onClick={closeMobileMenu}
        >
          Dundas Weight Loss Clinic
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-lg font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative py-1 transition ${
                isActiveLink(href)
                  ? "text-sky-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-600"
                  : "text-gray-900 hover:text-sky-700"
              }`}
            >
              {label}
            </Link>
          ))}

          <Link
            href={ctaLink.href}
            className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl text-lg shadow-lg transition"
          >
            {ctaLink.label}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded border border-gray-400"
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
        className={`lg:hidden fixed z-40 top-16 md:top-20 left-0 w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-sky-50 flex flex-col items-center justify-center gap-8 text-2xl font-medium transform transition-transform duration-300 overflow-hidden overscroll-contain touch-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={closeMobileMenu}
            className={`relative py-1 transition ${
              isActiveLink(href)
                ? "text-sky-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-600"
                : "text-gray-900 hover:text-sky-700"
            }`}
          >
            {label}
          </Link>
        ))}

        <Link
          href={ctaLink.href}
          onClick={closeMobileMenu}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg shadow transition"
        >
          {ctaLink.label}
        </Link>
      </div>
    </header>
  );
}
