import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            404
          </h1>
        </div>

        <div className="text-8xl mb-6">😕</div>

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          দুঃখিত! আপনি যে page খুঁজছেন সেটি পাওয়া যায়নি। হয়তো page টি মুছে
          ফেলা হয়েছে অথবা URL ভুল হয়েছে।
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            🏠 Homepage এ ফিরে যান
          </Link>

          <Link
            href="/#services"
            className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-200 transform hover:scale-105"
          >
            Services দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
}
