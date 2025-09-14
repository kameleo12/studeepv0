// modules/shared/react/components/Navbar.tsx
"use client";

import { Link, usePathname } from "@root/modules/shared/react/libs/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Accueil", key: "drive" },
    { href: "/qcm", label: "QCM", key: "qcm" },
    { href: "/memo", label: "Fichier mémo", key: "memo" },
    { href: "/calendrier", label: "Calendrier", key: "calendar" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-white/20 shadow-sm">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-500/20 text-blue-800 shadow-sm"
                    : "text-gray-700 hover:text-blue-800 hover:bg-white/50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
