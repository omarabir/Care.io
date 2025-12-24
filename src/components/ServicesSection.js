import Link from "next/link";
import { getAllServices } from "@/lib/db";

export default async function ServicesSection() {
  const services = await getAllServices();
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            আমাদের Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            আপনার পরিবারের প্রতিটি সদস্যের জন্য বিশেষভাবে designed care service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-8 text-center">
                <div className="text-7xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white">
                  {service.name}
                </h3>
              </div>

              <div className="p-8">
                <p className="text-gray-600 mb-6">{service.shortDescription}</p>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-700"
                    >
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-600 mb-2">
                    Starting from
                  </div>
                  <div className="text-3xl font-bold text-purple-600">
                    ৳{service.chargePerHour}
                    <span className="text-sm font-normal text-gray-500">
                      /hour
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    or ৳{service.chargePerDay}/day
                  </div>
                </div>

                <Link
                  href={`/service/${service._id.toString()}`}
                  className="block w-full text-center py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
