import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getBookingsByUserId } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "অনুগ্রহ করে login করুন" },
        { status: 401 }
      );
    }

    const bookings = await getBookingsByUserId(session.user.id);

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("My bookings fetch error:", error);
    return NextResponse.json(
      { message: "Bookings load করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}
