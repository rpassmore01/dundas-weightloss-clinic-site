import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-sky-800 text-gray-300 py-6 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Clinic Name */}
        <div className="font-serif text-center md:text-left">
          <h2 className="text-xl font-bold">Dundas Weight Loss Clinic</h2>
        </div>

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
