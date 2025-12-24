import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServiceById } from "@/lib/db";
import BookingForm from "@/components/BookingForm";

export default async function BookingPage({ params }) {
  const session = await getServerSession(authOptions);

  // User logged in না থাকলে login page এ redirect
  if (!session) {
    redirect(`/login?callbackUrl=/booking/${params.serviceId}`);
  }

  const service = await getServiceById(params.serviceId);

  if (!service) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
            <h1 className="text-4xl font-bold mb-2">Book Your Service</h1>
            <p className="text-xl text-gray-100">
              {service.name} এর জন্য booking করুন
            </p>
          </div>

          {/* Service Info */}
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="text-5xl">{service.icon}</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {service.name}
                </h2>
                <p className="text-gray-600">{service.shortDescription}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="bg-white px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-600">Hourly:</span>
                <span className="ml-2 text-lg font-bold text-purple-600">
                  ৳{service.chargePerHour}
                </span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-600">Daily:</span>
                <span className="ml-2 text-lg font-bold text-blue-600">
                  ৳{service.chargePerDay}
                </span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="p-8">
            <BookingForm service={service} user={session.user} />
          </div>
        </div>
      </div>
    </div>
  );
}
