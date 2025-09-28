"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faUsers, faCog, faStar } from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: faTachometerAlt },
  { name: "Users", href: "/admin/users", icon: faUsers },
  { name: "Settings", href: "/admin/settings", icon: faCog },
  { name: "Testimonials", href: "/admin/testimonials", icon: faStar },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-sky-900 text-white flex flex-col">
      <Link href="/admin" className="p-6 font-bold text-xl border-b border-sky-800">
        Control Panel
      </Link>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-sky-700 font-semibold"
                  : "hover:bg-sky-600"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
