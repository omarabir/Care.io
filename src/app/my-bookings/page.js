import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MyBookingsClient from "@/components/MyBookingsClient";

export const metadata = {
  title: "My Bookings - Care.xyz",
  description: "আপনার সব bookings এক জায়গায় দেখুন এবং manage করুন",
};

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/my-bookings");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-lg text-gray-600">
            আপনার সব bookings এবং তাদের status এখানে দেখুন
          </p>
        </div>

        <MyBookingsClient userId={session.user.id} />
      </div>
    </div>
  );
}
