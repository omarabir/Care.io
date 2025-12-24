import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceById } from "@/lib/db";
import BookServiceButton from "@/components/BookServiceButton";

// Metadata generation
export async function generateMetadata({ params }) {
  const service = await getServiceById(params.id);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.name} - Care.xyz`,
    description: service.description,
    keywords: `${service.name}, care service bangladesh, ${service.name} dhaka`,
    openGraph: {
      title: `${service.name} - Care.xyz`,
      description: service.shortDescription,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const service = await getServiceById(params.id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-8xl mb-6">{service.icon}</div>
              <h1 className="text-5xl font-bold mb-6">{service.name}</h1>
              <p className="text-xl text-gray-100 mb-8">
                {service.shortDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <BookServiceButton serviceId={service._id.toString()} />
                <Link
                  href="/#services"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-center hover:bg-white hover:text-purple-600 transition-all duration-200"
                >
                  Other Services
                </Link>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Service Pricing
              </h3>

              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="text-sm text-gray-600 mb-2">Hourly Rate</div>
                  <div className="text-4xl font-bold text-purple-600">
                    ৳{service.chargePerHour}
                    <span className="text-lg font-normal text-gray-500">
                      /hour
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="text-sm text-gray-600 mb-2">Daily Rate</div>
                  <div className="text-4xl font-bold text-blue-600">
                    ৳{service.chargePerDay}
                    <span className="text-lg font-normal text-gray-500">
                      /day
                    </span>
                  </div>
                  <div className="text-sm text-green-600 mt-2">
                    💰 Save ৳{service.chargePerHour * 24 - service.chargePerDay}{" "}
                    per day
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600 space-x-2">
                  <span>✓</span>
                  <span>No hidden charges</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 space-x-2 mt-2">
                  <span>✓</span>
                  <span>Flexible booking options</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 space-x-2 mt-2">
                  <span>✓</span>
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Service সম্পর্কে বিস্তারিত
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Service Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-200"
              >
                <div className="text-3xl mb-3">✓</div>
                <h3 className="font-semibold text-gray-900">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            কেন আমাদের {service.name} বেছে নেবেন?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {index + 1}
                </div>
                <p className="text-lg text-gray-700 mt-2">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Book {service.name}?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            আপনার প্রিয়জনের জন্য সেরা care service পেতে এখনই booking করুন
          </p>
          <BookServiceButton serviceId={service._id.toString()} large />
        </div>
      </section>
    </div>
  );
}
