"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return pathname === path
      ? "text-purple-600 font-semibold border-b-2 border-purple-600"
      : "text-gray-700 hover:text-purple-600 hover:border-b-2 hover:border-purple-300";
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-105"
          >
            <div className="text-4xl transition-transform duration-300 group-hover:rotate-12">
              💙
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Care.io
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                Your Trusted Care Partner
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className={`${isActive(
                "/"
              )} px-4 py-2 rounded-lg transition-all duration-200`}
            >
              Home
            </Link>

            {session && (
              <Link
                href="/my-bookings"
                className={`${isActive(
                  "/my-bookings"
                )} px-4 py-2 rounded-lg transition-all duration-200`}
              >
                My Bookings
              </Link>
            )}

            <div className="ml-4 flex items-center space-x-3">
              {status === "loading" ? (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              ) : session ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden lg:flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">
                        {session.user.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="px-5 py-2.5 text-purple-600 border-2 border-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-200 font-medium hover:shadow-md transform hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-xl transform hover:scale-105"
                  >
                    Register Now
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-purple-50 transition-colors duration-200 border border-gray-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
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
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-gray-200 space-y-2">
            <Link
              href="/"
              className={`${
                pathname === "/"
                  ? "bg-purple-50 text-purple-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              } block px-4 py-3 rounded-lg transition-colors duration-200`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <span>🏠</span>
                <span>Home</span>
              </span>
            </Link>

            {session && (
              <Link
                href="/my-bookings"
                className={`${
                  pathname === "/my-bookings"
                    ? "bg-purple-50 text-purple-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                } block px-4 py-3 rounded-lg transition-colors duration-200`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center space-x-2">
                  <span>📋</span>
                  <span>My Bookings</span>
                </span>
              </Link>
            )}

            {session ? (
              <>
                <div className="px-4 py-3 my-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {session.user.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-md flex items-center justify-center space-x-2"
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <Link
                  href="/login"
                  className="block px-4 py-3 text-center text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-3 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
