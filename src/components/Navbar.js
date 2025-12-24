"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return pathname === path
      ? "text-purple-600 font-semibold"
      : "text-gray-700 hover:text-purple-600";
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-3xl">💙</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Care.xyz
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`${isActive("/")} transition-colors duration-200`}
            >
              Home
            </Link>

            {session && (
              <Link
                href="/my-bookings"
                className={`${isActive(
                  "/my-bookings"
                )} transition-colors duration-200`}
              >
                My Bookings
              </Link>
            )}

            {status === "loading" ? (
              <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    {session.user.name}
                  </p>
                  <p className="text-gray-500 text-xs">{session.user.email}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`${isActive(
                  "/"
                )} px-4 py-2 transition-colors duration-200`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {session && (
                <Link
                  href="/my-bookings"
                  className={`${isActive(
                    "/my-bookings"
                  )} px-4 py-2 transition-colors duration-200`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Bookings
                </Link>
              )}

              {session ? (
                <>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <p className="font-medium text-gray-900">
                      {session.user.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {session.user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setMobileMenuOpen(false);
                    }}
                    className="mx-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="mx-4 px-4 py-2 text-center text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="mx-4 px-4 py-2 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
