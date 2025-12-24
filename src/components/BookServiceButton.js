"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BookServiceButton({ serviceId, large = false }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleBooking = () => {
    if (status === "authenticated") {
      router.push(`/booking/${serviceId}`);
    } else {
      router.push(`/login?callbackUrl=/booking/${serviceId}`);
    }
  };

  const buttonClasses = large
    ? "px-12 py-5 bg-white text-purple-600 rounded-lg font-bold text-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-2xl"
    : "px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-xl";

  if (status === "loading") {
    return (
      <button disabled className={buttonClasses}>
        Loading...
      </button>
    );
  }

  return (
    <button onClick={handleBooking} className={buttonClasses}>
      Book Service Now 🚀
    </button>
  );
}
