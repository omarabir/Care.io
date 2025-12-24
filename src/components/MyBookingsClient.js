"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MyBookingsClient({ userId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings/my-bookings");
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setBookings(data.bookings);
      setLoading(false);
    } catch (error) {
      setError("Bookings load করতে সমস্যা হয়েছে");
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!confirm("আপনি কি নিশ্চিত এই booking cancel করতে চান?")) {
      return;
    }

    try {
      const response = await fetch(`/api/bookings/cancel/${bookingId}`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Booking cancel করা হয়েছে");
      fetchBookings(); // Refresh bookings list
    } catch (error) {
      alert("Booking cancel করতে সমস্যা হয়েছে");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return "⏳";
      case "Confirmed":
        return "✅";
      case "Completed":
        return "🎉";
      case "Cancelled":
        return "❌";
      default:
        return "📋";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
        <p className="mt-4 text-gray-600">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-8xl mb-6">📋</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          কোনো Booking নেই
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          আপনি এখনো কোনো service book করেননি। নিচের button এ click করে service
          দেখুন।
        </p>
        <Link
          href="/#services"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
        >
          Services দেখুন
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-200"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {booking.serviceName}
                </h3>
                <p className="text-sm text-gray-500">
                  Booking ID: {booking._id.toString()}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {getStatusIcon(booking.status)} {booking.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Duration</p>
                <p className="text-lg font-semibold text-gray-900">
                  {booking.duration}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Cost</p>
                <p className="text-lg font-semibold text-purple-600">
                  ৳{booking.totalCost}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="text-lg font-semibold text-gray-900">
                  {booking.location}
                </p>
                <p className="text-sm text-gray-600 mt-1">{booking.address}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/service/${booking.serviceId}`}
                className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                View Service Details
              </Link>

              {booking.status !== "Cancelled" &&
                booking.status !== "Completed" && (
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-200"
                  >
                    Cancel Booking
                  </button>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
