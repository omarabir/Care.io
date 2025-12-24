import Link from "next/link";
import ServicesSection from "@/components/ServicesSection";

export const metadata = {
  title: "Care.io - Trusted Baby Sitting & Elderly Care Service in Bangladesh",
  description:
    "বাংলাদেশের সবচেয়ে নির্ভরযোগ্য care service platform। শিশু, বৃদ্ধ এবং অসুস্থ ব্যক্তিদের জন্য professional caregiving service পান।",
  keywords:
    "baby sitting bangladesh, elderly care dhaka, sick people care, home care service, caregiver bangladesh",
  openGraph: {
    title: "Care.xyz - Trusted Care Service Platform",
    description: "বাংলাদেশের সবচেয়ে নির্ভরযোগ্য care service platform",
    images: ["/og-image.jpg"],
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Section / Banner */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              আপনার প্রিয়জনের জন্য
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                নির্ভরযোগ্য Care Service
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              শিশু, বৃদ্ধ এবং অসুস্থ ব্যক্তিদের জন্য professional এবং trusted
              caregiving service। আপনার পরিবারের সদস্যদের যত্ন নিতে আমরা সবসময়
              প্রস্তুত। 💙
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#services"
                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-xl"
              >
                Services দেখুন
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200 transform hover:scale-105"
              >
                এখনই শুরু করুন →
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-200">Satisfied Customers</div>
            </div>
            <div className="text-center bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-gray-200">Professional Caregivers</div>
            </div>
            <div className="text-center bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-200">Available Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Care.io কেন বেছে নেবেন?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                আমরা বাংলাদেশের সবচেয়ে নির্ভরযোগ্য care service platform।
                আমাদের লক্ষ্য হলো প্রতিটি পরিবারকে quality caregiving service
                প্রদান করা যা সহজ, নিরাপদ এবং সবার জন্য accessible।
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Verified Caregivers
                    </h3>
                    <p className="text-gray-600">
                      সব caregiver background check এবং training সহ verified
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Safe & Secure
                    </h3>
                    <p className="text-gray-600">
                      আপনার পরিবারের নিরাপত্তা আমাদের প্রথম অগ্রাধিকার
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Easy Booking
                    </h3>
                    <p className="text-gray-600">
                      মাত্র কয়েক click এ আপনার প্রয়োজনীয় service book করুন
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src="/images/care-family.jpg"
                  alt="Care Service"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML =
                      '<div class="w-full h-full flex items-center justify-center text-white text-6xl">👨‍👩‍👧‍👦</div>';
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-yellow-400 rounded-full filter blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              আমাদের Customers কী বলেন
            </h2>
            <p className="text-xl text-gray-600">
              হাজারো সন্তুষ্ট পরিবারের মধ্যে কয়েকটি review
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  R
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Rahima Begum</h4>
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                </div>
              </div>
              <p className="text-gray-600">
                "আমার মায়ের জন্য elderly care service নিয়েছিলাম। সেবা অসাধারণ!
                Caregiver খুবই যত্নশীল এবং professional। ধন্যবাদ Care.xyz!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  K
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Karim Ahmed</h4>
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                </div>
              </div>
              <p className="text-gray-600">
                "Baby sitting service এর জন্য Care.xyz সেরা! আমার বাচ্চা খুব
                খুশি এবং আমরাও tension free থাকতে পারি। Highly recommended!"
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sumaiya Khan</h4>
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                </div>
              </div>
              <p className="text-gray-600">
                "আমার অসুস্থ বাবার জন্য caregiver খুঁজছিলাম। Care.xyz থেকে
                পেয়েছি excellent service। Thank you so much! 💙"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            আজই শুরু করুন আপনার Care Journey
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            মাত্র কয়েক মিনিটে registration করুন এবং পেয়ে যান সেরা care service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-xl"
            >
              Register করুন
            </Link>
            <Link
              href="#services"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200 transform hover:scale-105"
            >
              Services দেখুন
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
