"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  bangladeshLocations,
  getDistricts,
  getCities,
} from "@/lib/locationData";

export default function BookingForm({ service, user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    durationType: "hours",
    duration: 1,
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });

  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  // Calculate total cost
  const calculateTotalCost = () => {
    const { duration, durationType } = formData;
    const charge =
      durationType === "hours" ? service.chargePerHour : service.chargePerDay;
    return duration * charge;
  };

  const handleDivisionChange = (e) => {
    const division = e.target.value;
    setFormData({
      ...formData,
      division,
      district: "",
      city: "",
      area: "",
    });
    setDistricts(getDistricts(division));
    setCities([]);
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setFormData({
      ...formData,
      district,
      city: "",
      area: "",
    });
    setCities(getCities(formData.division, district));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (
      !formData.division ||
      !formData.district ||
      !formData.city ||
      !formData.area ||
      !formData.address
    ) {
      setError("সব field পূরণ করতে হবে");
      setLoading(false);
      return;
    }

    if (formData.duration < 1) {
      setError("Duration কমপক্ষে ১ হতে হবে");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: service._id.toString(),
          duration: parseInt(formData.duration),
          durationType: formData.durationType,
          division: formData.division,
          district: formData.district,
          city: formData.city,
          area: formData.area,
          address: formData.address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setSuccess(true);

      // Success message দেখানোর পর My Bookings page এ redirect
      setTimeout(() => {
        router.push("/my-bookings");
      }, 2000);
    } catch (error) {
      setError("Booking এ সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-6">✅</div>
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Booking Successful!
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          আপনার booking সফলভাবে সম্পন্ন হয়েছে। একটি confirmation email পাঠানো
          হয়েছে।
        </p>
        <p className="text-gray-500">My Bookings page এ redirect হচ্ছে...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Duration Selection */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Step 1: Duration নির্বাচন করুন
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration Type
            </label>
            <select
              name="durationType"
              value={formData.durationType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="hours">Hours (ঘণ্টা)</option>
              <option value="days">Days (দিন)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration সংখ্যা
            </label>
            <input
              type="number"
              name="duration"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="উদাহরণ: 5"
            />
          </div>
        </div>
      </div>

      {/* Location Selection */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Step 2: Location নির্বাচন করুন
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Division */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Division (বিভাগ)
            </label>
            <select
              name="division"
              value={formData.division}
              onChange={handleDivisionChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">নির্বাচন করুন</option>
              {Object.keys(bangladeshLocations).map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              District (জেলা)
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleDistrictChange}
              disabled={!formData.division}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              required
            >
              <option value="">নির্বাচন করুন</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City (শহর)
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.district}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              required
            >
              <option value="">নির্বাচন করুন</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area (এলাকা)
            </label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="উদাহরণ: Block A, Road 5"
              required
            />
          </div>
        </div>

        {/* Full Address */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Address (সম্পূর্ণ ঠিকানা)
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="House/Flat নম্বর, রাস্তার নাম, landmark ইত্যাদি লিখুন"
            required
          />
        </div>
      </div>

      {/* Total Cost Display */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Total Cost</h3>
            <p className="text-sm text-gray-600">
              {formData.duration}{" "}
              {formData.durationType === "hours" ? "ঘণ্টা" : "দিন"} × ৳
              {formData.durationType === "hours"
                ? service.chargePerHour
                : service.chargePerDay}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-purple-600">
              ৳{calculateTotalCost()}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Booking হচ্ছে..." : "Confirm Booking 🚀"}
      </button>
    </form>
  );
}
