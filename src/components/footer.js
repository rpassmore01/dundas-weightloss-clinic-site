import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
export default function Footer() {
  return (
    <footer className="bg-sky-800 text-gray-100 py-6 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Clinic Name */}
        <div className=" text-center md:text-left">
          <h2 className="text-xl font-bold">Dundas Weight Loss Clinic</h2>
        </div>
        <a
          href="https://www.facebook.com/p/Dundas-Weight-Loss-Clinic-100078903857929/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-90 transition"
        >
          <FontAwesomeIcon icon={faFacebookF} className="h-6 w-6" />
        </a>


        {/* Links / Copyright */}
        <div className="text-center md:text-right text-sm md:text-base">
          <p>
            Copyright <span>&copy;</span> 2025 Dundas Weight Loss Clinic.
          </p>
        </div>
      </div>
    </footer>
  );
}
