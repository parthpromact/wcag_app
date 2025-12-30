"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [menuOpen, setMenuOpen] = useState(false);

  const navMenus = [
    { name: "Home", path: "/home" },
    { name: "Explore", path: "/explore" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]
  const logout = () => {
    // remove cookie
    document.cookie = "token=; Max-Age=0; path=/";
    router.push("/login");
  };
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="top-0 left-0 z-50 w-full bg-black"
    >

      <div className="flex items-center justify-between p-3">

        <Link
          href="/"
          aria-label="Go to home page"
          className="focus:outline-none focus:ring-2 focus:ring-white rounded"
        >
          <Image src="/trvl-logo.svg" alt="TRVL App logo" width={80} height={80} />
        </Link>

        {/* Toggle Button (Mobile / Zoom) */}
        {isMobile && (
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-white min-h-11"
          >
            {menuOpen ? <X aria-label="Close menu" /> : <Menu aria-label="Open menu" />}
          </button>
        )}

        {/* Desktop Menu */}
        {!isMobile && (
          <ul className="flex items-center gap-2" role="list">
            {navMenus.map((menu) => {
              const active = isActive(menu.path);
              return (
                <li key={menu.name}>
                  <Link
                    aria-current={active ? "page" : undefined}
                    href={menu.path}
                    className={`
                      block px-4 py-2 rounded min-h-11
                      font-semibold focus:outline-none focus:ring-2 focus:ring-white
                      ${active
                        ? "border underline underline-offset-8 text-white"
                        : "text-white hover:border"}
                    `}>
                    {menu.name}
                  </Link>
                </li>
              )
            })}
            <li>
              <Button
                onClick={logout}
                variant="outline"
                className="flex items-center gap-2 min-h-11 cursor-pointer"
                aria-label="Log out from the application"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </li>
          </ul>
        )}
      </div>

      {/* Mobile / Zoom Menu */}
      {isMobile && menuOpen && (
        <div id="main-menu">
          <ul className="flex flex-col gap-1 p-2" role="list">
            {navMenus.map((menu) => {
              const active = isActive(menu.path);
              return (
                <li key={menu.name}>
                  <Link
                    href={menu.path}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded min-h-11 font-semibold focus:outline-none focus:ring-2 focus:ring-white 
                                ${active
                        ? "border underline underline-offset-4 text-white"
                        : "text-white hover:border"}
                              `}>
                    {menu.name}
                  </Link>
                </li>
              )
            })}
            <li>
              <Button
                onClick={logout}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 min-h-11"
                aria-label="Log out from the application"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </li>
          </ul>
        </div>
      )
      }
    </nav >
  );
};

export default Navbar